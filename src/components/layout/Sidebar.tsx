import { useProject } from '../../context/ProjectContext';
import type { LifecycleStage } from '../../types';
import {
  Compass,
  Layers,
  Code2,
  Bug,
  Lightbulb,
  GraduationCap,
  Smartphone,
  ShieldAlert,
} from 'lucide-react';

interface StageItem {
  id: LifecycleStage;
  label: string;
  step: string;
  icon: typeof Compass;
  badge?: string;
  description: string;
}

const STAGES: StageItem[] = [
  {
    id: 'understand',
    label: 'Understand',
    step: '01',
    icon: Compass,
    description: 'Problem, personas & user journeys',
  },
  {
    id: 'plan',
    label: 'Plan',
    step: '02',
    icon: Layers,
    description: 'Schemas, APIs & architecture',
  },
  {
    id: 'build',
    label: 'Build',
    step: '03',
    icon: Code2,
    badge: 'Live',
    description: 'Generated code & interactive preview',
  },
  {
    id: 'debug',
    label: 'Debug',
    step: '04',
    icon: Bug,
    description: 'Error diagnostics & 1-click fixes',
  },
  {
    id: 'explain',
    label: 'Explain',
    step: '05',
    icon: Lightbulb,
    description: 'Multi-level cognitive code explainer',
  },
  {
    id: 'learn',
    label: 'Learn',
    step: '06',
    icon: GraduationCap,
    description: 'Curriculum & concept quizzes',
  },
];

export function Sidebar() {
  const { 
    activeStage, 
    setActiveStage, 
    project, 
    isGeneratingPlan, 
    isGeneratingBuild,
    isGeneratingDebug,
    isGeneratingExplain,
    isGeneratingLearn
  } = useProject();

  const unfixedCount = project.debugIssues.filter((i) => !i.isFixed).length;

  return (
    <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950 flex flex-col justify-between select-none">
      <div className="p-3">
        {/* Stage Header */}
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 font-medium">
            Engineering Lifecycle
          </span>
          <span className="text-[10px] font-mono text-zinc-600">
            6 Stages
          </span>
        </div>

        {/* Navigation Stage List */}
        <nav className="mt-1 space-y-1">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            const isDebug = stage.id === 'debug';

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`w-full group text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all duration-150 relative ${
                  isActive
                    ? 'bg-zinc-900 text-white font-medium border border-zinc-800 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950'
                        : 'bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs tracking-tight leading-snug">
                      {stage.label}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono leading-none">
                      Phase {stage.step}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                {stage.id === 'plan' && isGeneratingPlan ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30 animate-pulse">
                    Generating...
                  </span>
                ) : stage.id === 'build' && isGeneratingBuild ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
                    Generating...
                  </span>
                ) : stage.id === 'debug' && isGeneratingDebug ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
                    Scanning...
                  </span>
                ) : stage.id === 'explain' && isGeneratingExplain ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30 animate-pulse">
                    Analyzing...
                  </span>
                ) : stage.id === 'learn' && isGeneratingLearn ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
                    Generating...
                  </span>
                ) : isDebug && unfixedCount > 0 ? (
                  <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <ShieldAlert className="w-2.5 h-2.5" />
                    {unfixedCount}
                  </span>
                ) : stage.id === 'build' && project.isBuildReady ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Environment & Architecture Widget */}
      <div className="p-3 border-t border-zinc-900">
        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 text-zinc-500" />
              Runtime Target
            </span>
            <span className="text-zinc-300 font-medium">Expo 52</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-zinc-400">Spec Status</span>
            <span className="text-emerald-400">Deterministic</span>
          </div>

          <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Context Cache</span>
            <span>100% In-Memory</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
