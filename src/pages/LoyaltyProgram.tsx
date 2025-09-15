import React from 'react';
import { useFidelityCode } from '../contexts/FidelityCodeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  ArrowLeft,
  User,
  Key,
  Gift,
  Award,
  CheckCircle
} from 'lucide-react';
import InviteFriends from '@/components/InviteFriends';

const LoyaltyProgram: React.FC = () => {
  const { getAllCodes, currentCustomer } = useFidelityCode();
  const navigate = useNavigate();
  
  // Contar códigos não utilizados do cliente atual
  const getCustomerStampCount = () => {
    if (!currentCustomer) return 0;
    
    const customerCodes = getAllCodes().filter(
      code => code.customerName === currentCustomer.customerName && 
              code.customerPhone === currentCustomer.customerPhone && 
              code.used
    );
    
    return customerCodes.length;
  };
  
  const stampCount = getCustomerStampCount();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a página principal
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Programa de Fidelidade</h1>
          <p className="text-muted-foreground text-lg">
            Colete carimbos e ganhe recompensas exclusivas!
          </p>
        </div>

        {/* Informações explicativas do programa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-primary" />
              Como funciona o nosso programa?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Nosso programa de fidelidade é simples e recompensador. A cada compra, você acumula carimbos que podem ser trocados por deliciosos pastéis grátis!
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">1. Cadastre-se</h3>
                  <p className="text-sm text-muted-foreground">
                    Faça seu cadastro com nome e WhatsApp
                  </p>
                </div>
                
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">2. Acumule</h3>
                  <p className="text-sm text-muted-foreground">
                    A cada compra, ganhe 1 carimbo
                  </p>
                </div>
                
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">3. Ganhe</h3>
                  <p className="text-sm text-muted-foreground">
                    A cada 5 carimbos, ganhe 1 pastel grátis
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                  Benefícios exclusivos para membros:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Pastel grátis a cada 5 carimbos acumulados</li>
                  <li>Ofertas especiais e promoções antecipadas</li>
                  <li>Participação em eventos exclusivos</li>
                  <li>Recompensas surpresa para clientes fiéis</li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                  Como participar:
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Faça seu pedido pelo nosso sistema</li>
                  <li>Realize o pagamento via WhatsApp</li>
                  <li>A pastelaria irá gerar um código único para você</li>
                  <li>Volte à sua conta e insira o código para ganhar seu carimbo</li>
                  <li>Após 5 carimbos, você ganha um pastel grátis!</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Área de login/acesso para clientes */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Área do Cliente</h3>
                  <p className="opacity-90">Acesse seu cartão de fidelidade digital</p>
                </div>
              </div>
              
              <Link to="/fidelidade/cliente">
                <Button className="whitespace-nowrap">
                  <Key className="w-4 h-4 mr-2" />
                  Acessar Minha Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Convidar amigos */}
        <div>
          <InviteFriends />
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;