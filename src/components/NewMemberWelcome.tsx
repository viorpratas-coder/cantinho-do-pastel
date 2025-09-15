import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gift, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewMemberWelcome: React.FC = () => {
  return (
    <Card className="border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4 animate-bounce-gentle">
            <Star className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Bem-vindo ao Programa de Fidelidade!</h3>
          <p className="text-muted-foreground mb-4">
            Estamos felizes em tê-lo conosco. Comece a acumular carimbos e ganhe recompensas exclusivas.
          </p>
          
          <div className="flex items-center mb-4 bg-primary/10 px-4 py-2 rounded-full animate-pulse">
            <Gift className="w-5 h-5 text-primary mr-2" />
            <span className="font-medium">Seu primeiro carimbo está a caminho!</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Button asChild className="flex-1 transition-all duration-300 hover:scale-105">
              <Link to="/admin/fidelidade">
                Gerar código para meu primeiro pedido
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 transition-all duration-300 hover:scale-105">
              <Link to="#como-funciona">
                Como funciona?
              </Link>
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground flex items-center animate-fade-in">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            Obrigado por escolher Cantinho do Pastel!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewMemberWelcome;