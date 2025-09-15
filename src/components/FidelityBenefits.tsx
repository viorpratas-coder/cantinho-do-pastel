import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Gift, Percent, Heart } from 'lucide-react';

const FidelityBenefits = () => {
  const benefits = [
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "Carimbos por Compra",
      description: "Ganhe 1 carimbo a cada pedido realizado"
    },
    {
      icon: <Gift className="w-5 h-5 text-primary" />,
      title: "Pastel Grátis",
      description: "Resgate 1 pastel grátis a cada 5 carimbos"
    },
    {
      icon: <Percent className="w-5 h-5 text-green-500" />,
      title: "Ofertas Exclusivas",
      description: "Acesso antecipado a promoções e novidades"
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Recompensas Especiais",
      description: "Benefícios exclusivos para membros fiéis"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 text-yellow-500" />
          Benefícios do Programa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="mt-0.5">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <Badge variant="secondary" className="mb-2">
            Exclusivo para membros
          </Badge>
          <p className="text-sm text-muted-foreground">
            Além dos carimbos, membros do programa recebem notificações sobre promoções especiais e eventos da pastelaria.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FidelityBenefits;