import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GlossaryTerm, GLOSSARY_TERMS, findTerm, searchTerms } from '../data/glossary';

interface GlossaryContextType {
  // État du panel
  isOpen: boolean;
  openGlossary: () => void;
  closeGlossary: () => void;
  toggleGlossary: () => void;

  // Terme actuel
  selectedTerm: GlossaryTerm | null;
  selectTerm: (termId: string) => void;
  clearTerm: () => void;

  // Recherche
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: GlossaryTerm[];

  // Historique
  recentTerms: string[];
  addToHistory: (termId: string) => void;
  clearHistory: () => void;

  // Utilitaires
  getTerm: (termId: string) => GlossaryTerm | undefined;
  searchTerm: (query: string) => GlossaryTerm | undefined;
}

const GlossaryContext = createContext<GlossaryContextType | undefined>(undefined);

interface GlossaryProviderProps {
  children: ReactNode;
}

const MAX_RECENT_TERMS = 10;

export const GlossaryProvider: React.FC<GlossaryProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTerms, setRecentTerms] = useState<string[]>([]);

  // Calculer les résultats de recherche
  const searchResults = React.useMemo(() => {
    return searchTerms(searchQuery);
  }, [searchQuery]);

  // Fonctions de gestion du panel
  const openGlossary = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeGlossary = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleGlossary = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Fonctions de gestion des termes
  const selectTerm = useCallback((termId: string) => {
    const term = GLOSSARY_TERMS[termId];
    if (term) {
      setSelectedTerm(term);
      addToHistory(termId);
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [isOpen]);

  const clearTerm = useCallback(() => {
    setSelectedTerm(null);
  }, []);

  // Fonctions de gestion de l'historique
  const addToHistory = useCallback((termId: string) => {
    setRecentTerms(prev => {
      const filtered = prev.filter(id => id !== termId);
      return [termId, ...filtered].slice(0, MAX_RECENT_TERMS);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setRecentTerms([]);
  }, []);

  // Fonctions utilitaires
  const getTerm = useCallback((termId: string) => {
    return GLOSSARY_TERMS[termId];
  }, []);

  const searchTerm = useCallback((query: string) => {
    return findTerm(query);
  }, []);

  // Gestion des raccourcis clavier
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+G ou Cmd+G pour ouvrir/fermer le glossaire
      if ((event.ctrlKey || event.metaKey) && event.key === 'g') {
        event.preventDefault();
        toggleGlossary();
      }

      // Escape pour fermer le glossaire
      if (event.key === 'Escape' && isOpen) {
        closeGlossary();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleGlossary, closeGlossary]);

  const value: GlossaryContextType = {
    // État du panel
    isOpen,
    openGlossary,
    closeGlossary,
    toggleGlossary,

    // Terme actuel
    selectedTerm,
    selectTerm,
    clearTerm,

    // Recherche
    searchQuery,
    setSearchQuery,
    searchResults,

    // Historique
    recentTerms,
    addToHistory,
    clearHistory,

    // Utilitaires
    getTerm,
    searchTerm
  };

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  );
};

export const useGlossary = (): GlossaryContextType => {
  const context = useContext(GlossaryContext);
  if (context === undefined) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return context;
};

// Hook pour vérifier si un terme existe
export const useTermExists = (termId: string): boolean => {
  return termId in GLOSSARY_TERMS;
};

// Hook pour obtenir un terme spécifique
export const useTerm = (termId: string): GlossaryTerm | undefined => {
  return React.useMemo(() => GLOSSARY_TERMS[termId], [termId]);
};