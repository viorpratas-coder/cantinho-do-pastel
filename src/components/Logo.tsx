import React from 'react';
import logoImage from '@/assets/Logo.png';

const Logo = ({ showText = false }: { showText?: boolean }) => {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Cantinho do Pastel Logo" 
        className="h-16 w-auto object-contain -mt-2 md:h-20"
      />
      {showText && (
        <span className="hidden md:inline text-lg font-bold text-gradient-primary ml-2 md:text-xl">
          Cantinho do Pastel
        </span>
      )}
    </div>
  );
};

export default Logo;