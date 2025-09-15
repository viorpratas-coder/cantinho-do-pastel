import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  QrCode, 
  CheckCircle, 
  Gift,
  User,
  Phone,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const LoyaltyInstructions: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gift className="w-5 h-5 mr-2" />
          Como Participar do Programa de Fidelidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start group">
              <div className="bg-primary/10 p-2 rounded-full mr-3 transition-colors group-hover:bg-primary/20">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">1. Cadastro</h3>
                <p className="text-sm text-muted-foreground">
                  Informe seu nome e telefone ao fazer o pedido para começar a participar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-primary/10 p-2 rounded-full mr-3 transition-colors group-hover:bg-primary/20">
                <QrCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">2. Código Único</h3>
                <p className="text-sm text-muted-foreground">
                  Gere um código exclusivo para cada pedido através do nosso sistema.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start group">
              <div className="bg-primary/10 p-2 rounded-full mr-3 transition-colors group-hover:bg-primary/20">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">3. Confirmação</h3>
                <p className="text-sm text-muted-foreground">
                  Após o pagamento confirmado, você receberá seu carimbo digital.
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-primary/10 p-2 rounded-full mr-3 transition-colors group-hover:bg-primary/20">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">4. Recompensa</h3>
                <p className="text-sm text-muted-foreground">
                  Ao completar 5 carimbos, ganhe um pastel grátis na próxima compra.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={toggleExpand}
            className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <span className="font-semibold">Dúvidas Frequentes</span>
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          
          {expanded && (
            <div className="mt-3 p-4 bg-secondary/50 rounded-lg border border-secondary animate-fade-in">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Os carimbos são válidos por 6 meses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Você pode acumular carimbos em diferentes pedidos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Recompensas não são cumulativas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Cada código é válido apenas para um pedido</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyInstructions;