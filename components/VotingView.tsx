import React, { useState } from 'react';
import type { Scenario, DeliverableContent, VoteCounts } from '../types';
import { ThumbsUp, FileText, FileSignature, Maximize2, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

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
    onVote: () => void;
}> = ({ title, icon: Icon, content, voteCount, onVote }) => {
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
            className={`flex items-center justify-center w-full px-4 ${isMobile ? 'py-3' : 'py-2'} bg-white text-blue-600 border-2 border-blue-500 rounded-md hover:bg-blue-50 transition-colors font-semibold ${isMobile ? 'min-h-[48px]' : ''}`}
        >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Voter ({voteCount})
        </button>
    </div>
    );
};


const VotingView: React.FC<VotingViewProps> = ({ scenarios, deliverables, votes, onVote }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Session de Vote
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 px-4 sm:px-0">
          Lisez les propositions et cahiers des charges de chaque équipe, puis votez pour les meilleurs !
        </p>
      </div>
      <div className="space-y-12">
        {scenarios.map((scenario) => (
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
                    voteCount={votes[scenario.id].proposal}
                    onVote={() => onVote(scenario.id, 'proposal')}
                />
                <DeliverableCard 
                    title="Cahier des Charges"
                    icon={FileText}
                    content={deliverables[scenario.id].specs}
                    voteCount={votes[scenario.id].specs}
                    onVote={() => onVote(scenario.id, 'specs')}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingView;
