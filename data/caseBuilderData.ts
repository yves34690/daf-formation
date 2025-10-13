import { ReactNode } from 'react';
import GlossaryTerm from '../components/Glossary/GlossaryTerm';

export interface StudentCase {
  id: string;
  createdAt: Date;
  studentName?: string;
  title: string;
  category: CaseCategory;
  challenge: {
    context: string;
    problem: string;
    impact: string;
  };
  solution: {
    approach: string;
    tools: string[];
    implementation: string;
  };
  results: {
    measurableROI: string;
    timeGains: string;
    otherBenefits: string[];
  };
  dafPerspective: {
    concerns: string[];
    questions: string;
  };
}

export type CaseCategory =
  | 'automation'
  | 'reporting'
  | 'collaboration'
  | 'financial'
  | 'hr-payroll'
  | 'data-analytics'
  | 'compliance'
  | 'process';

export interface CaseTemplate {
  id: CaseCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  examples: {
    challenge: string[];
    solutions: string[];
    benefits: string[];
  };
  dafConcerns: string[];
  typicalROI: string[];
}

export const CASE_TEMPLATES: CaseTemplate[] = [
  {
    id: 'automation',
    name: 'Automatisation IA/RPA',
    description: 'Automatiser des tâches répétitives avec l\'IA ou des robots',
    icon: '🤖',
    color: 'blue',
    examples: {
      challenge: [
        'Support client débordé par des tickets répétitifs',
        'Saisie manuelle de données chronophage',
        'Traitement de factures en masse',
        'Réponses automatiques aux demandes courantes'
      ],
      solutions: [
        'Chatbot IA pour les FAQ',
        'RPA pour la saisie de données',
        'OCR + IA pour lecture de documents',
        'Workflows automatisés'
      ],
      benefits: [
        'Réduction de 60-80% du temps de traitement',
        'Diminution des erreurs humaines',
        'Libération des équipes pour des tâches à valeur ajoutée',
        'Disponibilité 24h/24'
      ]
    },
    dafConcerns: [
      'Quel est le coût total (licence + formation + maintenance) ?',
      'Combien de temps pour atteindre le retour sur investissement ?',
      'Quels sont les risques en cas de panne ou dysfonctionnement ?',
      'L\'équipe va-t-elle accepter cette automatisation ?'
    ],
    typicalROI: [
      'Économie de 30-50% sur les coûts de traitement',
      'ROI positif en 12-18 mois',
      'Réduction de 40-60% des erreurs'
    ]
  },
  {
    id: 'reporting',
    name: 'Reporting & Business Intelligence',
    description: 'Automatiser et améliorer les reportings financiers',
    icon: '📊',
    color: 'purple',
    examples: {
      challenge: [
        'Reportings Excel manuels chronophages',
        'Données éparpillées dans plusieurs systèmes',
        'Pas de vision temps réel de la performance',
        'Erreurs fréquentes dans les calculs'
      ],
      solutions: [
        'Tableaux de bord Power BI automatisés',
        'Connexions API vers les sources de données',
        'Dashboards temps réel',
        'Alertes automatiques sur les KPI'
      ],
      benefits: [
        'Réduction de 70% du temps de création des reportings',
        'Vision temps réel des indicateurs',
        'Fiabilité accrue des données',
        'Aide à la décision renforcée'
      ]
    },
    dafConcerns: [
      'Comment garantir la fiabilité et la sécurité des données ?',
      'Quel budget pour les licences et la formation des équipes ?',
      'Qui sera responsable de la maintenance et des évolutions ?',
      'Comment s\'assurer de l\'adoption par la direction ?'
    ],
    typicalROI: [
      'Gain de 15-20 jours/mois sur la production de reportings',
      'ROI positif en 8-12 mois',
      'Amélioration de 50% de la réactivité décisionnelle'
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Communication',
    description: 'Améliorer la collaboration interne et l\'accès à l\'information',
    icon: '👥',
    color: 'green',
    examples: {
      challenge: [
        'Information éparpillée entre emails et fichiers',
        'Équipes distantes déconnectées',
        'Onboarding laborieux des nouveaux',
        'Recherche d\'information chronophage'
      ],
      solutions: [
        'Intranet moderne avec moteur de recherche',
        'Portail collaboratif unifié',
        'Workflows de validation digitalisés',
        'Base de connaissance centralisée'
      ],
      benefits: [
        'Réduction de 50% du temps de recherche d\'information',
        'Amélioration de l\'engagement des équipes',
        'Accélération de l\'onboarding',
        'Meilleure cohésion d\'équipe'
      ]
    },
    dafConcerns: [
      'Quel sera le taux d\'adoption par les équipes ?',
      'Comment mesurer concrètement les gains de productivité ?',
      'Quels coûts de conduite du changement prévoir ?',
      'Comment s\'assurer de la sécurité des données partagées ?'
    ],
    typicalROI: [
      'Économie de 30min/jour/employé en recherche d\'info',
      'Réduction de 40% du temps d\'onboarding',
      'ROI difficile à quantifier mais impact organisationnel fort'
    ]
  },
  {
    id: 'financial',
    name: 'Gestion financière & Comptable',
    description: 'Optimiser les processus financiers et comptables',
    icon: '💰',
    color: 'orange',
    examples: {
      challenge: [
        'Gestion de trésorerie manuelle et approximative',
        'Collecte de factures fournisseurs chronophage',
        'Manque de visibilité sur la rentabilité',
        'Préparation à la facturation électronique'
      ],
      solutions: [
        'Plateforme de gestion financière intégrée',
        'Automatisation des relances clients',
        'Tableaux de bord de trésorerie temps réel',
        'Workflows de validation digitalisés'
      ],
      benefits: [
        'Réduction de 50% du temps de clôture mensuelle',
        'Amélioration du BFR de 10-15%',
        'Vision temps réel de la trésorerie',
        'Conformité réglementaire renforcée'
      ]
    },
    dafConcerns: [
      'Comment s\'assurer de la conformité avec l\'expert-comptable ?',
      'Quels coûts de migration des données historiques ?',
      'Comment former les équipes aux nouveaux processus ?',
      'Quel accompagnement pour la facturation électronique ?'
    ],
    typicalROI: [
      'Économie de 3-5 jours/mois sur les clôtures',
      'Amélioration du BFR équivalent à 10-20K€ de trésorerie',
      'ROI positif en 6-12 mois'
    ]
  },
  {
    id: 'hr-payroll',
    name: 'RH & Paie',
    description: 'Digitaliser et automatiser la gestion RH et paie',
    icon: '👨‍💼',
    color: 'pink',
    examples: {
      challenge: [
        'Collecte manuelle des variables de paie',
        'Gestion papier des congés et absences',
        'Erreurs fréquentes sur les bulletins',
        'Pas d\'autonomie pour les employés'
      ],
      solutions: [
        'Plateforme RH tout-en-un avec self-service',
        'Application mobile pour les équipes terrain',
        'Workflows automatisés de validation',
        'Connexion directe avec l\'expert paie'
      ],
      benefits: [
        'Réduction de 90% du temps de préparation de paie',
        'Élimination des erreurs de saisie',
        'Autonomie des employés pour leurs documents',
        'Amélioration de l\'expérience collaborateur'
      ]
    },
    dafConcerns: [
      'Comment gérer la transition avec le prestataire paie actuel ?',
      'Quels coûts de formation et de conduite du changement ?',
      'Comment s\'assurer de la conformité URSSAF ?',
      'L\'équipe terrain va-t-elle adopter l\'outil mobile ?'
    ],
    typicalROI: [
      'Économie de 300-500€/mois sur la gestion administrative',
      'Réduction de 80% des réclamations paie',
      'ROI positif en 8-15 mois selon la taille'
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Exploiter les données pour la prise de décision',
    icon: '📈',
    color: 'indigo',
    examples: {
      challenge: [
        'Données silotées dans différents systèmes',
        'Pas d\'analyse prédictive possible',
        'Décisions basées sur l\'intuition',
        'KPIs calculés manuellement'
      ],
      solutions: [
        'Data Lake centralisé avec connecteurs',
        'Outils de Data Science et Machine Learning',
        'Dashboards prédictifs automatisés',
        'Alerts automatiques sur anomalies'
      ],
      benefits: [
        'Vision 360° de l\'activité en temps réel',
        'Capacité de prédiction et d\'anticipation',
        'Optimisation des performances opérationnelles',
        'Détection précoce des risques'
      ]
    },
    dafConcerns: [
      'Quelles compétences internes développer ?',
      'Comment quantifier le ROI d\'un projet data ?',
      'Quels investissements en infrastructure prévoir ?',
      'Comment s\'assurer de la qualité des données ?'
    ],
    typicalROI: [
      'Amélioration de 15-25% de l\'efficacité opérationnelle',
      'Réduction de 30% des risques non détectés',
      'ROI variable selon le niveau de maturité data'
    ]
  }
];

export interface CaseBuildingStep {
  id: number;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number';
  placeholder?: string;
  options?: string[];
  required: boolean;
  helpText?: string;
}

export const CASE_BUILDING_STEPS: CaseBuildingStep[] = [
  {
    id: 1,
    title: 'Contexte & Défi',
    description: 'Décrivez la situation actuelle et le problème à résoudre',
    fields: [
      {
        id: 'title',
        label: 'Titre du cas',
        type: 'text',
        placeholder: 'Ex: Automatisation du support client chez TechStart',
        required: true,
        helpText: 'Un titre accrocheur qui résume votre cas'
      },
      {
        id: 'category',
        label: 'Catégorie',
        type: 'select',
        options: CASE_TEMPLATES.map(t => t.name),
        required: true,
        helpText: 'Choisissez la catégorie qui correspond le mieux'
      },
      {
        id: 'challenge.context',
        label: 'Contexte de l\'entreprise',
        type: 'textarea',
        placeholder: 'Ex: PME de 45 employés dans la restauration rapide avec 4 points de vente...',
        required: true,
        helpText: 'Décrivez l\'entreprise : taille, secteur, organisation actuelle'
      },
      {
        id: 'challenge.problem',
        label: 'Problème principal',
        type: 'textarea',
        placeholder: 'Ex: La gestion manuelle des horaires variables génère des erreurs de paie récurrentes...',
        required: true,
        helpText: 'Quel est le problème concret que vous voulez résoudre ?'
      },
      {
        id: 'challenge.impact',
        label: 'Impact du problème',
        type: 'textarea',
        placeholder: 'Ex: 5h/semaine perdues, réclamations clients, stress des équipes...',
        required: true,
        helpText: 'Quelles sont les conséquences négatives actuelles ?'
      }
    ]
  },
  {
    id: 2,
    title: 'Solution proposée',
    description: 'Détaillez votre approche et les outils envisagés',
    fields: [
      {
        id: 'solution.approach',
        label: 'Approche générale',
        type: 'textarea',
        placeholder: 'Ex: Implémenter une solution SaaS de gestion RH avec application mobile...',
        required: true,
        helpText: 'Comment comptez-vous résoudre le problème ?'
      },
      {
        id: 'solution.tools',
        label: 'Outils/Technologies',
        type: 'multiselect',
        options: ['SaaS', 'Application mobile', 'IA/Machine Learning', 'RPA', 'API/Intégrations', 'Cloud', 'Power BI', 'ERP', 'CRM', 'Workflows', 'Autre'],
        required: true,
        helpText: 'Quels types d\'outils allez-vous utiliser ?'
      },
      {
        id: 'solution.implementation',
        label: 'Plan de mise en œuvre',
        type: 'textarea',
        placeholder: 'Ex: Phase 1: Formation équipes (2 semaines), Phase 2: Migration données (1 mois)...',
        required: true,
        helpText: 'Comment planifiez-vous le déploiement ?'
      }
    ]
  },
  {
    id: 3,
    title: 'Résultats attendus',
    description: 'Quantifiez les bénéfices et le ROI de votre solution',
    fields: [
      {
        id: 'results.measurableROI',
        label: 'ROI mesurable',
        type: 'textarea',
        placeholder: 'Ex: Économie de 300€/mois, ROI positif en 12 mois, réduction de 50% des erreurs...',
        required: true,
        helpText: 'Donnez des chiffres concrets et vérifiables'
      },
      {
        id: 'results.timeGains',
        label: 'Gains de temps',
        type: 'textarea',
        placeholder: 'Ex: 5h/semaine économisées, réduction de 70% du temps de traitement...',
        required: true,
        helpText: 'Quantifiez les gains de temps pour les équipes'
      },
      {
        id: 'results.otherBenefits',
        label: 'Autres bénéfices',
        type: 'multiselect',
        options: ['Amélioration qualité', 'Satisfaction client', 'Motivation équipes', 'Conformité réglementaire', 'Sécurité des données', 'Évolutivité', 'Autre'],
        required: false,
        helpText: 'Quels autres avantages apporte votre solution ?'
      }
    ]
  },
  {
    id: 4,
    title: 'Perspective DAF',
    description: 'Anticipez les questions et préoccupations du DAF',
    fields: [
      {
        id: 'dafPerspective.concerns',
        label: 'Préoccupations du DAF',
        type: 'multiselect',
        options: [
          'Coût total de possession',
          'Temps de retour sur investissement',
          'Risques de sécurité',
          'Résistance au changement',
          'Formation des équipes',
          'Fiabilité de la solution',
          'Conformité réglementaire',
          'Maintenance et support',
          'Évolutivité',
          'Dépendance fournisseur'
        ],
        required: true,
        helpText: 'Quelles seront les principales inquiétudes du DAF ?'
      },
      {
        id: 'dafPerspective.questions',
        label: 'Questions types du DAF',
        type: 'textarea',
        placeholder: 'Ex: "Quel est le coût de formation ?", "Que se passe-t-il si le fournisseur fait faillite ?"...',
        required: true,
        helpText: 'Listez 3-5 questions que le DAF pourrait poser'
      }
    ]
  }
];

export const getTemplateByCategory = (category: CaseCategory): CaseTemplate | undefined => {
  return CASE_TEMPLATES.find(template => template.id === category);
};

export const validateCase = (caseData: Partial<StudentCase>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!caseData.title?.trim()) {
    errors.push('Le titre est obligatoire');
  }

  if (!caseData.category) {
    errors.push('La catégorie est obligatoire');
  }

  if (!caseData.challenge?.context?.trim()) {
    errors.push('Le contexte de l\'entreprise est obligatoire');
  }

  if (!caseData.challenge?.problem?.trim()) {
    errors.push('La description du problème est obligatoire');
  }

  if (!caseData.solution?.approach?.trim()) {
    errors.push('L\'approche de solution est obligatoire');
  }

  if (!caseData.results?.measurableROI?.trim()) {
    errors.push('Le ROI mesurable est obligatoire');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateCaseId = (): string => {
  return `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const saveCaseToLocalStorage = (studentCase: StudentCase, userId: string): void => {
  try {
    const existingCases = getCasesFromLocalStorage(userId);
    const updatedCases = [...existingCases, studentCase];
    localStorage.setItem(`daf_student_cases-${userId}`, JSON.stringify(updatedCases));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du cas:', error);
  }
};

export const getCasesFromLocalStorage = (userId: string): StudentCase[] => {
  try {
    const cases = localStorage.getItem(`daf_student_cases-${userId}`);
    return cases ? JSON.parse(cases) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des cas:', error);
    return [];
  }
};

export const deleteCaseFromLocalStorage = (caseId: string, userId: string): void => {
  try {
    const existingCases = getCasesFromLocalStorage(userId);
    const updatedCases = existingCases.filter(c => c.id !== caseId);
    localStorage.setItem(`daf_student_cases-${userId}`, JSON.stringify(updatedCases));
  } catch (error) {
    console.error('Erreur lors de la suppression du cas:', error);
  }
};