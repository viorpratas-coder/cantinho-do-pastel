import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone } from 'lucide-react';
import { toast } from 'sonner';

const CustomerLogin = () => {
  const { authenticateCustomer, registerCustomer } = useFidelityCode();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
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
      if (isRegistering) {
        // Registrar novo cliente
        registerCustomer(name.trim(), cleanPhone);
        toast.success('Cadastro realizado!', {
          description: 'Você foi cadastrado com sucesso no programa de fidelidade.'
        });
      } else {
        // Autenticar cliente existente
        const success = authenticateCustomer(name.trim(), cleanPhone);
        if (!success) {
          toast.error('Erro', {
            description: 'Não foi possível autenticar. Verifique seus dados.'
          });
          setIsLoading(false);
          return;
        }
      }
      
      toast.success('Bem-vindo!', {
        description: 'Você entrou na sua conta com sucesso.'
      });
      
      // Redirecionar para a página de perfil
      navigate('/cliente');
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
            {isRegistering ? (
              <>
                <User className="w-5 h-5 mr-2" />
                Cadastro de Cliente
              </>
            ) : (
              <>
                <User className="w-5 h-5 mr-2" />
                Login do Cliente
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              ) : isRegistering ? (
                'Cadastrar'
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsRegistering(!isRegistering)}
              className="p-0 h-auto"
            >
              {isRegistering 
                ? 'Já tenho conta. Fazer login' 
                : 'Ainda não tenho conta. Cadastrar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerLogin;