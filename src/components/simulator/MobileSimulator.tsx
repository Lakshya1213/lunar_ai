import { useState, useMemo, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { MOCK_RESTAURANTS, CAMPUS_CATEGORIES } from '../../data/mockSimulatorData';
import { 
  Wifi, 
  Battery, 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Moon, 
  Sun,
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Brain,
  CheckCircle2,
  FileText,
  Flame,
  Compass,
  BookOpen,
  BarChart3,
  Layers,
  Star,
  Download,
  Volume2,
  Play,
  Pause,
  Check
} from 'lucide-react';

const SAMPLE_FLASHCARDS = [
  {
    id: 'fc-1',
    subject: 'Cardiovascular Pathology',
    question: 'What is the hallmark histological finding in acute myocardial infarction after 24–48 hours?',
    answer: 'Coagulative necrosis, wavy contraction bands, and extensive neutrophilic infiltration with loss of myocyte nuclei.',
    highYieldTip: 'USMLE Step 1 • High Yield Pathology',
    interval: '3 days',
  },
  {
    id: 'fc-2',
    subject: 'Autonomic Pharmacology',
    question: 'What is the primary mechanism of action and clinical utility of Phentolamine?',
    answer: 'Non-selective reversible alpha-1 and alpha-2 adrenergic receptor antagonist; used in hypertensive crises due to pheochromocytoma and extravasation of alpha-agonists.',
    highYieldTip: 'First Aid Pharmacology • Key Antagonist',
    interval: '1 day',
  },
  {
    id: 'fc-3',
    subject: 'Neuroanatomy',
    question: 'Occlusion of the Posterior Inferior Cerebellar Artery (PICA) causes which classic brainstem syndrome?',
    answer: 'Lateral Medullary (Wallenberg) Syndrome: loss of pain/temperature over ipsilateral face & contralateral body, dysphagia, hoarseness, Horner syndrome, and ataxia.',
    highYieldTip: 'Vascular Neuroanatomy • Rapid Recall',
    interval: '4 days',
  },
  {
    id: 'fc-4',
    subject: 'Renal Physiology',
    question: 'Where along the nephron does furosemide exert its diuretic effect and what transporter is inhibited?',
    answer: 'Thick ascending limb of Henle by inhibiting the Na+/K+/2Cl- cotransporter; abolishes hypertonicity of the renal medulla.',
    highYieldTip: 'Renal Pharmacology • Electrolyte Transport',
    interval: '7 days',
  },
];

function DynamicProjectPreview({ project, isDarkMode }: { project: any; isDarkMode: boolean }) {
  const screens = project.plan?.screens || [];
  const [activeScreenId, setActiveScreenId] = useState<string>(screens[0]?.id || 'scr-1');

  // Interactive study / card flip state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(12);
  const [streakDays] = useState(14);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Universal dynamic list and interactive state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newEntryText, setNewEntryText] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['ent-1']));
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Audio synthesizer state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Timer interval effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const currentScreen = screens.find((s: any) => s.id === activeScreenId) || screens[0] || {
    id: 'scr-1',
    name: 'Overview',
    route: '/home',
    purpose: 'Core application experience',
    components: ['Header', 'ActionCard', 'ListFeed']
  };

  // Inspect project modifications to detect dynamic features
  const modifications = project.modifications || [];
  const hasTimer = modifications.some((m: any) => m.prompt?.toLowerCase().includes('timer') || m.prompt?.toLowerCase().includes('countdown') || m.prompt?.toLowerCase().includes('exam')) || project.simulator?.customFeatureBadge?.toLowerCase().includes('timer');
  const hasTags = modifications.some((m: any) => m.prompt?.toLowerCase().includes('tag') || m.prompt?.toLowerCase().includes('filter') || m.prompt?.toLowerCase().includes('usmle') || m.prompt?.toLowerCase().includes('yield'));
  const hasAudio = modifications.some((m: any) => m.prompt?.toLowerCase().includes('audio') || m.prompt?.toLowerCase().includes('voice') || m.prompt?.toLowerCase().includes('pronunciation')) || project.simulator?.customFeatureBadge?.toLowerCase().includes('audio');
  const hasExport = modifications.some((m: any) => m.prompt?.toLowerCase().includes('export') || m.prompt?.toLowerCase().includes('csv') || m.prompt?.toLowerCase().includes('pdf')) || project.simulator?.customFeatureBadge?.toLowerCase().includes('export');

  // Screen categorization heuristics
  const screenNameLower = (currentScreen.name || '').toLowerCase();
  const screenRouteLower = (currentScreen.route || '').toLowerCase();

  const isStudyScreen = 
    screenNameLower.includes('review') || 
    screenNameLower.includes('study') || 
    screenNameLower.includes('flashcard') ||
    screenRouteLower.includes('review') ||
    screenRouteLower.includes('study');

  const isOnboardingScreen = 
    screenNameLower.includes('onboard') || 
    screenNameLower.includes('welcome') || 
    screenNameLower.includes('import') ||
    screenRouteLower.includes('onboard') ||
    screenRouteLower.includes('import');

  const isDashboardScreen = 
    screenNameLower.includes('dashboard') || 
    screenNameLower.includes('analytics') || 
    screenNameLower.includes('progress') ||
    screenRouteLower.includes('dashboard') ||
    screenRouteLower.includes('analytics');

  // Dynamic entities generated from project features & database schema
  const [customItems, setCustomItems] = useState<Array<{ id: string; title: string; category: string; description: string; count?: number; status?: string }>>([
    {
      id: 'ent-1',
      title: project.understanding?.features?.[0]?.title || 'Primary Entity Stream',
      category: project.understanding?.features?.[0]?.category || 'Core',
      description: project.understanding?.features?.[0]?.description?.slice(0, 75) || 'Synchronized live record with state management.',
      count: 24,
      status: 'Synced'
    },
    {
      id: 'ent-2',
      title: project.understanding?.features?.[1]?.title || 'Data Analytics Engine',
      category: project.understanding?.features?.[1]?.category || 'Experience',
      description: project.understanding?.features?.[1]?.description?.slice(0, 75) || 'Asynchronous event pipeline active.',
      count: 18,
      status: 'Active'
    },
    {
      id: 'ent-3',
      title: project.understanding?.features?.[2]?.title || 'Workflow Pipeline',
      category: project.understanding?.features?.[2]?.category || 'Data',
      description: project.understanding?.features?.[2]?.description?.slice(0, 75) || 'Optimistic UI update verified.',
      count: 32,
      status: 'Verified'
    }
  ]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntryText.trim()) return;
    const newItem = {
      id: 'ent-' + Date.now(),
      title: newEntryText.trim(),
      category: selectedCategory === 'All' ? 'Custom' : selectedCategory,
      description: `Added to ${currentScreen.name} during live session.`,
      count: Math.floor(Math.random() * 20) + 1,
      status: 'New'
    };
    setCustomItems((prev) => [newItem, ...prev]);
    setNewEntryText('');
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSimulateExport = () => {
    setExportNotice('Exported to CSV / Download ready!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleSimulateAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  const handleSimulateUpload = () => {
    if (uploadStatus === 'uploading') return;
    setUploadStatus('uploading');
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(70), 400);
    setTimeout(() => {
      setUploadProgress(100);
      setUploadStatus('completed');
    }, 850);
  };

  const handleRateCard = (_confidence: string) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % SAMPLE_FLASHCARDS.length);
      setReviewedCount((prev) => prev + 1);
    }, 150);
  };

  const currentCard = SAMPLE_FLASHCARDS[cardIndex % SAMPLE_FLASHCARDS.length];

  const filteredItems = customItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', ...Array.from(new Set(customItems.map((i) => i.category)))];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Top Brand Bar */}
      <div className={`px-4 py-2 border-b flex items-center justify-between shrink-0 ${
        isDarkMode ? 'border-zinc-800/80 bg-zinc-950/80' : 'border-zinc-200 bg-zinc-50/80'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
            {isStudyScreen ? <Brain className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-tight leading-tight">
              {project.understanding?.appName || project.name}
            </h3>
            <span className="text-[9px] text-zinc-500 font-mono block leading-none">
              {currentScreen.route || '/active'}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live v1.0
        </span>
      </div>

      {/* Screen Segmented Switcher Pills */}
      {screens.length > 0 && (
        <div className={`px-3 py-1.5 border-b overflow-x-auto no-scrollbar flex items-center gap-1 shrink-0 ${
          isDarkMode ? 'border-zinc-800/60 bg-zinc-900/30' : 'border-zinc-200 bg-zinc-100/50'
        }`}>
          {screens.map((screen: any) => {
            const isActive = screen.id === activeScreenId;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveScreenId(screen.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? isDarkMode
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                    : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-200'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {screen.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Live Active Mutation Badges Banner */}
      {(project.simulator?.customFeatureBadge || hasTimer || hasTags || hasAudio || hasExport) && (
        <div className={`px-3 py-1.5 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
          isDarkMode ? 'bg-zinc-950/60 border-zinc-800/40' : 'bg-zinc-100/60 border-zinc-200/60'
        }`}>
          {project.simulator?.customFeatureBadge && (
            <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[9px] font-mono flex items-center gap-1 animate-pulse shrink-0">
              ✨ {project.simulator.customFeatureBadge}
            </span>
          )}
          {hasTimer && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[9px] font-mono flex items-center gap-1 shrink-0">
              ⏱️ Exam Timer Active
            </span>
          )}
          {hasTags && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono flex items-center gap-1 shrink-0">
              🏷️ Filter Tags Active
            </span>
          )}
          {hasAudio && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[9px] font-mono flex items-center gap-1 shrink-0">
              🔊 WebAudio Active
            </span>
          )}
          {hasExport && (
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[9px] font-mono flex items-center gap-1 shrink-0">
              📤 Export Active
            </span>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {exportNotice && (
        <div className="mx-3 mt-2 p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>{exportNotice}</span>
          </span>
          <button onClick={() => setExportNotice(null)} className="text-[10px] text-emerald-400 underline">Close</button>
        </div>
      )}

      {/* Active Screen Content Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-16">
        {/* Screen Purpose Card */}
        <div className={`p-3 rounded-2xl border space-y-1 ${
          isDarkMode ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold">{currentScreen.name}</h4>
            <span className="text-[9px] font-mono text-zinc-500">{currentScreen.route}</span>
          </div>
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            {currentScreen.purpose}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {currentScreen.components?.map((cmp: string, idx: number) => (
              <span key={idx} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                {cmp}
              </span>
            ))}
          </div>
        </div>

        {/* Live Timer Widget (if enabled) */}
        {hasTimer && (
          <div className={`p-3 rounded-2xl border flex items-center justify-between ${
            isDarkMode ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-amber-300">
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-[9px] text-zinc-400">Exam Countdown Timer</p>
              </div>
            </div>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-medium flex items-center gap-1"
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
            </button>
          </div>
        )}

        {/* Audio Synthesizer Widget (if enabled) */}
        {hasAudio && (
          <div className={`p-3 rounded-2xl border flex items-center justify-between ${
            isDarkMode ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs font-semibold text-blue-300">
                  {isPlayingAudio ? 'Playing Waveform...' : 'WebAudio Ready'}
                </p>
                <p className="text-[9px] text-zinc-400">Phonetic pronunciation</p>
              </div>
            </div>
            <button
              onClick={handleSimulateAudio}
              disabled={isPlayingAudio}
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-medium flex items-center gap-1"
            >
              <Volume2 className="w-3 h-3" />
              <span>{isPlayingAudio ? 'Speaking...' : 'Pronounce'}</span>
            </button>
          </div>
        )}

        {/* SCREEN VARIANT 1: Study / Flashcard Screen */}
        {isStudyScreen ? (
          <div className="space-y-3">
            {/* Deck progress header */}
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">
                  {currentCard.subject}
                </span>
                <h4 className="font-semibold text-xs leading-tight">Card {cardIndex + 1} of {SAMPLE_FLASHCARDS.length}</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                SM-2 Active
              </span>
            </div>

            {/* Interactive 3D Flip Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[180px] rounded-2xl p-4 border cursor-pointer select-none transition-all duration-300 relative flex flex-col justify-between ${
                isFlipped
                  ? 'bg-violet-950/20 border-violet-500/40 shadow-lg'
                  : isDarkMode
                  ? 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700'
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isFlipped ? 'bg-violet-500/20 text-violet-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {isFlipped ? 'Answer Key' : 'Clinical Prompt'}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Tap to flip</span>
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${
                  isFlipped ? 'text-zinc-100 font-medium' : 'text-zinc-200'
                }`}>
                  {isFlipped ? currentCard.answer : currentCard.question}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                <span>{currentCard.highYieldTip}</span>
                <span className="text-violet-400">Next interval: {currentCard.interval}</span>
              </div>
            </div>

            {/* Spaced Repetition Feedback Buttons */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider text-center block">
                Recall Confidence (Calculates Next Review)
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'Again', time: '<10m', color: 'hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-400' },
                  { label: 'Hard', time: '1d', color: 'hover:bg-amber-500/10 hover:border-amber-500 hover:text-amber-400' },
                  { label: 'Good', time: '3d', color: 'hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-400' },
                  { label: 'Easy', time: '7d', color: 'hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => handleRateCard(btn.label)}
                    className={`p-1.5 rounded-xl border text-center transition-all bg-zinc-900/40 border-zinc-800 text-zinc-400 active:scale-95 ${btn.color}`}
                  >
                    <span className="text-[10px] font-semibold block leading-tight">{btn.label}</span>
                    <span className="text-[8px] font-mono text-zinc-500 block leading-tight">{btn.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Strip */}
            <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span>● 89% Retention</span>
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{streakDays} Day Streak</span>
              </span>
              <span className="text-zinc-400">{reviewedCount} Reviewed</span>
            </div>
          </div>
        ) : isOnboardingScreen ? (
          /* SCREEN VARIANT 2: Onboarding / Setup Screen */
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 mx-auto flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-white">Smart Architecture Setup</h4>
              <p className="text-[10px] text-zinc-300 leading-relaxed">
                Personalized setup configured for {project.understanding?.appName || project.name}.
              </p>
            </div>

            {/* Upload simulation card */}
            <div className={`p-3.5 rounded-2xl border text-center space-y-2.5 ${
              isDarkMode ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex flex-col items-center justify-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Dataset_Source.pdf</span>
                <span className="text-[10px] text-zinc-500 font-mono">Ready for AI processing</span>
              </div>

              {uploadStatus === 'uploading' && (
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-violet-400">
                    Extracting structural parameters... {uploadProgress}%
                  </span>
                </div>
              )}

              {uploadStatus === 'completed' && (
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synchronized 32 Records!</span>
                </div>
              )}

              <button
                onClick={handleSimulateUpload}
                disabled={uploadStatus === 'uploading'}
                className={`w-full py-2 rounded-xl font-medium text-xs transition-all ${
                  uploadStatus === 'completed'
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-zinc-100 text-zinc-950 hover:bg-white'
                }`}
              >
                {uploadStatus === 'completed' ? 'Re-sync Data Source' : 'Simulate Data Ingestion'}
              </button>
            </div>

            <button
              onClick={() => {
                if (screens[1]) setActiveScreenId(screens[1].id);
              }}
              className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-medium text-xs hover:bg-violet-500 shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue to Next Screen</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : isDashboardScreen ? (
          /* SCREEN VARIANT 3: Dashboard & Analytics Screen */
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Operational Health</span>
                <h3 className="text-base font-bold text-emerald-400 leading-tight">98.2%</h3>
                <p className="text-[9px] text-zinc-500 font-mono">+3.8% efficiency</p>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Active Records</span>
                <h3 className="text-base font-bold text-violet-400 leading-tight">{customItems.length} Entities</h3>
                <p className="text-[9px] text-zinc-500 font-mono">Live state synced</p>
              </div>
            </div>

            {/* Performance Gauges */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-medium">Domain Throughput</span>
                <span className="text-[9px] font-mono text-zinc-500">Target 95%</span>
              </div>

              {[
                { name: 'Core Pipeline Execution', score: 94, color: 'bg-emerald-500' },
                { name: 'Asynchronous State Sync', score: 86, color: 'bg-violet-500' },
                { name: 'Client Latency Target', score: 99, color: 'bg-blue-500' },
              ].map((m) => (
                <div key={m.name} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-300">{m.name}</span>
                    <span className="font-mono text-zinc-400">{m.score}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {hasExport && (
              <button
                onClick={handleSimulateExport}
                className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Analytics to CSV</span>
              </button>
            )}
          </div>
        ) : (
          /* SCREEN VARIANT 4: Universal General Entity Feed & Search */
          <div className="space-y-3">
            {/* Real-time Search Input */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${currentScreen.name}...`}
                className={`w-full pl-7 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none transition-colors ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-700'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-300'
                }`}
              />
            </div>

            {/* Dynamic Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors text-[10px] ${
                    selectedCategory === cat
                      ? isDarkMode
                        ? 'bg-white text-zinc-950 border-white font-medium'
                        : 'bg-zinc-900 text-white border-zinc-900 font-medium'
                      : isDarkMode
                      ? 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      : 'border-zinc-200 text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Interactive Add New Entity Form */}
            <form onSubmit={handleAddItem} className="flex gap-1.5">
              <input
                type="text"
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder={`+ Add item to ${currentScreen.name}...`}
                className={`flex-1 px-3 py-1.5 text-xs rounded-xl border focus:outline-none ${
                  isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                }`}
              />
              <button
                type="submit"
                disabled={!newEntryText.trim()}
                className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs disabled:opacity-40"
              >
                Add
              </button>
            </form>

            {/* List of Dynamic Entities */}
            <div className="space-y-2">
              {filteredItems.map((item) => {
                const isFav = favoriteIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isDarkMode
                        ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                        : 'bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-semibold text-zinc-200">{item.title}</h4>
                        <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                        }`}
                        title="Toggle Favorite"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasExport && (
              <button
                onClick={handleSimulateExport}
                className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Items to CSV</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Mobile Tab Bar */}
      {screens.length > 0 && (
        <div className={`h-14 border-t flex items-center justify-around px-2 z-30 shrink-0 ${
          isDarkMode ? 'bg-zinc-950/95 border-zinc-800/80 text-zinc-400' : 'bg-white/95 border-zinc-200 text-zinc-500'
        }`}>
          {screens.slice(0, 4).map((screen: any, idx: number) => {
            const isActive = screen.id === activeScreenId;
            const Icons = [Compass, BookOpen, BarChart3, Layers];
            const TabIcon = Icons[idx % Icons.length];
            return (
              <button
                key={screen.id}
                onClick={() => setActiveScreenId(screen.id)}
                className={`flex flex-col items-center gap-0.5 text-[9px] transition-colors ${
                  isActive ? 'text-violet-400 font-semibold' : 'hover:text-zinc-200 text-zinc-500'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span className="truncate max-w-[60px]">{screen.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MobileSimulator() {
  const { 
    project,
    simulatorState, 
    setSimulatorState, 
    addToCart, 
    removeFromCart, 
    changeSplitCount,
    placeOrder,
    resetOrder
  } = useProject();

  const isCampusEats = project.id === 'proj-campuseats-001';

  const [activeTab, setActiveTab] = useState<'home' | 'cart' | 'tracking'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartTotal = useMemo(() => {
    return simulatorState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [simulatorState.cart]);

  const perPersonTotal = useMemo(() => {
    const divisor = Math.max(1, simulatorState.splitCount);
    return cartTotal > 0 ? (cartTotal / divisor).toFixed(2) : '0.00';
  }, [cartTotal, simulatorState.splitCount]);

  const filteredRestaurants = useMemo(() => {
    return MOCK_RESTAURANTS.filter((r) => {
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !simulatorState.isVegOnly || r.hasVegOptions;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [selectedCategory, searchQuery, simulatorState.isVegOnly]);

  const totalCartCount = simulatorState.cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="flex flex-col items-center">
      {/* Simulator Quick Controls */}
      <div className="w-full max-w-[340px] mb-2 flex items-center justify-between px-2 text-xs text-zinc-400 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Preview</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setSimulatorState((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }))
            }
            className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            title="Toggle Simulator Theme"
          >
            {simulatorState.isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetOrder}
            className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            title="Reset Simulator State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Realistic Smartphone Frame (iPhone/Pixel Bezel) */}
      <div className="relative w-[340px] h-[670px] rounded-[44px] bg-zinc-900 p-3 shadow-2xl border-4 border-zinc-700/80 ring-1 ring-white/10 select-none overflow-hidden flex flex-col">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
        </div>

        {/* Inner Screen Canvas */}
        <div
          className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col ${
            simulatorState.isDarkMode ? 'bg-[#0c0d0e] text-zinc-100' : 'bg-white text-zinc-900'
          }`}
        >
          {/* iOS Status Bar */}
          <div className="pt-2.5 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold tracking-tight z-30">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {isCampusEats ? (
            <>
              {/* Screen Content Router */}
              <div className="flex-1 overflow-y-auto px-3.5 pb-16 pt-1 space-y-3">
            {activeTab === 'home' && (
              <>
                {/* Dorm Delivery Header */}
                <div className="pt-1 pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">
                        Deliver to
                      </span>
                      <p className="text-xs font-semibold flex items-center gap-1 text-emerald-400">
                        <MapPin className="w-3 h-3 inline text-emerald-400" />
                        North Quad Dorm (Hub #04)
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('cart')}
                      className={`relative p-2 rounded-xl transition-all ${
                        simulatorState.isDarkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {totalCartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-zinc-950 font-bold text-[9px] rounded-full flex items-center justify-center">
                          {totalCartCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search meals, late-night, boba..."
                    className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none transition-colors ${
                      simulatorState.isDarkMode
                        ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-700'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Dietary Filter Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
                  <button
                    onClick={() =>
                      setSimulatorState((p) => ({ ...p, isVegOnly: !p.isVegOnly }))
                    }
                    className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors font-medium flex items-center gap-1 ${
                      simulatorState.isVegOnly
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : simulatorState.isDarkMode
                        ? 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        : 'border-zinc-200 text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    🌱 Veg Only
                  </button>
                  {CAMPUS_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? simulatorState.isDarkMode
                            ? 'bg-white text-zinc-950 border-white font-medium'
                            : 'bg-zinc-900 text-white border-zinc-900 font-medium'
                          : simulatorState.isDarkMode
                          ? 'border-zinc-800 text-zinc-400'
                          : 'border-zinc-200 text-zinc-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Restaurant List */}
                <div className="space-y-2.5 pt-1">
                  {filteredRestaurants.map((res) => (
                    <div
                      key={res.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        simulatorState.isDarkMode
                          ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                          : 'bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-xs leading-snug">{res.name}</h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {res.cuisine} • {res.eta}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400">
                          ★ {res.rating}
                        </span>
                      </div>

                      {/* Student Badge */}
                      <div className="mt-2 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">
                        🎓 {res.studentDiscount}
                      </div>

                      {/* Featured Item Row */}
                      <div className="mt-2.5 pt-2 border-t border-zinc-800/50 flex items-center justify-between">
                        <div className="pr-2">
                          <p className="text-[11px] font-medium leading-tight">
                            {res.featuredItem.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            ${res.featuredItem.price.toFixed(2)}
                            {res.featuredItem.isVeg && (
                              <span className="text-emerald-400 ml-1.5">● Veg</span>
                            )}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            addToCart({
                              id: res.featuredItem.id,
                              name: res.featuredItem.name,
                              price: res.featuredItem.price,
                              restaurant: res.name,
                              isVeg: res.featuredItem.isVeg,
                            })
                          }
                          className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-transform active:scale-95 flex items-center gap-1 ${
                            simulatorState.isDarkMode
                              ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                              : 'bg-zinc-900 text-white hover:bg-zinc-800'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CART VIEW */}
            {activeTab === 'cart' && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <span className="text-xs font-semibold">Your Basket</span>
                </div>

                {simulatorState.cart.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <ShoppingBag className="w-8 h-8 mx-auto text-zinc-500" />
                    <p className="text-xs text-zinc-400">Your basket is empty</p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="text-xs text-emerald-400 underline"
                    >
                      Browse campus menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item list */}
                    <div className="space-y-2">
                      {simulatorState.cart.map((item) => (
                        <div
                          key={item.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between ${
                            simulatorState.isDarkMode
                              ? 'bg-zinc-900/60 border-zinc-800'
                              : 'bg-zinc-50 border-zinc-200'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-medium">{item.name}</p>
                            <p className="text-[10px] text-zinc-400">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Roommate Split Bill Module */}
                    <div
                      className={`p-3 rounded-xl border space-y-2.5 ${
                        simulatorState.isDarkMode
                          ? 'bg-zinc-900/80 border-zinc-800'
                          : 'bg-zinc-100 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Users className="w-3.5 h-3.5 text-violet-400" />
                          Split with Roommates
                        </span>
                        <span className="font-mono text-violet-400 font-semibold">
                          {simulatorState.splitCount} {simulatorState.splitCount === 1 ? 'person' : 'roommates'}
                        </span>
                      </div>

                      {/* Split Count Buttons */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map((count) => (
                          <button
                            key={count}
                            onClick={() => changeSplitCount(count)}
                            className={`py-1 rounded-lg text-xs font-mono transition-colors ${
                              simulatorState.splitCount === count
                                ? 'bg-violet-600 text-white font-bold'
                                : 'bg-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {count}x
                          </button>
                        ))}
                      </div>

                      {/* Calculation Breakdown */}
                      <div className="pt-2 border-t border-zinc-800 text-[11px] space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Total Cart</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-emerald-400 text-xs">
                          <span>Per Roommate Share</span>
                          <span>${perPersonTotal} / student</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <button
                      onClick={() => {
                        placeOrder();
                        setActiveTab('tracking');
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      <span>Order for Dorm (${perPersonTotal})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* TRACKING VIEW */}
            {activeTab === 'tracking' && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Menu
                  </button>
                  <span className="text-[10px] font-mono text-zinc-400">Order #8891</span>
                </div>

                {/* Status Hero Card */}
                <div
                  className={`p-3.5 rounded-2xl border space-y-3 ${
                    simulatorState.isDarkMode
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                        Estimated Arrival
                      </span>
                      <h4 className="text-sm font-bold text-emerald-400 mt-0.5">
                        8 mins remaining
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>

                  {/* 4-Digit Pickup PIN */}
                  <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-400">Dorm Lobby Security PIN</p>
                      <p className="text-base font-mono font-bold tracking-widest text-white">
                        4 8 2 1
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>

                {/* Milestone Progress */}
                <div className="space-y-2.5 pl-1">
                  {[
                    { label: 'Order Confirmed', time: '12:04 AM', active: true },
                    { label: 'Kitchen Preparing', time: '12:11 AM', active: true },
                    { label: 'Rider on Campus Bike', time: '12:18 AM', active: true },
                    { label: 'Dorm Lobby Pickup Ready', time: '12:24 AM', active: false },
                  ].map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-3 text-xs">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          step.active
                            ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-500/20'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {step.active ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className={step.active ? 'font-medium' : 'text-zinc-500'}>
                          {step.label}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Courier info card */}
                <div className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-[10px] font-bold">
                      DS
                    </div>
                    <div>
                      <p className="font-medium text-[11px]">Devon S. (Campus Runner)</p>
                      <p className="text-[9px] text-zinc-500">On Red Trek Bicycle</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Contact</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Mobile Tab Bar */}
          <div
            className={`absolute bottom-0 inset-x-0 h-14 border-t flex items-center justify-around px-4 z-30 ${
              simulatorState.isDarkMode
                ? 'bg-zinc-950/95 border-zinc-800/80 text-zinc-400'
                : 'bg-white/95 border-zinc-200 text-zinc-500'
            }`}
          >
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${
                activeTab === 'home' ? 'text-emerald-400 font-semibold' : 'hover:text-zinc-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`relative flex flex-col items-center gap-0.5 text-[10px] transition-colors ${
                activeTab === 'cart' ? 'text-emerald-400 font-semibold' : 'hover:text-zinc-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Basket</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-emerald-500 text-zinc-950 font-bold text-[8px] rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${
                activeTab === 'tracking' ? 'text-emerald-400 font-semibold' : 'hover:text-zinc-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Tracking</span>
            </button>
          </div>
            </>
          ) : (
            <DynamicProjectPreview project={project} isDarkMode={simulatorState.isDarkMode} />
          )}

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-zinc-600 rounded-full z-40 opacity-50" />
        </div>
      </div>
    </div>
  );
}
