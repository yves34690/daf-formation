import type { UserProgress, Vote, WorkshopScore, ChapterProgress } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'daf-formation-current-user',
  USER_PROGRESS: 'daf-formation-user-progress',
  ALL_VOTES: 'daf-formation-all-votes',
};

// Gestion de l'utilisateur courant
export const getCurrentUserId = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
};

export const setCurrentUserId = (userId: string): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Gestion de la progression utilisateur
export const getUserProgress = (userId: string): UserProgress | null => {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.USER_PROGRESS}-${userId}`);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading user progress:', error);
    return null;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(
      `${STORAGE_KEYS.USER_PROGRESS}-${progress.userId}`,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const initializeUserProgress = (userId: string): UserProgress => {
  const progress: UserProgress = {
    userId,
    chapters: [],
    workshopScores: [],
    votes: [],
    gameParticipation: [],
    lastActivity: new Date().toISOString(),
  };
  saveUserProgress(progress);
  return progress;
};

// Gestion des votes
export const getUserVotes = (userId: string): Vote[] => {
  const progress = getUserProgress(userId);
  return progress?.votes || [];
};

export const hasUserVoted = (userId: string, scenarioId: number, type: 'proposal' | 'specs'): boolean => {
  const votes = getUserVotes(userId);
  return votes.some(vote => vote.scenarioId === scenarioId && vote.type === type);
};

export const addUserVote = (userId: string, vote: Vote): void => {
  const progress = getUserProgress(userId) || initializeUserProgress(userId);

  // Vérifier si l'utilisateur a déjà voté pour ce livrable
  const alreadyVoted = progress.votes.some(
    v => v.scenarioId === vote.scenarioId && v.type === vote.type
  );

  if (!alreadyVoted) {
    progress.votes.push(vote);
    progress.lastActivity = new Date().toISOString();
    saveUserProgress(progress);
  }
};

// Gestion des workshops
export const getWorkshopScores = (userId: string): WorkshopScore[] => {
  const progress = getUserProgress(userId);
  return progress?.workshopScores || [];
};

export const addWorkshopScore = (userId: string, score: WorkshopScore): void => {
  const progress = getUserProgress(userId) || initializeUserProgress(userId);
  progress.workshopScores.push(score);
  progress.lastActivity = new Date().toISOString();
  saveUserProgress(progress);
};

export const getLatestWorkshopScore = (userId: string, workshopId: string): WorkshopScore | null => {
  const scores = getWorkshopScores(userId);
  const workshopScores = scores.filter(s => s.workshopId === workshopId);
  if (workshopScores.length === 0) return null;

  // Retourner le score le plus récent
  return workshopScores.sort((a, b) =>
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )[0];
};

// Gestion de la progression des chapitres
export const getChapterProgress = (userId: string, chapterId: number): ChapterProgress | null => {
  const progress = getUserProgress(userId);
  if (!progress) return null;
  return progress.chapters.find(c => c.chapterId === chapterId) || null;
};

export const updateChapterProgress = (
  userId: string,
  chapterId: number,
  update: Partial<ChapterProgress>
): void => {
  const progress = getUserProgress(userId) || initializeUserProgress(userId);

  const chapterIndex = progress.chapters.findIndex(c => c.chapterId === chapterId);

  if (chapterIndex >= 0) {
    progress.chapters[chapterIndex] = {
      ...progress.chapters[chapterIndex],
      ...update,
      chapterId,
    };
  } else {
    progress.chapters.push({
      chapterId,
      status: 'not_started',
      ...update,
    });
  }

  progress.lastActivity = new Date().toISOString();
  saveUserProgress(progress);
};

// Gestion de la participation au Business Game
export const addGameParticipation = (
  userId: string,
  scenarioId: number,
  role: 'commercial' | 'daf',
  teamMembers: string[]
): void => {
  const progress = getUserProgress(userId) || initializeUserProgress(userId);

  // Vérifier si l'utilisateur participe déjà à ce scénario
  const existingParticipation = progress.gameParticipation.find(
    p => p.scenarioId === scenarioId
  );

  if (!existingParticipation) {
    progress.gameParticipation.push({
      scenarioId,
      role,
      teamMembers,
    });
    progress.lastActivity = new Date().toISOString();
    saveUserProgress(progress);
  }
};

// Récupération de tous les votes (pour les statistiques globales)
export const getAllVotesForScenario = (scenarioId: number): {
  proposal: number;
  specs: number;
} => {
  const allVotes: { proposal: number; specs: number } = { proposal: 0, specs: 0 };

  // Parcourir tous les utilisateurs stockés
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_KEYS.USER_PROGRESS)) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const progress: UserProgress = JSON.parse(data);
          progress.votes.forEach(vote => {
            if (vote.scenarioId === scenarioId) {
              allVotes[vote.type]++;
            }
          });
        }
      } catch (error) {
        console.error('Error parsing user progress:', error);
      }
    }
  }

  return allVotes;
};

// Export des données utilisateur (pour l'enseignant)
export const exportAllUserData = (): any[] => {
  const allData: any[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_KEYS.USER_PROGRESS)) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          allData.push(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error parsing user progress:', error);
      }
    }
  }

  return allData;
};

// Réinitialisation des données (pour les tests)
export const clearAllUserData = (): void => {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('daf-formation-')) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Gestion des deliverables du Business Game
export const saveDeliverable = (
  userId: string,
  scenarioId: number,
  type: 'proposal' | 'specs',
  content: string
): void => {
  try {
    const key = `daf-deliverable-${userId}-${scenarioId}-${type}`;
    localStorage.setItem(key, content);
  } catch (error) {
    console.error('Error saving deliverable:', error);
  }
};

export const getDeliverable = (
  userId: string,
  scenarioId: number,
  type: 'proposal' | 'specs'
): string | null => {
  try {
    const key = `daf-deliverable-${userId}-${scenarioId}-${type}`;
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error loading deliverable:', error);
    return null;
  }
};

export const getAllDeliverablesForUser = (userId: string): Record<number, { proposal: string; specs: string }> => {
  const deliverables: Record<number, { proposal: string; specs: string }> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`daf-deliverable-${userId}-`)) {
        const parts = key.split('-');
        const scenarioId = parseInt(parts[3]);
        const type = parts[4] as 'proposal' | 'specs';
        const content = localStorage.getItem(key) || '';

        if (!deliverables[scenarioId]) {
          deliverables[scenarioId] = { proposal: '', specs: '' };
        }
        deliverables[scenarioId][type] = content;
      }
    }
  } catch (error) {
    console.error('Error loading all deliverables:', error);
  }

  return deliverables;
};
