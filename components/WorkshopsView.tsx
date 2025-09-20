import React, { useState } from 'react';
import { ArrowLeft, Gamepad2, FileText, Play, Info } from 'lucide-react';
import QuizWorkshop from './Workshops/QuizWorkshop';
import CaseBuilderWorkshop from './Workshops/CaseBuilderWorkshop';

interface WorkshopsViewProps {
  onBack: () => void;
}

const WorkshopsView: React.FC<WorkshopsViewProps> = ({ onBack }) => {
  const [activeWorkshop, setActiveWorkshop] = useState<'quiz' | 'caseBuilder' | null>(null);

  const workshops = [
    {
      id: 'quiz',
      title: 'Quiz - Représentations du métier',
      description: 'Testez vos connaissances sur les missions et enjeux du DAF à travers 15 questions interactives.',
      icon: Gamepad2,
      color: 'purple',
      features: [
        '15 questions techniques',
        '7 catégories d\'expertise',
        'Scoring par domaine',
        'Feedback immédiat'
      ],
      chapter: 'Chapitre 1'
    },
    {
      id: 'caseBuilder',
      title: 'Générateur de cas concrets',
      description: 'Créez vos propres scénarios de défis pour un DAF avec des templates guidés.',
      icon: FileText,
      color: 'green',
      features: [
        '6 templates de cas',
        'Processus guidé en 4 étapes',
        'Sauvegarde locale',
        'Export des cas créés'
      ],
      chapter: 'Chapitre 2'
    }
  ];

  if (activeWorkshop === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-50">
        <QuizWorkshop
          onComplete={() => setActiveWorkshop(null)}
          onClose={() => setActiveWorkshop(null)}
        />
      </div>
    );
  }

  if (activeWorkshop === 'caseBuilder') {
    return (
      <div className="min-h-screen bg-gray-50">
        <CaseBuilderWorkshop
          onComplete={() => setActiveWorkshop(null)}
          onClose={() => setActiveWorkshop(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-slate-900">
              Ateliers Interactifs
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Découvrez et testez les deux ateliers pédagogiques de la formation DAF
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Mode Démonstration
              </h3>
              <p className="text-blue-800">
                Ces ateliers sont normalement intégrés dans le parcours de formation.
                Ici, vous pouvez les tester directement pour évaluation et démonstration pédagogique.
              </p>
            </div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {workshops.map((workshop) => {
            const IconComponent = workshop.icon;
            const colorClasses = {
              purple: {
                bg: 'from-purple-50 to-blue-50',
                border: 'border-purple-200',
                icon: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700',
                badge: 'bg-purple-100 text-purple-700'
              },
              green: {
                bg: 'from-green-50 to-emerald-50',
                border: 'border-green-200',
                icon: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700',
                badge: 'bg-green-100 text-green-700'
              }
            };

            const colors = colorClasses[workshop.color as keyof typeof colorClasses];

            return (
              <div
                key={workshop.id}
                className={`bg-gradient-to-br ${colors.bg} ${colors.border} border rounded-xl p-8 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center justify-between mb-6">
                  <IconComponent className={`w-12 h-12 ${colors.icon}`} />
                  <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold`}>
                    {workshop.chapter}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {workshop.title}
                </h3>

                <p className="text-slate-700 mb-6">
                  {workshop.description}
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-slate-900">Fonctionnalités :</h4>
                  <ul className="space-y-2">
                    {workshop.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-700">
                        <span className={`w-2 h-2 ${colors.icon} bg-current rounded-full mr-3`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setActiveWorkshop(workshop.id as 'quiz' | 'caseBuilder')}
                  className={`w-full flex items-center justify-center gap-2 ${colors.button} text-white py-4 rounded-lg transition-colors font-semibold shadow-lg`}
                >
                  <Play className="w-5 h-5" />
                  Tester l'atelier
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Intégration Pédagogique
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Quiz - Chapitre 1</h4>
                <p className="text-slate-600 text-sm">
                  Normalement accessible après avoir complété toutes les sections du chapitre
                  "Les représentations du métier". Permet de valider les acquis théoriques.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Générateur - Chapitre 2</h4>
                <p className="text-slate-600 text-sm">
                  Intégré dans le chapitre "La réalité du métier" pour permettre aux étudiants
                  de créer leurs propres cas d'usage basés sur les apprentissages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsView;