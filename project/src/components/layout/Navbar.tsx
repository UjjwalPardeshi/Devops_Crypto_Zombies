import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { Brain, Skull, Users, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentProgress, totalLessons } = useProgress();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-purple-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Skull 
              className="h-8 w-8 text-purple-500 animate-pulse" 
              style={{ animationDuration: '3s' }} 
            />
            <span className="text-xl font-bold text-white">
              <span className="text-purple-500">Crypto</span>Zombies
            </span>
          </Link>

          {/* Progress bar for desktop */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-purple-400">Your Progress</span>
              <span className="text-xs text-purple-400">{currentProgress}/{totalLessons} Lessons</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full"
                style={{ width: `${(currentProgress / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors flex items-center space-x-1 ${
                location.pathname === '/' 
                  ? 'text-purple-400 border-b-2 border-purple-500' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              <Brain size={18} />
              <span>Lessons</span>
            </Link>
            <Link 
              to="/army" 
              className={`transition-colors flex items-center space-x-1 ${
                location.pathname === '/army' 
                  ? 'text-purple-400 border-b-2 border-purple-500' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              <Users size={18} />
              <span>My Zombies</span>
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className={`transition-colors flex items-center space-x-1 ${
                  location.pathname === '/' 
                    ? 'text-purple-400' 
                    : 'text-gray-300 hover:text-purple-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain size={18} />
                <span>Lessons</span>
              </Link>
              <Link 
                to="/army" 
                className={`transition-colors flex items-center space-x-1 ${
                  location.pathname === '/army' 
                    ? 'text-purple-400' 
                    : 'text-gray-300 hover:text-purple-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users size={18} />
                <span>My Zombies</span>
              </Link>
              
              {/* Progress bar for mobile */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-purple-400">Your Progress</span>
                  <span className="text-xs text-purple-400">{currentProgress}/{totalLessons} Lessons</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full"
                    style={{ width: `${(currentProgress / totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;