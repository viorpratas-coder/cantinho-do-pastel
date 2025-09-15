import React, { useEffect } from 'react';
import { useLoyalty } from '@/contexts/LoyaltyContext';
import { toast } from 'sonner';
import { Trophy, Star } from 'lucide-react';

const LoyaltyNotification: React.FC = () => {
  const { getStampCount, getLastRewardDate } = useLoyalty();
  const stampCount = getStampCount();
  const lastRewardDate = getLastRewardDate();

  useEffect(() => {
    try {
      // Verificar se o cliente tem direito a uma recompensa
      if (stampCount >= 5) {
        toast.success('🎉 Parabéns! Você ganhou um pastel grátis!', {
          description: 'Apresente seu cartão de fidelidade na próxima visita para resgatar sua recompensa.',
          duration: 10000,
          icon: <Trophy className="w-5 h-5" />
        });
      }
      
      // Verificar se é aniversário do programa (exemplo: 30 dias desde a última recompensa)
      if (lastRewardDate) {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastRewardDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 30 && stampCount < 5) {
          toast.info('🎂 Aniversário do seu programa de fidelidade!', {
            description: 'Complete seu cartão e ganhe um pastel especial de aniversário!',
            duration: 8000,
            icon: <Star className="w-5 h-5" />
          });
        }
      }
    } catch (error) {
      console.error('Erro ao verificar notificações de fidelidade:', error);
    }
  }, [stampCount, lastRewardDate]);

  return null; // Este componente não renderiza nada visualmente, apenas mostra notificações
};

export default LoyaltyNotification;