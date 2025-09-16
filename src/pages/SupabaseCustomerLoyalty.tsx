import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseFidelity } from '@/contexts/SupabaseFidelityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Star, 
  Trophy,
  User,
  Phone,
  Key,
  CheckCircle,
  AlertCircle,
  Award,
  Gift,
  Zap,
  Target,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import SupabaseCustomerFidelityCard from '@/components/SupabaseCustomerFidelityCard';

const SupabaseCustomerLoyalty = () => {
  const { 
    markCodeAsUsed, 
    currentCustomer, 
    addPoints,
    claimReward,
    getStampCount,
    isLoading
  } = useSupabaseFidelity();
  
  const navigate = useNavigate();
  
  // Estados para inserção de código
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para inserir código
  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!currentCustomer) {
        toast.error('Erro', {
          description: 'Você precisa se autenticar primeiro.'
        });
        return;
      }
      
      const success = await markCodeAsUsed(code, currentCustomer.customer_name, currentCustomer.customer_phone);
      
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
  };

  // Função para obter o nome do nível
  const getLevelName = (level: number): string => {
    switch (level) {
      case 1: return 'Iniciante';
      case 2: return 'Bronze';
      case 3: return 'Prata';
      case 4: return 'Ouro';
      case 5: return 'Diamante';
      default: return 'Iniciante';
    }
  };

  // Função para obter pontos necessários para o próximo nível
  const getPointsToNextLevel = (points: number): number => {
    if (points >= 1000) return 0; // Máximo nível
    if (points >= 500) return 1000 - points; // Para Diamante
    if (points >= 250) return 500 - points;   // Para Ouro
    if (points >= 100) return 250 - points;   // Para Prata
    return 100 - points;                      // Para Bronze
  };

  // Função para obter progresso para o próximo nível (em porcentagem)
  const getProgressToNextLevel = (points: number): number => {
    if (points >= 1000) return 100; // Máximo nível
    if (points >= 500) return ((points - 500) / 500) * 100; // Para Diamante
    if (points >= 250) return ((points - 250) / 250) * 100; // Para Ouro
    if (points >= 100) return ((points - 100) / 150) * 100; // Para Prata
    return (points / 100) * 100; // Para Bronze
  };

  // Função para resgatar recompensa
  const handleClaimReward = async () => {
    if (currentCustomer) {
      const success = await claimReward(currentCustomer.customer_phone);
      
      if (success) {
        toast.success('Recompensa resgatada!', {
          description: 'Você ganhou uma recompensa especial. Entre em contato com a pastelaria para resgatar.'
        });
      } else {
        toast.error('Pontos insuficientes', {
          description: 'Você precisa de 100 pontos para resgatar uma recompensa.'
        });
      }
    }
  };

  // Função para compartilhar no WhatsApp
  const shareOnWhatsApp = () => {
    if (currentCustomer) {
      toast.info('Compartilhar no WhatsApp', {
        description: 'Implementação futura para compartilhamento no WhatsApp',
        duration: 5000
      });
    }
  };

  // Função para compartilhar no Instagram
  const shareOnInstagram = () => {
    if (currentCustomer) {
      toast.info('Compartilhar no Instagram', {
        description: 'Implementação futura para compartilhamento no Instagram',
        duration: 5000
      });
    }
  };

  if (!currentCustomer) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-10">
          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent mx-auto"></div>
          <p>Carregando informações do cliente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Programa de Fidelidade</h1>
        <p className="text-foreground/70">
          Acompanhe seus carimbos, pontos e recompensas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cartão de fidelidade */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Meu Cartão Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SupabaseCustomerFidelityCard 
                customerName={currentCustomer.customer_name} 
                customerPhone={currentCustomer.customer_phone} 
              />
              
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
        </div>

        {/* Gamificação e recompensas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Seu Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    <h3 className="font-semibold">Nível</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-primary">
                      {currentCustomer.level}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {getLevelName(currentCustomer.level)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <h3 className="font-semibold">Pontos</h3>
                  </div>
                  <p className="text-2xl font-bold">{currentCustomer.points}</p>
                  <p className="text-sm text-muted-foreground">+10 pts por carimbo</p>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Gift className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="font-semibold">Recompensas</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{currentCustomer.rewards_claimed}</p>
                  <p className="text-sm text-muted-foreground">Resgatadas</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Próximo nível: {getLevelName(currentCustomer.level + 1)}</span>
                  <span className="text-sm font-medium">
                    {getPointsToNextLevel(currentCustomer.points)} pts
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${getProgressToNextLevel(currentCustomer.points)}%` }}
                  ></div>
                </div>
              </div>
              
              <Button 
                onClick={handleClaimReward}
                disabled={currentCustomer.points < 100 || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Resgatar Recompensa (100 pts)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Compartilhar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Mostre seus pontos para os amigos!
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={shareOnWhatsApp}
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={shareOnInstagram}
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inserir código */}
        <div className="lg:col-span-3">
          <Card>
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
                  disabled={isSubmitting || !code || isLoading}
                  className="w-full"
                >
                  {isSubmitting || isLoading ? (
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
        </div>
      </div>
    </div>
  );
};

export default SupabaseCustomerLoyalty;