import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Database, 
  Server, 
  Layers, 
  Smartphone, 
  ListTodo, 
  ArrowRight, 
  Copy, 
  Check, 
  Code
} from 'lucide-react';

export function PlanView() {
  const { project, proceedToPlan, proceedToBuild, isGeneratingPlan, isGeneratingBuild } = useProject();
  const { plan } = project;
  const [activeTab, setActiveTab] = useState<'architecture' | 'schema' | 'api' | 'screens' | 'tasks'>('architecture');
  const [copiedEndpointId, setCopiedEndpointId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpointId(id);
    setTimeout(() => setCopiedEndpointId(null), 2000);
  };

  // If plan is not ready or is currently generating
  if (!project.isPlanReady || isGeneratingPlan) {
    return (
      <div className="max-w-4xl mx-auto p-12 min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 shadow-xl">
            <Layers className="w-8 h-8" />
          </div>
          {isGeneratingPlan && (
            <div className="absolute -inset-2 rounded-3xl border-2 border-violet-500/40 border-t-violet-400 animate-spin pointer-events-none" />
          )}
        </div>

        <div className="space-y-2 max-w-lg">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>Stage 02 • System Architecture & Blueprinting</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {isGeneratingPlan ? 'Synthesizing Technical Blueprint with AI...' : 'Ready to Synthesize System Plan'}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {isGeneratingPlan
              ? 'Deriving normalized PostgreSQL schema, RESTful API contracts, component screen topologies, and milestone tasks from your Stage 01 specification...'
              : 'Stage 01 Product Discovery is complete. Synthesize the multi-tier architecture, database schema, and endpoint contracts with one click.'}
          </p>
        </div>

        {!isGeneratingPlan && (
          <button
            onClick={() => proceedToPlan(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white shadow-lg transition-all"
          >
            <span>Synthesize System Plan with AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>Stage 02 • System Architecture & Blueprinting</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              System Plan & Technical Specification
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Multi-tier architecture, normalized SQL schema, API contracts, screen topology, and development tasks.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => proceedToPlan(true)}
              disabled={isGeneratingPlan}
              className="px-3 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 font-medium text-xs transition-colors"
              title="Re-run architecture synthesis with updated clarification choices"
            >
              Re-generate
            </button>
            <button
              onClick={() => proceedToBuild()}
              disabled={isGeneratingBuild}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-all ${
                isGeneratingBuild
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                  : 'bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-md'
              }`}
            >
              {isGeneratingBuild ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Codebase...</span>
                </>
              ) : (
                <>
                  <span>{project.isBuildReady ? 'View Build Runtime' : 'Proceed to Build'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 pt-4">
          {[
            { id: 'architecture', label: 'Architecture & Stack', icon: Layers },
            { id: 'schema', label: 'Database Schema', icon: Database },
            { id: 'api', label: 'API Contracts', icon: Server },
            { id: 'screens', label: 'Screens & Navigation', icon: Smartphone },
            { id: 'tasks', label: 'Development Tasks', icon: ListTodo },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. ARCHITECTURE & TECH STACK */}
      {activeTab === 'architecture' && (
        <div className="space-y-8">
          {/* Visual Architecture Diagram */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              System Topology Diagram
            </h2>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {plan.architectureNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-3 relative group hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Tier 0{idx + 1}</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                        {node.protocol}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-violet-400 uppercase block font-medium">
                        {node.layer}
                      </span>
                      <h4 className="text-xs font-semibold text-zinc-100 mt-0.5">{node.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {node.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                      <span>Latency SLA</span>
                      <span className="text-emerald-400">&lt; 35ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Tech Stack & Tradeoffs */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              Recommended Technology Stack & Tradeoffs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan.techStack.map((tech) => (
                <div
                  key={tech.id}
                  className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">{tech.category}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {tech.version}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100">{tech.technology}</h3>
                  <div className="pt-1 border-t border-zinc-800/50">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                      Architectural Justification:
                    </span>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                      {tech.tradeoffReasoning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. DATABASE SCHEMA */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              Relational PostgreSQL 16 Schema ({plan.databaseSchema.length} Tables)
            </h2>
            <span className="text-xs text-zinc-500 font-mono">Normalized 3NF Model</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.databaseSchema.map((table) => (
              <div
                key={table.id}
                className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-zinc-100">
                      {table.tableName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {table.columns.length} columns
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">{table.description}</p>

                {/* Columns Table */}
                <div className="space-y-1 font-mono text-xs">
                  {table.columns.map((col) => (
                    <div
                      key={col.name}
                      className="px-2.5 py-1.5 rounded bg-zinc-900/60 border border-zinc-800/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-200 font-medium">{col.name}</span>
                        {col.isPrimary && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            PK
                          </span>
                        )}
                        {col.isForeign && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            FK → {col.references}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. API CONTRACTS */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              REST & Webhook Endpoint Contracts ({plan.apiEndpoints.length} Endpoints)
            </h2>
            <span className="text-xs text-zinc-500 font-mono">OpenAPI 3.1 Spec</span>
          </div>

          <div className="space-y-3">
            {plan.apiEndpoints.map((ep) => (
              <div
                key={ep.id}
                className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2.5 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        ep.method === 'GET'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : ep.method === 'POST'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs text-zinc-200 font-semibold">{ep.path}</span>
                  </div>

                  <span className="text-xs text-zinc-400">{ep.summary}</span>
                </div>

                {/* Payloads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {ep.requestBody && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                        Request Body (JSON)
                      </span>
                      <pre className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
                        {ep.requestBody}
                      </pre>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Response Body (HTTP {ep.status})
                      </span>
                      <button
                        onClick={() => copyToClipboard(ep.responseBody, ep.id)}
                        className="text-[10px] font-mono text-zinc-500 hover:text-zinc-200 flex items-center gap-1"
                      >
                        {copiedEndpointId === ep.id ? (
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
                    <pre className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-emerald-400/90 overflow-x-auto">
                      {ep.responseBody}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SCREENS & NAVIGATION */}
      {activeTab === 'screens' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              Screen Hierarchy & Component Tree ({plan.screens.length} Screens)
            </h2>
            <span className="text-xs text-zinc-500 font-mono">React Navigation Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.screens.map((screen) => (
              <div
                key={screen.id}
                className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{screen.name}</h3>
                  <span className="text-xs font-mono text-zinc-500">{screen.route}</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{screen.purpose}</p>

                <div className="pt-2 border-t border-zinc-800/50">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">
                    Sub-Components:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {screen.components.map((comp) => (
                      <span
                        key={comp}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-1"
                      >
                        <Code className="w-2.5 h-2.5 text-zinc-500" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DEVELOPMENT TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              Milestone Tasks & Kanban Progress
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              {plan.tasks.filter((t) => t.status === 'completed').length} / {plan.tasks.length} Completed
            </span>
          </div>

          <div className="space-y-2">
            {plan.tasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                      task.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : task.status === 'in-progress'
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {task.status === 'completed' ? '✓' : '•'}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-medium ${
                        task.status === 'completed'
                          ? 'text-zinc-300 line-through decoration-zinc-600'
                          : 'text-zinc-100'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Category: {task.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {task.complexity} Complexity
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded capitalize ${
                      task.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : task.status === 'in-progress'
                        ? 'bg-violet-500/10 text-violet-400'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
