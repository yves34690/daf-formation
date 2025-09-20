import React, { useState, useEffect } from 'react';
import {
  PlayCircle,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  Brain,
  ChevronRight,
  Award,
  BookOpen
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  QUIZ_CATEGORIES,
  QuizQuestion,
  QuizResult,
  calculateScore
} from '../../data/quizData';
import GlossaryTerm from '../Glossary/GlossaryTerm';

interface QuizWorkshopProps {
  onComplete?: () => void;
  onClose?: () => void;
}

type QuizState = 'intro' | 'playing' | 'results';

const QuizWorkshop: React.FC<QuizWorkshopProps> = ({ onComplete, onClose }) => {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const startQuiz = () => {
    setState('playing');
    setStartTime(new Date());
    setQuestionStartTime(new Date());
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowExplanation(false);
  };

  const selectAnswer = (optionId: string) => {
    if (!showExplanation) {
      setSelectedAnswer(optionId);
    }
  };

  const confirmAnswer = () => {
    if (selectedAnswer && !showExplanation) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer
      }));
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
      setQuestionStartTime(new Date());
    } else {
      // Quiz terminé
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const result = calculateScore(answers);
    if (startTime) {
      result.timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    }
    setQuizResult(result);
    setState('results');
  };

  const restartQuiz = () => {
    setState('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowExplanation(false);
    setQuizResult(null);
    setStartTime(null);
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number): { icon: React.ReactNode; text: string; color: string } => {
    if (percentage >= 90) {
      return { icon: <Trophy className="w-6 h-6" />, text: 'Expert DAF', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    }
    if (percentage >= 80) {
      return { icon: <Award className="w-6 h-6" />, text: 'DAF Confirmé', color: 'bg-green-100 text-green-800 border-green-300' };
    }
    if (percentage >= 60) {
      return { icon: <Target className="w-6 h-6" />, text: 'DAF Junior', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    }
    return { icon: <BookOpen className="w-6 h-6" />, text: 'En Apprentissage', color: 'bg-gray-100 text-gray-800 border-gray-300' };
  };

  if (state === 'intro') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              🎯 Quiz interactif : Les représentations du métier de <GlossaryTerm term="DAF">DAF</GlossaryTerm>
            </h2>
            <p className="text-slate-600 text-lg">
              Testez vos connaissances sur les missions, enjeux et évolutions du métier de <GlossaryTerm term="DAF">Directeur Administratif et Financier</GlossaryTerm>
            </p>
          </div>

          {/* Quiz Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900">Format du quiz</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong>{totalQuestions} questions</strong> à choix multiples</li>
                <li>• <strong>Temps libre</strong> - pas de limite</li>
                <li>• <strong>Feedback immédiat</strong> avec explications</li>
                <li>• <strong>Score final</strong> avec badge de réussite</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-slate-900">Catégories abordées</h3>
              </div>
              <div className="space-y-2">
                {QUIZ_CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-slate-600">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {QUIZ_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-br from-white to-${category.color}-50 rounded-lg p-4 border border-${category.color}-200 text-center`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{category.name}</h4>
                <p className="text-xs text-slate-600">{category.description}</p>
                <div className="mt-2 text-xs text-slate-500">
                  {QUIZ_QUESTIONS.filter(q => q.category === category.id).length} questions
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={startQuiz}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
            >
              <PlayCircle className="w-5 h-5" />
              Commencer le quiz
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (state === 'playing') {
    const isAnswered = selectedAnswer !== '';
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect || false;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600">
                Question {currentQuestionIndex + 1} sur {totalQuestions}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round(progress)}% complété
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            {(() => {
              const category = QUIZ_CATEGORIES.find(c => c.id === currentQuestion.category);
              return category ? (
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-${category.color}-100 text-${category.color}-800 border border-${category.color}-200`}>
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              ) : null;
            })()}
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ";

              if (!showExplanation) {
                buttonClass += selectedAnswer === option.id
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-slate-200 bg-white hover:border-slate-300";
              } else {
                if (option.isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-900";
                } else if (selectedAnswer === option.id && !option.isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  buttonClass += "border-slate-200 bg-slate-50 text-slate-600";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                      {showExplanation && option.isCorrect && <CheckCircle className="w-5 h-5" />}
                      {showExplanation && selectedAnswer === option.id && !option.isCorrect && <XCircle className="w-5 h-5" />}
                      {!showExplanation && <span className="font-bold">{option.id.toUpperCase()}</span>}
                    </div>
                    <span className="flex-1">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-lg mb-6 border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <BookOpen className="w-5 h-5 text-orange-600" />
                )}
                <span className="font-semibold text-slate-900">
                  {isCorrect ? 'Excellent !' : 'Bonne tentative !'}
                </span>
              </div>
              <p className="text-slate-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Quitter le quiz
            </button>
            <div className="flex gap-3">
              {!showExplanation ? (
                <button
                  onClick={confirmAnswer}
                  disabled={!isAnswered}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isAnswered
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirmer
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <>
                      Question suivante
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Voir les résultats
                      <Trophy className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'results' && quizResult) {
    const badge = getScoreBadge(quizResult.percentage);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz terminé !</h2>
            <p className="text-slate-600">Voici vos résultats sur les représentations du métier de <GlossaryTerm term="DAF">DAF</GlossaryTerm></p>
          </div>

          {/* Score Global */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-center border border-blue-200">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(quizResult.percentage)}`}>
              {quizResult.percentage}%
            </div>
            <div className="text-lg text-slate-600 mb-4">
              {quizResult.score} / {quizResult.totalQuestions} questions correctes
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${badge.color}`}>
              {badge.icon}
              <span className="font-semibold">{badge.text}</span>
            </div>
          </div>

          {/* Scores par catégorie */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Détail par catégorie</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(quizResult.categoryScores).map(([categoryId, scores]) => {
                const category = QUIZ_CATEGORIES.find(c => c.id === categoryId);
                const percentage = Math.round((scores.correct / scores.total) * 100);

                return category ? (
                  <div key={categoryId} className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{category.name}</h4>
                        <p className="text-sm text-slate-600">{scores.correct}/{scores.total} correct</p>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
                        {percentage}%
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Feedback et recommandations */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">📝 Recommandations</h3>
            {quizResult.percentage >= 90 ? (
              <p className="text-slate-700">
                🎉 Excellente maîtrise ! Vous avez une vision complète et approfondie du métier de <GlossaryTerm term="DAF">DAF</GlossaryTerm>.
                Vous êtes prêt(e) pour les défis du Business Game !
              </p>
            ) : quizResult.percentage >= 80 ? (
              <p className="text-slate-700">
                👏 Très bon niveau ! Vous maîtrisez bien les fondamentaux du métier.
                Quelques points à revoir mais vous avez une base solide pour le Business Game.
              </p>
            ) : quizResult.percentage >= 60 ? (
              <p className="text-slate-700">
                📚 Bon début ! Vous avez acquis les bases essentielles.
                Je recommande de revoir les catégories avec des scores plus faibles avant le Business Game.
              </p>
            ) : (
              <p className="text-slate-700">
                💪 Continuez vos efforts ! Il serait bénéfique de reprendre les chapitres théoriques
                avant de vous lancer dans le Business Game. N'hésitez pas à refaire le quiz !
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              Refaire le quiz
            </button>
            {onComplete && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                Continuer la formation
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizWorkshop;