import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  FileCode,
  Sparkles
} from 'lucide-react';

export function DebugView() {
  const { 
    project, 
    autoFixIssue, 
    proceedToExplain, 
    isGeneratingExplain,
    runDiagnosticScan, 
    isGeneratingDebug,
    aiActivityMessage 
  } = useProject();
  const { debugIssues } = project;
  const [selectedIssueId, setSelectedIssueId] = useState(debugIssues[0]?.id);

  const selectedIssue = debugIssues.find((i) => i.id === selectedIssueId) || debugIssues[0];
  const unfixedCount = debugIssues.filter((i) => !i.isFixed).length;
  const fixedCount = debugIssues.filter((i) => i.isFixed).length;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header & Status */}
      <div className="space-y-3 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Stage 04 • Diagnostic & Quality Assurance</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Debug & Intelligent Code Remediation
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Static analysis, runtime race detection, root-cause decomposition, and 1-click automated diff patching.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={runDiagnosticScan}
              disabled={isGeneratingDebug}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs transition-colors disabled:opacity-50"
              title="Re-scan virtual codebase for architectural defects"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isGeneratingDebug ? 'Scanning...' : 'Scan Codebase'}</span>
            </button>
            <button
              onClick={() => proceedToExplain()}
              disabled={isGeneratingExplain}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white transition-colors"
            >
              {isGeneratingExplain ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Explain...</span>
                </>
              ) : (
                <>
                  <span>{project.isExplainReady ? 'View Explanations' : 'Proceed to Explain'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {isGeneratingDebug && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs font-mono text-amber-300">
            <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>Running deep AST diagnostic analysis across virtual files...</span>
          </div>
        )}

        {aiActivityMessage && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>{aiActivityMessage}</span>
          </div>
        )}

        {/* Diagnostic Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Total Diagnostics</span>
            <span className="text-sm font-mono font-bold text-white">{debugIssues.length}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Pending Resolution</span>
            <span className={`text-sm font-mono font-bold ${unfixedCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {unfixedCount}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Patched by AI</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{fixedCount} Fixed</span>
          </div>
        </div>
      </div>

      {unfixedCount === 0 && debugIssues.length > 0 && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs font-mono text-emerald-300">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>All {debugIssues.length} diagnostic reports resolved and auto-patched in virtual filesystem. Zero-crash verified.</span>
        </div>
      )}

      {debugIssues.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">All Codebase Diagnostics Clear</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              No critical race conditions, unhandled null dereferences, or memory retention leaks detected in virtual files.
            </p>
          </div>
          <button
            onClick={runDiagnosticScan}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs transition-colors border border-zinc-700 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Run Deep Static Analysis Scan</span>
          </button>
        </div>
      ) : (
        /* Main Diagnostic Split View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Issues List Column */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
            Detected Diagnostic Reports ({debugIssues.length})
          </span>

          <div className="space-y-2">
            {debugIssues.map((issue) => {
              const isSelected = selectedIssue.id === issue.id;
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                      : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {issue.severity === 'critical' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      ) : issue.severity === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Info className="w-3.5 h-3.5 text-blue-400" />
                      )}
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                        {issue.severity}
                      </span>
                    </div>

                    {issue.isFixed ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500">Unresolved</span>
                    )}
                  </div>

                  <h4 className="text-xs font-medium text-zinc-100 line-clamp-1">{issue.title}</h4>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <FileCode className="w-3 h-3 text-zinc-600" />
                    <span>{issue.filePath}:{issue.line}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Issue Deep-Dive & Diff Column */}
        <div className="lg:col-span-7 space-y-5">
          {selectedIssue ? (
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
              {/* Issue Header & Auto-Fix Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        selectedIssue.severity === 'critical'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : selectedIssue.severity === 'warning'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {selectedIssue.severity}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {selectedIssue.filePath} • Line {selectedIssue.line}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{selectedIssue.title}</h3>
                </div>

                {selectedIssue.isFixed ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Auto-Patched</span>
                  </div>
                ) : (
                  <button
                    onClick={() => autoFixIssue(selectedIssue.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors shadow-sm self-start"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                    <span>Auto Fix Problem</span>
                  </button>
                )}
              </div>

              {/* Problem Explanation & Root Cause */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-medium">
                    Why the problem exists:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {selectedIssue.explanation}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-medium">
                    Root Cause Analysis:
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                    {selectedIssue.rootCause}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-medium">
                    Suggested Engineering Fix:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedIssue.suggestedFix}
                  </p>
                </div>
              </div>

              {/* Side-by-Side or Unified Before/After Diff */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Differential Patch Preview</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">Unified AST Diff</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Before */}
                  <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 overflow-hidden">
                    <div className="px-3 py-1.5 bg-rose-500/10 text-rose-400 text-[10px] font-mono uppercase tracking-wider flex items-center justify-between">
                      <span>Before (Vulnerable / Faulty)</span>
                      <span>Line {selectedIssue.line}</span>
                    </div>
                    <pre className="p-3 text-[11px] text-rose-300 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                      {selectedIssue.diffBefore}
                    </pre>
                  </div>

                  {/* After */}
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 overflow-hidden">
                    <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider flex items-center justify-between">
                      <span>After (Remediated)</span>
                      <span>Zero-Crash Verified</span>
                    </div>
                    <pre className="p-3 text-[11px] text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                      {selectedIssue.diffAfter}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 font-mono text-xs">
              Select an issue to inspect details and apply automated diff fix.
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
