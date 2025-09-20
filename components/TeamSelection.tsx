
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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Choisissez votre cas de négociation
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 px-4 sm:px-0">
          Chaque équipe sélectionne un scénario. Vous incarnerez soit le commercial IT, soit le DAF de la PME.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[200px]"
          >
            <div className="p-4 sm:p-6">
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
            <div className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-4">
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
