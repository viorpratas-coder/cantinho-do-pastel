import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Heart, Star } from 'lucide-react';
import { toast } from 'sonner';

const ShareFidelity = () => {
  const handleShare = async () => {
    const shareData = {
      title: 'Programa de Fidelidade - Cantinho do Pastel',
      text: 'Junte-se ao programa de fidelidade do Cantinho do Pastel! Colete carimbos e ganhe pastéis grátis!',
      url: window.location.origin + '/fidelidade'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Copiar para área de transferência
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copiado!', {
          description: 'Compartilhe o link do programa de fidelidade com seus amigos!'
        });
      }
    } catch (err) {
      // Fallback: copiar para área de transferência
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copiado!', {
          description: 'Compartilhe o link do programa de fidelidade com seus amigos!'
        });
      } catch (clipboardErr) {
        toast.error('Erro ao copiar', {
          description: 'Não foi possível copiar o link. Tente novamente.'
        });
      }
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-2 text-red-500" />
          Compartilhe com Amigos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Conheça alguém que ama pastéis? Compartilhe nosso programa de fidelidade!
          </p>
          
          <div className="bg-white border border-border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-semibold">5 carimbos = 1 pastel grátis</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Junte-se a nós e comece a coletar carimbos hoje mesmo!
            </p>
          </div>
          
          <Button onClick={handleShare} className="w-full">
            <Share2 className="mr-2 w-4 h-4" />
            Compartilhar Programa de Fidelidade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareFidelity;