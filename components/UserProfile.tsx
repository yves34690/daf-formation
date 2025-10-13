import React from 'react';
import { useUser } from '../contexts/UserContext';
import { X, User, Briefcase, Calendar, Phone, Award, CheckCircle, Circle, TrendingUp } from 'lucide-react';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { currentUser, userProgress } = useUser();

  if (!currentUser || !userProgress) {
    return null;
  }

  // Génération d'initiales pour l'avatar
  const getInitials = (): string => {
    return `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase();
  };

  // Couleur d'avatar
  const getAvatarColor = (): string => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
    ];
    const index = currentUser.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Statistiques
  const chaptersCompleted = userProgress.chapters.filter(c => c.status === 'completed').length;
  const totalChapters = 5;
  const workshopsCompleted = userProgress.workshopScores.length;
  const totalVotes = userProgress.votes.length;
  const gameParticipations = userProgress.gameParticipation.length;

  const completionPercentage = Math.round((chaptersCompleted / totalChapters) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getAvatarColor()} p-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-4xl font-bold backdrop-blur-sm`}>
              {getInitials()}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-white text-opacity-90 text-lg">
                {currentUser.formation}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Informations personnelles */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Informations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentUser.company && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Entreprise</p>
                    <p className="text-sm font-semibold text-slate-900">{currentUser.company}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Date de naissance</p>
                  <p className="text-sm font-semibold text-slate-900">{currentUser.birthDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Phone className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Téléphone</p>
                  <p className="text-sm font-semibold text-slate-900">{currentUser.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progression globale */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Progression Globale
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-slate-900">Formation complétée</span>
                <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Statistiques d'activité */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Statistiques d'activité
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">{chaptersCompleted}</div>
                <div className="text-sm text-slate-600">Chapitres complétés</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">{workshopsCompleted}</div>
                <div className="text-sm text-slate-600">Ateliers réalisés</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">{totalVotes}</div>
                <div className="text-sm text-slate-600">Votes émis</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-1">{gameParticipations}</div>
                <div className="text-sm text-slate-600">Scénarios joués</div>
              </div>
            </div>
          </div>

          {/* Progression des chapitres */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Progression des Chapitres</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((chapterId) => {
                const chapter = userProgress.chapters.find(c => c.chapterId === chapterId);
                const status = chapter?.status || 'not_started';
                const chapterNames = [
                  'Les représentations du métier',
                  'Les évolutions du métier',
                  'La réalité du métier',
                  'Communication & Négociation',
                  'Préparation Business Game'
                ];

                return (
                  <div
                    key={chapterId}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      status === 'completed'
                        ? 'bg-green-50 border-green-300'
                        : status === 'in_progress'
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className={`w-6 h-6 flex-shrink-0 ${status === 'in_progress' ? 'text-blue-600' : 'text-slate-400'}`} />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        Chapitre {chapterId}: {chapterNames[chapterId - 1]}
                      </p>
                      <p className="text-sm text-slate-600">
                        {status === 'completed' ? 'Complété' : status === 'in_progress' ? 'En cours' : 'Non commencé'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scores des ateliers */}
          {workshopsCompleted > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Résultats des Ateliers</h3>
              <div className="space-y-3">
                {userProgress.workshopScores.map((score, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {score.workshopId === 'quiz' ? 'Quiz - Représentations du métier' : 'Générateur de cas concrets'}
                        </p>
                        <p className="text-sm text-slate-600">
                          Complété le {new Date(score.completedAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      {score.score !== undefined && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{score.score}%</p>
                          <p className="text-xs text-slate-500">Score</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
