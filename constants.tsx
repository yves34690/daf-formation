import type { Scenario } from './types';

export const PROPOSAL_TEMPLATE = `[Logo de votre entreprise]

PROPOSITION COMMERCIALE

À l'attention de : [Nom du DAF], DAF de [Nom de la PME]
Date : [Date]

1. Contexte et Compréhension de vos besoins
   - Suite à notre échange, nous avons identifié les défis suivants...

2. Notre Solution
   - Description de la solution [Nom du produit] et comment elle répond à chaque défi.
   - Fonctionnalités clés...

3. Bénéfices et Retour sur Investissement (ROI)
   - Gains de temps estimés...
   - Réduction des coûts...
   - Amélioration de la conformité...

4. Plan de déploiement
   - Phase 1: ...
   - Phase 2: ...

5. Tarifs
   - Détail des coûts (licence, mise en place, formation)...

6. Conclusion`;

export const SPECS_TEMPLATE = `CAHIER DES CHARGES - [Nom du Projet]

Émis par : [Nom du DAF], DAF de [Nom de la PME]
Date : [Date]

1. Contexte du projet
   - Description de notre entreprise et des problématiques actuelles qui motivent ce projet.

2. Objectifs attendus
   - Nous cherchons à atteindre les objectifs suivants : [ex: automatiser le reporting, simplifier la paie, etc.].
   - Indicateurs de succès (KPIs) : [ex: réduction de 50% du temps de clôture].

3. Exigences fonctionnelles
   - Le système doit permettre de... [lister les fonctionnalités indispensables].
   - Le système devrait idéalement permettre de... [lister les fonctionnalités souhaitées].

4. Exigences non-fonctionnelles
   - Sécurité : ...
   - Conformité (RGPD, etc.) : ...
   - Intégration avec nos outils actuels ([ex: ERP, CRM]) : ...

5. Budget et calendrier prévisionnels
   - Budget alloué : ...
   - Date de mise en production souhaitée : ...`;

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    company: {
      name: 'Dust',
      logo: 'DUST',
      product: "Plateforme pour créer des agents IA en quelques minutes, connectés à vos données et outils d'entreprise (Slack, Google Drive, Notion).",
      situation: "L'équipe support client est débordée par des tickets répétitifs. Les agents perdent 60% de leur temps sur des FAQ au lieu de traiter les cas complexes.",
      problem: "Traitement manuel des tickets (catégorisation, réponses FAQ) très chronophage. Pas d'exploitation de la base de connaissance existante.",
      implication: "Temps de réponse client dégradé, frustration des équipes, turnover élevé, opportunités de vente manquées sur les cas à valeur ajoutée.",
      necessity: "Automatiser 80% des réponses répétitives avec l'IA pour libérer l'équipe sur les sujets stratégiques.",
      price: '29€ / mois / utilisateur',
    },
    sme: {
      name: 'InnovTech SaaS',
      industry: 'Éditeur de logiciel B2B',
      description: "Une PME de 50 employés qui développe un logiciel de gestion de projet. Le support client est un élément clé de leur offre mais a du mal à suivre la croissance.",
      challenges: [
        'Le temps de première réponse aux tickets est trop long.',
        'Les agents passent plus de la moitié de leur temps sur des questions basiques.',
        'La base de connaissance interne est peu utilisée et difficile à maintenir.',
      ],
    },
  },
  {
    id: 2,
    company: {
      name: 'Mozzaik',
      logo: 'mozzaik',
      product: 'Solution intranet moderne pour Microsoft 365 transformant SharePoint en Digital Workplace avec assistant IA intégré.',
      situation: "L'entreprise utilise Microsoft 365 mais l'information reste éparpillée entre Teams, SharePoint et Outlook.",
      problem: "Impossible de trouver rapidement l'information RH ou les process. Les employés en télétravail se sentent déconnectés.",
      implication: "Perte de productivité (30min/jour en recherche), désengagement des équipes distantes, onboarding laborieux.",
      necessity: "Créer un portail intranet centralisé et personnalisé pour fédérer les équipes et fluidifier l'accès à l'information.",
      price: '800€ / jour / intervenant',
    },
    sme: {
      name: 'BioSaveurs Distribution',
      industry: 'Distribution de produits biologiques',
      description: "Une entreprise de 80 personnes avec plusieurs entrepôts et une force de vente nomade. L'écosystème Microsoft 365 est en place mais sous-utilisé.",
      challenges: [
        "L'information cruciale partagée dans Teams se perd dans les canaux.",
        'Les documents importants sur SharePoint sont mal organisés et difficiles à trouver.',
        "Manque d'un portail d'accueil pour les actualités de l'entreprise et l'intégration des nouveaux.",
      ],
    },
  },
  {
    id: 3,
    company: {
      name: 'Pennylane',
      logo: 'pennylane',
      product: 'Plateforme de gestion financière et comptable tout-en-un pour PME, synchronisée avec votre expert-comptable.',
      situation: "Gestion éclatée : facturation sur un outil, notes de frais sur Excel, comptabilité chez l'expert-comptable.",
      problem: "Aucune vision temps réel de la trésorerie. Collecte manuelle des factures fournisseurs chronophage et source d'erreurs.",
      implication: "Décisions basées sur des données obsolètes, risques d'impayés, clôtures mensuelles de 3 jours.",
      necessity: "Centraliser et automatiser la gestion financière pour piloter en temps réel et préparer la facturation électronique obligatoire.",
      price: '199€ / mois',
    },
    sme: {
      name: 'Construct Bat SARL',
      industry: 'Bâtiment et rénovation',
      description: 'Une PME du BTP de 65 employés qui gère de multiples chantiers. Le DAF passe son temps à courir après les factures et à consolider des fichiers Excel.',
      challenges: [
        'Manque de visibilité sur la rentabilité par chantier.',
        'Le suivi des paiements fournisseurs et des encaissements clients est complexe.',
        "Préparation à l'arrivée de la facturation électronique obligatoire.",
      ],
    },
  },
  {
    id: 4,
    company: {
      name: 'PayFit',
      logo: 'PayFit',
      product: 'Solution de paie et RH automatisée réduisant de 90% le temps de traitement avec portail self-service employés.',
      situation: "Paie externalisée mais collecte manuelle des variables (heures, absences, primes) source d'erreurs récurrentes.",
      problem: "Erreurs fréquentes sur les bulletins, pas d'autonomie RH pour les employés, processus papier pour les congés.",
      implication: "Réclamations constantes, charge administrative élevée pour le DAF, risque de redressement URSSAF.",
      necessity: "Digitaliser et automatiser la paie de A à Z avec self-service employés pour gagner 300€/mois et 90% de temps.",
      price: '26€ / mois / utilisateur',
    },
    sme: {
      name: 'Gourmet Express',
      industry: 'Restauration rapide de qualité',
      description: "Une chaîne de 4 restaurants avec 45 employés, dont beaucoup à temps partiel avec des horaires variables. La gestion RH est un casse-tête mensuel pour le DAF.",
      challenges: [
        "La collecte et le calcul des heures variables pour la paie sont une source d'erreurs.",
        'La gestion des congés et absences est faite sur papier, ce qui complique la planification.',
        "Les employés n'ont pas d'accès simple à leurs documents RH (bulletins, contrats).",
      ],
    },
  },
  {
    id: 5,
    company: {
      name: 'Finthesis',
      logo: 'finthesis',
      product: "Plateforme BI financière transformant les données comptables brutes en tableaux de bord visuels et analyses prédictives.",
      situation: 'Le DAF passe 3 jours/mois à consolider des exports comptables dans Excel pour créer des reportings statiques.',
      problem: "Reportings figés, impossibilité de faire des simulations, erreurs de formules Excel, pas d'analyse prédictive.",
      implication: 'Le CODIR manque de visibilité pour décider rapidement. Le DAF est un producteur de chiffres, pas un business partner stratégique.',
      necessity: "Automatiser la production de reportings dynamiques pour libérer du temps d'analyse et de conseil stratégique.",
      price: '9€ / mois / utilisateur',
    },
    sme: {
      name: 'InnovSoft Éditions',
      industry: 'Éditeur de logiciels SaaS',
      description: 'Start-up de 30 personnes avec un modèle de revenus par abonnement (MRR). Le DAF passe des jours à consolider les données dans Excel pour le reporting mensuel.',
      challenges: [
        'Le suivi des KPIs SaaS (MRR, Churn, LTV) est entièrement manuel.',
        'La création de prévisions de trésorerie fiables est complexe et peu fiable sur Excel.',
        "Le DAF est sceptique sur les outils 'plug-and-play' et pense qu'Excel lui donne plus de contrôle.",
      ],
    },
  },
  {
    id: 6,
    company: {
      name: 'Capgemini',
      logo: 'Capgemini',
      product: "Services de transformation digitale et IA : conseil stratégique, intégration Cloud, Cybersécurité, Data & Analytics.",
      situation: "Données éparpillées dans multiples systèmes (ERP, CRM, Excel) qui ne communiquent pas. Pas de vision 360° du business.",
      problem: "Décisions prises à l'instinct faute de données fiables. Incapacité à faire du prédictif ou de l'analyse avancée.",
      implication: "Perte de compétitivité, opportunités commerciales manquées, inefficacité opérationnelle, retard sur la concurrence.",
      necessity: "Définir et implémenter une stratégie data complète avec plateforme BI moderne et accompagnement au changement.",
      price: '1 200€ / jour / intervenant',
    },
    sme: {
      name: "Industrie Mécanique de l'Ouest (IMO)",
      industry: "Fabrication d'équipements industriels",
      description: "Une ETI de 250 employés avec une forte culture d'ingénieur. Les données sont vues comme une contrainte technique, pas comme un atout stratégique.",
      challenges: [
        'Les données de production (ERP) et de vente (CRM) sont totalement séparées.',
        'Le reporting est basique et ne permet pas de faire du prédictif (ex: maintenance prédictive).',
        "Manque de compétences internes pour lancer un projet data d'envergure.",
      ],
    },
  },
];
