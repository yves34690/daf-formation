import React, { useState, useMemo } from 'react';
import { STUDENTS, TEACHER, searchStudents } from '../data/students';
import type { Student } from '../data/students';
import { Search, User, LogIn, GraduationCap } from 'lucide-react';

interface LoginViewProps {
  onLogin: (userId: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) {
      return STUDENTS;
    }
    return searchStudents(searchQuery);
  }, [searchQuery]);

  const handleStudentSelect = (student: Student) => {
    onLogin(student.id);
  };

  // Génération d'initiales pour l'avatar par défaut
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Couleur d'avatar basée sur le nom (pour cohérence)
  const getAvatarColor = (id: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-red-500',
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Formation DAF - Business Game
          </h1>
          <p className="text-lg text-slate-600">
            Sélectionnez votre profil pour commencer
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Séance du 14/10/2025 de 09h30 à 13h00 - IAHIT : Comprendre les enjeux métiers - DAF B4
          </p>
        </div>

        {/* Teacher Access */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl shadow-md p-6 border-2 border-orange-200">
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-slate-900">Accès Formateur</h2>
            </div>
            <button
              onClick={() => onLogin(TEACHER.id)}
              className="w-full flex items-center gap-4 p-4 bg-white hover:bg-orange-50 rounded-lg border-2 border-orange-300 hover:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(TEACHER.firstName, TEACHER.lastName)}
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg text-slate-900">
                  {TEACHER.firstName} {TEACHER.lastName}
                </p>
                <p className="text-sm text-slate-600">{TEACHER.formation}</p>
                <p className="text-xs text-slate-500 mt-1">{TEACHER.company}</p>
              </div>
              <div className="text-orange-600 font-semibold">
                Dashboard Formateur →
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Étudiants</h2>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou entreprise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Aucun étudiant trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="group flex flex-col items-center p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                >
                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-full ${getAvatarColor(student.id)} flex items-center justify-center text-white text-2xl font-bold mb-3 group-hover:scale-110 transition-transform`}>
                    {getInitials(student.firstName, student.lastName)}
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="font-semibold text-slate-900 text-sm">
                      {student.firstName}
                    </p>
                    <p className="font-semibold text-slate-900 text-sm">
                      {student.lastName}
                    </p>
                    {student.company && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {student.company}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>Vos données de progression seront sauvegardées localement</p>
          <p className="mt-1">
            Pour changer de profil, utilisez le menu en haut à droite après connexion
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
