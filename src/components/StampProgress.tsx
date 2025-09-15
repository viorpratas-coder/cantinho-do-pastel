import React from 'react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Star, CheckCircle } from 'lucide-react';

interface StampProgressProps {
  size?: 'sm' | 'md' | 'lg';
  stampCount?: number; // Tornar opcional para manter compatibilidade
  customerName?: string;
  customerPhone?: string;
}

const StampProgress: React.FC<StampProgressProps> = ({ 
  size = 'md', 
  stampCount,
  customerName,
  customerPhone
}) => {
  const { getStampCount } = useFidelityCode();
  
  // Usar a propriedade stampCount se fornecida, caso contrário usar o contexto
  let count = 0;
  if (stampCount !== undefined) {
    count = stampCount;
  } else if (customerName && customerPhone) {
    count = getStampCount(customerName, customerPhone);
  }
  
  const stampsToReward = 5;
  
  // Definir tamanhos com base na propriedade size
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-xs' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-sm' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-base' }
  };
  
  const currentSize = sizes[size];

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(stampsToReward)].map((_, index) => (
          <div 
            key={index} 
            className={`relative ${index > 0 ? '-ml-2' : ''} transition-all duration-300`}
          >
            <div className={`${currentSize.container} rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              index < count 
                ? 'bg-primary border-primary text-primary-foreground scale-110' 
                : 'border-muted-foreground'
            }`}>
              {index < count ? (
                <CheckCircle className={`${currentSize.icon} transition-transform duration-300`} />
              ) : (
                <Star className={currentSize.icon} />
              )}
            </div>
            <span className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 ${currentSize.text} text-muted-foreground transition-colors duration-300 ${
              index < count ? 'text-primary font-bold' : ''
            }`}>
              {index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="ml-4">
        <p className="font-semibold">
          {count} de {stampsToReward} carimbos
        </p>
        <p className="text-sm text-muted-foreground">
          {count >= stampsToReward 
            ? 'Recompensa disponível!' 
            : `${stampsToReward - count} para o próximo pastel grátis`}
        </p>
      </div>
    </div>
  );
};

export default StampProgress;