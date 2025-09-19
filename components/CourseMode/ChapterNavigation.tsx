import React from 'react';
import { Check, Lock, Play, Clock } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  duration: number; // en minutes
  completed: boolean;
  current: boolean;
  locked: boolean;
}

interface ChapterNavigationProps {
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
  currentChapterId: number | null;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  chapters,
  onSelectChapter,
  currentChapterId,
}) => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-6 h-fit">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Programme de Formation
      </h2>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => !chapter.locked && onSelectChapter(chapter.id)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              chapter.current
                ? 'bg-blue-50 border-2 border-blue-500'
                : chapter.completed
                ? 'bg-green-50 border border-green-300 hover:bg-green-100'
                : chapter.locked
                ? 'bg-gray-50 border border-gray-200 cursor-not-allowed opacity-60'
                : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
            disabled={chapter.locked}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      chapter.completed
                        ? 'bg-green-500 text-white'
                        : chapter.current
                        ? 'bg-blue-500 text-white'
                        : chapter.locked
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {chapter.completed ? (
                      <Check className="w-5 h-5" />
                    ) : chapter.current ? (
                      <Play className="w-4 h-4" />
                    ) : chapter.locked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      chapter.id
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        chapter.current
                          ? 'text-blue-900'
                          : chapter.completed
                          ? 'text-green-900'
                          : chapter.locked
                          ? 'text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {chapter.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-11 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{chapter.duration} min</span>
                </div>
              </div>
            </div>

            {chapter.current && (
              <div className="mt-3 ml-11">
                <div className="text-xs text-blue-600 font-medium">En cours</div>
                <div className="w-full bg-blue-100 rounded-full h-1.5 mt-1">
                  <div className="bg-blue-500 h-1.5 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progression totale</span>
          <span className="font-semibold text-gray-900">
            {chapters.filter(c => c.completed).length} / {chapters.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(chapters.filter(c => c.completed).length / chapters.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;