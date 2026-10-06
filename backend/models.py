from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# ==================== UNDERSTAND ====================

class Persona(BaseModel):
    id: str = "persona-1"
    name: str = "Primary User"
    role: str = "Core User"
    avatar: str = "PU"
    painPoints: List[str] = Field(default_factory=list)
    goals: List[str] = Field(default_factory=list)
    quote: str = ""

class Feature(BaseModel):
    id: str = "feat-1"
    title: str = "Core Feature"
    description: str = ""
    category: str = "Core"
    priority: str = "MVP"
    complexity: str = "Medium"

class UserJourneyStep(BaseModel):
    step: int = 1
    stage: str = "Discovery"
    userAction: str = ""
    systemAction: str = ""
    touchpoint: str = "Mobile App"

class ClarificationOption(BaseModel):
    id: str = "opt-1"
    label: str = "Option"
    description: str = ""

class ClarificationQuestion(BaseModel):
    id: str = "clar-1"
    question: str = "Clarification"
    context: str = ""
    options: List[ClarificationOption] = Field(default_factory=list)
    selectedOptionId: Optional[str] = None

class UnderstandingSpec(BaseModel):
    appName: Optional[str] = "Custom App"
    problemStatement: str = ""
    solutionVision: str = ""
    targetAudience: List[Persona] = Field(default_factory=list)
    features: List[Feature] = Field(default_factory=list)
    userJourneys: List[UserJourneyStep] = Field(default_factory=list)
    clarifications: List[ClarificationQuestion] = Field(default_factory=list)
    missingRequirements: List[str] = Field(default_factory=list)

class UnderstandRequest(BaseModel):
    idea: str

# ==================== PLAN ====================

class AppScreen(BaseModel):
    id: str = "scr-1"
    name: str = "Home Screen"
    route: str = "/home"
    purpose: str = "Main application view"
    components: List[str] = Field(default_factory=list)

class SchemaColumn(BaseModel):
    name: str = "id"
    type: str = "UUID"
    isPrimary: Optional[bool] = False
    isForeign: Optional[bool] = False
    references: Optional[str] = None
    notes: Optional[str] = None

class SchemaTable(BaseModel):
    id: str = "tbl-1"
    tableName: str = "items"
    description: str = "Data table"
    columns: List[SchemaColumn] = Field(default_factory=list)

class ApiEndpoint(BaseModel):
    id: str = "api-1"
    method: str = "GET"
    path: str = "/api/v1/items"
    summary: str = "Fetch items"
    requestBody: Optional[str] = None
    responseBody: str = "{\n  \"data\": []\n}"
    status: int = 200

class TechStackItem(BaseModel):
    id: str = "ts-1"
    category: str = "Mobile Runtime"
    technology: str = "React Native + Expo SDK 52"
    version: str = "v52"
    tradeoffReasoning: str = "Native performance and cross-platform flexibility"

class ArchitectureNode(BaseModel):
    id: str = "arch-1"
    name: str = "Mobile Client"
    layer: str = "Client"
    description: str = "React Native mobile client"
    protocol: str = "HTTPS"

class PlanTask(BaseModel):
    id: str = "tsk-1"
    title: str = "Initial Setup"
    category: str = "Architecture"
    status: str = "completed"
    complexity: str = "Medium"

class PlanSpec(BaseModel):
    screens: List[AppScreen] = Field(default_factory=list)
    databaseSchema: List[SchemaTable] = Field(default_factory=list)
    apiEndpoints: List[ApiEndpoint] = Field(default_factory=list)
    techStack: List[TechStackItem] = Field(default_factory=list)
    architectureNodes: List[ArchitectureNode] = Field(default_factory=list)
    tasks: List[PlanTask] = Field(default_factory=list)

class PlanRequest(BaseModel):
    understanding: UnderstandingSpec
    clarifications: Optional[Dict[str, str]] = None

# ==================== BUILD ====================

class VirtualFile(BaseModel):
    id: str
    name: str
    path: str
    language: str
    content: str
    isModified: Optional[bool] = False

class BuildRequest(BaseModel):
    plan: PlanSpec
    appName: Optional[str] = None

class BuildResponse(BaseModel):
    files: List[VirtualFile] = Field(default_factory=list)

# ==================== MODIFY ====================

class ModifyRequest(BaseModel):
    files: List[VirtualFile]
    prompt: str
    projectSpec: Optional[Dict[str, Any]] = None
    activeSimulatorState: Optional[Dict[str, Any]] = None

class ModifyResponse(BaseModel):
    patchedFiles: List[VirtualFile] = Field(default_factory=list)
    summary: str = "Applied modification"
    affectedFiles: List[str] = Field(default_factory=list)
    simulatorDelta: Optional[Dict[str, Any]] = None

# ==================== EXPLAIN ====================

class ExplainRequest(BaseModel):
    snippet: str
    symbol: str
    level: str
    projectContext: Optional[Dict[str, Any]] = None
    userQuestion: Optional[str] = None
    filePath: Optional[str] = None

class ExplainResponse(BaseModel):
    explanation: str
    howItWorks: Optional[str] = None
    whyItExists: Optional[str] = None
    connections: Optional[str] = None
    architecturalRationale: Optional[str] = None
    possibleImprovements: Optional[List[str]] = None
    answerToDoubt: Optional[str] = None

# ==================== DEBUG ====================

class CodeIssue(BaseModel):
    id: str
    title: str
    severity: str  # critical | warning | info
    fileId: str
    filePath: str
    line: int
    snippet: str
    explanation: str
    rootCause: str
    suggestedFix: str
    diffBefore: str
    diffAfter: str
    isFixed: bool = False

class DebugRequest(BaseModel):
    files: List[VirtualFile]
    appName: Optional[str] = None

class DebugResponse(BaseModel):
    issues: List[CodeIssue] = Field(default_factory=list)

# ==================== LEARN ====================

class ConceptQuiz(BaseModel):
    id: str
    question: str
    codeSnippet: Optional[str] = None
    options: List[str]
    correctIndex: int
    explanation: str

class ConceptNode(BaseModel):
    id: str
    title: str
    category: str
    summary: str
    whyItMatters: str
    exampleSnippet: str
    mastered: bool = False
    quizzes: List[ConceptQuiz] = Field(default_factory=list)

class LearnRequest(BaseModel):
    understanding: UnderstandingSpec
    plan: Optional[PlanSpec] = None

class LearnResponse(BaseModel):
    concepts: List[ConceptNode] = Field(default_factory=list)
