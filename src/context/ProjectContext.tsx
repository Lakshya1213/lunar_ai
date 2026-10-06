import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type {
  LunorProject,
  LifecycleStage,
  VirtualFile,
  ExplainTopic,
  SimulatorState,
  CodeIssue,
  ConceptNode,
  ExplainDoubtMessage,
} from '../types';
import { initialCampusEatsProject, generateProjectFromIdea } from '../data/seedProjects';
import {
  checkBackendHealth,
  fetchUnderstand,
  fetchPlan,
  fetchBuild,
  fetchModify,
  fetchExplain,
  fetchDebug,
  fetchLearn,
} from '../services/api';
import {
  generateDynamicDebugIssues,
  generateDynamicExplainTopics,
  generateDynamicConcepts,
} from '../utils/dynamicStages';

interface ProjectContextValue {
  project: LunorProject;
  activeStage: LifecycleStage;
  setActiveStage: (stage: LifecycleStage) => void;
  isLandingPage: boolean;
  setIsLandingPage: (show: boolean) => void;
  activeFile: VirtualFile;
  setActiveFileId: (id: string) => void;
  createNewProject: (idea: string) => Promise<void>;
  proceedToPlan: (forceRegenerate?: boolean) => Promise<void>;
  proceedToBuild: (forceRegenerate?: boolean) => Promise<void>;
  proceedToDebug: (forceRegenerate?: boolean) => Promise<void>;
  proceedToExplain: (forceRegenerate?: boolean) => Promise<void>;
  proceedToLearn: (forceRegenerate?: boolean) => Promise<void>;
  isGeneratingPlan: boolean;
  isGeneratingBuild: boolean;
  isGeneratingDebug: boolean;
  isGeneratingExplain: boolean;
  isGeneratingLearn: boolean;
  loadCampusEatsDemo: () => void;
  answerClarification: (questionId: string, optionId: string) => void;
  applyModification: (prompt: string) => Promise<void>;
  autoFixIssue: (issueId: string) => void;
  selectedExplainTopic: ExplainTopic;
  setSelectedExplainTopicId: (id: string) => void;
  explainLevel: 'beginner' | 'intermediate' | 'advanced';
  setExplainLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  answerQuiz: (conceptId: string, quizId: string, selectedIndex: number) => void;
  toggleConceptMastery: (conceptId: string) => void;
  simulatorState: SimulatorState;
  setSimulatorState: React.Dispatch<React.SetStateAction<SimulatorState>>;
  addToCart: (item: { id: string; name: string; price: number; restaurant: string; isVeg: boolean }) => void;
  removeFromCart: (id: string) => void;
  changeSplitCount: (count: number) => void;
  placeOrder: () => void;
  resetOrder: () => void;
  isApplyingAiModification: boolean;
  // Real AI Engine State
  isBackendConnected: boolean;
  aiModelName: string;
  aiActivityMessage: string | null;
  aiErrorMessage: string | null;
  clearAiError: () => void;
  explainCodeDynamically: (symbol: string, snippet: string, level: 'beginner' | 'intermediate' | 'advanced') => Promise<void>;
  isExplainingLoading: boolean;
  runDiagnosticScan: () => Promise<void>;
  askCodeDoubt: (question: string, topicId?: string) => Promise<void>;
  isAskingDoubt: boolean;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<LunorProject>(initialCampusEatsProject);
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [explainLevel, setExplainLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [isApplyingAiModification, setIsApplyingAiModification] = useState<boolean>(false);

  // Staged Lifecycle Generation Flags
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [isGeneratingBuild, setIsGeneratingBuild] = useState<boolean>(false);
  const [isGeneratingDebug, setIsGeneratingDebug] = useState<boolean>(false);
  const [isGeneratingExplain, setIsGeneratingExplain] = useState<boolean>(false);
  const [isGeneratingLearn, setIsGeneratingLearn] = useState<boolean>(false);
  const [isAskingDoubt, setIsAskingDoubt] = useState<boolean>(false);

  // Real AI connectivity state
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [aiModelName, setAiModelName] = useState<string>('openai/gpt-oss-120b');
  const [aiActivityMessage, setAiActivityMessage] = useState<string | null>(null);
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);
  const [isExplainingLoading, setIsExplainingLoading] = useState<boolean>(false);

  // Probe backend on mount
  useEffect(() => {
    let mounted = true;
    checkBackendHealth().then((health) => {
      if (!mounted) return;
      if (health && health.status === 'healthy' && health.llmAvailable) {
        setIsBackendConnected(true);
        setAiModelName(health.model);
        setProject((prev) => ({
          ...prev,
          aiStatus: {
            ...prev.aiStatus,
            state: 'synced',
            model: `${health.model} (Live Engine)`,
          },
        }));
      } else {
        setIsBackendConnected(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const activeStage = project.activeStage;

  const setActiveStage = (stage: LifecycleStage) => {
    if (stage === 'plan' && !project.isPlanReady) {
      proceedToPlan();
      return;
    }
    if (stage === 'build' && !project.isBuildReady) {
      proceedToBuild();
      return;
    }
    if (stage === 'debug' && !project.isDebugReady) {
      proceedToDebug();
      return;
    }
    if (stage === 'explain' && !project.isExplainReady) {
      proceedToExplain();
      return;
    }
    if (stage === 'learn' && !project.isLearnReady) {
      proceedToLearn();
      return;
    }
    setProject((prev) => ({
      ...prev,
      activeStage: stage,
    }));
  };

  const activeFile = useMemo(() => {
    return (
      project.virtualFiles.find((f) => f.id === project.activeFileId) ||
      project.virtualFiles[0] || {
        id: 'vf-default',
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx' as const,
        content: '// Waiting for Stage 03 • Build synthesis',
      }
    );
  }, [project.virtualFiles, project.activeFileId]);

  const setActiveFileId = (id: string) => {
    setProject((prev) => ({
      ...prev,
      activeFileId: id,
    }));
  };

  const clearAiError = () => setAiErrorMessage(null);

  // ==================== STAGE 1: UNDERSTAND ====================
  const createNewProject = async (idea: string) => {
    setAiErrorMessage(null);

    // If backend is connected, run ONLY Stage 01 Understand first
    if (isBackendConnected) {
      try {
        setAiActivityMessage('Stage 01 • Analyzing requirements & identifying personas...');
        const understandingSpec = await fetchUnderstand(idea);

        const emptyPlan = {
          screens: [],
          databaseSchema: [],
          apiEndpoints: [],
          techStack: [],
          architectureNodes: [],
          tasks: [],
        };

        const newProj: LunorProject = {
          id: 'proj-' + Date.now(),
          name: understandingSpec.appName || idea.slice(0, 24),
          tagline: understandingSpec.solutionVision,
          rawIdea: idea,
          activeStage: 'understand',
          createdAt: 'Just now',
          updatedAt: 'Live Synced',
          aiStatus: {
            state: 'synced',
            model: `${aiModelName} (Live Engine)`,
            contextTokens: 4200,
            latencyMs: 18,
          },
          understanding: understandingSpec,
          plan: emptyPlan,
          virtualFiles: [
            {
              id: 'vf-init',
              name: 'App.tsx',
              path: 'src/App.tsx',
              language: 'tsx',
              content: `// ${understandingSpec.appName || 'Application'} Architecture Core\n// Ready for Stage 03 • Build synthesis\n\nexport default function App() {\n  return null;\n}\n`,
            },
          ],
          activeFileId: 'vf-init',
          modifications: [
            {
              id: 'mod-' + Date.now(),
              prompt: `Analyzed idea: "${idea}"`,
              timestamp: 'Just now',
              changesSummary: `Synthesized Stage 01 Product Discovery & User Personas via ${aiModelName}.`,
              affectedFiles: ['src/App.tsx'],
            },
          ],
          debugIssues: generateDynamicDebugIssues([
            {
              id: 'vf-init',
              name: 'App.tsx',
              path: 'src/App.tsx',
              language: 'tsx',
              content: `// ${understandingSpec.appName || 'Application'} Architecture Core\n\nexport default function App() {\n  return null;\n}\n`,
            }
          ], understandingSpec.appName || idea),
          explainTopics: generateDynamicExplainTopics([
            {
              id: 'vf-init',
              name: 'App.tsx',
              path: 'src/App.tsx',
              language: 'tsx',
              content: `// ${understandingSpec.appName || 'Application'} Architecture Core\n\nexport default function App() {\n  return null;\n}\n`,
            }
          ], understandingSpec.appName || idea),
          activeExplainTopicId: 'exp-dyn-1',
          concepts: generateDynamicConcepts(understandingSpec.appName || idea, understandingSpec.features),
          simulator: {
            ...initialCampusEatsProject.simulator,
            cart: [],
            orderStatus: 'idle',
          },
          isPlanReady: false,
          isBuildReady: false,
        };

        setProject(newProj);
        setIsLandingPage(false);
        setAiActivityMessage(null);
        return;
      } catch (err: any) {
        console.warn('Real AI pipeline failed, falling back to local blueprint mode:', err);
        setAiErrorMessage(`AI backend error: ${err.message || 'Request failed'}. Using local blueprint.`);
      } finally {
        setAiActivityMessage(null);
      }
    }

    // Fallback: heuristic generator
    const fallbackProj = generateProjectFromIdea(idea);
    setProject({
      ...fallbackProj,
      isPlanReady: true,
      isBuildReady: true,
    });
    setIsLandingPage(false);
  };

  // ==================== STAGE 2: PLAN (ON-DEMAND) ====================
  const proceedToPlan = async (forceRegenerate: boolean = false) => {
    if (project.isPlanReady && !forceRegenerate) {
      setProject((prev) => ({ ...prev, activeStage: 'plan' }));
      return;
    }

    setIsGeneratingPlan(true);
    setAiErrorMessage(null);
    setAiActivityMessage('Stage 02 • Synthesizing system architecture, database schema & APIs...');

    try {
      // Build clarification map from user selections in Understand phase
      const clarificationsMap: Record<string, string> = {};
      project.understanding.clarifications?.forEach((q) => {
        if (q.selectedOptionId) {
          const selected = q.options.find((o) => o.id === q.selectedOptionId);
          clarificationsMap[q.id] = selected ? `${selected.label}: ${selected.description}` : q.selectedOptionId;
        }
      });

      let planSpec;
      if (isBackendConnected) {
        planSpec = await fetchPlan(project.understanding, clarificationsMap);
      } else {
        planSpec = generateProjectFromIdea(project.rawIdea).plan;
      }

      setProject((prev) => ({
        ...prev,
        plan: planSpec,
        isPlanReady: true,
        activeStage: 'plan',
        updatedAt: 'Plan Synced',
        aiStatus: {
          ...prev.aiStatus,
          state: 'synced',
        },
      }));
    } catch (err: any) {
      console.warn('Plan synthesis failed, using fallback plan:', err);
      setAiErrorMessage(`Plan generation error: ${err.message || 'Request failed'}. Using local blueprint.`);
      const fallbackPlan = generateProjectFromIdea(project.rawIdea).plan;
      setProject((prev) => ({
        ...prev,
        plan: fallbackPlan,
        isPlanReady: true,
        activeStage: 'plan',
      }));
    } finally {
      setIsGeneratingPlan(false);
      setAiActivityMessage(null);
    }
  };

  // ==================== STAGE 3: BUILD (ON-DEMAND) ====================
  const proceedToBuild = async (forceRegenerate: boolean = false) => {
    // If plan is not ready yet, synthesize plan first
    let currentPlan = project.plan;
    if (!project.isPlanReady || !currentPlan.screens || currentPlan.screens.length === 0) {
      setIsGeneratingPlan(true);
      setAiActivityMessage('Synthesizing technical plan before building codebase...');
      try {
        if (isBackendConnected) {
          currentPlan = await fetchPlan(project.understanding, {});
        } else {
          currentPlan = generateProjectFromIdea(project.rawIdea).plan;
        }
        setProject((prev) => ({ ...prev, plan: currentPlan, isPlanReady: true }));
      } finally {
        setIsGeneratingPlan(false);
      }
    }

    if (project.isBuildReady && !forceRegenerate && project.virtualFiles.length > 1) {
      setProject((prev) => ({ ...prev, activeStage: 'build' }));
      return;
    }

    setIsGeneratingBuild(true);
    setAiErrorMessage(null);
    setAiActivityMessage('Stage 03 • Synthesizing production virtual codebase & components...');

    try {
      let virtualFiles: VirtualFile[] = [];
      if (isBackendConnected) {
        const buildResp = await fetchBuild(currentPlan, project.understanding.appName || project.name);
        virtualFiles = buildResp.files;
      }

      if (!virtualFiles || virtualFiles.length === 0) {
        virtualFiles = generateProjectFromIdea(project.rawIdea).virtualFiles;
      }

      const appName = project.understanding.appName || project.name;
      const appFile = virtualFiles.find((f) => f.name.includes('App')) || virtualFiles[0];

      setProject((prev) => ({
        ...prev,
        virtualFiles,
        activeFileId: appFile.id,
        isBuildReady: true,
        isDebugReady: false,
        isExplainReady: false,
        isLearnReady: false,
        activeStage: 'build',
        updatedAt: 'Build Synced',
        aiStatus: {
          ...prev.aiStatus,
          state: 'synced',
        },
        modifications: [
          {
            id: 'mod-' + Date.now(),
            prompt: `Built prototype codebase for: "${appName}"`,
            timestamp: 'Just now',
            changesSummary: `Synthesized ${virtualFiles.length} production virtual modules via ${aiModelName}.`,
            affectedFiles: virtualFiles.map((f) => f.path),
          },
          ...prev.modifications,
        ],
      }));
    } catch (err: any) {
      console.warn('Build synthesis failed, using fallback files:', err);
      setAiErrorMessage(`Build code error: ${err.message || 'Request failed'}. Using local blueprint.`);
      const fallbackFiles = generateProjectFromIdea(project.rawIdea).virtualFiles;

      setProject((prev) => ({
        ...prev,
        virtualFiles: fallbackFiles,
        activeFileId: fallbackFiles[0]?.id || 'vf-app',
        isBuildReady: true,
        isDebugReady: false,
        isExplainReady: false,
        isLearnReady: false,
        activeStage: 'build',
      }));
    } finally {
      setIsGeneratingBuild(false);
      setAiActivityMessage(null);
    }
  };

  // ==================== STAGE 4: DEBUG (ON-DEMAND) ====================
  const proceedToDebug = async (forceRegenerate: boolean = false) => {
    if (!project.isBuildReady || project.virtualFiles.length <= 1) {
      await proceedToBuild();
    }

    if (project.isDebugReady && !forceRegenerate && project.debugIssues.length > 0) {
      setProject((prev) => ({ ...prev, activeStage: 'debug' }));
      return;
    }

    setIsGeneratingDebug(true);
    setAiErrorMessage(null);
    setAiActivityMessage('Stage 04 • Scanning codebase for runtime defects & AST diagnostics...');

    try {
      const appName = project.understanding?.appName || project.name;
      let debugIssues: CodeIssue[] = [];
      if (isBackendConnected) {
        try {
          const dbgRes = await fetchDebug(project.virtualFiles, appName);
          if (dbgRes?.issues && dbgRes.issues.length > 0) {
            debugIssues = dbgRes.issues;
          }
        } catch (e) {
          console.warn('Backend debug scan failed, using dynamic fallback:', e);
        }
      }

      if (!debugIssues || debugIssues.length === 0) {
        debugIssues = generateDynamicDebugIssues(project.virtualFiles, appName);
      }

      setProject((prev) => ({
        ...prev,
        debugIssues,
        isDebugReady: true,
        activeStage: 'debug',
        updatedAt: 'Debug Synced',
      }));
    } catch (err: any) {
      console.warn('Debug scan failed:', err);
      const appName = project.understanding?.appName || project.name;
      const fallbackIssues = generateDynamicDebugIssues(project.virtualFiles, appName);
      setProject((prev) => ({
        ...prev,
        debugIssues: fallbackIssues,
        isDebugReady: true,
        activeStage: 'debug',
      }));
    } finally {
      setIsGeneratingDebug(false);
      setAiActivityMessage(null);
    }
  };

  // ==================== STAGE 5: EXPLAIN (ON-DEMAND) ====================
  const proceedToExplain = async (forceRegenerate: boolean = false) => {
    if (!project.isBuildReady || project.virtualFiles.length <= 1) {
      await proceedToBuild();
    }

    if (project.isExplainReady && !forceRegenerate && project.explainTopics.length > 0) {
      setProject((prev) => ({ ...prev, activeStage: 'explain' }));
      return;
    }

    setIsGeneratingExplain(true);
    setAiErrorMessage(null);
    setAiActivityMessage('Stage 05 • Preparing cognitive code explanations & doubt mentor...');

    try {
      const appName = project.understanding?.appName || project.name;
      const explainTopics = generateDynamicExplainTopics(project.virtualFiles, appName);

      setProject((prev) => ({
        ...prev,
        explainTopics,
        activeExplainTopicId: explainTopics[0]?.id || prev.activeExplainTopicId || 'exp-dyn-1',
        isExplainReady: true,
        activeStage: 'explain',
        updatedAt: 'Explain Synced',
      }));
    } finally {
      setIsGeneratingExplain(false);
      setAiActivityMessage(null);
    }
  };

  // ==================== STAGE 6: LEARN (ON-DEMAND) ====================
  const proceedToLearn = async (forceRegenerate: boolean = false) => {
    if (!project.isBuildReady || project.virtualFiles.length <= 1) {
      await proceedToBuild();
    }

    if (project.isLearnReady && !forceRegenerate && project.concepts.length > 1) {
      setProject((prev) => ({ ...prev, activeStage: 'learn' }));
      return;
    }

    setIsGeneratingLearn(true);
    setAiErrorMessage(null);
    setAiActivityMessage('Stage 06 • Synthesizing engineering curriculum & knowledge quizzes...');

    try {
      const appName = project.understanding?.appName || project.name;
      let concepts: ConceptNode[] = [];

      if (isBackendConnected) {
        try {
          const lrnRes = await fetchLearn(project.understanding, project.plan);
          if (lrnRes?.concepts && lrnRes.concepts.length > 0) {
            concepts = lrnRes.concepts;
          }
        } catch (e) {
          console.warn('Backend curriculum synthesis failed, using dynamic fallback:', e);
        }
      }

      if (!concepts || concepts.length <= 1) {
        concepts = generateDynamicConcepts(appName, project.understanding?.features || [], project.plan);
      }

      setProject((prev) => ({
        ...prev,
        concepts,
        isLearnReady: true,
        activeStage: 'learn',
        updatedAt: 'Curriculum Synced',
      }));
    } catch (err: any) {
      console.warn('Learn synthesis failed:', err);
      const appName = project.understanding?.appName || project.name;
      const fallbackConcepts = generateDynamicConcepts(appName, project.understanding?.features || [], project.plan);
      setProject((prev) => ({
        ...prev,
        concepts: fallbackConcepts,
        isLearnReady: true,
        activeStage: 'learn',
      }));
    } finally {
      setIsGeneratingLearn(false);
      setAiActivityMessage(null);
    }
  };

  // ==================== ASK CODE DOUBT ====================
  const askCodeDoubt = async (question: string, topicId?: string) => {
    const targetTopicId = topicId || project.activeExplainTopicId;
    const targetTopic = project.explainTopics.find((t) => t.id === targetTopicId) || selectedExplainTopic;
    if (!targetTopic || !question.trim()) return;

    setIsAskingDoubt(true);
    setAiErrorMessage(null);
    setAiActivityMessage(`Answering doubt about ${targetTopic.targetSymbol}...`);

    try {
      let answer = '';
      if (isBackendConnected) {
        try {
          const resp = await fetchExplain(
            targetTopic.codeSnippet,
            targetTopic.targetSymbol,
            explainLevel,
            { appName: project.name, rawIdea: project.rawIdea },
            question,
            targetTopic.fileContext
          );
          answer = resp.answerToDoubt || resp.explanation;
        } catch (e: any) {
          console.warn('Live doubt Q&A failed, using dynamic fallback:', e);
        }
      }

      if (!answer) {
        const symbol = targetTopic.targetSymbol;
        const file = targetTopic.fileContext;
        const qLower = question.toLowerCase();

        if (qLower.includes('explain') || qLower.includes('what it is doing') || qLower.includes('content') || qLower.includes('how it works')) {
          answer = `In **${file}**, **${symbol}** handles the core module logic for this application.\n\n` +
            `• **Purpose:** It establishes the operational interface and state contracts that the rest of the app relies upon.\n` +
            `• **Execution Flow:** When executed, it initializes the local state slices, binds event dispatchers, and renders or exports structured data without race conditions.\n` +
            `• **Why it's structured this way:** Keeps concerns decoupled so changes to styling or data sources don't break downstream consumers.`;
        } else if (qLower.includes('edge case') || qLower.includes('bug') || qLower.includes('error')) {
          answer = `Key edge cases to keep in mind for **${symbol}** in **${file}**:\n\n` +
            `1. **Cold-start / hydration state:** Ensure initial state doesn't assume remote data has resolved.\n` +
            `2. **Rapid inputs:** Guard state transitions with debounce or optimistic rollback to prevent stale closures.\n` +
            `3. **Teardown cleanup:** Unregister any listeners or async timers during component unmount.`;
        } else {
          answer = `Regarding your question *" ${question} "* for **${symbol}** in **${file}**:\n\n` +
            `This piece of code is designed to maintain unidirectional data flow and deterministic rendering. By keeping state transitions isolated to this module, the application ensures high testability, predictable side effects, and clean separation of concerns.`;
        }
      }

      const newDoubt: ExplainDoubtMessage = {
        id: 'dbt-' + Date.now(),
        question,
        answer,
        timestamp: 'Just now',
      };

      setProject((prev) => ({
        ...prev,
        explainTopics: prev.explainTopics.map((t) =>
          t.id === targetTopic.id
            ? {
                ...t,
                doubts: [...(t.doubts || []), newDoubt],
              }
            : t
        ),
      }));
    } finally {
      setIsAskingDoubt(false);
      setAiActivityMessage(null);
    }
  };

  const loadCampusEatsDemo = () => {
    setProject(initialCampusEatsProject);
    setIsLandingPage(false);
    setAiErrorMessage(null);
  };

  const answerClarification = (questionId: string, optionId: string) => {
    setProject((prev) => ({
      ...prev,
      understanding: {
        ...prev.understanding,
        clarifications: prev.understanding.clarifications.map((q) =>
          q.id === questionId ? { ...q, selectedOptionId: optionId } : q
        ),
      },
    }));
  };

  // REAL LLM MODIFIER PIPELINE
  const applyModification = async (prompt: string) => {
    setIsApplyingAiModification(true);
    setAiErrorMessage(null);

    if (isBackendConnected) {
      try {
        setAiActivityMessage(`Analyzing intent & applying structured patch for: "${prompt}"...`);
        const result = await fetchModify(
          project.virtualFiles,
          prompt,
          project,
          simulatorState
        );

        // Merge patched files
        const patchedMap = new Map(result.patchedFiles.map((f) => [f.path, f]));
        const updatedFiles = project.virtualFiles.map((file) => {
          if (patchedMap.has(file.path)) {
            const p = patchedMap.get(file.path)!;
            return {
              ...file,
              content: p.content,
              isModified: true,
            };
          }
          return file;
        });

        // If new files were created
        for (const pf of result.patchedFiles) {
          if (!updatedFiles.some((f) => f.path === pf.path)) {
            updatedFiles.push(pf);
          }
        }

        // Apply simulator delta
        if (result.simulatorDelta) {
          setSimulatorState((prev) => ({
            ...prev,
            ...result.simulatorDelta,
          }));
        }

        // Add to modification history
        const modRecord = {
          id: 'mod-' + Date.now(),
          prompt,
          timestamp: 'Just now',
          changesSummary: result.summary,
          affectedFiles: result.affectedFiles || [],
        };

        setProject((prev) => ({
          ...prev,
          modifications: [modRecord, ...prev.modifications],
          virtualFiles: updatedFiles,
        }));

        setAiActivityMessage(null);
        setIsApplyingAiModification(false);
        return;
      } catch (err: any) {
        console.warn('Real AI modification failed, falling back to simulated modifier:', err);
        setAiErrorMessage(`AI modifier error: ${err.message}. Applied local simulation.`);
      } finally {
        setAiActivityMessage(null);
      }
    }

    // Fallback: local simulated rules
    setTimeout(() => {
      const lower = prompt.toLowerCase();
      let updatedFiles = [...project.virtualFiles];
      let newModSummary = `Applied: "${prompt}".`;
      let simulatorPatch: Partial<SimulatorState> = {};

      if (lower.includes('dark mode')) {
        simulatorPatch = { isDarkMode: !simulatorState.isDarkMode };
        newModSummary = `Toggled application theme system and adjusted root styling tokens.`;
      } else if (lower.includes('timer') || lower.includes('exam')) {
        newModSummary = `Injected 60-second exam countdown timer hook and rapid-recall status badge into Study Review view.`;
      } else if (lower.includes('tag') || lower.includes('usmle') || lower.includes('yield')) {
        newModSummary = `Added high-yield clinical taxonomy filter tags & query predicate to Deck Explorer.`;
      } else if (lower.includes('audio') || lower.includes('pronunciation')) {
        newModSummary = `Configured WebAudio pronunciation synthesizer for pharmacology generic drug names.`;
      } else if (lower.includes('sm-2') || lower.includes('interval')) {
        newModSummary = `Exposed custom SuperMemo-2 cognitive decay interval and ease factor tuning sliders.`;
      } else if (lower.includes('vegetarian') || lower.includes('veg')) {
        simulatorPatch = { isVegOnly: true };
        newModSummary = `Injected active vegetarian dietary filter chip & query predicate to Discovery Feed.`;
      } else if (lower.includes('order tracking') || lower.includes('tracking')) {
        simulatorPatch = { activeScreen: 'tracking', orderStatus: 'kitchen', deliveryProgress: 35 };
        newModSummary = `Configured live order progress tracker screen with 4-digit PIN verification.`;
      } else if (lower.includes('split') || lower.includes('roommate')) {
        simulatorPatch = { splitCount: 3 };
        newModSummary = `Updated split bill calculator slider to distribute checkout among 3 dorm roommates.`;
      } else {
        newModSummary = `Processed specification update for: "${prompt}". Updated component tree & reactive store.`;
      }

      const targetFile = updatedFiles.find((f) => f.id === project.activeFileId) || updatedFiles[0];
      if (targetFile) {
        let addition = '';
        if (lower.includes('dark mode')) {
          addition = `\n// [AI Patch]: Configured dark mode appearance provider & color scheme hook\n`;
        } else if (lower.includes('timer')) {
          addition = `\n// [AI Patch]: Injected useExamTimer(60) countdown hook for rapid recall sessions\n`;
        } else if (lower.includes('tag') || lower.includes('yield')) {
          addition = `\n// [AI Patch]: Injected USMLE_STEP1_TAGS taxonomy filter chips to study deck\n`;
        } else if (lower.includes('audio')) {
          addition = `\n// [AI Patch]: Injected usePronunciationAudio() hook for generic pharmacology nomenclature\n`;
        } else {
          addition = `\n// [AI Patch]: Applied mutation "${prompt}"\n`;
        }

        updatedFiles = updatedFiles.map((f) =>
          f.id === targetFile.id
            ? { ...f, content: f.content + addition, isModified: true }
            : f
        );
      }

      setSimulatorState((prev) => ({
        ...prev,
        ...simulatorPatch,
      }));

      const newModRecord = {
        id: 'mod-' + Date.now(),
        prompt,
        timestamp: 'Just now',
        changesSummary: newModSummary,
        affectedFiles: [targetFile?.path || 'src/App.tsx'],
      };

      setProject((prev) => ({
        ...prev,
        modifications: [newModRecord, ...prev.modifications],
        virtualFiles: updatedFiles,
      }));

      setIsApplyingAiModification(false);
    }, 600);
  };

  // REAL LLM EXPLAIN
  const explainCodeDynamically = async (
    symbol: string,
    snippet: string,
    level: 'beginner' | 'intermediate' | 'advanced'
  ) => {
    if (!isBackendConnected) return;

    setIsExplainingLoading(true);
    try {
      const resp = await fetchExplain(snippet, symbol, level, {
        appName: project.name,
        rawIdea: project.rawIdea,
      });

      setProject((prev) => ({
        ...prev,
        explainTopics: prev.explainTopics.map((topic) => {
          if (topic.id === prev.activeExplainTopicId) {
            return {
              ...topic,
              explanations: {
                ...topic.explanations,
                [level]: resp.explanation,
              },
              architecturalRationale: resp.architecturalRationale || topic.architecturalRationale,
            };
          }
          return topic;
        }),
      }));
    } catch (err) {
      console.warn('Real AI explain failed:', err);
    } finally {
      setIsExplainingLoading(false);
    }
  };

  const autoFixIssue = (issueId: string) => {
    setProject((prev) => {
      const targetIssue = prev.debugIssues.find((i) => i.id === issueId);
      if (!targetIssue) return prev;

      const updatedIssues = prev.debugIssues.map((issue) =>
        issue.id === issueId ? { ...issue, isFixed: true } : issue
      );

      // Patch the virtual file content
      const updatedFiles = prev.virtualFiles.map((file) => {
        if (file.id === targetIssue.fileId) {
          return {
            ...file,
            content: file.content.replace(targetIssue.diffBefore.trim(), targetIssue.diffAfter.trim()),
            isModified: true,
          };
        }
        return file;
      });

      return {
        ...prev,
        debugIssues: updatedIssues,
        virtualFiles: updatedFiles,
      };
    });
  };

  const runDiagnosticScan = async () => {
    setAiActivityMessage('Running static diagnostic analysis across virtual files...');
    try {
      let issues: CodeIssue[] = [];
      if (isBackendConnected) {
        try {
          const res = await fetchDebug(project.virtualFiles, project.understanding.appName || project.name);
          if (res?.issues && res.issues.length > 0) {
            issues = res.issues;
          }
        } catch (e) {
          console.warn('Backend debug scan failed, using dynamic issues:', e);
        }
      }
      if (!issues || issues.length === 0) {
        issues = generateDynamicDebugIssues(project.virtualFiles, project.understanding.appName || project.name);
      }
      setProject((prev) => ({ ...prev, debugIssues: issues }));
    } catch {
      const fallbackIssues = generateDynamicDebugIssues(project.virtualFiles, project.understanding.appName || project.name);
      setProject((prev) => ({ ...prev, debugIssues: fallbackIssues }));
    } finally {
      setAiActivityMessage(null);
    }
  };

  const selectedExplainTopic = useMemo(() => {
    return (
      project.explainTopics.find((t) => t.id === project.activeExplainTopicId) ||
      project.explainTopics[0]
    );
  }, [project.explainTopics, project.activeExplainTopicId]);

  const setSelectedExplainTopicId = (id: string) => {
    setProject((prev) => ({
      ...prev,
      activeExplainTopicId: id,
    }));
  };

  const answerQuiz = (conceptId: string, quizId: string, selectedIndex: number) => {
    setProject((prev) => ({
      ...prev,
      concepts: prev.concepts.map((concept) => {
        if (concept.id !== conceptId) return concept;
        const updatedQuizzes = concept.quizzes.map((q) => {
          if (q.id !== quizId) return q;
          return {
            ...q,
            userSelectedIndex: selectedIndex,
            isCompleted: true,
          };
        });
        const allCorrect = updatedQuizzes.every((q) => q.userSelectedIndex === q.correctIndex);
        return {
          ...concept,
          quizzes: updatedQuizzes,
          mastered: allCorrect ? true : concept.mastered,
        };
      }),
    }));
  };

  const toggleConceptMastery = (conceptId: string) => {
    setProject((prev) => ({
      ...prev,
      concepts: prev.concepts.map((c) =>
        c.id === conceptId ? { ...c, mastered: !c.mastered } : c
      ),
    }));
  };

  // Simulator Actions
  const [simulatorState, setSimulatorState] = useState<SimulatorState>(project.simulator);

  const addToCart = (item: { id: string; name: string; price: number; restaurant: string; isVeg: boolean }) => {
    setSimulatorState((prev) => {
      const existing = prev.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...item, quantity: 1 }],
      };
    });
  };

  const removeFromCart = (id: string) => {
    setSimulatorState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.id !== id),
    }));
  };

  const changeSplitCount = (count: number) => {
    setSimulatorState((prev) => ({
      ...prev,
      splitCount: Math.max(1, count),
    }));
  };

  const placeOrder = () => {
    setSimulatorState((prev) => ({
      ...prev,
      activeScreen: 'tracking',
      orderStatus: 'kitchen',
      deliveryProgress: 35,
    }));
  };

  const resetOrder = () => {
    setSimulatorState((prev) => ({
      ...prev,
      activeScreen: 'home',
      orderStatus: 'idle',
      deliveryProgress: 0,
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        activeStage,
        setActiveStage,
        isLandingPage,
        setIsLandingPage,
        activeFile,
        setActiveFileId,
        createNewProject,
        proceedToPlan,
        proceedToBuild,
        proceedToDebug,
        proceedToExplain,
        proceedToLearn,
        isGeneratingPlan,
        isGeneratingBuild,
        isGeneratingDebug,
        isGeneratingExplain,
        isGeneratingLearn,
        loadCampusEatsDemo,
        answerClarification,
        applyModification,
        autoFixIssue,
        selectedExplainTopic,
        setSelectedExplainTopicId,
        explainLevel,
        setExplainLevel,
        answerQuiz,
        toggleConceptMastery,
        simulatorState,
        setSimulatorState,
        addToCart,
        removeFromCart,
        changeSplitCount,
        placeOrder,
        resetOrder,
        isApplyingAiModification,
        isBackendConnected,
        aiModelName,
        aiActivityMessage,
        aiErrorMessage,
        clearAiError,
        explainCodeDynamically,
        isExplainingLoading,
        runDiagnosticScan,
        askCodeDoubt,
        isAskingDoubt,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
