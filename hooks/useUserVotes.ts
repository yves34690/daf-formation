import { useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import type { Vote } from '../types';
import { addUserVote, hasUserVoted, getAllVotesForScenario } from '../utils/storage';

export const useUserVotes = () => {
  const { currentUser, refreshProgress } = useUser();

  const vote = useCallback(
    (scenarioId: number, type: 'proposal' | 'specs') => {
      if (!currentUser) {
        console.error('User must be logged in to vote');
        return false;
      }

      if (hasUserVoted(currentUser.id, scenarioId, type)) {
        console.warn('User has already voted for this deliverable');
        return false;
      }

      const newVote: Vote = {
        scenarioId,
        type,
        votedAt: new Date().toISOString(),
      };

      addUserVote(currentUser.id, newVote);
      refreshProgress();
      return true;
    },
    [currentUser, refreshProgress]
  );

  const checkHasVoted = useCallback(
    (scenarioId: number, type: 'proposal' | 'specs'): boolean => {
      if (!currentUser) return false;
      return hasUserVoted(currentUser.id, scenarioId, type);
    },
    [currentUser]
  );

  const getVoteCountsForScenario = useCallback((scenarioId: number) => {
    return getAllVotesForScenario(scenarioId);
  }, []);

  return {
    vote,
    checkHasVoted,
    getVoteCountsForScenario,
  };
};
