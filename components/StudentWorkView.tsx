import React from 'react';
import { ArrowLeft, Award, HelpCircle, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import { Student } from '../types';
import { getUserProgress } from '../utils/storage';
import { getCasesFromLocalStorage } from '../data/caseBuilderData';
import { getAllDeliverablesForUser } from '../utils/storage';

interface StudentWorkViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentWorkView: React.FC<StudentWorkViewProps> = ({ student, onBack }) => {
  const progress = getUserProgress(student.id);
  const cases = getCasesFromLocalStorage(student.id);
  const deliverables = getAllDeliverablesForUser(student.id);

  // Récupérer le score du quiz
  const quizScore = progress?.workshopScores.find(ws => ws.workshopId === 'quiz-representations-metier');

  // Récupérer les questions SPIN (utilise les clés localStorage génériques car pas de userId dans les clés actuelles)
  const spinSections = [
    { key: 'spin-questions-situation', title: 'Questions de Situation', icon: '📍' },
    { key: 'spin-questions-problème', title: 'Questions de Problème', icon: '⚠️' },
    { key: 'spin-questions-implication', title: 'Questions d\'Implication', icon: '💡' },
    { key: 'spin-questions-need-payoff', title: 'Questions de Need-Payoff', icon: '🎯' }
  ];

  const spinData = spinSections.map(section => ({
    ...section,
    content: localStorage.getItem(section.key) || ''
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au tableau de bord
          </button>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-16 h-16 rounded-full border-4 border-blue-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-slate-600">{student.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Représentations Métier */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">Quiz - Représentations du métier</h2>
          </div>
          {quizScore ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {quizScore.details?.score || 0}/{quizScore.details?.totalQuestions || 0}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Pourcentage</p>
                <p className="text-2xl font-bold text-green-600">{quizScore.score}%</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Temps passé</p>
                <p className="text-2xl font-bold text-purple-600">
                  {quizScore.details?.timeSpent || 'N/A'}
                </p>
              </div>
              {quizScore.details?.categoryScores && (
                <div className="md:col-span-3 bg-slate-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Scores par catégorie</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(quizScore.details.categoryScores).map(([category, score]) => (
                      <div key={category} className="bg-white rounded p-3 border border-slate-200">
                        <p className="text-xs text-slate-600 mb-1">{category}</p>
                        <p className="text-lg font-bold text-slate-800">
                          {(score as { correct: number; total: number }).correct}/{(score as { correct: number; total: number }).total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-500 italic">Aucun quiz complété</p>
          )}
        </div>

        {/* Générateur de cas concrets */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Générateur de cas concrets</h2>
          </div>
          {cases.length > 0 ? (
            <div className="space-y-4">
              {cases.map((caseItem, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{caseItem.title}</h3>
                      <p className="text-sm text-slate-600">{caseItem.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {caseItem.sector}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">🎯 Défi</p>
                      <p className="text-sm text-slate-600 mb-1"><strong>Contexte:</strong> {caseItem.challenge.context}</p>
                      <p className="text-sm text-slate-600"><strong>Problème:</strong> {caseItem.challenge.problem}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">💡 Solution</p>
                      <p className="text-sm text-slate-600 mb-1"><strong>Approche:</strong> {caseItem.solution.approach}</p>
                      <p className="text-sm text-slate-600"><strong>Outils:</strong> {caseItem.solution.tools}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">📊 Résultats</p>
                      <p className="text-sm text-slate-600">{caseItem.results.measurableROI}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">🔍 Perspective DAF</p>
                      <p className="text-sm text-slate-600 mb-1"><strong>Préoccupations:</strong> {caseItem.dafPerspective.concerns}</p>
                      <p className="text-sm text-slate-600"><strong>Questions:</strong> {caseItem.dafPerspective.questions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic">Aucun cas créé</p>
          )}
        </div>

        {/* Guide SPIN */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">Guide SPIN</h2>
          </div>
          <div className="space-y-4">
            {spinData.map((section, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-800 mb-2 flex items-center gap-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h3>
                {section.content ? (
                  <p className="text-slate-700 whitespace-pre-wrap">{section.content}</p>
                ) : (
                  <p className="text-slate-500 italic">Aucune question rédigée</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Livrables Business Game */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-800">Livrables Business Game</h2>
          </div>
          {Object.keys(deliverables).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(deliverables).map(([scenarioId, content]) => {
                const hasProposal = content.proposal && content.proposal.trim().length > 0;
                const hasSpecs = content.specs && content.specs.trim().length > 0;

                if (!hasProposal && !hasSpecs) return null;

                return (
                  <div key={scenarioId} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Scénario {scenarioId}
                    </h3>

                    <div className="space-y-4">
                      {hasProposal && (
                        <div>
                          <h4 className="font-semibold text-md text-blue-700 mb-2">📄 Proposition Commerciale</h4>
                          <div className="bg-white rounded p-3 border border-slate-200 max-h-64 overflow-y-auto">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{content.proposal}</p>
                          </div>
                        </div>
                      )}

                      {hasSpecs && (
                        <div>
                          <h4 className="font-semibold text-md text-orange-700 mb-2">📋 Cahier des Charges</h4>
                          <div className="bg-white rounded p-3 border border-slate-200 max-h-64 overflow-y-auto">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{content.specs}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 italic">Aucun livrable rédigé</p>
          )}
        </div>
      </div>
    </div>
  );
};
