import React from 'react';
import { BookOpen, Gamepad2, Calendar, Clock, ArrowRight } from 'lucide-react';

interface NavigationHubProps {
  onSelectMode: (mode: 'morning' | 'afternoon' | 'full') => void;
}

const NavigationHub: React.FC<NavigationHubProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Formation <span className="text-blue-600">DAF</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 px-4 sm:px-0">
            Comprendre les enjeux métiers du Directeur Administratif et Financier
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Formation Matin */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
               onClick={() => onSelectMode('morning')}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <BookOpen className="w-12 h-12 text-blue-600" />
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  4 heures
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Formation Théorique
              </h2>
              <p className="text-slate-600 mb-6">
                Découvrez les missions, enjeux et évolutions du métier de DAF à travers 5 modules interactifs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Représentations du métier
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Évolutions historiques
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Communication & Négociation
                </li>
              </ul>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold min-h-[48px]">
                Commencer la formation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Business Game */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
               onClick={() => onSelectMode('afternoon')}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <Gamepad2 className="w-12 h-12 text-green-600" />
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3 heures
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Business Game
              </h2>
              <p className="text-slate-600 mb-6">
                Mettez en pratique vos connaissances en négociant avec des DAF virtuels.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  6 scénarios d'entreprises
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Négociation commerciale
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Création de livrables
                </li>
              </ul>
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold min-h-[48px]">
                Lancer le Business Game
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Journée Complète */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer text-white"
               onClick={() => onSelectMode('full')}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <Calendar className="w-12 h-12 text-white" />
                <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold">
                  7 heures
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                Journée Complète
              </h2>
              <p className="text-white/90 mb-6">
                Programme complet avec formation théorique le matin et mise en pratique l'après-midi.
              </p>
              <div className="space-y-3 mb-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Matin</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-white/80">9h-13h : Formation</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Après-midi</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-white/80">14h-17h : Business Game</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-white text-purple-600 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold min-h-[48px]">
                Démarrer la journée
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Formation créée par un DAF avec plus de 20 ans d'expérience
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavigationHub;