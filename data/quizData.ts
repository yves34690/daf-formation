import { ReactNode } from 'react';

export interface QuizQuestion {
  id: number;
  category: 'comptabilite' | 'conformite' | 'controle' | 'performance' | 'qualites' | 'contraintes' | 'evolutions';
  question: string | ReactNode;
  options: Array<{
    id: string;
    text: string | ReactNode;
    isCorrect: boolean;
  }>;
  explanation: string | ReactNode;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'comptabilite',
    name: 'Comptabilité & Trésorerie',
    description: 'Supervision comptable et gestion des flux financiers',
    color: 'blue',
    icon: '💰'
  },
  {
    id: 'conformite',
    name: 'Conformité & Réglementation',
    description: 'Respect des normes et obligations légales',
    color: 'green',
    icon: '🛡️'
  },
  {
    id: 'controle',
    name: 'Contrôle de gestion & Analyse',
    description: 'Pilotage de la performance et aide à la décision',
    color: 'orange',
    icon: '📊'
  },
  {
    id: 'performance',
    name: 'Performance économique',
    description: 'Optimisation et business partnering',
    color: 'purple',
    icon: '🎯'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // === COMPTABILITÉ & TRÉSORERIE ===
  {
    id: 1,
    category: 'comptabilite',
    question: "Quelles sont les principales missions du DAF en matière de trésorerie ?",
    options: [
      {
        id: 'a',
        text: 'Uniquement surveiller le niveau de liquidités',
        isCorrect: false
      },
      {
        id: 'b',
        text: "Piloter les flux, optimiser les financements et gérer les risques de liquidité",
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Déléguer entièrement la gestion à la banque',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Se contenter de faire les virements ponctuels',
        isCorrect: false
      }
    ],
    explanation: "Le DAF assure une gestion active de la trésorerie : pilotage des flux entrants/sortants, optimisation des placements et financements, gestion des risques de change et de liquidité, négociation bancaire.",
    difficulty: 'facile'
  },
  {
    id: 2,
    category: 'comptabilite',
    question: 'Quelle est la fréquence typique des arrêtés comptables dans une PME ?',
    options: [
      {
        id: 'a',
        text: 'Uniquement annuelle',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Mensuelle pour le pilotage, annuelle pour la légal',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Hebdomadaire',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Selon les humeurs du dirigeant',
        isCorrect: false
      }
    ],
    explanation: "Les arrêtés mensuels permettent un pilotage régulier de l'activité, tandis que l'arrêté annuel répond aux obligations légales de publication des comptes.",
    difficulty: 'facile'
  },
  {
    id: 3,
    category: 'comptabilite',
    question: "Qu'est-ce que le BFR et pourquoi est-il crucial pour un DAF ?",
    options: [
      {
        id: 'a',
        text: 'Le Bureau des Finances Régionales',
        isCorrect: false
      },
      {
        id: 'b',
        text: "Le Besoin en Fonds de Roulement, indicateur clé de l'équilibre financier",
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Le Bilan Financier Résumé',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Le Budget des Frais de Réception',
        isCorrect: false
      }
    ],
    explanation: "Le BFR (Besoin en Fonds de Roulement) mesure les besoins de financement du cycle d'exploitation. Sa maîtrise est essentielle pour optimiser la trésorerie et éviter les difficultés financières.",
    difficulty: 'moyen'
  },

  // === CONFORMITÉ & RÉGLEMENTATION ===
  {
    id: 4,
    category: 'conformite',
    question: "Que signifie 'CAC' dans le contexte financier français ?",
    options: [
      {
        id: 'a',
        text: 'Customer Acquisition Cost',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Commissaire aux Comptes',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Centre d\'Analyse Comptable',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Conseil en Audit Comptable',
        isCorrect: false
      }
    ],
    explanation: "Le CAC (Commissaire aux Comptes) est un professionnel indépendant chargé de certifier la régularité et la sincérité des comptes annuels des entreprises.",
    difficulty: 'facile'
  },
  {
    id: 5,
    category: 'conformite',
    question: 'Quand une PME est-elle obligée de nommer un Commissaire aux Comptes ?',
    options: [
      {
        id: 'a',
        text: 'Dès la création de l\'entreprise',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Si elle dépasse 2 des 3 seuils : 4M€ de CA, 2M€ de bilan, 50 salariés',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Uniquement pour les sociétés cotées',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Jamais pour les PME',
        isCorrect: false
      }
    ],
    explanation: 'Les seuils de nomination obligatoire d\'un CAC pour les PME sont définis par le Code de commerce : CA > 4M€, total bilan > 2M€, ou effectif > 50 salariés (2 seuils sur 3).',
    difficulty: 'moyen'
  },
  {
    id: 6,
    category: 'conformite',
    question: "Qu'est-ce que la 'due diligence' ?",
    options: [
      {
        id: 'a',
        text: 'Une obligation de politesse en réunion',
        isCorrect: false
      },
      {
        id: 'b',
        text: "Un audit approfondi réalisé lors d'acquisitions d'entreprises",
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Une technique de négociation commerciale',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Un rapport de conformité annuel',
        isCorrect: false
      }
    ],
    explanation: "La due diligence est un processus d'audit complet permettant d'évaluer les risques financiers, juridiques et opérationnels avant une acquisition ou cession d'entreprise.",
    difficulty: 'moyen'
  },

  // === CONTRÔLE DE GESTION & ANALYSE ===
  {
    id: 7,
    category: 'controle',
    question: "Que signifie KPI en contrôle de gestion ?",
    options: [
      {
        id: 'a',
        text: 'Key Performance Indicator (Indicateur Clé de Performance)',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'Keep Profit Increasing',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Knowledge Process Improvement',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Key Process Integration',
        isCorrect: false
      }
    ],
    explanation: "Les KPI (Indicateurs Clés de Performance) permettent de mesurer l'efficacité des actions entreprises et de piloter la performance de l'entreprise.",
    difficulty: 'facile'
  },
  {
    id: 8,
    category: 'controle',
    question: "Quel est l'objectif principal du reporting financier ?",
    options: [
      {
        id: 'a',
        text: 'Impressionner les investisseurs avec de beaux graphiques',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Fournir une information fiable pour la prise de décision',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Occuper le temps des équipes finance',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Satisfaire uniquement les obligations légales',
        isCorrect: false
      }
    ],
    explanation: "Le reporting doit fournir une information synthétique, fiable et actionnable pour éclairer les décisions stratégiques et opérationnelles de l'entreprise.",
    difficulty: 'facile'
  },
  {
    id: 9,
    category: 'controle',
    question: "Qu'est-ce qu'un tableau de bord pour un DAF ?",
    options: [
      {
        id: 'a',
        text: 'Un simple fichier Excel avec des données',
        isCorrect: false
      },
      {
        id: 'b',
        text: "Un outil de pilotage visuel centralisant les KPI clés",
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Une liste de tâches quotidiennes',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Un rapport comptable mensuel',
        isCorrect: false
      }
    ],
    explanation: "Un tableau de bord efficace présente visuellement les indicateurs essentiels en temps réel, permettant un pilotage proactif de la performance.",
    difficulty: 'facile'
  },

  // === PERFORMANCE ÉCONOMIQUE ===
  {
    id: 10,
    category: 'performance',
    question: "Comment calculer le ROI d'un investissement ?",
    options: [
      {
        id: 'a',
        text: 'Coût total / Bénéfice',
        isCorrect: false
      },
      {
        id: 'b',
        text: '(Bénéfice - Coût) / Coût × 100',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Bénéfice × Coût / 100',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Ça dépend de l\'humeur du dirigeant',
        isCorrect: false
      }
    ],
    explanation: "Le ROI (Return On Investment) se calcule : (Gain obtenu - Coût de l'investissement) / Coût de l'investissement × 100. C'est un indicateur clé pour justifier les investissements.",
    difficulty: 'moyen'
  },
  {
    id: 11,
    category: 'performance',
    question: "Qu'est-ce que le rôle de 'business partner' du DAF ?",
    options: [
      {
        id: 'a',
        text: 'Être uniquement un producteur de chiffres',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Conseiller et accompagner la direction dans la stratégie',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Remplacer le directeur général',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Se contenter de contrôler les dépenses',
        isCorrect: false
      }
    ],
    explanation: "Le DAF business partner apporte son expertise financière pour éclairer les décisions stratégiques, analyser la rentabilité des projets et participer activement à la création de valeur.",
    difficulty: 'moyen'
  },
  {
    id: 12,
    category: 'performance',
    question: "Dans une PME, quelle est la spécificité du rôle du DAF ?",
    options: [
      {
        id: 'a',
        text: 'Il a exactement les mêmes missions qu\'in grand groupe',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Il porte plusieurs casquettes et a un rôle plus polyvalent',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Il ne s\'occupe que de la comptabilité',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Il n\'existe pas dans les PME',
        isCorrect: false
      }
    ],
    explanation: "Dans une PME, le DAF cumule souvent plusieurs fonctions : finance, RH, juridique, IT, et est plus proche du terrain opérationnel que dans les grandes structures.",
    difficulty: 'facile'
  },

  // === QUALITÉS NÉCESSAIRES ===
  {
    id: 13,
    category: 'qualites',
    question: "Quelle est la qualité la plus importante pour un DAF moderne ?",
    options: [
      {
        id: 'a',
        text: 'Maîtriser parfaitement Excel',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Allier rigueur technique et vision stratégique',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Éviter tout contact avec les opérationnels',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Se concentrer uniquement sur les chiffres',
        isCorrect: false
      }
    ],
    explanation: "Le DAF moderne doit combiner expertise technique (finance, comptabilité) et compétences business pour être un véritable partenaire stratégique.",
    difficulty: 'moyen'
  },

  // === ÉVOLUTIONS DU MÉTIER ===
  {
    id: 14,
    category: 'evolutions',
    question: 'Comment le métier de DAF a-t-il évolué ces 20 dernières années ?',
    options: [
      {
        id: 'a',
        text: 'Aucune évolution notable',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'D\'un rôle de contrôle vers un rôle de business partner stratégique',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Vers moins de responsabilités',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Uniquement une évolution technologique',
        isCorrect: false
      }
    ],
    explanation: "Le métier est passé du DAF 'gardien du temple' (années 2000) au 'business partner' (années 2010) puis au 'stratège de la donnée' (aujourd'hui).",
    difficulty: 'moyen'
  },
  {
    id: 15,
    category: 'evolutions',
    question: "Qu'est-ce que la RSE et pourquoi impacte-t-elle le DAF ?",
    options: [
      {
        id: 'a',
        text: 'Responsabilité Sociale des Entreprises - nouveaux indicateurs à intégrer',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'Réseau Social d\'Entreprise - outil de communication',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Rapport de Sécurité Externe',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Ça ne concerne pas le DAF',
        isCorrect: false
      }
    ],
    explanation: "La RSE (Responsabilité Sociale des Entreprises) oblige le DAF à intégrer des critères extra-financiers (environnement, social, gouvernance) dans ses analyses et reportings.",
    difficulty: 'difficile'
  }
];

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  answeredQuestions: Array<{
    questionId: number;
    selectedOption: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  completedAt: Date;
  timeSpent: number;
}

export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  return QUIZ_QUESTIONS.filter(q => q.category === category);
};

export const calculateScore = (answers: Record<number, string>): QuizResult => {
  const answeredQuestions = Object.entries(answers).map(([questionId, selectedOption]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId));
    const isCorrect = question?.options.find(opt => opt.id === selectedOption)?.isCorrect || false;

    return {
      questionId: parseInt(questionId),
      selectedOption,
      isCorrect,
      timeSpent: 0 // À implémenter si nécessaire
    };
  });

  const totalQuestions = answeredQuestions.length;
  const correctAnswers = answeredQuestions.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Calcul des scores par catégorie
  const categoryScores: Record<string, { correct: number; total: number }> = {};

  answeredQuestions.forEach(answer => {
    const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId);
    if (question) {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;
      if (answer.isCorrect) {
        categoryScores[question.category].correct++;
      }
    }
  });

  return {
    score: correctAnswers,
    totalQuestions,
    percentage,
    categoryScores,
    answeredQuestions,
    completedAt: new Date(),
    timeSpent: 0
  };
};