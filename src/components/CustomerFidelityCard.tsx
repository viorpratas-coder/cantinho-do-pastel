import React from 'react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy, Award } from 'lucide-react';
import StampProgress from '@/components/StampProgress';

interface CustomerFidelityCardProps {
  customerName: string;
  customerPhone: string;
}

const CustomerFidelityCard: React.FC<CustomerFidelityCardProps> = ({ 
  customerName, 
  customerPhone 
}) => {
  const { getStampCount } = useFidelityCode();
  const stampCount = getStampCount(customerName, customerPhone);
  
  const isFirstVisit = stampCount === 0;
  const isRegularCustomer = stampCount >= 3;
  const canClaimReward = stampCount >= 5;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Seu Cartão de Fidelidade</span>
          <Badge variant="secondary" className="text-lg py-1">
            {stampCount} de 5 carimbos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full mb-6 p-4 bg-secondary rounded-lg">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{customerName}</p>
                <p className="text-sm text-muted-foreground">{customerPhone}</p>
              </div>
            </div>
          </div>
          
          <StampProgress 
            size="lg" 
            customerName={customerName} 
            customerPhone={customerPhone} 
          />
          
          {canClaimReward && (
            <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg w-full text-center">
              <div className="flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2" />
                <span className="font-bold">Parabéns! Você ganhou um pastel grátis!</span>
              </div>
              <p className="text-sm mt-1">
                Apresente este cartão na próxima visita para resgatar sua recompensa.
              </p>
            </div>
          )}
          
          {isRegularCustomer && !canClaimReward && (
            <div className="mt-4 flex items-center text-primary">
              <Award className="w-5 h-5 mr-2" />
              <span className="font-medium">Cliente Ouro!</span>
            </div>
          )}
          
          {isFirstVisit && (
            <div className="mt-4 text-center text-muted-foreground">
              <p>Comece a acumular carimbos para ganhar recompensas!</p>
            </div>
          )}
          
          {/* Barra de progresso adicional */}
          <div className="w-full mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso</span>
              <span>{Math.round((stampCount / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(stampCount / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerFidelityCard;