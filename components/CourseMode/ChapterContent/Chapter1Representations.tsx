import React, { useState } from 'react';
import {
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Target,
  Award,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Chapter1Props {
  onComplete: () => void;
}

const Chapter1Representations: React.FC<Chapter1Props> = ({ onComplete }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const sections = [
    { id: 0, title: "Présentation de la fonction", duration: 15 },
    { id: 1, title: "Objectifs et enjeux", duration: 10 },
    { id: 2, title: "Qualités nécessaires", duration: 10 },
    { id: 3, title: "Contraintes du métier", duration: 10 },
    { id: 4, title: "Évolutions du métier", duration: 15 },
  ];

  const handleSectionComplete = () => {
    if (!completedSections.includes(activeSection)) {
      setCompletedSections([...completedSections, activeSection]);
    }
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    } else if (completedSections.length === sections.length - 1) {
      onComplete();
    }
  };

  const pillars = [
    {
      icon: Calculator,
      color: 'blue',
      title: 'Comptabilité & Trésorerie',
      subtitle: 'Supervision comptable, gestion des flux et optimisation financière',
      items: [
        'Arrêtés comptables mensuels',
        'Traitement et vision consolidé',
        'Relation avec l\'expert comptable et le CAC',
        'Gestion de trésorerie',
        'Mise en place et suivi du plan de trésorerie',
        'Relations bancaires'
      ]
    },
    {
      icon: Shield,
      color: 'green',
      title: 'Fonctions administratives',
      subtitle: 'Le DAF est le garant de la conformité règlementaire',
      items: [
        'RH : Mise en place et suivi des processus RH individuels et collectifs',
        'Juridique : Traitement et suivi des contentieux, relation avec les avocats',
        'Compréhension et vision d\'ensemble des enjeux de gouvernance',
        'Structure juridique adapté',
        'Fiscal : conseil et optimisation fiscale'
      ]
    },
    {
      icon: TrendingUp,
      color: 'purple',
      title: 'Contrôle de gestion & Analyse',
      subtitle: 'Pilotage de la performance, budgets et BI',
      items: [
        'Élaboration budgets prévisionnels',
        'Suivi écarts budget/réalisé',
        'Analyses de rentabilité',
        'Reporting de performance',
        'Dashboards interactifs',
        'Analyses prédictives',
        'Business plans',
        'Évaluations d\'investissements',
        'Visualisations avancées'
      ]
    },
    {
      icon: Users,
      color: 'orange',
      title: 'Performance économique',
      subtitle: 'Le DAF un véritable business partners',
      items: [
        'Le DAF est le bras droit de la direction',
        'Qualité de management',
        'Capacité de représentation',
        'Vision collective des enjeux et conseil stratégique',
        'Busines partners : capacité à comprendre les processus métiers',
        'Être force de proposition'
      ]
    }
  ];

  const qualities = [
    { name: 'Rigueur analytique', desc: 'Capacité d\'analyse fine des données financières' },
    { name: 'Vision stratégique', desc: 'Compréhension des enjeux business globaux' },
    { name: 'Communication', desc: 'Vulgarisation des concepts financiers complexes' },
    { name: 'Adaptabilité', desc: 'Évolution avec les outils et réglementations' },
    { name: 'Leadership', desc: 'Management d\'équipes pluridisciplinaires' },
    { name: 'Négociation', desc: 'Relations avec partenaires financiers et institutionnels' }
  ];

  const constraints = [
    { name: 'Fiabilité', desc: 'Contrôle interne, audit, conformité, transparence, traçabilité, exactitude' },
    { name: 'Gestion des risques', desc: 'Cartographie des risques, surveillance, procédure et organisation, gouvernance' },
    { name: 'Anticipation des besoins', desc: 'Prévisionnel, plan de trésorerie prospective métier partagée avec la direction, planification stratégique' },
    { name: 'Gestion des équipes', desc: 'Leadership, coordination, formation & développement des compétences, délégation, motivation' },
    { name: 'Évolution Technologique', desc: 'Digitalisation, automatisation, transformation numérique, veille technologique, innovation, systèmes d\'information et capitalisation des connaissances' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Chapitre 1 : Les représentations du métier
        </h1>
        <p className="text-slate-600">
          Découvrez les missions principales, les enjeux et les compétences nécessaires au métier de DAF
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : completedSections.includes(section.id)
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {completedSections.includes(section.id) && (
              <CheckCircle className="w-4 h-4" />
            )}
            {section.title}
            <span className="text-xs opacity-75">({section.duration}min)</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeSection === 0 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Présentation de la fonction et des principales missions
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                Le DAF assure la gestion financière globale en pilotant la <span className="text-red-600 font-semibold">trésorerie</span>,
                les <span className="text-red-600 font-semibold">budgets</span> et la <span className="text-red-600 font-semibold">comptabilité</span>,
                tout en supervisant les <span className="text-red-600 font-semibold">fonctions administratives (RH, juridique, fiscal)</span> et
                en <span className="text-red-600 font-semibold">conseillant la direction</span> sur les décisions stratégiques.
                Il garantit la <span className="text-red-600 font-semibold">conformité réglementaire</span>,
                <span className="text-red-600 font-semibold">analyse la performance économique</span> et élabore
                les <span className="text-red-600 font-semibold">prévisions financières</span> pour sécuriser la croissance et la rentabilité de l'entreprise.
                Véritable <span className="text-red-600 font-semibold">bras droit du dirigeant</span>, il porte plusieurs casquettes dans une PME, allant du contrôle de gestion à la gestion des risques financier.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-white to-${pillar.color}-50 border-${pillar.color}-200`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${pillar.color}-100`}>
                      <pillar.icon className={`w-8 h-8 text-${pillar.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pillar.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${pillar.color}-500 mt-1.5 flex-shrink-0`}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 1 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Les objectifs et les enjeux principaux de la fonction
            </h2>
            <p className="text-slate-600 mb-8">
              Les priorités des DAF pour les années à venir concernent l'amélioration du pilotage de la performance,
              la gestion du cash et des investissements, l'évolution vers un rôle de business partner stratégique et
              la gestion des talents. Dans un environnement incertain, le DAF devient garant de la résilience et doit
              intégrer des éléments extra-financiers (RSE ou indicateurs ESG : CA {'>'} 150M€) dans les modèles de performance.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-3">Conformité</h3>
                <ul className="space-y-2">
                  <li className="text-red-800">- Respect des normes comptables</li>
                  <li className="text-red-800">- Obligations fiscales</li>
                  <li className="text-red-800">- Audit et contrôles</li>
                  <li className="text-red-800">- Reporting réglementaire</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-3">Performance</h3>
                <ul className="space-y-2">
                  <li className="text-orange-800">- Optimisation de la rentabilité</li>
                  <li className="text-orange-800">- Maîtrise des coûts</li>
                  <li className="text-orange-800">- Amélioration du BFR</li>
                  <li className="text-orange-800">- ROI des investissements</li>
                  <li className="text-orange-800">- Aide à la décision stratégique</li>
                  <li className="text-orange-800">- Fiabilisation des budgets</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Transformation</h3>
                <ul className="space-y-2">
                  <li className="text-purple-800">- Digitalisation des processus</li>
                  <li className="text-purple-800">- Automatisation</li>
                  <li className="text-purple-800">- Business Intelligence</li>
                  <li className="text-purple-800">- Conduite du changement</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Les qualités nécessaires à l'exercice de ce métier
            </h2>
            <p className="text-slate-600 mb-8">
              Le métier requiert rigueur, sens de l'organisation, capacité à diriger des équipes et à communiquer
              avec des parties prenantes variées. Le DAF doit posséder une forte maîtrise technique (comptabilité,
              fiscalité, finance) et des compétences relationnelles pour négocier avec les partenaires extérieurs
              et soutenir la direction dans la prise de décision stratégique.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualities.map((quality, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <Award className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{quality.name}</h3>
                  <p className="text-white/90">{quality.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 3 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Les contraintes de ce métier
            </h2>
            <p className="text-slate-600 mb-8">
              Outre la complexité règlementaire et l'exigence de <strong>fiabilité</strong> des informations financières,
              le DAF doit <strong>gérer les risques</strong>, <strong>anticiper les besoins</strong> de trésorerie et
              assurer la conformité juridique. La pression des délais (clôtures, déclarations fiscales, obligations
              réglementaires) et la <strong>gestion des équipes</strong> constituent des défis au quotidien.
              L'évolution rapide des <strong>technologies</strong> et des normes requiert une veille constante.
            </p>

            <div className="space-y-4">
              {constraints.map((constraint, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">{constraint.name}</h3>
                      <p className="text-red-700">{constraint.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 4 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Les évolutions du métier
            </h2>
            <p className="text-slate-600 mb-8">
              La fonction DAF évolue vers davantage de pilotage stratégique et d'aide à la décision. La digitalisation croissante (solutions EPM, Power BI),
              l'intégration des critères RSE et l'essor de l'analyse prédictive transforment la manière de travailler. Le DAF devient un « Chief Value Officer » qui
              crée de la valeur en combinant expertise financière et vision extra-financière.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-400">
                <h3 className="text-xl font-bold text-red-900 mb-3">Années 2000 : Le DAF "Gardien du temple"</h3>
                <p className="text-red-800">
                  Forte dominance de la comptabilité et de la production de rapports réglementaires. Le DAF est avant tout
                  le garant de la fiabilité des chiffres.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-400">
                <h3 className="text-xl font-bold text-orange-900 mb-3">Années 2010 : Le DAF "Business Partner"</h3>
                <p className="text-orange-800">
                  Montée en puissance du contrôle de gestion. Le DAF devient un partenaire des autres directions (pour les
                  grands comptes) et de la direction pour la PME afin d'optimiser les budgets et la performance
                  opérationnelle.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Aujourd'hui : Le DAF "Stratège de la Donnée"</h3>
                <p className="text-blue-800">
                  La digitalisation transforme la fonction. L'expertise en analyse de données (<strong>Power BI</strong>), en modélisation
                  financière et en prospective devient cruciale. Le DAF est un acteur clé des décisions stratégiques long-terme.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-bold text-purple-900 mb-3">La réalité du métier</h4>
              <div className="bg-white/70 rounded-lg p-4">
                <p className="text-purple-800 italic">
                  "Plus qu'un métier, une évolution. Mon parcours illustre parfaitement l'évolution du métier de DAF ces 20 dernières années.
                  J'ai vécu la transformation de l'intérieur : de la comptabilité pure au business partnering,
                  de Excel à Power BI, de l'analyse historique à la modélisation prédictive."
                </p>
                <p className="text-sm text-purple-600 mt-2 font-semibold">
                  — 20+ années d'évolution dans la fonction financière, de l'audit à l'expertise en modélisation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t">
          <button
            onClick={() => activeSection > 0 && setActiveSection(activeSection - 1)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeSection === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={activeSection === 0}
          >
            Section précédente
          </button>

          <button
            onClick={handleSectionComplete}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {activeSection === sections.length - 1 && completedSections.length === sections.length - 1
              ? 'Terminer le chapitre'
              : 'Section suivante'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chapter1Representations;