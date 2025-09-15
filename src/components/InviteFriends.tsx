import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Gift, 
  Share2,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

const InviteFriends: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const inviteFriends = () => {
    const referralMessage = `🎉 Participe do programa de fidelidade do Cantinho do Pastel! 
Acumule carimbos e ganhe um pastel grátis a cada 5 compras. 
Use meu código de indicação: ${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    if (navigator.share) {
      navigator.share({
        title: 'Programa de Fidelidade - Cantinho do Pastel',
        text: referralMessage,
        url: window.location.origin + '/fidelidade'
      }).catch(console.error);
    } else {
      // Copiar mensagem para área de transferência
      navigator.clipboard.writeText(referralMessage);
      setCopied(true);
      toast.success('Mensagem copiada!', {
        description: 'Cole a mensagem no WhatsApp e envie para seus amigos'
      });
      
      // Resetar o estado após 2 segundos
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Convide seus amigos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 p-3 rounded-full mb-4 animate-bounce-gentle">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="font-semibold mb-2">Ganhe recompensas juntos</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Indique amigos para o programa de fidelidade e ambos ganhem um carimbo bônus 
            quando eles fizerem seu primeiro pedido.
          </p>
          
          <div className="bg-secondary p-3 rounded-lg mb-4 w-full transition-all duration-300 hover:bg-secondary/80">
            <div className="flex items-center text-sm mb-1">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Você ganha 1 carimbo bônus</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Seu amigo ganha 1 carimbo bônus</span>
            </div>
          </div>
          
          <Button 
            onClick={inviteFriends} 
            className="w-full transition-all duration-300 hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Convidar amigos agora
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3 animate-pulse">
            Compartilhe o amor pelo pastel com quem você ama!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteFriends;