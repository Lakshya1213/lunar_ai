import React, { useState, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { MobileSimulator } from '../simulator/MobileSimulator';
import { 
  FileCode, 
  Send, 
  Copy, 
  Check, 
  History, 
  CheckCircle2,
  Cpu,
  ArrowRight
} from 'lucide-react';

export function BuildView() {
  const { 
    project, 
    activeFile, 
    setActiveFileId, 
    applyModification, 
    isApplyingAiModification,
    aiActivityMessage,
    isBackendConnected,
    proceedToBuild,
    proceedToDebug,
    isGeneratingBuild,
    isGeneratingDebug
  } = useProject();

  const [promptInput, setPromptInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activePane, setActivePane] = useState<'both' | 'code' | 'preview'>('both');

  const quickPills = useMemo(() => {
    const pills: string[] = ['✨ Add dark mode'];

    const features = project.understanding?.features || [];
    const screens = project.plan?.screens || [];

    // Derive contextual suggestions directly from this specific project's architecture
    if (features[0]?.title) {
      pills.push(`⚡ Add real-time sync for ${features[0].title}`);
    }
    if (screens[0]?.name) {
      pills.push(`🔍 Add live search & filter to ${screens[0].name}`);
    }
    if (features[1]?.title) {
      pills.push(`📊 Add analytics dashboard for ${features[1].title}`);
    } else {
      pills.push('📊 Add analytics metrics dashboard');
    }

    pills.push('📤 Add export to CSV / PDF');
    pills.push('🔔 Add push notification alerts');

    return pills.slice(0, 5);
  }, [project.understanding?.features, project.plan?.screens]);

  const inputPlaceholder = useMemo(() => {
    const feat = project.understanding?.features?.[0]?.title;
    if (feat) {
      return `e.g. 'Add dark mode', 'Add export to CSV', 'Add filter for ${feat}'...`;
    }
    return "e.g. 'Add dark mode', 'Add export to CSV', 'Add search filter'...";
  }, [project.understanding?.features]);

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isApplyingAiModification) return;
    applyModification(promptInput);
    setPromptInput('');
  };

  const handleQuickPrompt = (text: string) => {
    applyModification(text);
  };

  const handleCopyCode = () => {
    if (!activeFile?.content) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If build is not ready or is currently generating
  if (!project.isBuildReady || isGeneratingBuild) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 bg-zinc-950 text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-xl">
            <Cpu className="w-8 h-8" />
          </div>
          {isGeneratingBuild && (
            <div className="absolute -inset-2 rounded-3xl border-2 border-emerald-500/40 border-t-emerald-400 animate-spin pointer-events-none" />
          )}
        </div>

        <div className="space-y-2 max-w-lg">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Stage 03 • Build Runtime & Simulator</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {isGeneratingBuild ? 'Synthesizing Production Codebase with AI...' : 'Ready to Synthesize Codebase'}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {isGeneratingBuild
              ? 'Generating modular React Native / Expo virtual components, state stores, navigation graph, and initializing the interactive mobile simulator...'
              : 'System specification and architecture approved. Launch the AI compiler to generate virtual files and start the interactive preview runtime.'}
          </p>
        </div>

        {!isGeneratingBuild && (
          <button
            onClick={() => proceedToBuild(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white shadow-lg transition-all"
          >
            <span>Synthesize Codebase & Launch Runtime</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-zinc-950">
      {/* Top Build Action Bar */}
      <div className="h-12 border-b border-zinc-800/80 px-4 flex items-center justify-between shrink-0 bg-zinc-950/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-zinc-200">Stage 03 • Build Runtime</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
            Virtual Filesystem Active ({project.virtualFiles.length} modules)
          </span>
        </div>

        {/* Actions & View Switcher */}
        <div className="flex items-center gap-2">
          {/* View Switcher Pills */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActivePane('both')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePane === 'both' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setActivePane('code')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePane === 'code' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Code Only
            </button>
            <button
              onClick={() => setActivePane('preview')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePane === 'preview' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Preview Only
            </button>
          </div>

          <button
            onClick={() => proceedToDebug()}
            disabled={isGeneratingDebug}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-all shadow-sm"
          >
            {isGeneratingDebug ? (
              <>
                <span className="w-3 h-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                <span>Scanning Diagnostics...</span>
              </>
            ) : (
              <>
                <span>{project.isDebugReady ? 'View Diagnostics' : 'Proceed to Debug'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workbench Split Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Code & Virtual Filesystem */}
        {(activePane === 'both' || activePane === 'code') && (
          <div className="flex-1 flex flex-col border-r border-zinc-800/80 min-w-0 bg-[#0c0d0e]">
            {/* File Explorer Tab Bar */}
            <div className="h-10 border-b border-zinc-800/80 bg-zinc-950/80 px-2 flex items-center gap-1 overflow-x-auto select-none no-scrollbar">
              {project.virtualFiles.map((file) => {
                const isActive = activeFile.id === file.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`h-7 px-3 rounded-md text-xs font-mono flex items-center gap-2 transition-colors shrink-0 ${
                      isActive
                        ? 'bg-zinc-800/90 text-zinc-100 font-medium border border-zinc-700/80 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{file.name}</span>
                    {file.isModified && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Hot-patched by AI" />
                    )}
                  </button>
                );
              })}

              <div className="ml-auto pr-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2 py-1 rounded text-[11px] font-mono text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Editor Body with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-zinc-200 selection:bg-zinc-800">
              <div className="flex gap-4">
                {/* Line Numbers */}
                <div className="select-none text-right text-zinc-600 pr-2 border-r border-zinc-800/60 font-mono text-[11px] space-y-[2px]">
                  {activeFile.content.split('\n').map((_, i) => (
                    <div key={i} className="leading-relaxed">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code Text Content */}
                <pre className="flex-1 overflow-x-auto whitespace-pre font-mono text-xs leading-relaxed text-zinc-300">
                  <code>{activeFile.content}</code>
                </pre>
              </div>
            </div>

            {/* Natural-Language Modification Prompt Bar */}
            <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/90 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-violet-400" />
                  <span className={isApplyingAiModification ? 'text-violet-300 font-semibold animate-pulse' : ''}>
                    {aiActivityMessage || (isBackendConnected ? 'AI Mutation Engine (Live)' : 'Modifier Engine (Simulated)')}
                  </span>
                </span>
                <span>{isApplyingAiModification ? 'Synthesizing changes...' : 'Type prompt to patch code & preview'}</span>
              </div>

              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!promptInput.trim() || isApplyingAiModification}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs flex items-center gap-1.5 transition-all disabled:opacity-40"
                >
                  {isApplyingAiModification ? (
                    <span className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Apply</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Preset Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-[11px] font-mono">
                <span className="text-zinc-600 shrink-0">Try:</span>
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => handleQuickPrompt(pill)}
                    className="px-2.5 py-1 rounded-lg border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 whitespace-nowrap transition-colors"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Pane: Live Interactive Mobile Simulator */}
        {(activePane === 'both' || activePane === 'preview') && (
          <div className="w-[420px] shrink-0 border-l border-zinc-800/80 bg-zinc-950 flex flex-col items-center justify-center p-6 overflow-y-auto">
            <MobileSimulator />

            {/* Hot Reload Status */}
            <div className="mt-4 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive Simulator Hot-Reloaded</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Modification History Drawer */}
      {project.modifications.length > 0 && (
        <div className="border-t border-zinc-800/80 bg-zinc-950/70 px-4 py-2 text-xs font-mono text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-300 font-medium">Recent AI Revision:</span>
            <span className="text-zinc-400 truncate max-w-md">
              {project.modifications[0].prompt.startsWith('Analyzed idea:')
                ? `Initial Architecture Synthesized for: "${project.understanding?.appName || project.name}"`
                : project.modifications[0].prompt}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500">
            {project.modifications[0].timestamp}
          </span>
        </div>
      )}
    </div>
  );
}
