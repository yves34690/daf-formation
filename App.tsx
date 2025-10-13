import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Scenario, DeliverableContent, VoteCounts } from './types';
import { SCENARIOS, PROPOSAL_TEMPLATE, SPECS_TEMPLATE } from './constants';
import TeamSelection from './components/TeamSelection';
import GameView from './components/GameView';
import VotingView from './components/VotingView';
import NavigationHub from './components/SharedComponents/NavigationHub';
import CourseView from './components/CourseMode/CourseView';
import WorkshopsView from './components/WorkshopsView';
import GlobalTimer from './components/Timer/GlobalTimer';
import LoginView from './components/LoginView';
import UserProfile from './components/UserProfile';
import TeacherDashboard from './components/TeacherDashboard';
import LandingPage from './components/LandingPage';
import { TimerProvider, useTimer } from './components/Timer/TimerContext';
import { GlossaryProvider, useGlossary } from './contexts/GlossaryContext';
import { UserProvider, useUser } from './contexts/UserContext';
import GlossaryPanel from './components/Glossary/GlossaryPanel';
import GlossaryTerm from './components/Glossary/GlossaryTerm';
import { isTeacher } from './data/students';
import { Users, Vote, Maximize2, Minimize2, Home, BookOpen, User as UserIcon, LogOut, ChevronDown, BarChart3, Info } from 'lucide-react';
import { saveDeliverable, getAllDeliverablesForUser } from './utils/storage';

const AppContent: React.FC = () => {
  // TOUS les hooks doivent être déclarés EN PREMIER, avant tout return conditionnel
  const [view, setView] = useState<'hub' | 'course' | 'selection' | 'game' | 'voting' | 'workshops'>('hub');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);

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

  const { startTimer, mode } = useTimer();
  const { toggleGlossary } = useGlossary();
  const { currentUser, isAuthenticated, login, logout } = useUser();

  // Vérifier si l'utilisateur connecté est un formateur
  const userIsTeacher = currentUser && isTeacher(currentUser);

  // Charger les deliverables sauvegardés quand l'utilisateur se connecte
  useEffect(() => {
    if (currentUser) {
      const savedDeliverables = getAllDeliverablesForUser(currentUser.id);
      // Fusionner avec les templates par défaut
      setDeliverables(prev => {
        const merged = { ...prev };
        Object.entries(savedDeliverables).forEach(([scenarioId, content]) => {
          const id = parseInt(scenarioId);
          merged[id] = {
            proposal: content.proposal || prev[id]?.proposal || PROPOSAL_TEMPLATE,
            specs: content.specs || prev[id]?.specs || SPECS_TEMPLATE
          };
        });
        return merged;
      });
    }
  }, [currentUser]);

  // Tous les useCallback et useMemo AVANT tout return conditionnel
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

    // Sauvegarder dans localStorage
    if (currentUser) {
      saveDeliverable(currentUser.id, scenarioId, type, content);
    }
  }, [currentUser]);

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

  // Génération d'initiales pour l'avatar
  const getInitials = useCallback((): string => {
    if (!currentUser) return '??';
    return `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase();
  }, [currentUser]);

  const handleLogout = useCallback(() => {
    logout();
    setView('hub');
    setShowUserMenu(false);
    setShowLandingPage(true);
  }, [logout]);

  const handleGetStarted = useCallback(() => {
    setShowLandingPage(false);
  }, []);

  const handleShowLandingPage = useCallback(() => {
    setShowLandingPage(true);
  }, []);

  const renderContent = useCallback(() => {
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
        return null;
      case 'voting':
        return <VotingView scenarios={SCENARIOS} deliverables={deliverables} votes={votes} onVote={handleVote} />;
    }
  }, [view, handleModeSelect, handleShowWorkshops, handleCourseComplete, handleBackToHub, handleScenarioSelect, selectedScenario, currentDeliverables, handleDeliverableChange, deliverables, votes, handleVote]);

  // MAINTENANT on peut faire les returns conditionnels
  // Show landing page if requested (works for both authenticated and non-authenticated users)
  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Then show login if not authenticated
  if (!isAuthenticated) {
    return <LoginView onLogin={login} />;
  }

  if (view === 'hub' || view === 'workshops') {
    return (
      <div className="min-h-screen">
        {renderContent()}
        {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}
        {showTeacherDashboard && <TeacherDashboard onClose={() => setShowTeacherDashboard(false)} />}
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
                onClick={handleShowLandingPage}
                className="flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs sm:text-sm font-semibold min-h-[40px]"
                title="Retour à la présentation"
              >
                <Info className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Présentation</span>
              </button>

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

              {/* Menu utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors min-h-[40px]"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {getInitials()}
                  </div>
                  <span className="hidden md:inline text-sm font-semibold text-slate-900">
                    {currentUser?.firstName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="text-sm font-semibold text-slate-900">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </p>
                      <p className="text-xs text-slate-500">{currentUser?.company}</p>
                    </div>
                    {userIsTeacher && (
                      <button
                        onClick={() => {
                          setShowTeacherDashboard(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors font-semibold"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Dashboard Formateur
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowUserProfile(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Mon profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Changer d'utilisateur
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={view === 'course' ? '' : 'container mx-auto p-4 sm:p-6 lg:p-8'}>
        {renderContent()}
      </main>

      {/* Glossaire */}
      <GlossaryPanel />

      {/* Profil utilisateur */}
      {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}

      {/* Dashboard formateur */}
      {showTeacherDashboard && <TeacherDashboard onClose={() => setShowTeacherDashboard(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <TimerProvider>
        <GlossaryProvider>
          <AppContent />
        </GlossaryProvider>
      </TimerProvider>
    </UserProvider>
  );
};

export default App;
