import React, { createContext, useContext, useState, useEffect } from 'react';
import { lessons } from '../data/lessons';

interface ProgressContextType {
  completedLessons: number[];
  completeLesson: (lessonId: number) => void;
  isLessonCompleted: (lessonId: number) => boolean;
  isLessonUnlocked: (lessonId: number) => boolean;
  currentProgress: number;
  totalLessons: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const isLessonCompleted = (lessonId: number) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonUnlocked = (lessonId: number) => {
    // First lesson is always unlocked
    if (lessonId === 1) return true;
    
    // For other lessons, the previous lesson must be completed
    return isLessonCompleted(lessonId - 1);
  };

  const totalLessons = lessons.length;
  const currentProgress = completedLessons.length;

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        completeLesson,
        isLessonCompleted,
        isLessonUnlocked,
        currentProgress,
        totalLessons,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};