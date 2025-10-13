import React, { useState, useEffect } from 'react';
import { STUDENTS } from '../data/students';
import type { UserProgress } from '../types';
import { getUserProgress, exportAllUserData } from '../utils/storage';
import { X, Download, Users, TrendingUp, Award, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

interface TeacherDashboardProps {
  onClose: () => void;
}

interface StudentStats {
  id: string;
  name: string;
  company: string;
  chaptersCompleted: number;
  workshopsCompleted: number;
  votesEmitted: number;
  gameParticipations: number;
  completionPercentage: number;
  lastActivity: string | null;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onClose }) => {
  const [studentsStats, setStudentsStats] = useState<StudentStats[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'completion' | 'activity'>('completion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  useEffect(() => {
    loadStudentsData();
  }, []);

  const loadStudentsData = () => {
    const stats: StudentStats[] = STUDENTS.map(student => {
      const progress = getUserProgress(student.id);

      if (!progress) {
        return {
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          company: student.company,
          chaptersCompleted: 0,
          workshopsCompleted: 0,
          votesEmitted: 0,
          gameParticipations: 0,
          completionPercentage: 0,
          lastActivity: null
        };
      }

      const chaptersCompleted = progress.chapters.filter(c => c.status === 'completed').length;
      const totalChapters = 5;
      const completionPercentage = Math.round((chaptersCompleted / totalChapters) * 100);

      return {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        company: student.company,
        chaptersCompleted,
        workshopsCompleted: progress.workshopScores.length,
        votesEmitted: progress.votes.length,
        gameParticipations: progress.gameParticipation.length,
        completionPercentage,
        lastActivity: progress.lastActivity
      };
    });

    setStudentsStats(stats);
  };

  const sortedStats = [...studentsStats].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'completion':
        comparison = a.completionPercentage - b.completionPercentage;
        break;
      case 'activity':
        const aTime = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        const bTime = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
        comparison = aTime - bTime;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const globalStats = {
    totalStudents: STUDENTS.length,
    activeStudents: studentsStats.filter(s => s.lastActivity !== null).length,
    avgCompletion: Math.round(studentsStats.reduce((acc, s) => acc + s.completionPercentage, 0) / studentsStats.length),
    totalVotes: studentsStats.reduce((acc, s) => acc + s.votesEmitted, 0)
  };

  const handleExport = () => {
    const data = exportAllUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formation-daf-progressions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field: 'name' | 'completion' | 'activity') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl my-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard Formateur</h2>
              <p className="text-white text-opacity-90">Suivi de la progression des étudiants</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="hidden md:inline">Exporter JSON</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Statistiques Globales</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600">Étudiants</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{globalStats.totalStudents}</div>
              <div className="text-xs text-slate-500 mt-1">{globalStats.activeStudents} actifs</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600">Progression Moy.</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{globalStats.avgCompletion}%</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-slate-600">Total Votes</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">{globalStats.totalVotes}</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-slate-600">Taux de Participation</span>
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {Math.round((globalStats.activeStudents / globalStats.totalStudents) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Progression Individuelle</h3>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort('name')}
                className={`px-3 py-1 text-sm rounded ${sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => toggleSort('completion')}
                className={`px-3 py-1 text-sm rounded ${sortBy === 'completion' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Progression {sortBy === 'completion' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => toggleSort('activity')}
                className={`px-3 py-1 text-sm rounded ${sortBy === 'activity' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Activité {sortBy === 'activity' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {sortedStats.map((student) => (
              <div
                key={student.id}
                className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                  className="w-full p-4 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                      <div>
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${student.completionPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                          {student.completionPercentage}%
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Chapitres:</span>
                          <span className="ml-1 font-semibold">{student.chaptersCompleted}/5</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Ateliers:</span>
                          <span className="ml-1 font-semibold">{student.workshopsCompleted}</span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        {student.lastActivity
                          ? `Actif ${new Date(student.lastActivity).toLocaleDateString('fr-FR')}`
                          : 'Jamais connecté'}
                      </div>
                    </div>
                    {expandedStudent === student.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {expandedStudent === student.id && (
                  <div className="p-4 bg-white border-t border-slate-200">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">Votes émis</p>
                        <p className="text-slate-600">{student.votesEmitted} vote(s)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">Scénarios joués</p>
                        <p className="text-slate-600">{student.gameParticipations} scénario(s)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">Dernière activité</p>
                        <p className="text-slate-600">
                          {student.lastActivity
                            ? new Date(student.lastActivity).toLocaleString('fr-FR')
                            : 'Aucune'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-slate-50 border-t">
          <h4 className="font-semibold text-slate-900 mb-2">Informations</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Les données sont stockées localement dans le navigateur de chaque étudiant</li>
            <li>• Utilisez le bouton "Exporter JSON" pour sauvegarder toutes les progressions</li>
            <li>• Les statistiques se mettent à jour automatiquement à chaque connexion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
