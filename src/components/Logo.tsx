import React from 'react';
import logoImage from '@/assets/Logo.png';

const Logo = ({ showText = false }: { showText?: boolean }) => {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Cantinho do Pastel Logo" 
        className="h-20 w-auto object-contain -mt-2"
      />
      {showText && (
        <span className="text-xl font-bold text-gradient-primary ml-2">
          Cantinho do Pastel
        </span>
      )}
    </div>
  );
};

export default Logo;