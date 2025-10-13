import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Student } from '../data/students';
import { findStudentById } from '../data/students';
import type { UserProgress } from '../types';
import {
  getCurrentUserId,
  setCurrentUserId,
  clearCurrentUser,
  getUserProgress,
  initializeUserProgress,
} from '../utils/storage';

interface UserContextType {
  currentUser: Student | null;
  userProgress: UserProgress | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  refreshProgress: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  // Fonction de chargement de la progression - DOIT être un useCallback
  const loadUserProgress = useCallback((userId: string) => {
    let progress = getUserProgress(userId);
    if (!progress) {
      progress = initializeUserProgress(userId);
    }
    setUserProgress(progress);
  }, []);

  // Charger l'utilisateur depuis le localStorage au montage
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const student = findStudentById(userId);
      if (student) {
        setCurrentUser(student);
        loadUserProgress(userId);
      } else {
        // Utilisateur invalide dans le storage, nettoyer
        clearCurrentUser();
      }
    }
  }, [loadUserProgress]);

  const login = useCallback((userId: string) => {
    const student = findStudentById(userId);
    if (student) {
      setCurrentUser(student);
      setCurrentUserId(userId);
      loadUserProgress(userId);
    } else {
      console.error('Student not found:', userId);
    }
  }, [loadUserProgress]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setUserProgress(null);
    clearCurrentUser();
  }, []);

  const refreshProgress = useCallback(() => {
    if (currentUser) {
      loadUserProgress(currentUser.id);
    }
  }, [currentUser, loadUserProgress]);

  const value: UserContextType = {
    currentUser,
    userProgress,
    isAuthenticated: currentUser !== null,
    login,
    logout,
    refreshProgress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
