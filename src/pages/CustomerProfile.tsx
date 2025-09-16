import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Phone,
  ShoppingBag,
  Edit,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import WhatsAppProfile from '@/components/WhatsAppProfile';

const CustomerProfile = () => {
  const { currentCustomer, setCurrentCustomer, setCustomerProfileImage, getCustomerProfileImage } = useFidelityCode();
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentCustomer?.customerName || '');
  const [editedPhone, setEditedPhone] = useState(currentCustomer?.customerPhone || '');

  // Atualizar estados quando o cliente mudar
  React.useEffect(() => {
    if (currentCustomer) {
      setEditedName(currentCustomer.customerName);
      setEditedPhone(currentCustomer.customerPhone);
    }
  }, [currentCustomer]);

  // Função para salvar alterações
  const handleSave = () => {
    if (currentCustomer) {
      // Atualizar dados do cliente
      setCurrentCustomer({
        ...currentCustomer,
        customerName: editedName,
        customerPhone: editedPhone
      });
      
      toast.success('Perfil atualizado!', {
        description: 'Suas informações foram salvas com sucesso.'
      });
      
      setIsEditing(false);
    }
  };

  // Função para cancelar edição
  const handleCancel = () => {
    // Reverter para os valores originais
    if (currentCustomer) {
      setEditedName(currentCustomer.customerName);
      setEditedPhone(currentCustomer.customerPhone);
    }
    
    setIsEditing(false);
  };

  // Função para formatar a data
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
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

  // Filtrar pedidos do cliente atual
  const customerOrders = currentCustomer 
    ? orders.filter(order => order.customerPhone === currentCustomer.customerPhone)
    : [];

  // Status descriptions
  const statusDescriptions = {
    pending: 'Esperando pagamento',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  // Status colors
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    delivered: 'bg-purple-500',
    cancelled: 'bg-red-500'
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
    toast.success('Você saiu da sua conta.');
    navigate('/');
  };

  // Removemos a verificação de autenticação aqui, pois agora é feita pelo CustomerRouteGuard

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-foreground/70">
          Gerencie suas informações e pedidos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Perfil */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </span>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      Salvar
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                    <Input
                      id="phone"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-muted rounded-lg">
                    <WhatsAppProfile 
                      phoneNumber={currentCustomer.customerPhone} 
                      customerName={currentCustomer.customerName} 
                      onImageUpload={handleImageUpload}
                      uploadedImage={currentCustomer.profileImage || getCustomerProfileImage(currentCustomer.customerPhone) || undefined}
                    />
                    <div className="ml-4">
                      <p className="font-medium text-lg">{currentCustomer.customerName}</p>
                      <p className="text-muted-foreground">{currentCustomer.customerPhone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cliente desde</p>
                      <p className="font-medium">
                        {currentCustomer.stamps.length > 0 
                          ? formatDate(currentCustomer.stamps[0]?.createdAt) 
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Última atividade</p>
                      <p className="font-medium">
                        {currentCustomer.lastActivityDate 
                          ? formatDate(currentCustomer.lastActivityDate) 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6">
          {/* Histórico de Pedidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Meus Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customerOrders.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">Pedido #{order.id.substring(0, 6)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-500'} text-white`}>
                          {statusDescriptions[order.status] || order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(new Date(order.createdAt))}</span>
                        <span className="font-medium">
                          {order.totalPrice.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => navigate('/cliente/pedidos')}
                  >
                    Ver todos os pedidos
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum pedido ainda
                </p>
              )}
            </CardContent>
          </Card>

          {/* Botão de Sair */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;