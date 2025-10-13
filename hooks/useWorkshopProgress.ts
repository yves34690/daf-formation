import { useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import type { WorkshopScore } from '../types';
import { addWorkshopScore, getWorkshopScores, getLatestWorkshopScore } from '../utils/storage';

export const useWorkshopProgress = () => {
  const { currentUser, refreshProgress } = useUser();

  const saveWorkshopScore = useCallback(
    (workshopId: string, score?: number, data?: any) => {
      if (!currentUser) {
        console.error('User must be logged in to save workshop score');
        return;
      }

      const workshopScore: WorkshopScore = {
        workshopId,
        score,
        completedAt: new Date().toISOString(),
        data,
      };

      addWorkshopScore(currentUser.id, workshopScore);
      refreshProgress();
    },
    [currentUser, refreshProgress]
  );

  const getAllScores = useCallback(() => {
    if (!currentUser) return [];
    return getWorkshopScores(currentUser.id);
  }, [currentUser]);

  const getLatestScore = useCallback(
    (workshopId: string) => {
      if (!currentUser) return null;
      return getLatestWorkshopScore(currentUser.id, workshopId);
    },
    [currentUser]
  );

  return {
    saveWorkshopScore,
    getAllScores,
    getLatestScore,
  };
};
