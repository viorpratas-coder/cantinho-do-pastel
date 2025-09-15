import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFidelityCode } from '../contexts/FidelityCodeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Star, 
  Trophy,
  ArrowLeft,
  User,
  Phone,
  Key,
  CheckCircle,
  AlertCircle,
  Award,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import CustomerFidelityCard from '@/components/CustomerFidelityCard';
import WhatsAppProfile from '@/components/WhatsAppProfile';

const CustomerFidelity: React.FC = () => {
  const { 
    authenticateCustomer, 
    markCodeAsUsed, 
    currentCustomer, 
    setCurrentCustomer,
    getStampCount,
    setCustomerProfileImage,
    getCustomerProfileImage
  } = useFidelityCode();
  
  const navigate = useNavigate();
  
  // Estados para autenticação
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  // Estados para inserção de código
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para autenticar o cliente
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    setTimeout(() => {
      try {
        const isAuthenticated = authenticateCustomer(authName, authPhone);
        
        if (isAuthenticated) {
          toast.success('Autenticado com sucesso!', {
            description: `Bem-vindo, ${authName}!`
          });
        } else {
          toast.error('Não foi possível autenticar', {
            description: 'Ocorreu um erro ao tentar autenticar. Tente novamente.'
          });
        }
      } catch (error) {
        toast.error('Erro na autenticação', {
          description: 'Ocorreu um erro ao tentar autenticar. Tente novamente.'
        });
      } finally {
        setIsAuthenticating(false);
      }
    }, 500);
  };

  // Função para inserir código
  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        if (!currentCustomer) {
          toast.error('Erro', {
            description: 'Você precisa se autenticar primeiro.'
          });
          return;
        }
        
        const success = markCodeAsUsed(code, currentCustomer.customerName, currentCustomer.customerPhone);
        
        if (success) {
          toast.success('Código validado!', {
            description: 'Carimbo adicionado com sucesso ao seu cartão.'
          });
          
          // Limpar campo de código
          setCode('');
        } else {
          toast.error('Código inválido', {
            description: 'O código informado não é válido ou já foi utilizado.'
          });
        }
      } catch (error) {
        toast.error('Erro ao validar código', {
          description: 'Ocorreu um erro ao processar o código. Tente novamente.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  // Função para sair da conta
  const handleLogout = () => {
    setCurrentCustomer(null);
    setAuthName('');
    setAuthPhone('');
    toast.success('Você saiu da sua conta de fidelidade.');
  };

  // Função para lidar com o upload de imagem
  const handleImageUpload = (imageData: string) => {
    if (currentCustomer) {
      setCustomerProfileImage(currentCustomer.customerPhone, imageData);
      toast.success('Foto de perfil atualizada!', {
        description: 'Sua foto de perfil foi salva com sucesso.'
      });
    }
  };

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
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Seu Perfil</h1>
          <p className="text-muted-foreground">
            Acompanhe seus carimbos e recompensas
          </p>
        </div>

        {!currentCustomer ? (
          // Formulário de autenticação
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Entrar na sua conta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthenticate} className="space-y-4">
                <div>
                  <Label htmlFor="authName">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="authName"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Seu nome completo"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="authPhone">Telefone (WhatsApp) *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="authPhone"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isAuthenticating || !authName || !authPhone}
                  className="w-full"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Autenticando...
                    </>
                  ) : (
                    'Entrar no Programa de Fidelidade'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Como funciona?
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Após fazer seu pedido, a pastelaria irá gerar um código único</li>
                  <li>Receba o código via WhatsApp</li>
                  <li>Volte aqui e insira o código para ganhar seu carimbo</li>
                  <li>Após 5 carimbos, você ganha um pastel grátis!</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Área do cliente autenticado
          <>
            {/* Perfil do cliente - estilo rede social */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <WhatsAppProfile 
                    phoneNumber={currentCustomer.customerPhone} 
                    customerName={currentCustomer.customerName} 
                    onImageUpload={handleImageUpload}
                    uploadedImage={currentCustomer.profileImage || getCustomerProfileImage(currentCustomer.customerPhone) || undefined}
                  />
                  
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold">{currentCustomer.customerName}</h2>
                    <p className="opacity-90">{currentCustomer.customerPhone}</p>
                    
                    <div className="flex items-center justify-center mt-2">
                      <Star className="w-4 h-4 mr-1 text-yellow-300" />
                      <span className="font-medium">
                        {getStampCount(currentCustomer.customerName, currentCustomer.customerPhone)} carimbos
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    onClick={handleLogout}
                    className="mt-4"
                  >
                    Sair da conta
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Cartão de fidelidade */}
            <CustomerFidelityCard 
              customerName={currentCustomer.customerName} 
              customerPhone={currentCustomer.customerPhone} 
            />
            
            {/* Inserir código */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Inserir Código de Fidelidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCode} className="space-y-4">
                  <div>
                    <Label htmlFor="code">Código Recebido *</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="Ex: FID-ABC123"
                        required
                        className="pl-10 font-mono"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Insira o código único fornecido pela pastelaria após seu pedido
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !code}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Validando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Adicionar Carimbo
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Instruções */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Como Ganhar Carimbos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Faça seu pedido pelo nosso sistema</li>
                  <li>Realize o pagamento via WhatsApp</li>
                  <li>A pastelaria irá gerar um código único para você</li>
                  <li>Volte aqui e insira o código para ganhar seu carimbo</li>
                  <li>Após 5 carimbos, você ganha um pastel grátis!</li>
                </ol>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerFidelity;