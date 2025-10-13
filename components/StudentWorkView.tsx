import React from 'react';
import { ArrowLeft, Award, HelpCircle, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import { Student } from '../types';
import { getUserProgress } from '../utils/storage';
import { getCasesFromLocalStorage } from '../data/caseBuilderData';
import { getPublishedDeliverablesForUser } from '../utils/storage';

interface StudentWorkViewProps {
  student: Student;
  onBack: () => void;
}

export const StudentWorkView: React.FC<StudentWorkViewProps> = ({ student, onBack }) => {
  const progress = getUserProgress(student.id);
  const cases = getCasesFromLocalStorage(student.id);
  const deliverables = getPublishedDeliverablesForUser(student.id);

  // Récupérer le score du quiz
  const quizScore = progress?.workshopScores.find(ws => ws.workshopId === 'quiz-representations-metier');

  // Récupérer les questions SPIN avec userId
  const spinSections = [
    { keyPart: 'pour-les-commerciaux-it', title: 'Pour les Commerciaux IT', icon: '📍' },
    { keyPart: 'pour-le-daf-(réflexion-interne)', title: 'Pour le DAF (Réflexion interne)', icon: '🎯' }
  ];

  const spinData = spinSections.map(section => ({
    ...section,
    content: localStorage.getItem(`daf-spin-${student.id}-${section.keyPart}`) || ''
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-slate-100 to-blue-50 overflow-y-auto z-50 p-8">
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
                  {quizScore.data?.score || 0}/{quizScore.data?.totalQuestions || 0}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Pourcentage</p>
                <p className="text-2xl font-bold text-green-600">{quizScore.score}%</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Temps passé</p>
                <p className="text-2xl font-bold text-purple-600">
                  {quizScore.data?.timeSpent ? `${quizScore.data.timeSpent}s` : 'N/A'}
                </p>
              </div>
              {quizScore.data?.categoryScores && (
                <div className="md:col-span-3 bg-slate-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Scores par catégorie</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(quizScore.data.categoryScores).map(([category, score]) => (
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

                  <div className="space-y-4 mt-4">
                    {/* Défi */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                        🎯 Défi
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700"><strong>Contexte:</strong> {caseItem.challenge.context}</p>
                        <p className="text-sm text-slate-700"><strong>Problème:</strong> {caseItem.challenge.problem}</p>
                        <p className="text-sm text-slate-700"><strong>Impact:</strong> {caseItem.challenge.impact}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                        💡 Solution
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700"><strong>Approche:</strong> {caseItem.solution.approach}</p>
                        <div className="text-sm text-slate-700">
                          <strong>Outils:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {caseItem.solution.tools.map((tool, idx) => (
                              <li key={idx}>{tool}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-sm text-slate-700"><strong>Implémentation:</strong> {caseItem.solution.implementation}</p>
                      </div>
                    </div>

                    {/* Résultats */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                        📊 Résultats
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700"><strong>ROI mesurable:</strong> {caseItem.results.measurableROI}</p>
                        <p className="text-sm text-slate-700"><strong>Gains de temps:</strong> {caseItem.results.timeGains}</p>
                        <div className="text-sm text-slate-700">
                          <strong>Autres bénéfices:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {caseItem.results.otherBenefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Perspective DAF */}
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <p className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2">
                        🔍 Perspective DAF
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700"><strong>Préoccupations:</strong> {caseItem.dafPerspective.concerns}</p>
                        <p className="text-sm text-slate-700"><strong>Questions:</strong> {caseItem.dafPerspective.questions}</p>
                      </div>
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
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-md text-blue-700">📄 Proposition Commerciale</h4>
                            {content.proposalPublishedAt && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                Publié le {new Date(content.proposalPublishedAt).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            )}
                          </div>
                          <div className="bg-white rounded p-3 border border-slate-200 max-h-64 overflow-y-auto">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{content.proposal}</p>
                          </div>
                        </div>
                      )}

                      {hasSpecs && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-md text-orange-700">📋 Cahier des Charges</h4>
                            {content.specsPublishedAt && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                Publié le {new Date(content.specsPublishedAt).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            )}
                          </div>
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
