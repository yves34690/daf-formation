import React, { useState } from 'react';
import type { Scenario, DeliverableContent } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';
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
  const isMobile = useIsMobile();

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
    <div className="flex flex-col">
      {/* Mobile: Bottom Navigation */}
      {isMobile && (
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            <span className="text-blue-600">{scenario.company.name}</span> vs. <span className="text-slate-700">{scenario.sme.name}</span>
          </h2>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop: Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {!isMobile && (
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
                    className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors min-h-[48px] ${
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
        )}

        <div className={`${!isMobile ? 'lg:w-3/4' : 'w-full'} bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default GameView;
