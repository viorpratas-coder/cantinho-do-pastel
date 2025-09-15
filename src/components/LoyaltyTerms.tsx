import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const LoyaltyTerms: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Termos e Condições do Programa de Fidelidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Participação no Programa</h3>
            <p className="text-sm text-muted-foreground">
              Para participar do programa de fidelidade, o cliente deve informar seu nome e telefone 
              no momento do pedido e solicitar a inclusão no programa.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Acúmulo de Carimbos</h3>
            <p className="text-sm text-muted-foreground">
              Cada pedido pago através do WhatsApp gera direito a um carimbo digital. 
              O carimbo é concedido somente após confirmação do pagamento pela equipe da pastelaria.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">3. Código Único</h3>
            <p className="text-sm text-muted-foreground">
              Cada pedido deve ser identificado por um código único gerado no sistema. 
              Este código deve ser informado ao fazer o pedido via WhatsApp.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">4. Recompensas</h3>
            <p className="text-sm text-muted-foreground">
              Ao acumular 5 carimbos, o cliente tem direito a um pastel grátis de sua escolha. 
              A recompensa deve ser resgatada na próxima visita à pastelaria.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">5. Validade</h3>
            <p className="text-sm text-muted-foreground">
              Os carimbos têm validade de 6 meses a partir da data de emissão. 
              Carimbos expirados serão automaticamente removidos do cartão.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">6. Alterações no Programa</h3>
            <p className="text-sm text-muted-foreground">
              A Cantinho do Pastel reserva-se o direito de alterar os termos e condições 
              do programa de fidelidade a qualquer momento, mediante aviso prévio aos clientes.
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Ao participar do programa de fidelidade, você concorda com estes termos e condições. 
              Em caso de dúvidas, entre em contato com nossa equipe.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyTerms;