import React, { useState } from 'react';
import ChapterNavigation from './ChapterNavigation';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import Chapter1Representations from './ChapterContent/Chapter1Representations';
// Import des autres chapitres qui seront créés plus tard
// import Chapter2Evolutions from './ChapterContent/Chapter2Evolutions';
// import Chapter3Reality from './ChapterContent/Chapter3Reality';
// import Chapter4Communication from './ChapterContent/Chapter4Communication';
// import Chapter5Preparation from './ChapterContent/Chapter5Preparation';

interface CourseViewProps {
  onComplete: () => void;
}

const CourseView: React.FC<CourseViewProps> = ({ onComplete }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const chapters = [
    { id: 1, title: 'Les représentations du métier', duration: 90, completed: false, current: true, locked: false },
    { id: 2, title: 'La réalité du métier', duration: 45, completed: false, current: false, locked: true },
    { id: 3, title: 'Préparation à la mise en situation', duration: 60, completed: false, current: false, locked: true },
    { id: 4, title: 'Préparation au Business Game', duration: 45, completed: false, current: false, locked: true },
  ];

  const chaptersWithStatus = chapters.map(chapter => ({
    ...chapter,
    completed: completedChapters.includes(chapter.id),
    current: chapter.id === currentChapter,
    // Pour l'instant, déverrouiller tous les chapitres pour faciliter la navigation
    locked: false // chapter.id > 1 && !completedChapters.includes(chapter.id - 1)
  }));

  const handleChapterComplete = () => {
    if (!completedChapters.includes(currentChapter)) {
      setCompletedChapters([...completedChapters, currentChapter]);
    }

    // Passer au chapitre suivant si disponible
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
    } else {
      // Tous les chapitres sont terminés
      onComplete();
    }
  };

  const handleSelectChapter = (chapterId: number) => {
    // Pour l'instant, permettre de naviguer librement entre tous les chapitres
    setCurrentChapter(chapterId);

    // Version verrouillée pour plus tard :
    // if (chapterId === 1 || completedChapters.includes(chapterId - 1)) {
    //   setCurrentChapter(chapterId);
    // }
  };

  const renderChapterContent = () => {
    switch (currentChapter) {
      case 1:
        return <Chapter1Representations onComplete={handleChapterComplete} />;
      case 2:
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Chapitre 2 : La réalité du métier
              </h2>
              <p className="text-slate-600 mb-6">
                Ce chapitre présente le parcours professionnel type d'un DAF et des cas concrets :
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Le parcours professionnel – comprendre le background</h3>
                  <p className="text-blue-800 mb-4">
                    Après plus de 20 ans dans la finance d'entreprise, j'ai vu la fonction se métamorphoser.
                    On est passé d'un rôle de contrôle à un rôle de véritable co-pilote de la stratégie.
                    Mon quotidien, c'est de traduire des données brutes en décisions éclairées.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-red-700 mb-2">2001-2012 : Audit & Expertise Comptable</h4>
                      <ul className="text-sm text-red-600 space-y-1">
                        <li>• Formation solide aux fondamentaux</li>
                        <li>• Gestion de portefeuilles clients</li>
                        <li>• Développement de l'expertise conseil</li>
                        <li>• Première approche audit et contrôle</li>
                      </ul>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-orange-700 mb-2">2012-2017 : DAF franchise restauration</h4>
                      <ul className="text-sm text-orange-600 space-y-1">
                        <li>• Transition vers pilotage opérationnel</li>
                        <li>• Mise en place processus gestion</li>
                        <li>• Premier contact management équipe</li>
                        <li>• Découverte franchise et spécificités</li>
                      </ul>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">2018-Aujourd'hui : DAF & Expert Modélisation</h4>
                      <ul className="text-sm text-purple-600 space-y-1">
                        <li>• Développement expertise Power BI</li>
                        <li>• Modélisation financière collectivités</li>
                        <li>• Gestion fusion d'entreprises</li>
                        <li>• Montage dossiers CIR complexes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Des défis et des cas concrets</h3>
                  <p className="text-green-800 mb-4 italic">
                    "Si vous voulez réussir votre approche avec un DAF, oubliez le discours produit. Parlez ROI (Retour sur investissement mesurable),
                    parlez processus, parlez gains de temps et optimisation. Nous sommes des gens pragmatiques qui cherchons des solutions concrètes
                    avec des risques maîtrisés."
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-green-700 mb-3">🔄 Fusion de sociétés du groupe</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong className="text-green-800">Défi :</strong> <span className="text-green-600">Organiser et réaliser la fusion de plusieurs entités tout en maintenant l'activité</span></div>
                        <div><strong className="text-green-800">Solution :</strong> <span className="text-green-600">Mise en place d'un plan de fusion structuré, harmonisation des systèmes comptables, accompagnement des équipes</span></div>
                        <div><strong className="text-green-800">Résultat :</strong> <span className="text-green-600">Fusion réussie sans interruption d'activité, synergies réalisées sur les coûts administratifs</span></div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-green-700 mb-3">🎯 Montage dossier CIR</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong className="text-green-800">Défi :</strong> <span className="text-green-600">Optimiser le Crédit Impôt Recherche sur un projet de développement technologique</span></div>
                        <div><strong className="text-green-800">Solution :</strong> <span className="text-green-600">Analyse juridique approfondie, documentation technique, montage du dossier complet</span></div>
                        <div><strong className="text-green-800">Résultat :</strong> <span className="text-green-600">Dépôt des dossiers complets dans les délais, obtention d'un rescrit fiscal et du CIR</span></div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-green-700 mb-3">📊 Mise en place Power BI</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong className="text-green-800">Défi :</strong> <span className="text-green-600">Automatiser le reporting et créer des dashboards temps réel pour la direction</span></div>
                        <div><strong className="text-green-800">Solution :</strong> <span className="text-green-600">Déploiement Power BI, formation des équipes, création de 12 dashboards interactifs</span></div>
                        <div><strong className="text-green-800">Résultat :</strong> <span className="text-green-600">Réduction du temps de reporting, amélioration significative de la réactivité décisionnelle</span></div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-green-700 mb-3">🔮 Modélisation prospective</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong className="text-green-800">Défi :</strong> <span className="text-green-600">Créer des modèles financiers pour l'évaluation de projets de collectivités</span></div>
                        <div><strong className="text-green-800">Solution :</strong> <span className="text-green-600">Développement de modèles avancés avec simulations de scénarios multiples</span></div>
                        <div><strong className="text-green-800">Résultat :</strong> <span className="text-green-600">Mise à disposition de modèles pilotables par la direction de projet et le client</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChapterComplete}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Continuer vers la préparation
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Chapitre 3 : Préparation à la mise en situation
              </h2>
              <p className="text-slate-600 mb-6">
                Maîtrisez les bonnes pratiques pour communiquer efficacement avec un DAF et optimisez vos chances de succès commercial.
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">📋 Préparation amont</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-blue-700 mb-2">Recherche approfondie</h4>
                      <p className="text-sm text-blue-600">
                        Analysez les derniers résultats financiers, communiqués, secteur d'activité.
                        Consultez rapports annuels, sites spécialisés (Societe.com, Infogreffe).
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-blue-700 mb-2">Identification des enjeux</h4>
                      <p className="text-sm text-blue-600">
                        Comprenez les défis spécifiques : Croissance, rentabilité, transformation digitale,
                        conformité réglementaire.
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-blue-700 mb-2">Personnalisation du discours</h4>
                      <p className="text-sm text-blue-600">
                        Adaptez votre proposition aux problématiques identifiées.
                        Préparez des cas d'usage concrets similaires à leur contexte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">💬 Pendant l'entretien - Questions SPIN adaptées</h3>
                  <p className="text-orange-800 mb-4 text-sm italic">Des questions ciblées pour découvrir les vrais enjeux financiers</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-red-600 text-white rounded-lg p-3">
                        <h4 className="font-bold text-sm mb-2">Situation</h4>
                        <ul className="text-xs space-y-1">
                          <li>• Comment gérez-vous actuellement vos reportings financiers ?</li>
                          <li>• Quels outils utilisez-vous pour le pilotage de la performance ?</li>
                          <li>• Quelle est votre fréquence de clôture comptable ?</li>
                        </ul>
                      </div>

                      <div className="bg-red-600 text-white rounded-lg p-3">
                        <h4 className="font-bold text-sm mb-2">Problème</h4>
                        <ul className="text-xs space-y-1">
                          <li>• Quelles sont vos principales difficultés en matière de consolidation ?</li>
                          <li>• Combien de temps consacrez-vous aux tâches répétitives ?</li>
                          <li>• Avez-vous des problèmes de fiabilité ou de délais sur vos données ?</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-red-600 text-white rounded-lg p-3">
                        <h4 className="font-bold text-sm mb-2">Implications</h4>
                        <ul className="text-xs space-y-1">
                          <li>• Quel est l'impact de ces délais sur vos prises de décision ?</li>
                          <li>• Comment ces problèmes affectent-ils votre relation avec la direction ?</li>
                          <li>• Quels risques cela représente-t-il pour la conformité ?</li>
                        </ul>
                      </div>

                      <div className="bg-red-600 text-white rounded-lg p-3">
                        <h4 className="font-bold text-sm mb-2">Nécessité</h4>
                        <ul className="text-xs space-y-1">
                          <li>• Quelle priorité donnez-vous à la résolution de ces enjeux ?</li>
                          <li>• Quel budget avez-vous alloué à l'amélioration de ces processus ?</li>
                          <li>• Quels seraient les bénéfices d'une solution efficace ?</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">🎯 Argumentation</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">ROI quantifié</h4>
                      <p className="text-sm text-purple-600">
                        Présentez des chiffres concrets et vérifiables :
                      </p>
                      <ul className="text-xs text-purple-600 mt-2 space-y-1">
                        <li>• Gains de temps en heures</li>
                        <li>• Réduction de coûts en euros</li>
                        <li>• Amélioration de KPI</li>
                      </ul>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">Gestion des risques</h4>
                      <p className="text-sm text-purple-600">
                        Adressez les préoccupations de conformité et de sécurité :
                      </p>
                      <ul className="text-xs text-purple-600 mt-2 space-y-1">
                        <li>• Certifications, références clients</li>
                        <li>• Garanties, plan de déploiement</li>
                        <li>• Progressif</li>
                      </ul>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">Preuves et références</h4>
                      <p className="text-sm text-purple-600">
                        Apportez des cas clients similaires et témoignages :
                      </p>
                      <ul className="text-xs text-purple-600 mt-2 space-y-1">
                        <li>• Études de cas dans le même</li>
                        <li>• Secteur avec résultats mesurés</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Erreurs courantes à éviter</h3>
                  <p className="text-gray-700 mb-4 text-sm italic">Les pièges classiques qui peuvent compromettre votre négociation</p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left p-3 bg-red-100 font-bold text-red-800">⚠️ Erreur</th>
                          <th className="text-left p-3 bg-orange-100 font-bold text-orange-800">⚡ Conséquence</th>
                          <th className="text-left p-3 bg-green-100 font-bold text-green-800">✅ Solution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="p-3 bg-red-50 text-red-700">Se focaliser sur les fonctionnalités techniques</td>
                          <td className="p-3 bg-orange-50 text-orange-700">Le DAF ne voit pas la valeur business</td>
                          <td className="p-3 bg-green-50 text-green-700">Traduire chaque fonctionnalité en bénéfice financier mesurable</td>
                        </tr>
                        <tr>
                          <td className="p-3 bg-red-50 text-red-700">Négliger les contraintes opérationnelles</td>
                          <td className="p-3 bg-orange-50 text-orange-700">Proposition irréaliste ou non applicable</td>
                          <td className="p-3 bg-green-50 text-green-700">Comprendre les processus existants et l'écosystème IT</td>
                        </tr>
                        <tr>
                          <td className="p-3 bg-red-50 text-red-700">Sous-estimer l'importance de la conformité</td>
                          <td className="p-3 bg-orange-50 text-orange-700">Blocage immédiat sur les aspects réglementaires</td>
                          <td className="p-3 bg-green-50 text-green-700">Anticiper les questions de sécurité, audit et conformité</td>
                        </tr>
                        <tr>
                          <td className="p-3 bg-red-50 text-red-700">Proposer un ROI trop optimiste</td>
                          <td className="p-3 bg-orange-50 text-orange-700">Perte de crédibilité et méfiance</td>
                          <td className="p-3 bg-green-50 text-green-700">Être conservateur et transparent sur les hypothèses</td>
                        </tr>
                        <tr>
                          <td className="p-3 bg-red-50 text-red-700">Ignorer l'impact sur les équipes</td>
                          <td className="p-3 bg-orange-50 text-orange-700">Résistance au changement non anticipée</td>
                          <td className="p-3 bg-green-50 text-green-700">Aborder la conduite du changement et la formation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChapterComplete}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Continuer vers la préparation Business Game
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Chapitre 4 : Préparation au Business Game
              </h2>
              <p className="text-slate-600 mb-6">
                Préparez-vous pour la mise en pratique de l'après-midi avec les 6 scénarios d'entreprises.
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">🎮 Les 6 scénarios du Business Game</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">Dust - IA pour Support Client</h4>
                        <p className="text-xs text-blue-600">PME logiciel débordée par tickets répétitifs</p>
                      </div>

                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">Mozzaik - Intranet Microsoft 365</h4>
                        <p className="text-xs text-blue-600">Distribution bio avec info éparpillée</p>
                      </div>

                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">Pennylane - Gestion Financière</h4>
                        <p className="text-xs text-blue-600">BTP avec gestion éclatée et facturation électronique</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">PayFit - RH et Paie</h4>
                        <p className="text-xs text-blue-600">Restauration avec horaires variables complexes</p>
                      </div>

                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">Finthesis - Reporting BI</h4>
                        <p className="text-xs text-blue-600">Start-up SaaS avec reporting Excel manuel</p>
                      </div>

                      <div className="bg-white/70 rounded-lg p-3">
                        <h4 className="font-bold text-blue-700 text-sm">Capgemini - Transformation Data</h4>
                        <p className="text-xs text-blue-600">Industrie mécanique avec données silotées</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">🎯 Stratégies de négociation recommandées</h3>
                  <div className="space-y-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">1. Analyser la matrice SPIN</h4>
                      <p className="text-sm text-purple-600">
                        Chaque cas présente : Situation → Problème → Implication → Nécessité.
                        Utilisez cette structure pour guider votre approche.
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">2. Focus sur le ROI mesurable</h4>
                      <p className="text-sm text-purple-600">
                        Quantifiez : temps gagné, coûts évités, risques réduits.
                        Ex: "90% de temps en moins sur la paie = 300€/mois économisés"
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-bold text-purple-700 mb-2">3. Adresser les contraintes spécifiques</h4>
                      <p className="text-sm text-purple-600">
                        Chaque PME a ses particularités : horaires variables, facturation électronique,
                        télétravail, etc. Personnalisez votre réponse.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">💡 Message clé du formateur</h3>
                  <div className="bg-white/70 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-orange-800 italic font-medium">
                      "Si vous voulez réussir votre approche avec un DAF, oubliez le discours produit. Parlez <strong>ROI</strong> (Retour sur investissement mesurable),
                      parlez <strong>processus</strong>, parlez <strong>gains de temps</strong> et <strong>optimisation</strong>.
                      Nous sommes des gens pragmatiques qui cherchons des solutions concrètes avec des <strong>risques maîtrisés</strong>."
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChapterComplete}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                🎯 Terminer la formation et lancer le Business Game !
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-full lg:max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-20 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg lg:hidden"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}

        <div className="flex gap-6">
          {/* Sidebar Navigation - Desktop */}
          <div className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300' : 'flex-shrink-0'}
            ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
            ${isMobile ? 'w-full sm:w-80 bg-white shadow-xl' : ''}
            ${isMobile ? 'top-16' : ''}
          `}>
            <ChapterNavigation
              chapters={chaptersWithStatus}
              onSelectChapter={(chapterId) => {
                handleSelectChapter(chapterId);
                if (isMobile) {
                  setIsSidebarOpen(false);
                }
              }}
              currentChapterId={currentChapter}
            />
          </div>

          {/* Overlay for mobile */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 ${isMobile ? 'mt-8' : ''}`}>
            {renderChapterContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;