import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Gift, 
  Calendar, 
  Users, 
  Star,
  Cake,
  Bell,
  ChevronRight
} from 'lucide-react';

const LoyaltyBenefits: React.FC = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  const benefits = [
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Pastel Grátis",
      description: "Ganhe um pastel grátis a cada 5 compras"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Ofertas Exclusivas",
      description: "Acesso antecipado a promoções e novidades"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Programa VIP",
      description: "Benefícios especiais para nossos melhores clientes"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Experiência Premium",
      description: "Atendimento prioritário e personalizado"
    },
    {
      icon: <Cake className="w-5 h-5" />,
      title: "Aniversário",
      description: "Presente especial no seu aniversário"
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notificações",
      description: "Receba alertas sobre promoções e eventos"
    }
  ];

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Benefícios do Programa de Fidelidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-4 border rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <div className="bg-primary/10 p-3 rounded-full mb-3 transition-all duration-300 group-hover:bg-primary/20">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
              {hoveredBenefit === index && (
                <ChevronRight className="w-4 h-4 mt-2 text-primary animate-bounce-x" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors duration-300">
          <h4 className="font-semibold mb-2 text-primary">Dica Especial</h4>
          <p className="text-sm">
            Indique amigos para o programa de fidelidade e ambos ganham um carimbo bônus! 
            Compartilhe o amor pelo pastel com quem você ama.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyBenefits;