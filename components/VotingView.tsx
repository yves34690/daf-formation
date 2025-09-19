import React from 'react';
import type { Scenario, DeliverableContent, VoteCounts } from '../types';
import { ThumbsUp, FileText, FileSignature } from 'lucide-react';

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
}> = ({ title, icon: Icon, content, voteCount, onVote }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
        <div className="flex items-center mb-3">
            <Icon className="w-5 h-5 mr-2 text-slate-500" />
            <h4 className="font-semibold text-slate-800">{title}</h4>
        </div>
        <textarea
            readOnly
            value={content}
            className="w-full flex-grow bg-white p-2 border border-slate-300 rounded-md text-xs font-mono mb-3 resize-none"
            rows={12}
        />
        <button
            onClick={onVote}
            className="flex items-center justify-center w-full px-4 py-2 bg-white text-blue-600 border-2 border-blue-500 rounded-md hover:bg-blue-50 transition-colors font-semibold"
        >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Voter ({voteCount})
        </button>
    </div>
);


const VotingView: React.FC<VotingViewProps> = ({ scenarios, deliverables, votes, onVote }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Session de Vote
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
