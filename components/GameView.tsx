import React, { useState } from 'react';
import type { Scenario, DeliverableContent } from '../types';
import ScenarioTab from './tabs/ScenarioTab';
import SpinGuideTab from './tabs/SpinGuideTab';
import DeliverablesTab from './tabs/DeliverablesTab';
import ResourcesTab from './tabs/ResourcesTab';
import { Briefcase, HelpCircle, Target, FileText } from 'lucide-react';

interface GameViewProps {
  scenario: Scenario;
  deliverables: DeliverableContent;
  onDeliverableChange: (type: 'proposal' | 'specs', content: string) => void;
}

type Tab = 'scenario' | 'spin' | 'deliverables' | 'resources';

const GameView: React.FC<GameViewProps> = ({ scenario, deliverables, onDeliverableChange }) => {
  const [activeTab, setActiveTab] = useState<Tab>('scenario');

  const tabs = [
    { id: 'scenario', label: 'Scénario', icon: Briefcase },
    { id: 'spin', label: 'Guide SPIN', icon: HelpCircle },
    { id: 'deliverables', label: 'Livrables', icon: FileText },
    { id: 'resources', label: 'Ressources', icon: Target },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'scenario':
        return <ScenarioTab scenario={scenario} />;
      case 'spin':
        return <SpinGuideTab />;
      case 'deliverables':
        return (
            <DeliverablesTab 
                proposalContent={deliverables.proposal}
                specsContent={deliverables.specs}
                onProposalChange={(content) => onDeliverableChange('proposal', content)}
                onSpecsChange={(content) => onDeliverableChange('specs', content)}
            />
        );
      case 'resources':
        return <ResourcesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4">
        <div className="sticky top-28">
            <h2 className="text-lg font-bold text-slate-900">
                <span className="text-blue-600">{scenario.company.name}</span> vs. <span className="text-slate-700">{scenario.sme.name}</span>
            </h2>
            <p className="text-sm text-slate-500 mb-6">Suivez les étapes pour compléter le jeu.</p>
            <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
                >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
                </button>
            ))}
            </nav>
        </div>
      </aside>
      <div className="lg:w-3/4 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default GameView;
