import React, { useState, useEffect } from 'react';
import type { Scenario, DeliverableContent, VoteCounts } from '../types';
import { ThumbsUp, FileText, FileSignature, Maximize2, X, CheckCircle } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useUserVotes } from '../hooks/useUserVotes';

interface VotingViewProps {
  scenarios: Scenario[];
  deliverables: Record<number, DeliverableContent>;
  votes: Record<number, VoteCounts>;
  onVote: (scenarioId: number, type: 'proposal' | 'specs') => void;
}

const DeliverableCard: React.FC<{
    title: string;
    icon: React.ElementType;
    content: string;
    voteCount: number;
    hasVoted: boolean;
    onVote: () => void;
}> = ({ title, icon: Icon, content, voteCount, hasVoted, onVote }) => {
    const isMobile = useIsMobile();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
        <div className="flex items-center mb-3">
            <Icon className="w-5 h-5 mr-2 text-slate-500" />
            <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        <div className="relative">
            <textarea
                readOnly
                value={content}
                className={`w-full flex-grow bg-white p-3 border border-slate-300 rounded-md ${isMobile ? 'text-sm' : 'text-xs'} font-mono mb-3 resize-none`}
                rows={isMobile ? 8 : 12}
            />
            <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-2 right-2 p-2 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
                title="Voir en plein écran"
            >
                <Maximize2 className="w-4 h-4 text-slate-600" />
            </button>
        </div>

        {/* Modal plein écran */}
        {isExpanded && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={content}
                        className="flex-1 p-4 text-base font-mono resize-none focus:outline-none"
                    />
                </div>
            </div>
        )}
        <button
            onClick={onVote}
            disabled={hasVoted}
            className={`flex items-center justify-center w-full px-4 ${isMobile ? 'py-3' : 'py-2'} ${
                hasVoted
                    ? 'bg-green-50 text-green-700 border-2 border-green-500 cursor-not-allowed'
                    : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
            } rounded-md transition-colors font-semibold ${isMobile ? 'min-h-[48px]' : ''}`}
        >
            {hasVoted ? (
                <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Vous avez voté ({voteCount})
                </>
            ) : (
                <>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Voter ({voteCount})
                </>
            )}
        </button>
    </div>
    );
};


const VotingView: React.FC<VotingViewProps> = ({ scenarios, deliverables, votes, onVote }) => {
  const { vote, checkHasVoted, getVoteCountsForScenario } = useUserVotes();
  const [voteCountsState, setVoteCountsState] = useState<Record<number, VoteCounts>>({});

  // Charger les compteurs de votes depuis le localStorage
  useEffect(() => {
    const counts: Record<number, VoteCounts> = {};
    scenarios.forEach(scenario => {
      counts[scenario.id] = getVoteCountsForScenario(scenario.id);
    });
    setVoteCountsState(counts);
  }, [scenarios, getVoteCountsForScenario]);

  const handleVote = (scenarioId: number, type: 'proposal' | 'specs') => {
    const success = vote(scenarioId, type);
    if (success) {
      // Rafraîchir les compteurs
      const newCounts = getVoteCountsForScenario(scenarioId);
      setVoteCountsState(prev => ({
        ...prev,
        [scenarioId]: newCounts
      }));
      // Appeler aussi le callback parent pour compatibilité
      onVote(scenarioId, type);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Session de Vote
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 px-4 sm:px-0">
          Lisez les propositions et cahiers des charges de chaque équipe, puis votez pour les meilleurs !
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <CheckCircle className="w-4 h-4" />
          Vous ne pouvez voter qu'une seule fois par livrable
        </div>
      </div>
      <div className="space-y-12">
        {scenarios.map((scenario) => {
          const scenarioCounts = voteCountsState[scenario.id] || { proposal: 0, specs: 0 };
          return (
            <div key={scenario.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="border-b pb-4 mb-6">
                <h3 className="text-xl font-bold text-blue-600">{scenario.company.name}</h3>
                <p className="text-slate-700">
                  en négociation avec le DAF de <span className="font-semibold">{scenario.sme.name}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <DeliverableCard
                  title="Proposition Commerciale"
                  icon={FileSignature}
                  content={deliverables[scenario.id].proposal}
                  voteCount={scenarioCounts.proposal}
                  hasVoted={checkHasVoted(scenario.id, 'proposal')}
                  onVote={() => handleVote(scenario.id, 'proposal')}
                />
                <DeliverableCard
                  title="Cahier des Charges"
                  icon={FileText}
                  content={deliverables[scenario.id].specs}
                  voteCount={scenarioCounts.specs}
                  hasVoted={checkHasVoted(scenario.id, 'specs')}
                  onVote={() => handleVote(scenario.id, 'specs')}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VotingView;
