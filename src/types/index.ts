export type LifecycleStage = 
  | 'understand' 
  | 'plan' 
  | 'build' 
  | 'debug' 
  | 'explain' 
  | 'learn';

export interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  painPoints: string[];
  goals: string[];
  quote: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: 'Core' | 'Student Experience' | 'Campus Logistics' | 'Fintech';
  priority: 'MVP' | 'V2' | 'Future';
  complexity: 'Low' | 'Medium' | 'High';
}

export interface UserJourneyStep {
  step: number;
  stage: string;
  userAction: string;
  systemAction: string;
  touchpoint: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  context: string;
  options: {
    id: string;
    label: string;
    description: string;
  }[];
  selectedOptionId?: string;
  customAnswer?: string;
}

export interface UnderstandingSpec {
  appName?: string;
  problemStatement: string;
  solutionVision: string;
  targetAudience: Persona[];
  features: Feature[];
  userJourneys: UserJourneyStep[];
  clarifications: ClarificationQuestion[];
  missingRequirements: string[];
}

export interface AppScreen {
  id: string;
  name: string;
  route: string;
  purpose: string;
  components: string[];
}

export interface SchemaColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  references?: string;
  notes?: string;
}

export interface SchemaTable {
  id: string;
  tableName: string;
  description: string;
  columns: SchemaColumn[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  requestBody?: string;
  responseBody: string;
  status: number;
}

export interface TechStackItem {
  id: string;
  category: 'Frontend' | 'Mobile Runtime' | 'Styling' | 'Backend API' | 'Database' | 'State Management';
  technology: string;
  version: string;
  tradeoffReasoning: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  layer: 'Client' | 'API Gateway' | 'Microservices' | 'Persistence';
  description: string;
  protocol: string;
}

export interface PlanTask {
  id: string;
  title: string;
  category: 'Architecture' | 'Frontend' | 'Backend' | 'Data';
  status: 'planned' | 'in-progress' | 'completed';
  complexity: 'Low' | 'Medium' | 'High';
}

export interface PlanSpec {
  screens: AppScreen[];
  databaseSchema: SchemaTable[];
  apiEndpoints: ApiEndpoint[];
  techStack: TechStackItem[];
  architectureNodes: ArchitectureNode[];
  tasks: PlanTask[];
}

export interface VirtualFile {
  id: string;
  name: string;
  path: string;
  language: 'typescript' | 'tsx' | 'json' | 'sql' | 'css';
  content: string;
  isModified?: boolean;
}

export interface ModificationRecord {
  id: string;
  prompt: string;
  timestamp: string;
  changesSummary: string;
  affectedFiles: string[];
}

export interface CodeIssue {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  fileId: string;
  filePath: string;
  line: number;
  snippet: string;
  explanation: string;
  rootCause: string;
  suggestedFix: string;
  diffBefore: string;
  diffAfter: string;
  isFixed: boolean;
}

export interface ExplainDoubtMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export interface ExplainTopic {
  id: string;
  title: string;
  targetSymbol: string;
  fileContext: string;
  codeSnippet: string;
  explanations: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  architecturalRationale: string;
  tradeoffsConsidered: string[];
  doubts?: ExplainDoubtMessage[];
}

export interface ConceptQuiz {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  userSelectedIndex?: number;
  isCompleted?: boolean;
}

export interface ConceptNode {
  id: string;
  title: string;
  category: 'Architecture' | 'State & Reactivity' | 'Data Modeling' | 'Performance' | 'Mobile UX';
  summary: string;
  whyItMatters: string;
  exampleSnippet: string;
  mastered: boolean;
  quizzes: ConceptQuiz[];
}

export interface SimulatorCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  isVeg: boolean;
}

export interface SimulatorState {
  activeScreen: 'home' | 'restaurant' | 'cart' | 'tracking';
  selectedCategory: string;
  searchQuery: string;
  isVegOnly: boolean;
  isDarkMode: boolean;
  cart: SimulatorCartItem[];
  orderStatus: 'idle' | 'placed' | 'kitchen' | 'delivery_partner' | 'delivered';
  deliveryProgress: number; // 0 to 100
  splitCount: number;
  selectedRestaurantId?: string;
  customFeatureBadge?: string;
  activeFilters?: string[];
}

export interface LunorProject {
  id: string;
  name: string;
  tagline: string;
  rawIdea: string;
  activeStage: LifecycleStage;
  createdAt: string;
  updatedAt: string;
  aiStatus: {
    state: 'synced' | 'indexing' | 'generating' | 'fixing';
    model: string;
    contextTokens: number;
    latencyMs: number;
  };
  understanding: UnderstandingSpec;
  plan: PlanSpec;
  virtualFiles: VirtualFile[];
  activeFileId: string;
  modifications: ModificationRecord[];
  debugIssues: CodeIssue[];
  explainTopics: ExplainTopic[];
  activeExplainTopicId: string;
  concepts: ConceptNode[];
  simulator: SimulatorState;
  isPlanReady?: boolean;
  isBuildReady?: boolean;
  isDebugReady?: boolean;
  isExplainReady?: boolean;
  isLearnReady?: boolean;
}
