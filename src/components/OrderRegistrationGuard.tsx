import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useOrders } from '@/contexts/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OrderRegistrationGuardProps {
  onRegistrationComplete: () => void;
  customerPhone?: string;
}

const OrderRegistrationGuard: React.FC<OrderRegistrationGuardProps> = ({ 
  onRegistrationComplete,
  customerPhone: initialPhone = ''
}) => {
  const { registerCustomer, currentCustomer } = useFidelityCode();
  const { isCustomerRegistered } = useOrders();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const phoneNumber = value.replace(/\D/g, '');
    
    // Formata para (XX) XXXXX-XXXX
    if (phoneNumber.length >= 11) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    } else if (phoneNumber.length >= 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    } else if (phoneNumber.length >= 2) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else {
      return phoneNumber;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Remove formatação do telefone para salvar
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!name.trim() || cleanPhone.length < 10) {
      toast.error('Erro', {
        description: 'Por favor, preencha nome e telefone corretamente.'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Verificar se o cliente já está registrado
      if (isCustomerRegistered(cleanPhone)) {
        toast.error('Erro', {
          description: 'Este telefone já está cadastrado. Faça login na área do cliente.'
        });
        setIsLoading(false);
        return;
      }
      
      // Registrar novo cliente
      registerCustomer(name.trim(), cleanPhone);
      
      toast.success('Cadastro realizado!', {
        description: 'Você foi cadastrado com sucesso no programa de fidelidade.'
      });
      
      // Chamar callback para continuar com o pedido
      onRegistrationComplete();
    } catch (error) {
      toast.error('Erro', {
        description: 'Ocorreu um erro ao processar sua solicitação.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
            Cadastro Necessário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Para fazer pedidos, é necessário estar cadastrado no nosso programa de fidelidade.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone (WhatsApp) *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processando...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Cadastrar e Continuar
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => navigate('/cliente')}
              className="p-0 h-auto"
            >
              Já tenho conta. Fazer login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderRegistrationGuard;