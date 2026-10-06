import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Layers, 
  Compass, 
  Code2, 
  Bug, 
  Lightbulb, 
  GraduationCap,
  AlertCircle
} from 'lucide-react';

const SUGGESTIONS = [
  'Build a food delivery app for college students',
  'Peer-to-peer campus notes & exam prep exchange',
  'Habit tracker with social friend accountability',
  'Freelance gig marketplace for students with escrow',
];

export function LandingScreen() {
  const { 
    createNewProject, 
    loadCampusEatsDemo, 
    isBackendConnected, 
    aiModelName, 
    aiActivityMessage,
    aiErrorMessage,
    clearAiError
  } = useProject();

  const [prompt, setPrompt] = useState('Build a food delivery app for college students');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isSynthesizing) return;

    setIsSynthesizing(true);
    try {
      // If user clicks the exact campus eats prompt and backend is offline, instant load
      if (prompt.toLowerCase().includes('food delivery') && !isBackendConnected) {
        loadCampusEatsDemo();
      } else {
        await createNewProject(prompt);
      }
    } catch {
      // Error is stored in context
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between selection:bg-zinc-800">
      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 font-mono font-bold text-sm flex items-center justify-center">
            LN
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-200">
            Lunor AI App Engineer
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span>
              {isBackendConnected
                ? `AI Engine • Connected (${aiModelName})`
                : 'Demo Mode • Local Context'}
            </span>
          </span>
          <button
            onClick={() => loadCampusEatsDemo()}
            className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 transition-colors"
          >
            Load CampusEats Demo
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 w-full flex-1 flex flex-col justify-center">
        <div className="space-y-4 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Autonomous Software Lifecycle Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Describe the app you want to build.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Move seamlessly from idea to understanding, architecture planning, live interactive mobile code, root-cause debugging, multi-tier explanation, and developer learning.
          </p>
        </div>

        {/* Optional Error Alert Banner */}
        {aiErrorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{aiErrorMessage}</span>
            </div>
            <button onClick={clearAiError} className="underline text-[10px] hover:text-white">
              Dismiss
            </button>
          </div>
        )}

        {/* Large Prompt Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus-within:border-zinc-500 transition-all p-2 shadow-2xl backdrop-blur-sm">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Build a food delivery app for college students with late-night dorm drops and roommate split-billing..."
              className="w-full bg-transparent px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none font-normal leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-3 pb-2 pt-2 border-t border-zinc-800/40">
              <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                <span>Lifecycle: IDEA → UNDERSTAND → PLAN → BUILD → DEBUG → EXPLAIN → LEARN</span>
              </div>

              <button
                type="submit"
                disabled={isSynthesizing || !prompt.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm group min-w-[160px]"
              >
                {isSynthesizing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin shrink-0" />
                    <span className="text-xs truncate max-w-[200px]">
                      {aiActivityMessage || 'Synthesizing Architecture...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Build with AI</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Blueprint Pills */}
          <div className="pt-2">
            <span className="text-xs text-zinc-500 block mb-2 font-mono">
              Or start with an engineering blueprint:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrompt(item)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    prompt === item
                      ? 'border-zinc-500 bg-zinc-800 text-white'
                      : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* 6 Stage Preview Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: 'Understand', desc: 'Personas & Journeys', icon: Compass },
            { label: 'Plan', desc: 'Schemas & Contracts', icon: Layers },
            { label: 'Build', desc: 'Code & Live Preview', icon: Code2 },
            { label: 'Debug', desc: 'Root-Cause & Fixes', icon: Bug },
            { label: 'Explain', desc: 'Multi-Depth Insight', icon: Lightbulb },
            { label: 'Learn', desc: 'Concepts & Quizzes', icon: GraduationCap },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/60 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-600">0{idx + 1}</span>
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200">{item.label}</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-5 border-t border-zinc-900 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
        <div>Lunor AI App Engineer • Minimal • Context-Aware • Developer First</div>
        <div className="text-zinc-600">
          Backend: FastAPI • Model: {aiModelName} • Frontend: Vite React 19
        </div>
      </footer>
    </div>
  );
}
