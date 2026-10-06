import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Sparkles, 
  ChevronDown, 
  Plus, 
  Cpu, 
  CheckCircle2
} from 'lucide-react';

export function TopNav() {
  const { 
    project, 
    setIsLandingPage, 
    loadCampusEatsDemo,
    isBackendConnected,
    aiModelName,
    aiActivityMessage,
    aiErrorMessage,
    clearAiError
  } = useProject();
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Brand & Project Selector */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsLandingPage(true)}
          className="flex items-center gap-2.5 group text-left transition-opacity hover:opacity-90"
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-950 font-mono font-bold text-xs flex items-center justify-center shadow-sm shadow-zinc-500/10 group-hover:bg-white">
            LN
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-zinc-200">
              Lunor
            </span>
            <span className="text-[10px] text-zinc-500 font-mono leading-none">
              AI App Engineer
            </span>
          </div>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Project Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            <span className="max-w-[200px] truncate">{project.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {showProjectMenu && (
            <div 
              className="absolute left-0 top-full mt-1.5 w-64 rounded-xl bg-zinc-900/95 border border-zinc-800 shadow-2xl p-1.5 z-50 backdrop-blur-xl"
              onMouseLeave={() => setShowProjectMenu(false)}
            >
              <div className="px-2.5 py-1.5 border-b border-zinc-800/80 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
                <span>Active Projects</span>
                <span className="text-zinc-500">Local context</span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    loadCampusEatsDemo();
                    setShowProjectMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded-md flex items-center justify-between"
                >
                  <span className="truncate">CampusEats Mobile</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Current
                  </span>
                </button>
              </div>
              <div className="pt-1 border-t border-zinc-800/80">
                <button
                  onClick={() => {
                    setIsLandingPage(true);
                    setShowProjectMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start New AI App...</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Context Synchronizer Status */}
      <div className="hidden md:flex items-center gap-3">
        {aiActivityMessage ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[11px] font-mono text-violet-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span className="font-medium">{aiActivityMessage}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-zinc-300 font-medium">
              {isBackendConnected ? 'AI Engine • Connected' : 'Demo Mode • Local Context'}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 font-semibold">{aiModelName}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 inline" /> 0 Syntax Errors
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsLandingPage(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">New App Idea</span>
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-1 hidden sm:block" />

        {/* User / Settings Profile */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-mono text-zinc-300">
            eng
          </div>
        </div>
      </div>

      {/* Dismissible Error Banner */}
      {aiErrorMessage && (
        <div className="absolute top-14 inset-x-0 bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-xs text-amber-300 font-mono z-40 backdrop-blur-md">
          <span>⚠️ {aiErrorMessage}</span>
          <button onClick={clearAiError} className="hover:text-white underline text-[10px]">Dismiss</button>
        </div>
      )}
    </header>
  );
}
