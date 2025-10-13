import { useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import type { ChapterProgress } from '../types';
import { getChapterProgress, updateChapterProgress } from '../utils/storage';

export const useChapterProgress = () => {
  const { currentUser, refreshProgress } = useUser();

  const getProgress = useCallback(
    (chapterId: number): ChapterProgress | null => {
      if (!currentUser) return null;
      return getChapterProgress(currentUser.id, chapterId);
    },
    [currentUser]
  );

  const markChapterStarted = useCallback(
    (chapterId: number) => {
      if (!currentUser) {
        console.error('User must be logged in');
        return;
      }

      const existing = getChapterProgress(currentUser.id, chapterId);
      if (existing && existing.status !== 'not_started') {
        return; // Déjà commencé ou complété
      }

      updateChapterProgress(currentUser.id, chapterId, {
        status: 'in_progress',
        lastVisited: new Date().toISOString(),
      });
      refreshProgress();
    },
    [currentUser, refreshProgress]
  );

  const markSectionCompleted = useCallback(
    (chapterId: number, sectionId: string) => {
      if (!currentUser) {
        console.error('User must be logged in');
        return;
      }

      const existing = getChapterProgress(currentUser.id, chapterId);
      const completedSections = existing?.completedSections || [];

      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }

      updateChapterProgress(currentUser.id, chapterId, {
        status: 'in_progress',
        completedSections,
        lastVisited: new Date().toISOString(),
      });
      refreshProgress();
    },
    [currentUser, refreshProgress]
  );

  const markChapterCompleted = useCallback(
    (chapterId: number) => {
      if (!currentUser) {
        console.error('User must be logged in');
        return;
      }

      updateChapterProgress(currentUser.id, chapterId, {
        status: 'completed',
        lastVisited: new Date().toISOString(),
      });
      refreshProgress();
    },
    [currentUser, refreshProgress]
  );

  return {
    getProgress,
    markChapterStarted,
    markSectionCompleted,
    markChapterCompleted,
  };
};
