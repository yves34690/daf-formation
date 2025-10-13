import { ReactNode } from 'react';

export interface Company {
  name: string;
  logo: string;
  product: string | ReactNode;
  situation: string | ReactNode;
  problem: string;
  implication: string | ReactNode;
  necessity: string;
  price: string;
}

export interface SME {
  name: string;
  industry: string;
  description: string | ReactNode;
  challenges: (string | ReactNode)[];
}

export interface Scenario {
  id: number;
  company: Company;
  sme: SME;
}

export interface DeliverableContent {
  proposal: string;
  specs: string;
  author?: string; // ID de l'étudiant auteur
  teamMembers?: string[]; // IDs des membres de l'équipe
  lastModified?: string; // Date de dernière modification
}

export interface VoteCounts {
  proposal: number;
  specs: number;
}

// Nouveaux types pour la gestion des utilisateurs

export interface Vote {
  scenarioId: number;
  type: 'proposal' | 'specs';
  votedAt: string; // ISO date string
}

export interface WorkshopScore {
  workshopId: string; // 'quiz' | 'caseBuilder'
  score?: number; // Pour le quiz
  completedAt: string;
  data?: any; // Données spécifiques au workshop (ex: cas créés)
}

export interface ChapterProgress {
  chapterId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completedSections?: string[];
  lastVisited?: string;
}

export interface UserProgress {
  userId: string;
  chapters: ChapterProgress[];
  workshopScores: WorkshopScore[];
  votes: Vote[];
  gameParticipation: {
    scenarioId: number;
    role: 'commercial' | 'daf';
    teamMembers: string[];
  }[];
  lastActivity: string;
}
