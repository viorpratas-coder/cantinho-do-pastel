import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Copy, Star, Gift } from 'lucide-react';

const FidelityInstructions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 text-yellow-500" />
          Como funciona o programa de fidelidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-semibold">Faça seu pedido</h3>
              <p className="text-sm text-muted-foreground">
                Escolha seus pastéis e finalize o pedido no site.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-semibold">Receba um código</h3>
              <p className="text-sm text-muted-foreground">
                Após adicionar ao carrinho, você receberá um código único para o pedido.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-semibold">Pague via WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Informe o código ao fazer o pagamento via WhatsApp.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h3 className="font-semibold">Receba seu carimbo</h3>
              <p className="text-sm text-muted-foreground">
                Após confirmação do pagamento, seu carimbo será adicionado automaticamente.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              5
            </div>
            <div>
              <h3 className="font-semibold">Resgate seu prêmio</h3>
              <p className="text-sm text-muted-foreground">
                Ao completar 5 carimbos, você ganha um pastel grátis!
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <Badge variant="secondary" className="mb-3">
              Dica
            </Badge>
            <p className="text-sm">
              Sempre copie o código do pedido antes de fechar a página. 
              Ele será necessário para confirmar seu pagamento no WhatsApp.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FidelityInstructions;