import React, { useState } from 'react';
import { useFidelityCode } from '../contexts/FidelityCodeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star,
  ClipboardCheck,
  User,
  Phone,
  MessageCircle,
  Key,
  Users,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

// Componente para exibir o perfil do cliente
const CustomerProfileDisplay: React.FC<{ 
  customerName: string; 
  customerPhone: string; 
  profileImage?: string;
  stampCount: number;
}> = ({ customerName, customerPhone, profileImage, stampCount }) => {
  // Extrair as iniciais do nome do cliente
  const getInitials = (name: string): string => {
    const names = name.split(' ');
    const firstInitial = names[0]?.charAt(0)?.toUpperCase() || '';
    const lastInitial = names.length > 1 ? names[names.length - 1]?.charAt(0)?.toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  // Função para gerar uma cor baseada no nome do cliente
  const generateColorFromName = (name: string): string => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 45%)`;
  };

  return (
    <div className="flex items-center p-4 border rounded-lg bg-card hover:bg-accent transition-colors">
      <div className="relative mr-4">
        {profileImage ? (
          <img 
            src={profileImage} 
            alt={`Foto de perfil de ${customerName}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-primary"
            style={{ backgroundColor: generateColorFromName(customerName) }}
          >
            {getInitials(customerName) || <User className="w-6 h-6" />}
          </div>
        )}
        {/* Ícone do WhatsApp no canto inferior direito */}
        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-3 h-3 text-white"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold">{customerName}</h3>
        <p className="text-sm text-muted-foreground">{customerPhone}</p>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">{stampCount} carimbos</p>
        <p className="text-sm text-muted-foreground">
          {stampCount >= 5 ? 'Pronto para recompensa' : 'Participando'}
        </p>
      </div>
    </div>
  );
};

const AdminLoyalty: React.FC = () => {
  const { generateCode, getAllCodes, getUsedCodes, getUnusedCodes, getAllCustomers, getCustomerProfileImage } = useFidelityCode();
  
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Novo estado para gerar código de fidelidade
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Estado para visualizar clientes
  const [showCustomers, setShowCustomers] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);

  // Nova função para gerar código de fidelidade
  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCode(true);
    
    setTimeout(() => {
      try {
        if (!customerName || !customerPhone) {
          toast.error('Dados incompletos', {
            description: 'Por favor, preencha o nome e telefone do cliente.'
          });
          return;
        }
        
        const code = generateCode(customerName, customerPhone);
        setGeneratedCode(code);
        
        toast.success('Código gerado com sucesso!', {
          description: `Código ${code} gerado para ${customerName}.`
        });
      } catch (error) {
        toast.error('Erro ao gerar código', {
          description: 'Ocorreu um erro ao gerar o código. Tente novamente.'
        });
      } finally {
        setIsGeneratingCode(false);
      }
    }, 500);
  };

  // Função para copiar código para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Código copiado!', {
      description: 'O código foi copiado para a área de transferência.'
    });
  };
  
  // Função para visualizar clientes cadastrados
  const handleViewCustomers = () => {
    const customerList = getAllCustomers();
    // Adicionar a contagem de carimbos para cada cliente
    const customersWithStamps = customerList.map(customer => {
      const stampCount = customer.stamps?.length || 0;
      const profileImage = getCustomerProfileImage(customer.customerPhone);
      
      return {
        ...customer,
        stampCount,
        profileImage
      };
    });
    
    setCustomers(customersWithStamps);
    setShowCustomers(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Administração de Fidelidade</h1>
          <p className="text-muted-foreground">
            Confirme pagamentos e conceda carimbos aos clientes
          </p>
        </div>

        {/* Gerar Código de Fidelidade */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Gerar Código de Fidelidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateCode} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codeCustomerName">Nome do Cliente *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="codeCustomerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nome completo"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="codeCustomerPhone">Telefone do Cliente *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="codeCustomerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {generatedCode && (
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Código Gerado:</p>
                      <p className="font-mono text-lg">{generatedCode}</p>
                    </div>
                    <Button onClick={copyToClipboard} variant="outline">
                      Copiar
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Envie este código ao cliente via WhatsApp
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isGeneratingCode || !customerName || !customerPhone}
                className="w-full"
              >
                {isGeneratingCode ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Gerar Código de Fidelidade
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Instruções para a Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Verifique se o pagamento foi realizado via WhatsApp</li>
              <li>Gere um código de fidelidade exclusivo para o cliente</li>
              <li>Envie o código ao cliente via WhatsApp</li>
              <li>O cliente deve inserir o código na área de fidelidade para ganhar um carimbo</li>
            </ol>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Estatísticas de Fidelidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-primary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary-foreground">{getAllCodes().length}</p>
                <p className="text-sm text-primary-foreground/80">Total de Códigos</p>
              </div>
              <div className="p-4 bg-green-500/20 rounded-lg">
                <p className="text-2xl font-bold text-green-500-foreground">{getUsedCodes().length}</p>
                <p className="text-sm text-green-500-foreground/80">Códigos Usados</p>
              </div>
              <div className="p-4 bg-yellow-500/20 rounded-lg">
                <p className="text-2xl font-bold text-yellow-500-foreground">{getUnusedCodes().length}</p>
                <p className="text-sm text-yellow-500-foreground/80">Códigos Disponíveis</p>
              </div>
            </div>
            
            {/* Botão para visualizar clientes */}
            <div className="mt-6">
              <Button onClick={handleViewCustomers} className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Ver Clientes Cadastrados
                <Eye className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Lista de Clientes Cadastrados */}
        {showCustomers && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Clientes Cadastrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customers.length === 0 ? (
                <p className="text-center text-muted-foreground">Nenhum cliente cadastrado ainda.</p>
              ) : (
                <div className="space-y-4">
                  {customers.map((customer, index) => (
                    <CustomerProfileDisplay
                      key={index}
                      customerName={customer.customerName}
                      customerPhone={customer.customerPhone}
                      profileImage={customer.profileImage}
                      stampCount={customer.stampCount}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLoyalty;