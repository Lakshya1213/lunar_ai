import type {
  UnderstandingSpec,
  PlanSpec,
  VirtualFile,
  SimulatorState,
  CodeIssue,
  ConceptNode,
} from '../types';

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

export interface HealthStatus {
  status: string;
  llmAvailable: boolean;
  model: string;
  provider: string;
}

export interface ModifyResult {
  patchedFiles: VirtualFile[];
  summary: string;
  affectedFiles: string[];
  simulatorDelta?: Partial<SimulatorState>;
}

export interface ExplainResult {
  explanation: string;
  howItWorks?: string;
  whyItExists?: string;
  connections?: string;
  architecturalRationale?: string;
  possibleImprovements?: string[];
  answerToDoubt?: string;
}

export async function checkBackendHealth(): Promise<HealthStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchUnderstand(idea: string): Promise<UnderstandingSpec> {
  const res = await fetch(`${API_BASE}/pipeline/understand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to synthesize understanding specification');
  }
  return await res.json();
}

export async function fetchPlan(
  understanding: UnderstandingSpec,
  clarifications: Record<string, string> = {}
): Promise<PlanSpec> {
  const res = await fetch(`${API_BASE}/pipeline/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ understanding, clarifications }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to synthesize plan specification');
  }
  return await res.json();
}

export async function fetchBuild(
  plan: PlanSpec,
  appName?: string
): Promise<{ files: VirtualFile[] }> {
  const res = await fetch(`${API_BASE}/pipeline/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, appName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to synthesize codebase');
  }
  return await res.json();
}

export async function fetchModify(
  files: VirtualFile[],
  prompt: string,
  projectSpec: any,
  activeSimulatorState: any
): Promise<ModifyResult> {
  const res = await fetch(`${API_BASE}/pipeline/modify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      files,
      prompt,
      projectSpec,
      activeSimulatorState,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to apply AI modification');
  }
  return await res.json();
}

export async function fetchExplain(
  snippet: string,
  symbol: string,
  level: string,
  projectContext?: any,
  userQuestion?: string,
  filePath?: string
): Promise<ExplainResult> {
  const res = await fetch(`${API_BASE}/pipeline/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      snippet,
      symbol,
      level,
      projectContext,
      userQuestion,
      filePath,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to explain code symbol');
  }
  return await res.json();
}

export async function fetchDebug(
  files: VirtualFile[],
  appName?: string
): Promise<{ issues: CodeIssue[] }> {
  const res = await fetch(`${API_BASE}/pipeline/debug`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files, appName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to analyze diagnostics');
  }
  return await res.json();
}

export async function fetchLearn(
  understanding: UnderstandingSpec,
  plan?: PlanSpec
): Promise<{ concepts: ConceptNode[] }> {
  const res = await fetch(`${API_BASE}/pipeline/learn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ understanding, plan }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to synthesize curriculum');
  }
  return await res.json();
}
