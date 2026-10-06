import os
import json
import re
import logging
from typing import Dict, Any, Optional
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI, BadRequestError, RateLimitError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("lunor-backend")

# Load environment variables
backend_dir = Path(__file__).resolve().parent
load_dotenv(backend_dir / ".env")
load_dotenv(backend_dir.parent / ".env")

API_KEY = os.getenv("LLM_API_KEY", "")
MODEL_NAME = os.getenv("LLM_MODEL", "openai/gpt-oss-120b")
BASE_URL = os.getenv("LLM_BASE_URL", "https://api.groq.com/openai/v1")
FALLBACK_MODELS = [
    os.getenv("LLM_FALLBACK_MODEL", "qwen/qwen3.8-27b"),
    "openai/gpt-oss-20b"
]

def try_repair_truncated_json(text: str) -> Optional[Dict[str, Any]]:
    """
    Robust 4-pass JSON repair engine that:
    1. Tests direct JSON parse
    2. Performs backward-brace slicing to salvage completed objects in truncated arrays
    3. Traverses quotes and brackets via state machine stack to balance unclosed scopes
    4. Extracts completed objects from known arrays via regex fallback
    """
    if not text or not isinstance(text, str):
        return None
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.MULTILINE)
        text = re.sub(r"\s*```$", "", text, flags=re.MULTILINE)
        text = text.strip()

    start = text.find("{")
    if start == -1:
        return None
    text = text[start:]

    # Pass 1: Direct JSON parse
    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        pass

    # Pass 2: Backward brace scanning (salvages completed items in arrays like files, screens, etc.)
    pos = len(text)
    while pos > 0:
        pos = text.rfind('}', 0, pos)
        if pos == -1:
            break
        sub = text[:pos + 1].strip()
        if sub.endswith(','):
            sub = sub[:-1].strip()

        for closing in [']}', '}', ']', '}]}', ']}}', '"]}', '"}}']:
            try:
                candidate = sub + closing
                res = json.loads(candidate)
                if isinstance(res, dict) and any(res.values()):
                    return res
            except Exception:
                continue
        pos = pos - 1

    # Pass 3: Token-aware quote and brace balance
    try:
        in_string = False
        escape = False
        stack = []
        for ch in text:
            if escape:
                escape = False
                continue
            if ch == '\\':
                escape = True
                continue
            if ch == '"':
                in_string = not in_string
                continue
            if not in_string:
                if ch in ('{', '['):
                    stack.append('}' if ch == '{' else ']')
                elif ch in ('}', ']') and stack and stack[-1] == ch:
                    stack.pop()

        repaired_str = text
        if in_string:
            repaired_str += '"'
        while stack:
            repaired_str += stack.pop()

        res = json.loads(repaired_str)
        if isinstance(res, dict):
            return res
    except Exception:
        pass

    # Pass 4: Regex-based object extraction
    for key in ["files", "screens", "databaseSchema", "apiEndpoints", "tasks", "issues", "concepts", "patchedFiles"]:
        pattern = rf'"{key}"\s*:\s*\['
        m = re.search(pattern, text)
        if m:
            arr_start = m.end()
            objs = []
            obj_matches = re.finditer(r'\{[^{}]*\}', text[arr_start:])
            for om in obj_matches:
                try:
                    obj = json.loads(om.group(0))
                    objs.append(obj)
                except Exception:
                    continue
            if objs:
                return {key: objs}

    return None

class LLMService:
    def __init__(self):
        raw_key = os.getenv("LLM_API_KEY", API_KEY) or ""
        self.api_key = raw_key.strip().strip('"').strip("'")
        self.model = (os.getenv("LLM_MODEL", MODEL_NAME) or "openai/gpt-oss-120b").strip().strip('"').strip("'")
        self.current_model = self.model
        self.base_url = (os.getenv("LLM_BASE_URL", BASE_URL) or "https://api.groq.com/openai/v1").strip().strip('"').strip("'")
        
        self.client: Optional[OpenAI] = None
        if self.api_key and self.api_key != "your_api_key_here":
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url,
                default_headers={"User-Agent": "Mozilla/5.0"}
            )
            logger.info(f"LLMService initialized with model={self.model} at {self.base_url}")
        else:
            logger.warning("LLMService: No valid LLM_API_KEY detected. Running in Demo / Fallback mode.")

    def get_client(self) -> Optional[OpenAI]:
        current_env_key = (os.getenv("LLM_API_KEY", "") or "").strip().strip('"').strip("'")
        if current_env_key and current_env_key != "your_api_key_here" and current_env_key != self.api_key:
            self.api_key = current_env_key
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url,
                default_headers={"User-Agent": "Mozilla/5.0"}
            )
            logger.info("LLMService dynamically refreshed API key from environment.")
        return self.client

    def is_available(self) -> bool:
        client = self.get_client()
        return client is not None and bool(self.api_key)

    def _clean_json_string(self, text: str) -> str:
        """Strip markdown fences and whitespace from LLM response"""
        text = text.strip()
        if text.startswith("```"):
            text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.MULTILINE)
            text = re.sub(r"\s*```$", "", text, flags=re.MULTILINE)
            text = text.strip()
        
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            return text[start:end+1]
        return text

    def call_json_completion(
        self, 
        system_prompt: str, 
        user_prompt: str, 
        temperature: float = 0.2,
        retry_count: int = 2,
        max_tokens: int = 4096
    ) -> Dict[str, Any]:
        """
        Executes a completion request targeting structured JSON.
        Includes automatic retry, JSON repair, and multi-model fallback chain.
        """
        if not self.is_available():
            raise RuntimeError("LLM backend is not configured with a valid API key.")

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        active_model = self.model
        enforce_json_format = True

        for attempt in range(retry_count + 1):
            try:
                kwargs = {
                    "model": active_model,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens,
                }
                if enforce_json_format:
                    kwargs["response_format"] = {"type": "json_object"}

                client = self.get_client()
                if not client:
                    raise RuntimeError("No valid API key or OpenAI client initialized.")
                response = client.chat.completions.create(**kwargs)
                
                raw_content = response.choices[0].message.content or "{}"
                cleaned = self._clean_json_string(raw_content)
                parsed = json.loads(cleaned)
                return parsed

            except BadRequestError as bre:
                logger.warning(f"BadRequestError from LLM (attempt {attempt}, model {active_model}): {bre}")
                # Check if Groq returned failed_generation
                failed_gen = None
                try:
                    if hasattr(bre, "response") and hasattr(bre.response, "json"):
                        err_body = bre.response.json()
                        failed_gen = err_body.get("error", {}).get("failed_generation")
                    elif hasattr(bre, "body") and isinstance(bre.body, dict):
                        failed_gen = bre.body.get("error", {}).get("failed_generation")
                except Exception:
                    pass

                if failed_gen:
                    logger.info("Attempting automated repair on failed_generation...")
                    repaired = try_repair_truncated_json(failed_gen)
                    if repaired and isinstance(repaired, dict):
                        logger.info("Successfully repaired truncated JSON from failed_generation!")
                        return repaired

                # Switch to next fallback model in the chain and relax json_object constraint
                if attempt < retry_count:
                    next_model = FALLBACK_MODELS[min(attempt, len(FALLBACK_MODELS) - 1)]
                    active_model = next_model
                    enforce_json_format = False  # Relax rigid constraint so Groq's grammar validator won't abort
                    logger.info(f"Switching to fallback model: {active_model} (relaxed JSON constraint)")
                else:
                    raise bre

            except RateLimitError as rle:
                logger.warning(f"RateLimitError on {active_model}: {rle}")
                if attempt < retry_count:
                    next_model = FALLBACK_MODELS[min(attempt, len(FALLBACK_MODELS) - 1)]
                    active_model = next_model
                    enforce_json_format = False
                    logger.info(f"Switching to fallback model: {active_model}")
                else:
                    raise rle

            except (json.JSONDecodeError, ValueError) as jde:
                logger.warning(f"JSON parse error on attempt {attempt}: {jde}. Content len: {len(raw_content)}")
                repaired = try_repair_truncated_json(raw_content)
                if repaired and isinstance(repaired, dict):
                    logger.info("Successfully repaired raw JSON string!")
                    return repaired

                if attempt < retry_count:
                    next_model = FALLBACK_MODELS[min(attempt, len(FALLBACK_MODELS) - 1)]
                    active_model = next_model
                    enforce_json_format = False
                    logger.info(f"Retrying with fallback model: {active_model}")
                else:
                    raise ValueError(f"Failed to parse valid JSON from LLM: {jde}")

            except Exception as e:
                logger.error(f"Error calling LLM provider: {e}")
                if attempt < retry_count:
                    next_model = FALLBACK_MODELS[min(attempt, len(FALLBACK_MODELS) - 1)]
                    active_model = next_model
                    enforce_json_format = False
                    logger.info(f"Retrying with fallback model {active_model} after exception...")
                else:
                    raise e

        raise RuntimeError("LLM completion failed after retries.")

# Global singleton
llm_service = LLMService()
