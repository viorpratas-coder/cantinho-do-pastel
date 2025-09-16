import React, { useState, useEffect } from 'react';
import { useSupabaseFidelity } from '@/contexts/SupabaseFidelityContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy, Award, Zap, Crown, Heart } from 'lucide-react';
import StampProgress from '@/components/StampProgress';

interface SupabaseCustomerFidelityCardProps {
  customerName: string;
  customerPhone: string;
}

const SupabaseCustomerFidelityCard: React.FC<SupabaseCustomerFidelityCardProps> = ({ 
  customerName, 
  customerPhone 
}) => {
  const { getStampCount, currentCustomer, isLoading } = useSupabaseFidelity();
  const { preferences } = usePreferences();
  const [stampCount, setStampCount] = useState(0);
  
  // Carregar o número de carimbos quando o componente montar
  useEffect(() => {
    const fetchStampCount = async () => {
      try {
        const count = await getStampCount(customerName, customerPhone);
        setStampCount(count);
      } catch (error) {
        console.error('Erro ao buscar carimbos:', error);
      }
    };
    
    fetchStampCount();
  }, [customerName, customerPhone, getStampCount]);
  
  const isFirstVisit = stampCount === 0;
  const isRegularCustomer = stampCount >= 3;
  const canClaimReward = stampCount >= 5;
  
  // Função para obter o nome do nível
  const getLevelName = (level: number): string => {
    switch (level) {
      case 1: return 'Iniciante';
      case 2: return 'Bronze';
      case 3: return 'Prata';
      case 4: return 'Ouro';
      case 5: return 'Diamante';
      default: return 'Iniciante';
    }
  };
  
  // Função para obter a cor do nível
  const getLevelColor = (level: number): string => {
    switch (level) {
      case 1: return 'bg-gray-200 text-gray-800';
      case 2: return 'bg-amber-200 text-amber-800';
      case 3: return 'bg-gray-300 text-gray-800';
      case 4: return 'bg-yellow-200 text-yellow-800';
      case 5: return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  // Produtos favoritos (simulados)
  const favoriteProducts = [
    { id: 1, name: 'Frango com Catupiry', category: 'Tradicional' },
    { id: 2, name: 'Carne com Queijo', category: 'Tradicional' },
    { id: 3, name: 'Queijo', category: 'Tradicional' }
  ];

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex justify-center items-center h-32">
          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Carregando cartão de fidelidade...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>Seu Cartão de Fidelidade</span>
            {currentCustomer && (
              <Badge className={`${getLevelColor(currentCustomer.level)} py-1`}>
                <Crown className="w-3 h-3 mr-1" />
                {getLevelName(currentCustomer.level)}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-lg py-1">
              {stampCount} de 5 carimbos
            </Badge>
            {currentCustomer && (
              <Badge variant="outline" className="text-lg py-1 flex items-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                {currentCustomer.points} pts
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full mb-6 p-4 bg-secondary rounded-lg border">
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
            stampCount={stampCount}
          />
          
          {canClaimReward && (
            <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg w-full text-center border border-green-500">
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
            <div className="mt-4 flex items-center text-yellow-400">
              <Award className="w-5 h-5 mr-2" />
              <span className="font-medium">Cliente Ouro!</span>
            </div>
          )}
          
          {isFirstVisit && (
            <div className="mt-4 text-center text-gray-400">
              <p>Comece a acumular carimbos para ganhar recompensas!</p>
            </div>
          )}
          
          {/* Barra de progresso adicional */}
          <div className="w-full mt-6">
            <div className="flex justify-between text-sm mb-1 text-muted-foreground">
              <span>Progresso</span>
              <span>{Math.round((stampCount / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(stampCount / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Produtos favoritos */}
          {favoriteProducts.length > 0 && (
            <div className="w-full mt-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Seus Favoritos
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {favoriteProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="p-2 bg-secondary rounded text-center text-sm border"
                  >
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{product.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseCustomerFidelityCard;