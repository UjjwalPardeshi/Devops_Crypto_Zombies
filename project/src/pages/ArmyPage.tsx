import React from 'react';
import { useZombies } from '../context/ZombiesContext';
import ZombieCard from '../components/zombies/ZombieCard';
import { Skull, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArmyPage: React.FC = () => {
  const { zombies } = useZombies();
  
  const hasZombies = zombies.length > 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Skull className="mr-2 text-purple-500 h-8 w-8" />
          Your Zombie Army
        </h1>
        <p className="text-gray-400">
          All zombies you've created through the coding lessons.
        </p>
      </div>
      
      {hasZombies ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zombies.map((zombie) => (
            <ZombieCard key={zombie.id} zombie={zombie} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
          <Ghost className="h-16 w-16 text-gray-600 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-white mb-2">No Zombies Yet!</h2>
          <p className="text-gray-400 mb-6">
            Complete coding lessons to create your first zombie and build your army.
          </p>
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Start Learning
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArmyPage;