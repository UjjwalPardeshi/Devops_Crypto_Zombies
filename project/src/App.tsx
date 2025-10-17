import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ZombiesProvider } from './context/ZombiesContext';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import ArmyPage from './pages/ArmyPage';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ProgressProvider>
      <ZombiesProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/army" element={<ArmyPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ZombiesProvider>
    </ProgressProvider>
  );
}

export default App;