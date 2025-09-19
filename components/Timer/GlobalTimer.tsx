import React from 'react';
import { Clock, Pause, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { useTimer } from './TimerContext';

const GlobalTimer: React.FC = () => {
  const {
    isRunning,
    mode,
    pauseTimer,
    resumeTimer,
    getTimeRemaining,
    getProgress,
    formatTime,
    currentChapter
  } = useTimer();

  const timeRemaining = getTimeRemaining();
  const progress = getProgress();

  // Alertes pour les dernières 30, 15 et 5 minutes
  const showWarning = timeRemaining <= 30 * 60 && timeRemaining > 15 * 60;
  const showAlert = timeRemaining <= 15 * 60 && timeRemaining > 5 * 60;
  const showCritical = timeRemaining <= 5 * 60;

  const getChapterInfo = () => {
    if (!mode || mode === 'afternoon') return null;

    const chapters = [
      { id: 1, name: 'Les représentations du métier', duration: 45 },
      { id: 2, name: 'Les évolutions du métier', duration: 45 },
      { id: 3, name: 'La réalité du métier', duration: 45 },
      { id: 4, name: 'Communication & Négociation', duration: 60 },
      { id: 5, name: 'Préparation Business Game', duration: 45 },
    ];

    const chapter = chapters.find(c => c.id === currentChapter);
    return chapter ? `Chapitre ${chapter.id}: ${chapter.name}` : null;
  };

  if (!mode) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-white shadow-lg rounded-lg p-4 min-w-[320px] border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${showCritical ? 'text-red-600 animate-pulse' : showAlert ? 'text-orange-500' : showWarning ? 'text-yellow-500' : 'text-blue-600'}`} />
          <span className="font-semibold text-gray-700">
            {mode === 'morning' ? 'Formation Matin' : 'Business Game'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={isRunning ? pauseTimer : resumeTimer}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            title={isRunning ? 'Mettre en pause' : 'Reprendre'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Temps restant:</span>
          <span className={`font-mono text-lg font-bold ${showCritical ? 'text-red-600' : showAlert ? 'text-orange-600' : showWarning ? 'text-yellow-600' : 'text-gray-800'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        {getChapterInfo() && (
          <div className="text-xs text-gray-500 italic">
            {getChapterInfo()}
          </div>
        )}

        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
              showCritical ? 'bg-red-500' :
              showAlert ? 'bg-orange-500' :
              showWarning ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatTime(timeRemaining)}</span>
          <span>{Math.round(progress)}%</span>
          <span>{formatTime(0)}</span>
        </div>

        {(showWarning || showAlert || showCritical) && (
          <div className={`flex items-center gap-2 mt-2 p-2 rounded text-xs ${
            showCritical ? 'bg-red-50 text-red-700' :
            showAlert ? 'bg-orange-50 text-orange-700' :
            'bg-yellow-50 text-yellow-700'
          }`}>
            <AlertTriangle className="w-4 h-4" />
            <span>
              {showCritical ? 'Moins de 5 minutes restantes!' :
               showAlert ? 'Moins de 15 minutes restantes' :
               'Moins de 30 minutes restantes'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalTimer;