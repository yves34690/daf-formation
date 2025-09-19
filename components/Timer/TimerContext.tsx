import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface TimerContextType {
  timeElapsed: number;
  totalDuration: number;
  isRunning: boolean;
  mode: 'morning' | 'afternoon' | null;
  currentChapter: number | null;
  startTimer: (mode: 'morning' | 'afternoon') => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  setCurrentChapter: (chapter: number | null) => void;
  getTimeRemaining: () => number;
  getProgress: () => number;
  formatTime: (seconds: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

const MORNING_DURATION = 4 * 60 * 60; // 4 heures en secondes
const AFTERNOON_DURATION = 3 * 60 * 60; // 3 heures en secondes

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'morning' | 'afternoon' | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);

  const totalDuration = mode === 'morning' ? MORNING_DURATION : AFTERNOON_DURATION;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          // Auto-pause si on atteint la durée totale
          if (newTime >= totalDuration) {
            setIsRunning(false);
            return totalDuration;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, totalDuration]);

  const startTimer = useCallback((newMode: 'morning' | 'afternoon') => {
    setMode(newMode);
    setTimeElapsed(0);
    setIsRunning(true);
    setCurrentChapter(newMode === 'morning' ? 1 : null);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (mode && timeElapsed < totalDuration) {
      setIsRunning(true);
    }
  }, [mode, timeElapsed, totalDuration]);

  const resetTimer = useCallback(() => {
    setTimeElapsed(0);
    setIsRunning(false);
    setMode(null);
    setCurrentChapter(null);
  }, []);

  const getTimeRemaining = useCallback(() => {
    return Math.max(0, totalDuration - timeElapsed);
  }, [totalDuration, timeElapsed]);

  const getProgress = useCallback(() => {
    if (totalDuration === 0) return 0;
    return Math.min(100, (timeElapsed / totalDuration) * 100);
  }, [timeElapsed, totalDuration]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const value: TimerContextType = {
    timeElapsed,
    totalDuration,
    isRunning,
    mode,
    currentChapter,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setCurrentChapter,
    getTimeRemaining,
    getProgress,
    formatTime,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};