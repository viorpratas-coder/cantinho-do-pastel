import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const FidelityTerms = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 text-yellow-500" />
          Termos do Programa de Fidelidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Como participar</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Faça pedidos através do nosso site</li>
              <li>Gere um código único para cada pedido</li>
              <li>Informe o código ao pagar via WhatsApp</li>
              <li>Receba um carimbo após confirmação do pagamento</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Regras do programa</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Cada pedido válido concede 1 carimbo</li>
              <li>5 carimbos equivalem a 1 pastel grátis</li>
              <li>Carimbos não têm validade e não expiram</li>
              <li>O prêmio deve ser resgatado na próxima compra</li>
              <li>Carimbos não são transferíveis entre clientes</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Condições especiais</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Pedidos cancelados não geram carimbos</li>
              <li>Pedidos com problemas de pagamento não geram carimbos</li>
              <li>A administração reserva-se o direito de alterar as regras</li>
              <li>Em caso de fraude, os carimbos podem ser cancelados</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-border">
            <Badge variant="secondary" className="mb-2">
              Importante
            </Badge>
            <p className="text-sm text-muted-foreground">
              Ao participar do programa, você concorda com todos os termos e condições aqui estabelecidos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FidelityTerms;