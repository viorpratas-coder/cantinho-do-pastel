import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const isAuthenticated = login(password);
      
      if (isAuthenticated) {
        toast.success('Autenticado com sucesso!', {
          description: 'Bem-vindo ao painel administrativo.'
        });
        navigate('/admin/dashboard');
      } else {
        toast.error('Acesso negado', {
          description: 'Senha incorreta. Tente novamente.'
        });
        setPassword('');
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">Área restrita para equipe da pastelaria</p>
        </div>

        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-foreground">
              <Lock className="h-5 w-5 mr-2" />
              Acesso Restrito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-foreground">Senha de Acesso</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha de acesso"
                  required
                  className="mt-1 bg-background border-input"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Apenas membros autorizados da equipe têm acesso a esta área.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Autenticando...
                  </>
                ) : (
                  'Acessar Painel'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Esqueceu a senha? Entre em contato com o administrador do sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;