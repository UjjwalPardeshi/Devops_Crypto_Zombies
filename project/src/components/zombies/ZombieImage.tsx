import React from 'react';

interface ZombieImageProps {
  traits: {
    head: number;
    eyes: number;
    shirt: number;
    skin: number;
  };
  className?: string;
}

// This is a placeholder component for zombie visualization
// In a real implementation, this would render SVG or Canvas to show the zombie
// based on the traits provided

const ZombieImage: React.FC<ZombieImageProps> = ({ traits, className = "" }) => {
  // Use traits to determine colors and appearance
  const skinColors = [
    'rgb(73, 186, 135)', // green
    'rgb(82, 116, 207)', // blue
    'rgb(165, 94, 234)', // purple
    'rgb(242, 109, 109)', // red
    'rgb(240, 185, 11)'  // yellow
  ];
  
  const eyeColors = [
    'rgb(237, 80, 80)',  // red
    'rgb(80, 237, 185)', // teal
    'rgb(180, 237, 80)', // lime
    'rgb(237, 222, 80)', // yellow
    'rgb(237, 129, 80)'  // orange
  ];
  
  const skinColor = skinColors[traits.skin % skinColors.length];
  const eyeColor = eyeColors[traits.eyes % eyeColors.length];
  
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {/* Simple zombie visualization using CSS */}
      <div 
        className="relative w-full h-full rounded-full animate-pulse"
        style={{ 
          backgroundColor: skinColor,
          animationDuration: '4s',
        }}
      >
        {/* Eyes */}
        <div className="absolute flex space-x-4 left-1/2 top-1/3 transform -translate-x-1/2">
          <div 
            className="w-4 h-5 rounded-full" 
            style={{ backgroundColor: eyeColor }}
          />
          <div 
            className="w-4 h-5 rounded-full" 
            style={{ backgroundColor: eyeColor }}
          />
        </div>
        
        {/* Mouth */}
        <div 
          className="absolute w-12 h-2 rounded-full bg-gray-800 left-1/2 top-1/2 transform -translate-x-1/2"
          style={{ top: '60%' }}
        />
      </div>
      
      {/* For a complete implementation, we would use SVG or Canvas to render a more complex zombie */}
      {/* This is just a placeholder to show how the zombie appearance varies with traits */}
    </div>
  );
};

export default ZombieImage;