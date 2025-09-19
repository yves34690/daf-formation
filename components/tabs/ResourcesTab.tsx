
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-slate-800"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="pb-4 text-slate-600 text-sm">
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};

const ResourcesTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Ressources Clés
      </h3>
      <p className="text-slate-600 mb-6">Utilisez ces extraits du cours pour affiner votre stratégie de négociation.</p>
      
      <div className="space-y-2">
        <AccordionItem title="Les qualités nécessaires du DAF">
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Rigueur analytique :</strong> Capacité d'analyse fine des données financières.</li>
            <li><strong>Vision stratégique :</strong> Compréhension des enjeux business globaux.</li>
            <li><strong>Communication :</strong> Vulgarisation des concepts financiers complexes.</li>
            <li><strong>Adaptabilité :</strong> Évolution avec les outils et réglementations.</li>
            <li><strong>Leadership :</strong> Management d'équipes pluridisciplinaires.</li>
            <li><strong>Négociation :</strong> Relations avec partenaires financiers et institutionnels.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Les contraintes et enjeux du métier">
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Fiabilité :</strong> Contrôle interne, audit, conformité, transparence.</li>
                <li><strong>Gestion des risques :</strong> Cartographie des risques, surveillance, gouvernance.</li>
                <li><strong>Anticipation des besoins :</strong> Prévisionnel, plan de trésorerie, planification stratégique.</li>
                <li><strong>Gestion des équipes :</strong> Leadership, coordination, développement des compétences.</li>
                <li><strong>Évolution Technologique :</strong> Digitalisation, automatisation, veille technologique.</li>
            </ul>
        </AccordionItem>
        
        <AccordionItem title="Erreurs courantes à éviter en négociation">
            <div className="space-y-4">
                <div>
                    <p><strong>Erreur :</strong> Se focaliser sur les fonctionnalités techniques.</p>
                    <p><strong>Solution :</strong> Traduire chaque fonctionnalité en bénéfice financier mesurable.</p>
                </div>
                 <div>
                    <p><strong>Erreur :</strong> Négliger les contraintes opérationnelles (processus existants, écosystème IT).</p>
                    <p><strong>Solution :</strong> Comprendre et s'intégrer à l'environnement du client.</p>
                </div>
                 <div>
                    <p><strong>Erreur :</strong> Sous-estimer l'importance de la conformité (sécurité, audit).</p>
                    <p><strong>Solution :</strong> Anticiper et préparer les réponses aux questions de sécurité.</p>
                </div>
                 <div>
                    <p><strong>Erreur :</strong> Proposer un ROI trop optimiste.</p>
                    <p><strong>Solution :</strong> Être conservateur et transparent sur les hypothèses.</p>
                </div>
                 <div>
                    <p><strong>Erreur :</strong> Ignorer l'impact sur les équipes.</p>
                    <p><strong>Solution :</strong> Aborder la conduite du changement et la formation nécessaire.</p>
                </div>
            </div>
        </AccordionItem>
      </div>
    </div>
  );
};

export default ResourcesTab;
