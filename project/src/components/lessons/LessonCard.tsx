import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  chapter: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  duration,
  chapter,
}) => {
  const { isLessonCompleted, isLessonUnlocked } = useProgress();

  const isCompleted = isLessonCompleted(id);
  const isUnlocked = isLessonUnlocked(id);

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 border ${
        isCompleted 
          ? 'border-green-500 bg-gray-800/50' 
          : isUnlocked 
            ? 'border-purple-800 bg-gray-800/80 hover:border-purple-600' 
            : 'border-gray-800 bg-gray-800/50 opacity-80'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-purple-400 mb-2">{chapter}</p>
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
          </div>
          <div className="ml-4">
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : isUnlocked ? (
              <div className="text-xs text-gray-400 px-2 py-1 rounded bg-gray-700">{duration}</div>
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-300 mt-3 mb-4">{description}</p>
        
        {isUnlocked ? (
          <Link
            to={`/lesson/${id}`}
            className={`inline-flex items-center ${
              isCompleted
                ? 'text-green-400 hover:text-green-300'
                : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            <span className="mr-2">
              {isCompleted ? 'Review Lesson' : 'Start Lesson'}
            </span>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <span className="text-gray-500 flex items-center">
            <Lock size={14} className="mr-2" />
            <span>Complete previous lessons to unlock</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default LessonCard;