import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useZombies } from '../../context/ZombiesContext';
import ZombieImage from './ZombieImage';

interface ZombieCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dnaString: string;
}

const ZombieCreationModal: React.FC<ZombieCreationModalProps> = ({
  isOpen,
  onClose,
  dnaString,
}) => {
  const [zombieName, setZombieName] = useState('');
  const { addZombie } = useZombies();
  
  if (!isOpen) return null;
  
  // Generate traits from DNA string
  const generateTraits = (dna: string) => {
    const traits = {
      head: parseInt(dna.substring(0, 2), 16) % 7,
      eyes: parseInt(dna.substring(2, 4), 16) % 11,
      shirt: parseInt(dna.substring(4, 6), 16) % 6,
      skin: parseInt(dna.substring(6, 8), 16) % 5,
    };
    return traits;
  };
  
  const traits = generateTraits(dnaString);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zombieName.trim()) return;
    
    addZombie({
      name: zombieName,
      dna: dnaString,
      level: 1,
      traits,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-purple-800 w-full max-w-md transform transition-all animate-zoom-in overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-purple-300">Zombie Created!</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex justify-center">
            <div className="bg-gray-800 p-4 rounded-full">
              <ZombieImage traits={traits} className="w-32 h-32" />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">DNA:</p>
            <p className="font-mono text-green-400 text-sm bg-gray-950 p-2 rounded overflow-x-auto">
              {dnaString}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="zombieName" className="block text-sm text-gray-300 mb-2">
                Give your zombie a name:
              </label>
              <input
                type="text"
                id="zombieName"
                value={zombieName}
                onChange={(e) => setZombieName(e.target.value)}
                className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                placeholder="Enter zombie name..."
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add to Your Army
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ZombieCreationModal;