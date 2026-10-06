import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Users, 
  Target, 
  HelpCircle, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Layers
} from 'lucide-react';

export function UnderstandView() {
  const { project, answerClarification, proceedToPlan, isGeneratingPlan } = useProject();
  const { understanding } = project;
  const [activePersonaId, setActivePersonaId] = useState(understanding.targetAudience[0]?.id);

  const selectedPersona = understanding.targetAudience.find((p) => p.id === activePersonaId) || understanding.targetAudience[0];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* Header & Stage Overview */}
      <div className="space-y-3 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>Stage 01 • Product Discovery & Synthesis</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Understand the Problem Space
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              AI analysis of user personas, core MVP requirements, user journeys, and architectural edge cases.
            </p>
          </div>
          <button
            onClick={() => proceedToPlan()}
            disabled={isGeneratingPlan}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-all self-start ${
              isGeneratingPlan
                ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                : 'bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-sm'
            }`}
          >
            {isGeneratingPlan ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                <span>Synthesizing Plan...</span>
              </>
            ) : (
              <>
                <span>{project.isPlanReady ? 'View Technical Plan' : 'Proceed to Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Problem Statement & Solution Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-medium">
            <Target className="w-3.5 h-3.5 text-rose-400" />
            <span>Problem Statement</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {understanding.problemStatement}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-medium">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Solution Vision</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {understanding.solutionVision}
          </p>
        </div>
      </div>

      {/* Target User Personas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              Target User Personas
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            {understanding.targetAudience.length} Personas Synthesized
          </span>
        </div>

        {/* Persona Tabs */}
        <div className="flex gap-2 border-b border-zinc-800/80 pb-2">
          {understanding.targetAudience.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePersonaId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                activePersonaId === p.id
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-zinc-700 text-zinc-300 text-[10px] font-mono flex items-center justify-center font-bold">
                {p.avatar}
              </span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Persona Detail Card */}
        {selectedPersona && (
          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
              <div>
                <h3 className="text-base font-semibold text-white">{selectedPersona.name}</h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{selectedPersona.role}</p>
              </div>
              <blockquote className="text-xs italic text-zinc-400 max-w-md">
                {selectedPersona.quote}
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Core Frustrations & Pain Points
                </span>
                <ul className="space-y-1.5">
                  {selectedPersona.painPoints.map((pain, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  Goals & Requirements
                </span>
                <ul className="space-y-1.5">
                  {selectedPersona.goals.map((goal, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Core Features Matrix (MVP vs V2) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Feature Scope & MVP Matrix
          </h2>
          <span className="text-xs text-zinc-500 font-mono">Prioritized Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {understanding.features.map((feat) => (
            <div
              key={feat.id}
              className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">{feat.category}</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      feat.priority === 'MVP'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {feat.priority}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400">
                    {feat.complexity} Complexity
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">{feat.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Journeys */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
          End-to-End User Journeys
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {understanding.userJourneys.map((j) => (
            <div
              key={j.step}
              className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 space-y-3 relative"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-[11px]">
                  {j.step}
                </span>
                <span className="text-zinc-500">{j.touchpoint}</span>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">{j.stage}</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  <strong className="text-zinc-300 font-medium">User:</strong> {j.userAction}
                </p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  <strong className="text-zinc-400 font-medium">System:</strong> {j.systemAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligent Clarification Questions (Interactive) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              Intelligent Clarifications
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Interactive AI Refinement
          </span>
        </div>

        <div className="space-y-3">
          {understanding.clarifications.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3"
            >
              <div>
                <h3 className="text-sm font-medium text-zinc-100">{q.question}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{q.context}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = q.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => answerClarification(q.id, opt.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-sm'
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-semibold block">{opt.label}</span>
                        <span className="text-[11px] text-zinc-400 block leading-relaxed">
                          {opt.description}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Requirements & Edge Cases */}
      <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Missing Requirements & Edge Cases Detected by AI</span>
        </div>
        <ul className="space-y-1.5 pl-1">
          {understanding.missingRequirements.map((req, idx) => (
            <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
              <span className="text-amber-400 font-mono text-xs">•</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
