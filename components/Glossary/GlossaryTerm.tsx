import React, { ReactNode } from 'react';
import { useGlossary, useTermExists } from '../../contexts/GlossaryContext';

interface GlossaryTermProps {
  /** ID du terme dans le glossaire */
  term: string;
  /** Contenu à afficher (par défaut, le terme lui-même) */
  children?: ReactNode;
  /** Classe CSS personnalisée */
  className?: string;
  /** Style inline personnalisé */
  style?: React.CSSProperties;
  /** Désactiver le lien (affichage normal) */
  disabled?: boolean;
  /** Afficher uniquement si le terme existe */
  fallback?: boolean;
}

/**
 * Composant pour rendre un terme cliquable qui ouvre le glossaire
 *
 * @example
 * <GlossaryTerm term="DAF">DAF</GlossaryTerm>
 * <GlossaryTerm term="ROI" />
 * <GlossaryTerm term="EBITDA">indicateur EBITDA</GlossaryTerm>
 */
const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  term,
  children,
  className = '',
  style,
  disabled = false,
  fallback = true
}) => {
  const { selectTerm } = useGlossary();
  const termExists = useTermExists(term);

  // Si le terme n'existe pas et fallback est activé, afficher le texte normal
  if (!termExists && fallback) {
    return <span className={className} style={style}>{children || term}</span>;
  }

  // Si le terme n'existe pas et fallback est désactivé, ne rien afficher
  if (!termExists && !fallback) {
    return null;
  }

  // Si disabled, afficher comme texte normal
  if (disabled) {
    return <span className={className} style={style}>{children || term}</span>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    selectTerm(term);
  };

  const baseClasses = 'glossary-term';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <button
      onClick={handleClick}
      className={combinedClasses}
      style={{
        // Styles de base pour les termes cliquables
        borderBottom: '1px dotted #3B82F6',
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'help',
        textDecoration: 'none',
        position: 'relative',
        display: 'inline',
        padding: '0 2px',
        borderRadius: '2px',
        transition: 'all 0.2s ease',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        e.currentTarget.style.borderRadius = '3px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderRadius = '2px';
      }}
      title={`Cliquer pour voir la définition de "${children || term}"`}
      type="button"
    >
      {children || term}
      <span
        style={{
          content: '""',
          fontSize: '0.7em',
          verticalAlign: 'super',
          color: '#3B82F6',
          marginLeft: '2px',
          opacity: 0.7
        }}
      >
        ⓘ
      </span>
    </button>
  );
};

export default GlossaryTerm;

// Composant wrapper pour rendre plusieurs termes facilement
interface GlossaryTextProps {
  /** Texte contenant des termes à détecter automatiquement */
  children: string;
  /** Termes à détecter (par défaut, tous les termes du glossaire) */
  terms?: string[];
  /** Classe CSS à appliquer aux termes détectés */
  termClassName?: string;
}

/**
 * Composant qui détecte automatiquement les termes dans un texte et les rend cliquables
 *
 * @example
 * <GlossaryText>Le DAF utilise des KPI pour mesurer le ROI</GlossaryText>
 */
export const GlossaryText: React.FC<GlossaryTextProps> = ({
  children,
  terms,
  termClassName
}) => {
  const { getTerm } = useGlossary();

  // Si pas de termes spécifiés, utiliser tous les termes du glossaire
  const termsToDetect = terms || Object.keys(require('../../data/glossary').GLOSSARY_TERMS);

  // Créer une regex pour détecter tous les termes (mot complet uniquement)
  const termsRegex = new RegExp(
    `\\b(${termsToDetect.join('|')})\\b`,
    'gi'
  );

  // Diviser le texte et identifier les termes
  const parts = children.split(termsRegex);

  return (
    <>
      {parts.map((part, index) => {
        const trimmedPart = part.trim();
        const termExists = termsToDetect.some(
          term => term.toLowerCase() === trimmedPart.toLowerCase()
        );

        if (termExists && getTerm(trimmedPart.toUpperCase())) {
          return (
            <GlossaryTerm
              key={index}
              term={trimmedPart.toUpperCase()}
              className={termClassName}
            >
              {part}
            </GlossaryTerm>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

// Hook utilitaire pour wrapper facilement du texte avec des termes
export const useGlossaryText = () => {
  const { selectTerm } = useGlossary();

  const wrapTerm = (text: string, termId: string) => (
    <GlossaryTerm key={termId} term={termId}>
      {text}
    </GlossaryTerm>
  );

  return { wrapTerm, selectTerm };
};