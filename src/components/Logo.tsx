import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-10 h-8">
        {/* Pastel exterior */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-900 rounded-lg transform rotate-3"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg transform -rotate-3"></div>
        
        {/* Massa do pastel */}
        <div className="absolute inset-1 bg-gradient-to-r from-amber-200 to-amber-300 rounded flex items-center justify-center">
          {/* Recheio visível */}
          <div className="w-6 h-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
        </div>
        
        {/* Efeito de brilho */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
      </div>
      
      <span className="text-xl font-bold text-gradient-primary">
        Cantinho do Pastel
      </span>
    </div>
  );
};

export default Logo;