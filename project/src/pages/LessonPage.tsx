import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { lessons } from '../data/lessons';
import LessonContent from '../components/lessons/LessonContent';
import CodeEditor from '../components/lessons/CodeEditor';
import ZombieCreationModal from '../components/zombies/ZombieCreationModal';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson, isLessonCompleted, isLessonUnlocked } = useProgress();
  
  const [showModal, setShowModal] = useState(false);
  const [zombieDna, setZombieDna] = useState('');
  
  const id = parseInt(lessonId || '1');
  const lesson = lessons.find(l => l.id === id);
  
  const isUnlocked = isLessonUnlocked(id);
  const isCompleted = isLessonCompleted(id);
  const nextLessonId = id + 1;
  const prevLessonId = id - 1;
  
  const hasNextLesson = lessons.some(l => l.id === nextLessonId);
  const hasPrevLesson = lessons.some(l => l.id === prevLessonId);
  
  useEffect(() => {
    // If lesson is not found or not unlocked, redirect to home
    if (!lesson || !isUnlocked) {
      navigate('/');
    }
  }, [lesson, isUnlocked, navigate]);
  
  if (!lesson) return null;
  
  const handleCodeCompile = (code: string, isCorrect: boolean) => {
    if (isCorrect) {
      completeLesson(id);
      
      // Generate a fake DNA string based on the code
      // In a real app, this would be based on actual blockchain logic
      const fakeDna = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setZombieDna(fakeDna);
      setShowModal(true);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Lesson {lesson.id}: {lesson.title}
          </h1>
          {isCompleted && (
            <CheckCircle size={20} className="ml-2 text-green-500" />
          )}
        </div>
        
        <div className="flex space-x-2">
          {hasPrevLesson && (
            <button
              onClick={() => navigate(`/lesson/${prevLessonId}`)}
              className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </button>
          )}
          
          {hasNextLesson && isCompleted && (
            <button
              onClick={() => navigate(`/lesson/${nextLessonId}`)}
              className="flex items-center px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              Next
              <ArrowRight size={16} className="ml-1" />
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <LessonContent
            title={lesson.title}
            introduction={lesson.introduction}
            contentBlocks={lesson.contentBlocks}
          />
        </div>
        
        <div>
          <CodeEditor
            initialCode={lesson.initialCode}
            onCodeCompile={handleCodeCompile}
            expectedOutput={lesson.expectedOutput}
            validationFn={lesson.validationFn}
          />
        </div>
      </div>
      
      <ZombieCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        dnaString={zombieDna}
      />
    </div>
  );
};

export default LessonPage;