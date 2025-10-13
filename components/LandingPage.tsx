import React from 'react';
import { ArrowRight, Clock, Target, Users, Trophy, BookOpen, Briefcase, TrendingUp, Award, GraduationCap, Building2, Rocket } from 'lucide-react';
import { SCENARIOS } from '../constants';
import { TEACHER } from '../data/students';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-slate-900/5" />
        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Session Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              <Clock className="w-4 h-4" />
              Session du 14 octobre 2025 • 7h de formation • Niveau Professionnel
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in">
              Maîtrisez les enjeux du{' '}
              <span className="text-blue-600">Directeur Administratif et Financier</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto animate-fade-in">
              Une formation interactive combinant apprentissage théorique et mise en pratique immédiate
              avec des scénarios d'entreprises réelles. Développez votre expertise commerciale face aux DAF.
            </p>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold animate-fade-in"
            >
              Commencer la formation
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto animate-fade-in">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">7h</div>
                <div className="text-sm text-slate-600">de formation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-slate-600">scénarios réels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">8</div>
                <div className="text-sm text-slate-600">ateliers pratiques</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Programme de la journée
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une journée intensive pour acquérir et mettre en pratique vos nouvelles compétences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Morning */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Matinée</h3>
                  <p className="text-blue-700 font-semibold">9h00 - 13h00 • 4 heures</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Formation théorique</h4>
                    <p className="text-sm text-slate-600">5 chapitres couvrant les fondamentaux du DAF</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">8 ateliers interactifs</h4>
                    <p className="text-sm text-slate-600">Exercices pratiques pour ancrer vos connaissances</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Glossaire interactif</h4>
                    <p className="text-sm text-slate-600">150+ termes financiers à portée de clic</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Afternoon */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Après-midi</h3>
                  <p className="text-orange-700 font-semibold">14h00 - 17h00 • 3 heures</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Business Game immersif</h4>
                    <p className="text-sm text-slate-600">Négociations en conditions réelles</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">6 scénarios d'entreprises</h4>
                    <p className="text-sm text-slate-600">Propositions commerciales et cahiers des charges</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Session de vote collaborative</h4>
                    <p className="text-sm text-slate-600">Évaluation par les pairs et feedback collectif</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi cette formation ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des avantages concrets pour votre développement professionnel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Contenu Expert</h3>
              <p className="text-slate-600">
                Formation conçue par un RAF avec 20+ ans d'expérience en direction financière
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Apprentissage Pratique</h3>
              <p className="text-slate-600">
                Mettez immédiatement en pratique avec des scénarios d'entreprises réelles
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Suivi Personnalisé</h3>
              <p className="text-slate-600">
                Progression individuelle trackée avec dashboard formateur en temps réel
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Situations Réelles</h3>
              <p className="text-slate-600">
                6 entreprises innovantes pour comprendre les enjeux actuels des DAF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Scenarios Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Les entreprises du Business Game
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Négociez avec des DAF d'entreprises innovantes et variées
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SCENARIOS.map((scenario, index) => (
              <div
                key={scenario.id}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {scenario.company.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold">{scenario.company.industry}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-3">
                  <p className="text-sm text-slate-600 mb-2">
                    <span className="font-semibold text-slate-900">Négociation avec :</span>
                  </p>
                  <p className="text-base font-semibold text-slate-900">{scenario.sme.name}</p>
                  <p className="text-sm text-slate-600">{scenario.sme.industry}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>Scénario {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Profile Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Votre formateur expert
              </h2>
              <p className="text-lg text-slate-600">
                Une expertise reconnue en direction financière et modélisation
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {TEACHER.firstName.charAt(0)}{TEACHER.lastName.charAt(0)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {TEACHER.firstName} {TEACHER.lastName}
                  </h3>
                  <p className="text-xl text-orange-600 font-semibold mb-4">{TEACHER.company}</p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">20+ ans d'expérience</h4>
                        <p className="text-sm text-slate-600">Direction financière et RAF</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Expert en modélisation</h4>
                        <p className="text-sm text-slate-600">Financière et stratégique</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Pédagogie interactive</h4>
                        <p className="text-sm text-slate-600">Formation pratique et engageante</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Cas pratiques réels</h4>
                        <p className="text-sm text-slate-600">Retours d'expérience terrain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connectez-vous avec votre profil étudiant pour accéder à la formation complète
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Accéder à la formation
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-12 pt-8 border-t border-blue-500/30">
            <p className="text-blue-200 text-sm">
              Formation DAF Business Game • Session du 14 octobre 2025 • Euridis Business School
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
