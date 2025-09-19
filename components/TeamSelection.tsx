
import React from 'react';
import type { Scenario } from '../types';

interface TeamSelectionProps {
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({ scenarios, onSelect }) => {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Choisissez votre cas de négociation
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Chaque équipe sélectionne un scénario. Vous incarnerez soit le commercial IT, soit le DAF de la PME.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold text-blue-600">{scenario.company.name}</h3>
                 <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{scenario.sme.industry}</span>
              </div>
              <p className="text-slate-700 font-semibold mb-2">
                Le DAF de <span className="text-slate-900">{scenario.sme.name}</span>
              </p>
              <p className="text-sm text-slate-600 line-clamp-2">
                {scenario.sme.description}
              </p>
            </div>
            <div className="bg-slate-50 px-6 py-4">
              <p className="text-sm font-semibold text-slate-800">Produit proposé :</p>
              <p className="text-sm text-slate-600">{scenario.company.product}</p>
            </div>
             <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelection;
