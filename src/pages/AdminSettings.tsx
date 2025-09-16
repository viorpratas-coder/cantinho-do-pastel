import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  UserCheck, 
  Shield, 
  Bell, 
  Palette,
  Save
} from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { toast } from 'sonner';

const AdminSettings = () => {
  const { requireRegistration, setRequireRegistration } = useOrders();
  const [settings, setSettings] = useState({
    requireRegistration: requireRegistration,
    enableNotifications: true,
    darkMode: false
  });

  const handleSave = () => {
    // Atualizar configurações
    setRequireRegistration(settings.requireRegistration);
    
    toast.success('Configurações salvas!', {
      description: 'As alterações foram aplicadas com sucesso.'
    });
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Settings className="h-5 w-5 mr-2" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Exigir cadastro para pedidos</Label>
                <p className="text-sm text-muted-foreground">
                  Clientes precisam se cadastrar antes de fazer pedidos
                </p>
              </div>
              <Switch
                checked={settings.requireRegistration}
                onCheckedChange={() => handleToggle('requireRegistration')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Notificações</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações de novos pedidos
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={() => handleToggle('enableNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Modo escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar tema escuro para o painel administrativo
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle('darkMode')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Shield className="h-5 w-5 mr-2" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium text-foreground mb-2">Política de Cadastro</h3>
                <p className="text-sm text-muted-foreground">
                  {settings.requireRegistration 
                    ? 'Cadastro obrigatório está ATIVADO. Todos os clientes devem se registrar antes de fazer pedidos.'
                    : 'Cadastro obrigatório está DESATIVADO. Clientes podem fazer pedidos sem se registrar.'}
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium text-foreground mb-2">Proteção de Dados</h3>
                <p className="text-sm text-muted-foreground">
                  Todos os dados dos clientes são armazenados com criptografia e segurança.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Notificações */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Novos pedidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando um novo pedido for feito
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Status de pedidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando o status de um pedido for atualizado
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Novos clientes</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando um novo cliente se registrar
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalização */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Palette className="h-5 w-5 mr-2" />
              Personalização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Tema do Painel</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="h-16 bg-primary rounded cursor-pointer border-2 border-primary"></div>
                  <div className="h-16 bg-secondary rounded cursor-pointer"></div>
                  <div className="h-16 bg-muted rounded cursor-pointer"></div>
                </div>
              </div>
              
              <div>
                <Label className="text-foreground">Layout</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline">Compacto</Button>
                  <Button variant="default">Padrão</Button>
                  <Button variant="outline">Expandido</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;