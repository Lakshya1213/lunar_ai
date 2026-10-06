# Lunor AI App Engineer

> An AI-powered cognitive App Development Platform inspired by the craft, minimalism, and philosophy of Lunor.

Transform raw, natural-language ideas into fully realized mobile applications across the complete software development lifecycle:

$$\text{IDEA} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{PLAN} \longrightarrow \text{BUILD} \longrightarrow \text{DEBUG} \longrightarrow \text{EXPLAIN} \longrightarrow \text{LEARN}$$

---

## 1. Project Overview & Philosophy

Most generative coding tools are transactional "prompt → code" generators that discard product intent and offer zero architectural continuity.

**Lunor AI App Engineer** operates as an integrated **Lead Product Manager, Principal Software Architect, Full-Stack Engineer, and Coding Mentor**:
1. **Understand:** Breaks down problem spaces, user personas, MVP scopes, step-by-step user journeys, and asks proactive architectural clarification questions.
2. **Plan:** Synthesizes screen hierarchies, normalized PostgreSQL schemas with foreign keys, OpenAPI contracts, tech stack tradeoff matrices, and task roadmaps.
3. **Build:** Produces a modular virtual codebase alongside a live interactive smartphone preview, complete with a natural-language modifier engine.
4. **Debug:** Diagnoses code defects, provides root cause analysis, and executes 1-click automated AST diff fixes.
5. **Explain:** Inspects symbols and architecture with a 3-tier cognitive depth selector (Beginner / Intermediate / Advanced).
6. **Learn:** Dynamically extracts engineering concepts, tests developer comprehension with interactive quizzes, and tracks curriculum mastery.

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION / COMMAND BAR                    │
│   Brand • Project Switcher • AI Engine: openai/gpt-oss-120b • Health   │
├──────────────┬─────────────────────────────────────────────────────────┤
│   SIDEBAR    │                   WORKBENCH STAGE                       │
│              │                                                         │
│ 01 Understand│  Understand (Personas, Scope, Journeys, Clarifications) │
│ 02 Plan      │  Plan (Architecture Topology, Schema, APIs, Roadmap)    │
│ 03 Build     │  Debug (Diagnostics, Root-Cause, Auto-Diff Patching)    │
│ 04 Debug     │  Explain (Beginner / Intermediate / Advanced Analysis)  │
│ 05 Explain   │  Learn (Extracted Concepts, Interactive Quizzes)        │
│ 06 Learn     ├────────────────────────────┬────────────────────────────┤
│              │ Multi-File Code Editor     │ Live Smartphone Simulator  │
│              │ (In-Memory AST Tree)       │ (Interactive React Device) │
└──────────────┴────────────────────────────┴────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND SERVICE (localhost:8000)               │
│   • /api/pipeline/understand   • /api/pipeline/plan                    │
│   • /api/pipeline/build        • /api/pipeline/modify                  │
│   • /api/pipeline/explain      • /api/health                           │
│   • Project Manifest Context Manager                                   │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  GROQ / OPENAI-COMPATIBLE LLM ENGINE                   │
│   Model: openai/gpt-oss-120b (128k context, structured outputs)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

### Frontend
- **Framework:** React 19 + TypeScript (Strict types, `verbatimModuleSyntax`)
- **Build Engine:** Vite 8 with configured proxy (`/api` → `http://127.0.0.1:8000`)
- **Styling:** Tailwind CSS v4 + Tailwind Typography
- **Design System:** Minimal, dark-slate palette inspired by Lunor & Linear
- **Icons:** Lucide React
- **State Management:** Centralized reactive `ProjectContext`

### Backend
- **Runtime:** Python 3.13 + FastAPI + Uvicorn
- **Validation:** Pydantic v2 (strictly matching TypeScript types in `src/types/index.ts`)
- **Context Management:** `ProjectContextManager` for compact manifest distillation
- **LLM Client:** `openai` Python SDK (pointing to Groq's high-speed inference engine)

### AI Technologies & Model
- **Provider:** Groq OpenAI-compatible Inference API (`https://api.groq.com/openai/v1`)
- **Model:** `openai/gpt-oss-120b` (128,000 token context window, structured JSON mode, native reasoning)
- **Security:** API keys remain strictly server-side in `backend/.env`. Zero keys in client bundles.

---

## 4. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health probe & model discovery (`llmAvailable: true`) |
| `POST` | `/api/pipeline/understand` | Analyzes idea → generates `UnderstandingSpec` (Personas, Scope, Questions) |
| `POST` | `/api/pipeline/plan` | Takes understanding + clarifications → generates `PlanSpec` (Schema, APIs, Stack) |
| `POST` | `/api/pipeline/build` | Takes plan → synthesizes modular codebase (`VirtualFile[]`) |
| `POST` | `/api/pipeline/modify` | Analyzes natural language mutation → returns targeted patches & simulator delta |
| `POST` | `/api/pipeline/explain` | Explains code snippet across Beginner / Intermediate / Advanced cognitive tiers |

---

## 5. Structured Project Manifest & Context Architecture

Rather than dumping raw transcripts or unbounded tokens into every LLM request, the system uses a **Project Manifest**:
```json
{
  "appName": "CampusEats Mobile",
  "domain": "Hyper-local food delivery for college dorms",
  "problemStatement": "...",
  "coreFeatures": ["Campus Dorm-Drop Hubs", "Instant Roommate Split-Billing"],
  "screens": ["Home (/home)", "Cart (/cart)", "Tracking (/orders/:id/track)"],
  "databaseTables": ["users", "campus_zones", "restaurants", "orders"],
  "activeFiles": ["src/App.tsx", "src/screens/HomeScreen.tsx", "src/store/cartStore.ts"],
  "simulator": {
    "activeScreen": "home",
    "isDarkMode": true,
    "isVegOnly": false,
    "splitCount": 2
  }
}
```
This guarantees that modifications, explanations, and architecture updates remain strictly aware of the active application context with zero context drift.

---

## 6. Two Operating Modes: AI Mode vs. Demo Fallback

The platform is built with high reliability in mind:

1. **AI Mode (Real LLM Active):**
   - Active when `backend/.env` contains a valid key.
   - Any natural language idea triggers live AI synthesis.
   - Natural language modifications ("Add dark mode", "Add tip selector", "Add calorie count") generate genuine code patches and simulator state updates.
   - Live code explanations are queried directly from `openai/gpt-oss-120b`.

2. **Demo Fallback Mode:**
   - If the backend is stopped or network is severed, the platform automatically switches to **Demo Mode**.
   - Includes the complete, pre-seeded **"CampusEats Mobile"** scenario and offline heuristic generators.
   - The UI never crashes or hangs indefinitely.

---

## 7. How to Run

### Prerequisites
- Node.js (v18+)
- Python (3.11+)

### Step 1: Start the Backend (Terminal 1)
```powershell
cd d:\lunor
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```
*Backend runs at `http://127.0.0.1:8000`.*

### Step 2: Start the Frontend (Terminal 2)
```powershell
cd d:\lunor
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## 8. Verification & Test Commands

- **Run TypeScript & Vite Build:**
  ```powershell
  npm run build
  ```
- **Test Backend Health:**
  ```powershell
  curl http://127.0.0.1:8000/api/health
  ```
