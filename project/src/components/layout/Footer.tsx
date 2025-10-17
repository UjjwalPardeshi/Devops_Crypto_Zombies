import React from 'react';
import { Github, Heart, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} CryptoZombies Clone. An educational project.
            </p>
            <p className="text-xs mt-1">
              This is a clone created for educational purposes only. Not affiliated with the original CryptoZombies.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <div className="flex items-center text-sm">
              <span className="mr-1">Made with</span>
              <Heart size={14} className="text-red-500 mx-1" />
              <span>and React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;