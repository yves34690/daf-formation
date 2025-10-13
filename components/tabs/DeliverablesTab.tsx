import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

interface EditorProps {
    title: string;
    subtitle: string;
    content: string;
    onContentChange: (newContent: string) => void;
}

const Editor: React.FC<EditorProps> = ({ title, subtitle, content, onContentChange }) => {
    const [localContent, setLocalContent] = useState(content);
    const [hasChanges, setHasChanges] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const handleChange = (newContent: string) => {
        setLocalContent(newContent);
        setHasChanges(newContent !== content);
        setShowSaved(false);
    };

    const handleSave = () => {
        onContentChange(localContent);
        setHasChanges(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xl text-slate-800">{title}</h4>
                <button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                        showSaved
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : hasChanges
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    {showSaved ? (
                        <>
                            <Check className="w-4 h-4" />
                            Sauvegardé !
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Enregistrer
                        </>
                    )}
                </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">{subtitle}</p>
            <textarea
                value={localContent}
                onChange={(e) => handleChange(e.target.value)}
                rows={15}
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                placeholder="Commencez à rédiger votre document ici..."
            />
        </div>
    );
};

interface DeliverablesTabProps {
    proposalContent: string;
    specsContent: string;
    onProposalChange: (content: string) => void;
    onSpecsChange: (content: string) => void;
}

const DeliverablesTab: React.FC<DeliverablesTabProps> = ({ proposalContent, specsContent, onProposalChange, onSpecsChange }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Rédaction des livrables
      </h3>
      <p className="text-slate-600 mb-6">C'est le moment de formaliser votre travail. Les commerciaux rédigent la proposition, les DAF le cahier des charges.</p>
      <div className="grid grid-cols-1 gap-8">
        <Editor 
            title="Proposition Commerciale"
            subtitle="Rédigée par l'équipe commerciale IT."
            content={proposalContent}
            onContentChange={onProposalChange}
        />
        <Editor 
            title="Cahier des Charges"
            subtitle="Rédigé par le DAF."
            content={specsContent}
            onContentChange={onSpecsChange}
        />
      </div>
    </div>
  );
};

export default DeliverablesTab;
