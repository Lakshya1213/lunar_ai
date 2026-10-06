import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Lightbulb, 
  Code2, 
  ArrowRight, 
  FileCode, 
  Layers, 
  Scale,
  Sparkles,
  Send,
  HelpCircle,
  MessageSquareCode,
  ChevronRight
} from 'lucide-react';

export function ExplainView() {
  const { 
    project, 
    selectedExplainTopic, 
    setSelectedExplainTopicId, 
    explainLevel, 
    setExplainLevel,
    proceedToLearn,
    isGeneratingLearn,
    explainCodeDynamically,
    isExplainingLoading,
    isBackendConnected,
    askCodeDoubt,
    isAskingDoubt
  } = useProject();

  const { explainTopics } = project;
  const [doubtInput, setDoubtInput] = useState('');

  const quickDoubts = [
    'Explain me this content of file or code what it is doing',
    'Walk me through the execution flow step-by-step',
    'What potential edge cases or bugs exist in this code?',
    'How does this module connect to the application state?',
  ];

  const handleAskDoubt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!doubtInput.trim() || isAskingDoubt) return;
    askCodeDoubt(doubtInput);
    setDoubtInput('');
  };

  const handleQuickDoubt = (question: string) => {
    if (isAskingDoubt) return;
    askCodeDoubt(question);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>Stage 05 • Cognitive Code & Architecture Mentor</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Explain Code & Ask Doubts
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Multi-tier cognitive explanations, step-by-step execution mechanics, and interactive doubt solving for any file or code snippet.
            </p>
          </div>
          <button
            onClick={() => proceedToLearn()}
            disabled={isGeneratingLearn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white transition-colors self-start disabled:opacity-50"
          >
            {isGeneratingLearn ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Curriculum...</span>
              </>
            ) : (
              <>
                <span>{project.isLearnReady ? 'View Curriculum' : 'Proceed to Learn'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Topic Selector Tabs */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
          Select Component / Architectural Module to Inspect:
        </span>
        <div className="flex flex-wrap gap-2">
          {explainTopics.map((topic) => {
            const isSelected = selectedExplainTopic?.id === topic.id;
            const hasDoubts = topic.doubts && topic.doubts.length > 0;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedExplainTopicId(topic.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-zinc-800 text-white border-zinc-600 shadow-sm'
                    : 'bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:bg-zinc-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{topic.title}</span>
                {hasDoubts && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" title="Has answered doubts" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Card */}
      {selectedExplainTopic && (
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
          {/* Target Symbol Meta Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <FileCode className="w-3.5 h-3.5" />
                <span>{selectedExplainTopic.fileContext}</span>
                <span>•</span>
                <span className="text-violet-400 font-semibold">{selectedExplainTopic.targetSymbol}</span>
              </div>
              <h2 className="text-lg font-semibold text-white mt-1">
                {selectedExplainTopic.title}
              </h2>
            </div>

            {/* Cognitive Depth Switcher (Beginner / Intermediate / Advanced) */}
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-1 rounded-xl text-xs font-mono">
                <span className="text-[10px] text-zinc-500 px-2 uppercase font-medium">Depth:</span>
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setExplainLevel(lvl);
                    }}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                      explainLevel === lvl
                        ? 'bg-zinc-800 text-white font-medium shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {isBackendConnected && (
                <button
                  disabled={isExplainingLoading}
                  onClick={() =>
                    explainCodeDynamically(
                      selectedExplainTopic.targetSymbol,
                      selectedExplainTopic.codeSnippet,
                      explainLevel
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-violet-300 hover:text-white border border-zinc-800 flex items-center gap-1.5 transition-colors text-xs font-mono disabled:opacity-50"
                  title="Query live LLM for real codebase explanation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>{isExplainingLoading ? 'Analyzing...' : 'Ask Live LLM'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Code Snippet Highlight */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Reference Code Implementation ({selectedExplainTopic.fileContext})
            </span>
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 overflow-x-auto font-mono text-xs text-zinc-200">
              <pre className="leading-relaxed whitespace-pre">
                <code>{selectedExplainTopic.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Dynamic Explanation by Depth Level */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span className="capitalize text-zinc-200">{explainLevel} Explanation</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-500 text-[11px]">
                {explainLevel === 'beginner'
                  ? 'Real-world analogies & intuition'
                  : explainLevel === 'intermediate'
                  ? 'React hooks, state flow & practical patterns'
                  : 'Concurrency, memory allocation & systems-level profiling'}
              </span>
            </div>

            {isExplainingLoading ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-3.5 h-3.5 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing deep {explainLevel} explanation from codebase...</span>
              </div>
            ) : (
              <p className="text-sm text-zinc-300 leading-relaxed font-normal pt-1">
                {selectedExplainTopic.explanations[explainLevel]}
              </p>
            )}
          </div>

          {/* ==================== INTERACTIVE ASK A DOUBT SECTION ==================== */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-violet-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <MessageSquareCode className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-white">
                  Ask a Doubt Regarding This File / Code
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                File: {selectedExplainTopic.fileContext}
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Have questions about what this code is doing, why a hook is used, or potential edge cases? Type your doubt or pick a quick question below:
            </p>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5">
              {quickDoubts.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isAskingDoubt}
                  onClick={() => handleQuickDoubt(q)}
                  className="px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800 hover:border-violet-500/40 text-[11px] text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <ChevronRight className="w-3 h-3 text-violet-400" />
                  <span>{q}</span>
                </button>
              ))}
            </div>

            {/* Doubt Input Form */}
            <form onSubmit={handleAskDoubt} className="flex gap-2 pt-1">
              <input
                type="text"
                value={doubtInput}
                onChange={(e) => setDoubtInput(e.target.value)}
                placeholder="e.g. 'explain me this content of file or code what it is doing'..."
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!doubtInput.trim() || isAskingDoubt}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-2 transition-colors disabled:opacity-40"
              >
                {isAskingDoubt ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Ask AI</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>

            {/* Live Doubt Processing Indicator */}
            {isAskingDoubt && (
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center gap-2.5 text-xs font-mono text-violet-300">
                <span className="w-3.5 h-3.5 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                <span>AI analyzing code in {selectedExplainTopic.fileContext} and formulating explanation...</span>
              </div>
            )}

            {/* Answered Doubts History Thread */}
            {selectedExplainTopic.doubts && selectedExplainTopic.doubts.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-medium">
                  Discussion & Clarifications ({selectedExplainTopic.doubts.length})
                </span>

                <div className="space-y-3">
                  {selectedExplainTopic.doubts.map((dbt) => (
                    <div
                      key={dbt.id}
                      className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
                          <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
                          <span>Q: {dbt.question}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{dbt.timestamp}</span>
                      </div>

                      <div className="pl-5 text-xs text-zinc-200 leading-relaxed whitespace-pre-line border-l border-violet-500/30">
                        {dbt.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Architectural Rationale & Why It Was Written */}
          <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-medium">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Architectural Rationale: Why Was This Designed This Way?</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {selectedExplainTopic.architecturalRationale}
            </p>
          </div>

          {/* Tradeoffs Considered */}
          {selectedExplainTopic.tradeoffsConsidered.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-medium">
                <Scale className="w-3.5 h-3.5 text-zinc-500" />
                <span>Trade-offs & Alternatives Considered</span>
              </div>
              <ul className="space-y-1.5 pl-1">
                {selectedExplainTopic.tradeoffsConsidered.map((t, idx) => (
                  <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                    <span className="text-zinc-600 font-mono">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
