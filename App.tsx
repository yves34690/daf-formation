import React, { useState, useCallback, useMemo } from 'react';
import type { Scenario, DeliverableContent, VoteCounts } from './types';
import { SCENARIOS, PROPOSAL_TEMPLATE, SPECS_TEMPLATE } from './constants';
import TeamSelection from './components/TeamSelection';
import GameView from './components/GameView';
import VotingView from './components/VotingView';
import NavigationHub from './components/SharedComponents/NavigationHub';
import CourseView from './components/CourseMode/CourseView';
import WorkshopsView from './components/WorkshopsView';
import GlobalTimer from './components/Timer/GlobalTimer';
import { TimerProvider, useTimer } from './components/Timer/TimerContext';
import { GlossaryProvider, useGlossary } from './contexts/GlossaryContext';
import GlossaryPanel from './components/Glossary/GlossaryPanel';
import GlossaryTerm from './components/Glossary/GlossaryTerm';
import { Users, Vote, Maximize2, Minimize2, Home, BookOpen } from 'lucide-react';

const AppContent: React.FC = () => {
  const [view, setView] = useState<'hub' | 'course' | 'selection' | 'game' | 'voting' | 'workshops'>('hub');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { startTimer, mode } = useTimer();
  const { toggleGlossary } = useGlossary();

  const [deliverables, setDeliverables] = useState<Record<number, DeliverableContent>>(() =>
    SCENARIOS.reduce((acc, scenario) => {
      acc[scenario.id] = { proposal: PROPOSAL_TEMPLATE, specs: SPECS_TEMPLATE };
      return acc;
    }, {} as Record<number, DeliverableContent>)
  );

  const [votes, setVotes] = useState<Record<number, VoteCounts>>(() =>
    SCENARIOS.reduce((acc, scenario) => {
      acc[scenario.id] = { proposal: 0, specs: 0 };
      return acc;
    }, {} as Record<number, VoteCounts>)
  );

  const handleScenarioSelect = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setView('game');
  }, []);

  const handleModeSelect = useCallback((selectedMode: 'morning' | 'afternoon' | 'full') => {
    if (selectedMode === 'morning') {
      startTimer('morning');
      setView('course');
    } else if (selectedMode === 'afternoon') {
      startTimer('afternoon');
      setView('selection');
    } else {
      // Mode complet : commence par la formation
      startTimer('morning');
      setView('course');
    }
  }, [startTimer]);

  const handleCourseComplete = useCallback(() => {
    // Après la formation, passer au Business Game
    setView('selection');
    startTimer('afternoon');
  }, [startTimer]);

  const handleBackToHub = useCallback(() => {
    setView('hub');
    setSelectedScenario(null);
  }, []);

  const handleShowWorkshops = useCallback(() => {
    setView('workshops');
  }, []);

  const handleBackToSelection = useCallback(() => {
    setSelectedScenario(null);
    setView('selection');
  }, []);

  const handleGoToVoting = useCallback(() => {
    setView('voting');
  }, []);
  
  const handleDeliverableChange = useCallback((scenarioId: number, type: 'proposal' | 'specs', content: string) => {
    setDeliverables(prev => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        [type]: content,
      }
    }));
  }, []);

  const handleVote = useCallback((scenarioId: number, type: 'proposal' | 'specs') => {
    setVotes(prev => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        [type]: prev[scenarioId][type] + 1,
      }
    }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  }, []);

  const currentDeliverables = useMemo(() => {
    if (selectedScenario) {
        return deliverables[selectedScenario.id];
    }
    return null;
  }, [selectedScenario, deliverables]);


  const renderContent = () => {
    switch (view) {
      case 'hub':
        return <NavigationHub onSelectMode={handleModeSelect} onShowWorkshops={handleShowWorkshops} />;
      case 'course':
        return <CourseView onComplete={handleCourseComplete} />;
      case 'workshops':
        return <WorkshopsView onBack={handleBackToHub} />;
      case 'selection':
        return <TeamSelection scenarios={SCENARIOS} onSelect={handleScenarioSelect} />;
      case 'game':
        if (selectedScenario && currentDeliverables) {
          return (
            <GameView
              key={selectedScenario.id}
              scenario={selectedScenario}
              deliverables={currentDeliverables}
              onDeliverableChange={(type, content) => handleDeliverableChange(selectedScenario.id, type, content)}
            />
          );
        }
        return null; // Should not happen if logic is correct
      case 'voting':
        return <VotingView scenarios={SCENARIOS} deliverables={deliverables} votes={votes} onVote={handleVote} />;
    }
  };

  if (view === 'hub' || view === 'workshops') {
    return (
      <div className="min-h-screen">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* Timer Global */}
      <GlobalTimer />

      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
              <span className="text-blue-600"><GlossaryTerm term="DAF">DAF</GlossaryTerm></span> {mode === 'morning' ? 'Formation' : 'Business Game'}
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleBackToHub}
                className="flex items-center px-3 sm:px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-xs sm:text-sm font-semibold min-h-[40px]"
              >
                <Home className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Accueil</span>
              </button>

              {view === 'game' && (
                <button
                  onClick={handleBackToSelection}
                  className="flex items-center px-3 sm:px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-xs sm:text-sm font-semibold min-h-[40px]"
                >
                  <Users className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Changer de scénario</span>
                </button>
              )}

              {(view === 'selection' || view === 'game') && (
                <button
                  onClick={handleGoToVoting}
                  className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-semibold shadow min-h-[40px]"
                >
                  <Vote className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Passer au vote</span><span className="sm:hidden">Vote</span>
                </button>
              )}

              <button
                onClick={toggleGlossary}
                className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-semibold shadow min-h-[40px]"
                title="Ouvrir le glossaire (Ctrl+G)"
              >
                <BookOpen className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Glossaire</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-semibold shadow"
                title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={view === 'course' ? '' : 'container mx-auto p-4 sm:p-6 lg:p-8'}>
        {renderContent()}
      </main>

      {/* Glossaire */}
      <GlossaryPanel />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TimerProvider>
      <GlossaryProvider>
        <AppContent />
      </GlossaryProvider>
    </TimerProvider>
  );
};

export default App;
