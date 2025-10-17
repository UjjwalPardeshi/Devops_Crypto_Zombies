import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Zombie {
  id: number;
  name: string;
  dna: string;
  level: number;
  createdAt: string;
  traits: {
    head: number;
    eyes: number;
    shirt: number;
    skin: number;
  };
}

interface ZombiesContextType {
  zombies: Zombie[];
  addZombie: (zombie: Omit<Zombie, 'id' | 'createdAt'>) => void;
}

const ZombiesContext = createContext<ZombiesContextType | undefined>(undefined);

export const useZombies = () => {
  const context = useContext(ZombiesContext);
  if (!context) {
    throw new Error('useZombies must be used within a ZombiesProvider');
  }
  return context;
};

export const ZombiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zombies, setZombies] = useState<Zombie[]>(() => {
    const savedZombies = localStorage.getItem('cryptoZombies');
    return savedZombies ? JSON.parse(savedZombies) : [];
  });

  useEffect(() => {
    localStorage.setItem('cryptoZombies', JSON.stringify(zombies));
  }, [zombies]);

  const addZombie = (zombie: Omit<Zombie, 'id' | 'createdAt'>) => {
    const newZombie: Zombie = {
      ...zombie,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setZombies((prev) => [...prev, newZombie]);
  };

  return (
    <ZombiesContext.Provider value={{ zombies, addZombie }}>
      {children}
    </ZombiesContext.Provider>
  );
};