
import React from 'react';
import type { Scenario } from '../../types';
import { Building, User, Target, AlertTriangle } from 'lucide-react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-slate-50 border border-slate-200 rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

const ScenarioTab: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">
        Présentation du Scénario
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IT Company Profile */}
        <div>
          <div className="flex items-center mb-4">
            <Building className="w-6 h-6 text-blue-600 mr-3" />
            <h4 className="text-xl font-semibold text-slate-800">
              Rôle 1 : Commercial IT ({scenario.company.name})
            </h4>
          </div>
          <Card>
            <p className="font-semibold text-slate-700">Votre mission :</p>
            <p className="text-sm text-slate-600 mb-4">
              Comprendre les besoins du DAF en utilisant la méthode SPIN et lui proposer une offre commerciale convaincante pour votre solution : <strong>{scenario.company.product}</strong>.
            </p>
            <div className="space-y-3 text-sm">
                <p><strong>Situation :</strong> {scenario.company.situation}</p>
                <p><strong>Problème :</strong> {scenario.company.problem}</p>
                <p><strong>Implication :</strong> {scenario.company.implication}</p>
                <p><strong>Nécessité :</strong> {scenario.company.necessity}</p>
                <p className="mt-2 pt-2 border-t font-mono"><strong>Prix :</strong> {scenario.company.price}</p>
            </div>
          </Card>
        </div>

        {/* SME DAF Profile */}
        <div>
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-emerald-600 mr-3" />
            <h4 className="text-xl font-semibold text-slate-800">
              Rôle 2 : DAF de la PME ({scenario.sme.name})
            </h4>
          </div>
          <Card>
            <p className="font-semibold text-slate-700">Votre mission :</p>
            <p className="text-sm text-slate-600 mb-4">
              Articuler les défis de votre entreprise, évaluer la solution proposée par le commercial et rédiger un cahier des charges précisant vos exigences.
            </p>
             <div className="mb-4">
                <p className="text-sm font-medium text-slate-700">{scenario.sme.industry}</p>
                <p className="text-sm text-slate-600">{scenario.sme.description}</p>
            </div>
            
            <h5 className="font-semibold text-slate-700 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                Vos défis actuels :
            </h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                {scenario.sme.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScenarioTab;
