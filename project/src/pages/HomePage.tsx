import React from 'react';
import { useProgress } from '../context/ProgressContext';
import LessonCard from '../components/lessons/LessonCard';
import { lessons } from '../data/lessons';
import { Skull, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { currentProgress, totalLessons } = useProgress();
  
  // Group lessons by chapter
  const chapters = lessons.reduce((acc, lesson) => {
    acc[lesson.chapter] = [...(acc[lesson.chapter] || []), lesson];
    return acc;
  }, {} as Record<string, typeof lessons>);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="mb-12 rounded-xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 md:p-12">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <Skull className="text-purple-400 mr-3 h-8 w-8" />
              <h1 className="text-3xl font-bold text-white">
                Welcome to <span className="text-purple-400">CryptoZombies</span>
              </h1>
            </div>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Learn to build Ethereum DApps by creating your own zombie game. Get through the lessons, build your zombie army, and compete with other players!
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to={currentProgress === 0 ? '/lesson/1' : `/lesson/${currentProgress + 1}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                {currentProgress === 0 ? 'Start Learning' : 'Continue Learning'}
                <ChevronRight size={16} className="ml-1" />
              </Link>
              
              <div>
                <div className="text-sm text-purple-300 mb-1">
                  {currentProgress}/{totalLessons} Lessons Completed
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: `${(currentProgress / totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lessons by chapter */}
      {Object.entries(chapters).map(([chapterName, chapterLessons]) => (
        <section key={chapterName} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {chapterName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapterLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                description={lesson.shortDescription}
                duration={lesson.duration}
                chapter={lesson.chapter}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;