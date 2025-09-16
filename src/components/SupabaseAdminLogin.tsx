import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const SupabaseAdminLogin = () => {
  const { login, register, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Erro', {
        description: 'Por favor, preencha todos os campos.'
      });
      return;
    }
    
    if (isRegistering && password !== confirmPassword) {
      toast.error('Erro', {
        description: 'As senhas não coincidem.'
      });
      return;
    }
    
    try {
      if (isRegistering) {
        const success = await register(email, password);
        if (success) {
          toast.success('Registro realizado!', {
            description: 'Conta criada com sucesso. Faça login para continuar.'
          });
          setIsRegistering(false);
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success('Login realizado!', {
            description: 'Você entrou no painel administrativo.'
          });
          navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      toast.error('Erro', {
        description: 'Ocorreu um erro ao processar sua solicitação.'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {isRegistering ? 'Criar Conta Administrativa' : 'Acesso Administrativo'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isRegistering 
                ? 'Crie sua conta para acessar o painel administrativo' 
                : 'Entre com suas credenciais para acessar o painel'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              
              {isRegistering && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Processando...
                  </>
                ) : isRegistering ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Criar Conta
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
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
                  : 'Criar nova conta administrativa'}
              </Button>
            </div>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary underline">
                Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupabaseAdminLogin;