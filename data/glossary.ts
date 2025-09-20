export interface GlossaryTerm {
  id: string;
  term: string;
  abbreviation?: string;
  definition: string;
  detailedDefinition?: string;
  category: 'finance' | 'business' | 'technology' | 'methods' | 'legal';
  relatedTerms?: string[];
  example?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  'DAF': {
    id: 'daf',
    term: 'DAF',
    abbreviation: 'Directeur Administratif et Financier',
    definition: 'Responsable de la gestion financière, comptable et administrative d\'une entreprise.',
    detailedDefinition: 'Le DAF supervise les budgets, la trésorerie, le reporting financier et pilote la performance économique. Il est le garant de la fiabilité des informations financières et accompagne la direction dans les décisions stratégiques.',
    category: 'finance',
    relatedTerms: ['CAC', 'ROI', 'EBITDA', 'BFR'],
    example: 'Le DAF présente les résultats trimestriels au conseil d\'administration.',
    level: 'beginner'
  },

  'CAC': {
    id: 'cac',
    term: 'CAC',
    abbreviation: 'Commissaire aux Comptes',
    definition: 'Auditeur indépendant chargé de vérifier et certifier la sincérité des comptes annuels d\'une entreprise.',
    detailedDefinition: 'Le CAC exerce une mission légale d\'audit des comptes. Il vérifie la régularité, la sincérité et l\'image fidèle des états financiers. Son indépendance totale garantit la fiabilité de l\'information financière pour les tiers.',
    category: 'legal',
    relatedTerms: ['DAF', 'audit', 'due diligence'],
    example: 'Le CAC a certifié les comptes 2024 sans réserve.',
    level: 'intermediate'
  },

  'ROI': {
    id: 'roi',
    term: 'ROI',
    abbreviation: 'Return on Investment',
    definition: 'Indicateur de rentabilité mesurant l\'efficacité d\'un investissement.',
    detailedDefinition: 'Calculé par (Gains - Coûts) / Coûts × 100, le ROI exprime en pourcentage le retour sur investissement. Un ROI de 20% signifie que l\'investissement rapporte 20% de bénéfice par rapport à son coût initial.',
    category: 'finance',
    relatedTerms: ['EBITDA', 'KPI', 'CAPEX'],
    example: 'L\'acquisition de ce logiciel a généré un ROI de 150% sur deux ans.',
    level: 'beginner'
  },

  'EBITDA': {
    id: 'ebitda',
    term: 'EBITDA',
    abbreviation: 'Earnings Before Interest, Taxes, Depreciation and Amortization',
    definition: 'Bénéfice avant intérêts, impôts et amortissements, mesurant la rentabilité opérationnelle pure.',
    detailedDefinition: 'L\'EBITDA évalue la performance opérationnelle d\'une entreprise en excluant les impacts du financement, de la fiscalité et des politiques d\'amortissement. Il permet de comparer facilement des entreprises entre elles.',
    category: 'finance',
    relatedTerms: ['ROI', 'P&L', 'BFR'],
    example: 'L\'EBITDA de 2M€ représente 15% du chiffre d\'affaires.',
    level: 'intermediate'
  },

  'BFR': {
    id: 'bfr',
    term: 'BFR',
    abbreviation: 'Besoin en Fonds de Roulement',
    definition: 'Montant qu\'une entreprise doit financer pour couvrir les décalages entre encaissements et décaissements.',
    detailedDefinition: 'BFR = Stocks + Créances clients - Dettes fournisseurs. Un BFR positif indique que l\'entreprise doit avancer les fonds, un BFR négatif qu\'elle bénéficie d\'un financement gratuit de ses fournisseurs.',
    category: 'finance',
    relatedTerms: ['DSO', 'trésorerie', 'cash flow'],
    example: 'Optimiser le BFR permet de libérer 500K€ de trésorerie.',
    level: 'intermediate'
  },

  'KPI': {
    id: 'kpi',
    term: 'KPI',
    abbreviation: 'Key Performance Indicators',
    definition: 'Indicateurs clés de performance utilisés pour mesurer l\'atteinte des objectifs stratégiques.',
    detailedDefinition: 'Les KPI sont des métriques quantifiables qui permettent d\'évaluer l\'efficacité d\'une entreprise ou d\'un processus. Ils doivent être spécifiques, mesurables, atteignables, pertinents et temporellement définis (SMART).',
    category: 'business',
    relatedTerms: ['ROI', 'tableau de bord', 'performance'],
    example: 'Le taux de satisfaction client est un KPI prioritaire.',
    level: 'beginner'
  },

  'SaaS': {
    id: 'saas',
    term: 'SaaS',
    abbreviation: 'Software as a Service',
    definition: 'Modèle de livraison de logiciels accessible en ligne par abonnement, hébergé dans le cloud.',
    detailedDefinition: 'Le SaaS permet aux utilisateurs d\'accéder à des applications via internet sans installation locale. L\'éditeur gère la maintenance, les mises à jour et la sécurité. Facturation généralement mensuelle ou annuelle.',
    category: 'technology',
    relatedTerms: ['CRM', 'ERP', 'cloud'],
    example: 'Notre CRM en mode SaaS coûte 50€/utilisateur/mois.',
    level: 'beginner'
  },

  'CRM': {
    id: 'crm',
    term: 'CRM',
    abbreviation: 'Customer Relationship Management',
    definition: 'Outil logiciel pour gérer et optimiser les relations avec les clients et prospects.',
    detailedDefinition: 'Le CRM centralise toutes les interactions client : contacts, historique des ventes, suivi des opportunités, support client. Il améliore la satisfaction client et augmente les ventes grâce à une meilleure connaissance des besoins.',
    category: 'technology',
    relatedTerms: ['SaaS', 'ERP', 'sales'],
    example: 'Le CRM nous a permis d\'augmenter le taux de conversion de 25%.',
    level: 'beginner'
  },

  'ERP': {
    id: 'erp',
    term: 'ERP',
    abbreviation: 'Enterprise Resource Planning',
    definition: 'Système intégré qui centralise la gestion de tous les processus d\'une entreprise.',
    detailedDefinition: 'L\'ERP unifie les fonctions comptabilité, RH, production, ventes, achats dans une base de données unique. Il élimine les silos, améliore la traçabilité et fournit une vision globale en temps réel de l\'activité.',
    category: 'technology',
    relatedTerms: ['SaaS', 'CRM', 'intégration'],
    example: 'L\'ERP a réduit nos délais de facturation de 5 à 2 jours.',
    level: 'intermediate'
  },

  'due diligence': {
    id: 'due-diligence',
    term: 'Due Diligence',
    definition: 'Audit d\'acquisition : processus de vérification approfondie d\'une entreprise cible avant rachat.',
    detailedDefinition: 'La due diligence examine tous les aspects de l\'entreprise cible : finances, juridique, commercial, technique, RH. Elle permet d\'identifier les risques, d\'ajuster le prix et de sécuriser l\'investissement.',
    category: 'legal',
    relatedTerms: ['CAC', 'audit', 'acquisition'],
    example: 'La due diligence a révélé un passif fiscal de 200K€.',
    level: 'advanced'
  },

  'PME': {
    id: 'pme',
    term: 'PME',
    abbreviation: 'Petites et Moyennes Entreprises',
    definition: 'Entreprises de moins de 250 salariés avec un CA inférieur à 50M€.',
    detailedDefinition: 'Classification européenne : micro-entreprise (< 10 salariés), petite entreprise (< 50), moyenne entreprise (< 250). Critères : effectifs, chiffre d\'affaires et bilan. Représentent 99% des entreprises européennes.',
    category: 'business',
    relatedTerms: ['ETI', 'startup', 'TPE'],
    level: 'beginner'
  },

  'ETI': {
    id: 'eti',
    term: 'ETI',
    abbreviation: 'Entreprises de Taille Intermédiaire',
    definition: 'Entreprises de 250 à 4999 salariés avec un CA entre 50M€ et 1,5Md€.',
    detailedDefinition: 'Catégorie française créée en 2008, les ETI sont entre les PME et les grandes entreprises. Elles représentent environ 5000 entreprises en France et sont souvent leaders sur leur marché de niche.',
    category: 'business',
    relatedTerms: ['PME', 'grande entreprise'],
    level: 'beginner'
  },

  'SPIN': {
    id: 'spin',
    term: 'SPIN',
    abbreviation: 'Situation, Problem, Implication, Need-payoff',
    definition: 'Méthode de vente questionnant le client sur sa situation, ses problèmes et les bénéfices attendus.',
    detailedDefinition: 'Technique développée par Neil Rackham : 1) Situation (contexte actuel), 2) Problem (difficultés identifiées), 3) Implication (conséquences), 4) Need-payoff (bénéfices de la solution). Approche consultative centrée client.',
    category: 'methods',
    relatedTerms: ['négociation', 'vente', 'commercial'],
    example: 'Questions SPIN : "Combien de temps perdez-vous avec votre système actuel ?"',
    level: 'intermediate'
  },

  'RSE': {
    id: 'rse',
    term: 'RSE',
    abbreviation: 'Responsabilité Sociétale des Entreprises',
    definition: 'Démarche volontaire d\'intégration des préoccupations sociales et environnementales.',
    detailedDefinition: 'La RSE consiste à adopter des pratiques durables dans les activités commerciales et les interactions avec les parties prenantes. Elle couvre l\'environnement, le social, l\'éthique et la gouvernance.',
    category: 'business',
    relatedTerms: ['ESG', 'développement durable'],
    level: 'intermediate'
  },

  'P&L': {
    id: 'pl',
    term: 'P&L',
    abbreviation: 'Profit & Loss',
    definition: 'Compte de résultat présentant les revenus et charges sur une période donnée.',
    detailedDefinition: 'Le P&L (ou compte de résultat) détaille la formation du résultat : chiffre d\'affaires, charges d\'exploitation, résultat opérationnel, charges financières, résultat net. Document comptable obligatoire.',
    category: 'finance',
    relatedTerms: ['EBITDA', 'bilan', 'comptabilité'],
    level: 'beginner'
  },

  'CAPEX': {
    id: 'capex',
    term: 'CAPEX',
    abbreviation: 'Capital Expenditure',
    definition: 'Dépenses d\'investissement en immobilisations (équipements, bâtiments, etc.).',
    detailedDefinition: 'Les CAPEX sont les dépenses d\'acquisition d\'actifs durables qui génèreront des bénéfices sur plusieurs années. Elles apparaissent au bilan et sont amorties. À distinguer des OPEX (charges courantes).',
    category: 'finance',
    relatedTerms: ['OPEX', 'amortissement', 'investissement'],
    level: 'intermediate'
  },

  'OPEX': {
    id: 'opex',
    term: 'OPEX',
    abbreviation: 'Operational Expenditure',
    definition: 'Charges opérationnelles courantes (salaires, loyers, fournitures, etc.).',
    detailedDefinition: 'Les OPEX sont les coûts de fonctionnement récurrents nécessaires aux activités quotidiennes. Contrairement aux CAPEX, ils sont comptabilisés directement en charges et impactent immédiatement le résultat.',
    category: 'finance',
    relatedTerms: ['CAPEX', 'charges', 'exploitation'],
    level: 'intermediate'
  },

  'DSO': {
    id: 'dso',
    term: 'DSO',
    abbreviation: 'Days Sales Outstanding',
    definition: 'Nombre de jours moyen pour recouvrer les créances clients.',
    detailedDefinition: 'DSO = (Créances clients / CA TTC) × 365 jours. Indicateur clé de gestion : plus le DSO est faible, plus l\'entreprise encaisse rapidement. Objectif : réduire le DSO pour améliorer la trésorerie.',
    category: 'finance',
    relatedTerms: ['BFR', 'créances', 'trésorerie'],
    example: 'Réduire le DSO de 45 à 35 jours libère 100K€ de trésorerie.',
    level: 'intermediate'
  },

  'TCO': {
    id: 'tco',
    term: 'TCO',
    abbreviation: 'Total Cost of Ownership',
    definition: 'Coût total de possession incluant achat, utilisation, maintenance et fin de vie.',
    detailedDefinition: 'Le TCO évalue le coût complet d\'un actif sur sa durée de vie : prix d\'achat, installation, formation, maintenance, consommables, mise à jour, remplacement. Essentiel pour les décisions d\'investissement.',
    category: 'finance',
    relatedTerms: ['ROI', 'CAPEX', 'OPEX'],
    example: 'Le TCO de ce serveur sur 5 ans dépasse 200% de son prix d\'achat.',
    level: 'advanced'
  }
};

export const GLOSSARY_CATEGORIES = {
  finance: { label: 'Finance & Comptabilité', icon: '💰', color: 'blue' },
  business: { label: 'Business & Management', icon: '📊', color: 'green' },
  technology: { label: 'Technologie', icon: '💻', color: 'purple' },
  methods: { label: 'Méthodes & Techniques', icon: '🎯', color: 'orange' },
  legal: { label: 'Juridique & Audit', icon: '⚖️', color: 'red' }
} as const;

// Fonction utilitaire pour rechercher un terme
export const findTerm = (searchTerm: string): GlossaryTerm | undefined => {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  // Recherche exacte par terme ou abréviation
  const exactMatch = Object.values(GLOSSARY_TERMS).find(term =>
    term.term.toLowerCase() === normalizedSearch ||
    term.abbreviation?.toLowerCase() === normalizedSearch ||
    term.id === normalizedSearch
  );

  if (exactMatch) return exactMatch;

  // Recherche partielle dans la définition
  return Object.values(GLOSSARY_TERMS).find(term =>
    term.definition.toLowerCase().includes(normalizedSearch) ||
    term.detailedDefinition?.toLowerCase().includes(normalizedSearch)
  );
};

// Fonction pour obtenir les termes par catégorie
export const getTermsByCategory = (category: string): GlossaryTerm[] => {
  return Object.values(GLOSSARY_TERMS).filter(term => term.category === category);
};

// Fonction pour rechercher avec suggestions
export const searchTerms = (query: string): GlossaryTerm[] => {
  if (!query.trim()) return Object.values(GLOSSARY_TERMS);

  const normalizedQuery = query.toLowerCase();

  return Object.values(GLOSSARY_TERMS).filter(term =>
    term.term.toLowerCase().includes(normalizedQuery) ||
    term.abbreviation?.toLowerCase().includes(normalizedQuery) ||
    term.definition.toLowerCase().includes(normalizedQuery) ||
    term.detailedDefinition?.toLowerCase().includes(normalizedQuery)
  );
};