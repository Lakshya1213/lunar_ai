import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Check, 
  X, 
  Sparkles
} from 'lucide-react';

export function LearnView() {
  const { project, answerQuiz, toggleConceptMastery, proceedToLearn, isGeneratingLearn } = useProject();
  const { concepts } = project;
  const [activeConceptId, setActiveConceptId] = useState(concepts[0]?.id);

  const selectedConcept = concepts.find((c) => c.id === activeConceptId) || concepts[0];
  const masteredCount = concepts.filter((c) => c.mastered).length;
  const progressPercent = concepts.length > 0 ? Math.round((masteredCount / concepts.length) * 100) : 0;

  // Next recommended concept
  const nextRecommended = concepts.find((c) => !c.mastered);

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header & Mastery Progress */}
      <div className="space-y-4 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Stage 06 • Personalized Developer Curriculum</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Engineering Concepts & Interactive Quizzes
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Curriculum dynamically extracted from the architecture and code patterns used in this project.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => proceedToLearn(true)}
              disabled={isGeneratingLearn}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              title="Re-synthesize curriculum from latest architecture"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isGeneratingLearn ? 'Extracting...' : 'Re-extract'}</span>
            </button>

            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
              <Award className="w-4 h-4 text-amber-400" />
              <div className="text-xs font-mono">
                <span className="text-zinc-400">Curriculum Mastery: </span>
                <span className="text-white font-bold">{progressPercent}%</span>
                <span className="text-zinc-500 text-[11px] ml-1">
                  ({masteredCount}/{concepts.length})
                </span>
              </div>
            </div>
          </div>
        </div>

        {isGeneratingLearn && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs font-mono text-emerald-300">
            <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span>Synthesizing architectural curriculum and interactive quizzes...</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Recommended Next Concept Banner */}
      {nextRecommended && (
        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <div>
              <span className="text-[10px] font-mono uppercase text-violet-400 block font-semibold">
                Recommended Next Concept:
              </span>
              <h4 className="text-xs font-semibold text-zinc-100">{nextRecommended.title}</h4>
            </div>
          </div>
          <button
            onClick={() => setActiveConceptId(nextRecommended.id)}
            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium self-start sm:self-auto transition-colors"
          >
            Study Concept
          </button>
        </div>
      )}

      {/* Concepts Grid & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Concepts Navigation Column */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
            Extracted Application Concepts ({concepts.length})
          </span>

          <div className="space-y-2">
            {concepts.map((concept) => {
              const isSelected = selectedConcept.id === concept.id;
              return (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                      : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-zinc-500">
                      {concept.category}
                    </span>
                    {concept.mastered ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Mastered
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500">In Progress</span>
                    )}
                  </div>

                  <h4 className="text-xs font-medium text-zinc-100 line-clamp-1">{concept.title}</h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {concept.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Concept Deep Dive & Quiz */}
        <div className="lg:col-span-7 space-y-6">
          {selectedConcept && (
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
              {/* Concept Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block font-medium">
                    {selectedConcept.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">
                    {selectedConcept.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleConceptMastery(selectedConcept.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
                    selectedConcept.mastered
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedConcept.mastered ? 'Mastered' : 'Mark as Mastered'}</span>
                </button>
              </div>

              {/* Summary & Why It Matters */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-medium">
                    Concept Definition:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {selectedConcept.summary}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block font-medium">
                    Why It Matters in this Project:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {selectedConcept.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Example Snippet */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Practical Implementation Pattern
                </span>
                <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 overflow-x-auto font-mono text-xs text-zinc-300">
                  <pre className="leading-relaxed whitespace-pre">
                    <code>{selectedConcept.exampleSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Interactive Quiz Engine */}
              {selectedConcept.quizzes.map((quiz) => {
                const hasAnswered = quiz.isCompleted;
                const isCorrect = quiz.userSelectedIndex === quiz.correctIndex;

                return (
                  <div
                    key={quiz.id}
                    className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Knowledge Check Quiz</span>
                    </div>

                    <h4 className="text-xs font-medium text-zinc-100 leading-relaxed">
                      {quiz.question}
                    </h4>

                    {/* Quiz Options */}
                    <div className="space-y-2">
                      {quiz.options.map((opt, optIdx) => {
                        const isChosen = quiz.userSelectedIndex === optIdx;
                        let optionStyle = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700';

                        if (hasAnswered) {
                          if (optIdx === quiz.correctIndex) {
                            optionStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 font-medium';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'border-rose-500/60 bg-rose-500/10 text-rose-300';
                          } else {
                            optionStyle = 'border-zinc-800/40 text-zinc-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasAnswered}
                            onClick={() => answerQuiz(selectedConcept.id, quiz.id, optIdx)}
                            className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && optIdx === quiz.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {hasAnswered && isChosen && !isCorrect && (
                              <X className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quiz Feedback Explanation */}
                    {hasAnswered && (
                      <div
                        className={`p-3 rounded-lg border text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/5 border-rose-500/20 text-rose-300'
                        }`}
                      >
                        <p className="font-semibold mb-1">
                          {isCorrect ? '✓ Correct Answer!' : '✗ Needs Review'}
                        </p>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          {quiz.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
