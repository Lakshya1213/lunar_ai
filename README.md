# 🌙 Lunar AI — Autonomous AI App Engineer

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Groq](https://img.shields.io/badge/Inference-Groq_LPU-F55036?style=flat-square)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**An autonomous, cognitive software engineering platform that transforms natural-language product ideas into production-grade mobile applications across the complete software development lifecycle.**

[Explore Features](#-the-6-stage-cognitive-lifecycle) • [Architecture](#-system-architecture) • [Quickstart](#-quickstart-guide) • [API Contracts](#-backend-api-endpoints) • [Resilience & Fallbacks](#-multi-model-resilience--fallback-chain)

</div>

---

## 🚀 The Vision

Most AI coding assistants are transactional "chat-box generators" that dump disconnected code snippets and lack architectural continuity. 

**Lunar AI** acts as your autonomous team: **Lead Product Manager, Principal Software Architect, Full-Stack Engineer, QA Lead, and Senior Coding Mentor**. It guides your product through 6 structured, reactive stages:

$$\mathbf{Idea} \longrightarrow \mathbf{Understand} \longrightarrow \mathbf{Plan} \longrightarrow \mathbf{Build} \longrightarrow \mathbf{Debug} \longrightarrow \mathbf{Explain} \longrightarrow \mathbf{Learn}$$

---

## 🧭 The 6-Stage Cognitive Lifecycle

| Stage | Role | What Lunar AI Does |
| :--- | :--- | :--- |
| **01 • Understand** | **Product Manager** | Deconstructs user personas, problem statements, MVP boundaries, step-by-step user journeys, and generates proactive architectural clarification questions. |
| **02 • Plan** | **Principal Architect** | Designs screen hierarchies, normalized PostgreSQL schemas with explicit foreign keys, OpenAPI endpoint contracts, tech stack tradeoff evaluations, and development milestone tasks. |
| **03 • Build** | **Full-Stack Engineer** | Synthesizes a modular virtual codebase (`App.tsx`, screens, state store) with a **Live Interactive Smartphone Simulator** and a real-time **Mutation Engine**. |
| **04 • Debug** | **QA Diagnostic Lead** | Performs static & runtime AST scans, isolates root causes (hydration nulls, memory leaks, unindexed schemas), and provides **1-Click Auto-Fixing** diff patches. |
| **05 • Explain** | **Technical Mentor** | Explains codebase files at 3 cognitive levels (**Beginner**, **Intermediate**, **Advanced**) and provides an interactive **"Ask a Doubt"** Q&A panel for any file or function. |
| **06 • Learn** | **Curriculum Lead** | Dynamically extracts foundational CS/architecture concepts demonstrated in your project, offering interactive quizzes and **Curriculum Mastery** tracking. |

---

## 📱 Live Smartphone Simulator & AI Mutation Engine

Stage 03 includes an **interactive virtual smartphone** running alongside your code editor:
- **Interactive Controls:** Toggle Dark Mode, filter by categories, change navigation routes, and trigger in-memory state mutations.
- **AI Mutation Engine:** Type any arbitrary natural language prompt (e.g., *"Add dark mode"*, *"Add search bar"*, *"Split bill between 3 roommates"*, *"Add live order tracking"*).
- **Surgical Code Patching:** Lunar AI identifies the exact files that need modification, applies hot-reloading patches, and updates simulator delta state in real time.

---

## 🛠️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION / COMMAND BAR                    │
│   Lunar AI • Project Switcher • AI Engine: Groq LPU • Live Indicator   │
├──────────────┬─────────────────────────────────────────────────────────┤
│   SIDEBAR    │                   WORKBENCH STAGE                       │
│              │                                                         │
│ 01 Understand│  01 Understand: Personas, MVP Matrix, User Journeys     │
│ 02 Plan      │  02 Plan: Database Schema, OpenAPI Specs, Tech Stack    │
│ 03 Build     │  03 Build: In-Memory Code Editor + Live Phone Simulator │
│ 04 Debug     │  04 Debug: AST Defect Detection + 1-Click Auto-Fix      │
│ 05 Explain   │  05 Explain: 3-Tier Depth Code Walkthroughs + Doubts    │
│ 06 Learn     │  06 Learn: Project-Derived Concepts + Interactive Quiz  │
└──────────────┴─────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND SERVICE (localhost:8000)               │
│   • /api/pipeline/understand       • /api/pipeline/debug               │
│   • /api/pipeline/plan             • /api/pipeline/explain             │
│   • /api/pipeline/build            • /api/pipeline/learn               │
│   • /api/pipeline/modify           • /api/health                       │
│   • 4-Pass JSON Repair Engine      • Project Manifest Context Manager  │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      MULTI-MODEL INFERENCE ENGINE                      │
│   Primary:   openai/gpt-oss-120b (Structured JSON, 128k context)       │
│   Fallback 1: qwen/qwen3.8-27b   (Relaxed grammar, high-speed coding)  │
│   Fallback 2: openai/gpt-oss-20b  (Lightweight fallback)               │
│   Offline:   Deterministic Production Baseline Scaffolds               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Multi-Model Resilience & Fallback Chain

To guarantee zero downtime and eliminate rate limit (`429`) or JSON validation (`400`) crashes, Lunar AI features an enterprise-grade fallback system:

1. **Primary Synthesis:** Requests start with `openai/gpt-oss-120b` targeting strict structured JSON.
2. **Grammar Failover:** If Groq's pre-validator hits `json_validate_failed` with empty output, the engine automatically switches to **`qwen/qwen3.8-27b`** and relaxes grammar constraints.
3. **4-Pass JSON Repair:**
   - **Pass 1:** Direct parse.
   - **Pass 2 (Backward-Brace Slicing):** Salvages completed array objects (`files`, `screens`, `tasks`) if an output is truncated mid-stream.
   - **Pass 3:** Stack-based token quote & brace closure.
   - **Pass 4:** Regex-based object extraction.
4. **Deterministic Baseline Fallback:** If all network/LLM requests fail, the backend returns clean baseline scaffolds (`App.tsx`, `MainScreen.tsx`, `appStore.ts`) so the UI stays `200 OK` and never breaks.

---

## 📂 Project Structure

```
lunar_ai/
├── backend/                       # FastAPI Python Backend
│   ├── context.py                 # Project Manifest & context serialization
│   ├── llm.py                     # LLMService, multi-model fallback & JSON repair
│   ├── main.py                    # API route definitions for all 6 stages
│   ├── models.py                  # Pydantic v2 data models matching TypeScript
│   ├── prompts.py                 # System prompts for Understand, Plan, Build, etc.
│   └── requirements.txt           # Python dependencies (FastAPI, uvicorn, openai)
│
├── src/                           # React 19 Frontend
│   ├── components/
│   │   ├── layout/                # TopNav, Sidebar, Command bar
│   │   ├── screens/               # LandingScreen (idea prompt entry)
│   │   ├── simulator/             # Interactive MobileSimulator device
│   │   └── views/                 # UnderstandView, PlanView, BuildView,
│   │                              # DebugView, ExplainView, LearnView
│   ├── context/
│   │   └── ProjectContext.tsx     # Global reactive state & pipeline orchestrator
│   ├── data/                      # Seed projects (CampusEats, MedFlash) & fallbacks
│   ├── services/
│   │   └── api.ts                 # Typed fetch client connecting to FastAPI
│   ├── types/                     # TypeScript definitions matching backend
│   └── utils/                     # Dynamic stage calculators & AST helpers
│
├── .env.example                   # Environment configuration template
├── package.json                   # Frontend dependencies & scripts
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite bundler configuration & /api proxy
```

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **Groq API Key** (Free at [console.groq.com](https://console.groq.com))

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Lakshya1213/lunar_ai.git
cd lunar_ai
```

---

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and insert your Groq API key:
```env
LLM_API_KEY=gsk_your_actual_groq_api_key_here
LLM_MODEL=openai/gpt-oss-120b
LLM_FALLBACK_MODEL=qwen/qwen3.8-27b
LLM_BASE_URL=https://api.groq.com/openai/v1
PORT=8000
HOST=127.0.0.1
```

---

### Step 3: Start the Backend (Terminal 1)
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI backend
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend runs at `http://127.0.0.1:8000` (Swagger docs at `http://127.0.0.1:8000/docs`).*

---

### Step 4: Start the Frontend (Terminal 2)
```bash
# Install NPM packages
npm install

# Start Vite dev server
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## 📡 Backend API Endpoints

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health discovery probe & model discovery |
| `POST` | `/api/pipeline/understand` | Synthesizes product personas, user journeys, MVP scope & clarification questions |
| `POST` | `/api/pipeline/plan` | Creates screen trees, relational PostgreSQL schema, OpenAPI endpoints & task roadmap |
| `POST` | `/api/pipeline/build` | Generates modular virtual codebase files (`App.tsx`, `MainScreen.tsx`, `appStore.ts`) |
| `POST` | `/api/pipeline/modify` | Evaluates natural language instructions to patch code and update mobile simulator state |
| `POST` | `/api/pipeline/debug` | Scans codebase AST for hydration bugs, memory leaks, and missing schema indices |
| `POST` | `/api/pipeline/explain` | Multi-tier explanation (Beginner/Intermediate/Advanced) + Live Doubt Q&A mentor |
| `POST` | `/api/pipeline/learn` | Synthesizes custom CS/architecture concepts and interactive self-testing quizzes |

---

## 🧪 Testing & Verification

- **Frontend Typecheck & Build:**
  ```bash
  npm run build
  ```
- **Backend Syntax & Module Check:**
  ```bash
  python -m py_compile backend/main.py backend/llm.py backend/models.py backend/prompts.py
  ```
- **Backend Health Check:**
  ```bash
  curl http://127.0.0.1:8000/api/health
  ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
