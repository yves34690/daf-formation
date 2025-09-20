
import React, { useState } from 'react';
import GlossaryTerm from '../Glossary/GlossaryTerm';

const SpinTextarea: React.FC<{ title: string; placeholder: string; initialValue: string }> = ({ title, placeholder, initialValue }) => {
    const [value, setValue] = useState(initialValue);
    return (
        <div>
            <h4 className="font-semibold text-lg text-slate-800 mb-2">{title}</h4>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                rows={10}
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
        </div>
    )
}

const SpinGuideTab: React.FC = () => {
    const commercialInitial = `SITUATION\n- Comment gérez-vous actuellement vos reportings financiers ?\n- Quels outils utilisez-vous pour le pilotage de la performance ?\n\nPROBLÈME\n- Quelles sont vos principales difficultés en matière de consolidation ?\n- Avez-vous des problèmes de fiabilité sur vos données ?\n\nIMPLICATION\n- Quel est l'impact de ces délais sur vos prises de décision ?\n- Comment ces problèmes affectent-ils votre relation avec la direction ?\n\nNÉCESSITÉ / BESOIN\n- Quelle priorité donnez-vous à la résolution de ces enjeux ?\n- Quels seraient les bénéfices d'une solution efficace ?`;

    const dafInitial = `SITUATION\n- Quels sont nos processus actuels ? Sont-ils efficaces ?\n- Quels outils utilisons-nous et quelles sont leurs limites ?\n\nPROBLÈME\n- Où perdons-nous le plus de temps ?\n- Quels sont les risques actuels (financiers, opérationnels, de conformité) ?\n\nIMPLICATION\n- Quel est le coût de ces problèmes (en temps, en argent, en opportunités manquées) ?\n- Quel est l'impact sur mes équipes et sur les autres départements ?\n\nNÉCESSITÉ / BESOIN\n- Quel serait le scénario idéal ?\n- Quels bénéfices mesurables (ROI) attendons-nous d'une nouvelle solution ?`;

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Construire votre questionnaire <GlossaryTerm term="SPIN">SPIN</GlossaryTerm>
      </h3>
      <p className="text-slate-600 mb-6">Chaque rôle prépare ses questions pour structurer la négociation. Le but est de découvrir les vrais enjeux financiers et de construire une argumentation solide en utilisant la méthode <GlossaryTerm term="SPIN">SPIN</GlossaryTerm>.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpinTextarea 
            title="Pour les Commerciaux IT"
            placeholder="Rédigez ici vos questions SPIN pour le DAF..."
            initialValue={commercialInitial}
        />
        <SpinTextarea 
            title="Pour le DAF (Réflexion interne)"
            placeholder="Rédigez ici vos propres questions pour préparer l'entretien..."
            initialValue={dafInitial}
        />
      </div>
    </div>
  );
};

export default SpinGuideTab;
