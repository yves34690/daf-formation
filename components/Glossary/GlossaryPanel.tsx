import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowLeft, Clock, Tag } from 'lucide-react';
import { useGlossary } from '../../contexts/GlossaryContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { GLOSSARY_CATEGORIES, getTermsByCategory, GlossaryTerm } from '../../data/glossary';

const GlossaryPanel: React.FC = () => {
  const {
    isOpen,
    closeGlossary,
    selectedTerm,
    clearTerm,
    searchQuery,
    setSearchQuery,
    searchResults,
    recentTerms,
    getTerm,
    selectTerm
  } = useGlossary();

  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'term' | 'category'>('home');

  // Réinitialiser la vue quand on sélectionne un terme
  useEffect(() => {
    if (selectedTerm) {
      setView('term');
    } else {
      setView('home');
    }
  }, [selectedTerm]);

  if (!isOpen) return null;

  const handleTermSelect = (termId: string) => {
    selectTerm(termId);
  };

  const handleBackToHome = () => {
    clearTerm();
    setActiveCategory(null);
    setView('home');
    setSearchQuery('');
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setView('category');
    setSearchQuery('');
  };

  const renderTerm = (term: GlossaryTerm) => {
    const categoryInfo = GLOSSARY_CATEGORIES[term.category];

    return (
      <button
        key={term.id}
        onClick={() => handleTermSelect(term.id)}
        className={`w-full text-left p-4 rounded-lg border transition-all hover:shadow-md ${
          selectedTerm?.id === term.id
            ? 'bg-blue-50 border-blue-300'
            : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{term.term}</span>
            {term.abbreviation && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                {term.abbreviation}
              </span>
            )}
          </div>
          <span className="text-lg">{categoryInfo.icon}</span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{term.definition}</p>
      </button>
    );
  };

  const renderHome = () => (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher un terme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoFocus={!isMobile}
        />
      </div>

      {/* Résultats de recherche */}
      {searchQuery && (
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">
            Résultats ({searchResults.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map(renderTerm)
            ) : (
              <p className="text-slate-500 text-center py-8">
                Aucun terme trouvé pour "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* Catégories */}
      {!searchQuery && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Catégories
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(GLOSSARY_CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-slate-900">{category.label}</span>
                </div>
                <span className="text-sm text-slate-500">
                  {getTermsByCategory(key).length} termes
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Termes récents */}
      {!searchQuery && recentTerms.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Consultés récemment
          </h3>
          <div className="space-y-2">
            {recentTerms.slice(0, 5).map((termId) => {
              const term = getTerm(termId);
              return term ? renderTerm(term) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderCategory = () => {
    if (!activeCategory) return null;

    const categoryInfo = GLOSSARY_CATEGORIES[activeCategory];
    const terms = getTermsByCategory(activeCategory);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToHome}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categoryInfo.icon}</span>
            <h2 className="text-xl font-bold text-slate-900">{categoryInfo.label}</h2>
          </div>
        </div>

        <div className="space-y-2">
          {terms.map(renderTerm)}
        </div>
      </div>
    );
  };

  const renderTermDetail = () => {
    if (!selectedTerm) return null;

    const categoryInfo = GLOSSARY_CATEGORIES[selectedTerm.category];

    return (
      <div className="space-y-6">
        {/* Header avec retour */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToHome}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categoryInfo.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{selectedTerm.term}</h2>
              {selectedTerm.abbreviation && (
                <p className="text-sm text-slate-600">{selectedTerm.abbreviation}</p>
              )}
            </div>
          </div>
        </div>

        {/* Définition */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Définition</h3>
          <p className="text-slate-700">{selectedTerm.definition}</p>
        </div>

        {/* Définition détaillée */}
        {selectedTerm.detailedDefinition && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Explication détaillée</h3>
            <p className="text-blue-800">{selectedTerm.detailedDefinition}</p>
          </div>
        )}

        {/* Exemple */}
        {selectedTerm.example && (
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Exemple</h3>
            <p className="text-green-800 italic">"{selectedTerm.example}"</p>
          </div>
        )}

        {/* Termes liés */}
        {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">Termes liés</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTerm.relatedTerms.map((relatedId) => {
                const relatedTerm = getTerm(relatedId);
                return relatedTerm ? (
                  <button
                    key={relatedId}
                    onClick={() => handleTermSelect(relatedId)}
                    className="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm hover:bg-slate-50 transition-colors"
                  >
                    {relatedTerm.term}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (view) {
      case 'term':
        return renderTermDetail();
      case 'category':
        return renderCategory();
      default:
        return renderHome();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeGlossary}
      />

      {/* Panel */}
      <div className={`
        fixed z-50 bg-white shadow-xl
        ${isMobile
          ? 'inset-x-0 bottom-0 rounded-t-xl max-h-[90vh]'
          : 'top-0 right-0 w-96 h-full'
        }
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-bold text-slate-900">Glossaire</h1>
          </div>
          <button
            onClick={closeGlossary}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: isMobile ? 'calc(90vh - 80px)' : 'calc(100vh - 80px)' }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default GlossaryPanel;