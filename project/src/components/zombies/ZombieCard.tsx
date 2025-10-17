import React from 'react';
import { Zombie } from '../../context/ZombiesContext';
import ZombieImage from './ZombieImage';

interface ZombieCardProps {
  zombie: Zombie;
}

// Function to generate a personality trait based on DNA
const getPersonalityTrait = (dna: string): string => {
  const traits = [
    "Loves eating brains with hot sauce",
    "Only hunts on full moons",
    "Has a collection of human shoes",
    "Communicates through interpretive dance",
    "Surprisingly good at chess",
    "Practices zombie yoga daily",
    "Always moans in perfect pitch",
    "Prefers vegetarian brains",
    "Can recite zombie poetry",
    "Sleeps upside down like a bat"
  ];
  
  // Use the last digit of the DNA as an index
  const lastDigit = parseInt(dna.charAt(dna.length - 1), 16);
  return traits[lastDigit % traits.length];
};

const ZombieCard: React.FC<ZombieCardProps> = ({ zombie }) => {
  const formattedDate = new Date(zombie.createdAt).toLocaleDateString();
  const personalityTrait = getPersonalityTrait(zombie.dna);
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-102 hover:shadow-purple-900/20">
      <div className="p-4 bg-gradient-to-b from-purple-900/30 to-transparent">
        <h3 className="text-lg font-bold text-purple-300">{zombie.name}</h3>
        <p className="text-xs text-gray-400">Created on {formattedDate}</p>
      </div>
      
      <div className="flex items-center justify-center p-6 bg-gray-900/50">
        <ZombieImage traits={zombie.traits} className="w-32 h-32" />
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">DNA</p>
          <p className="font-mono text-sm text-green-400 break-all">{zombie.dna}</p>
        </div>
        
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Level</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div 
                className="bg-purple-600 h-full rounded-full"
                style={{ width: `${zombie.level * 10}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-white">{zombie.level}</span>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-400 mb-1">Personality</p>
          <p className="text-sm text-gray-300 italic">{personalityTrait}</p>
        </div>
      </div>
    </div>
  );
};

export default ZombieCard;