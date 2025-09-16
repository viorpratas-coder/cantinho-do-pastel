import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Phone, 
  Calendar, 
  Star, 
  Award, 
  ShoppingCart, 
  MessageCircle,
  X
} from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { CustomerFidelityData } from '@/contexts/FidelityCodeContext';

interface CustomerDetailsModalProps {
  customer: CustomerFidelityData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ 
  customer, 
  isOpen, 
  onClose
}) => {
  const { orders } = useOrders();
  
  if (!customer) return null;

  // Obter histórico de pedidos para o cliente
  const customerOrders = orders.filter(order => order.customerPhone === customer.customerPhone);
  
  // Calcular valor total gasto
  const totalSpent = customerOrders.reduce((total, order) => total + order.totalPrice, 0);
  
  // Obter data do último pedido
  const lastOrder = customerOrders.length > 0 
    ? customerOrders.reduce((latest, order) => 
        new Date(order.createdAt) > new Date(latest.createdAt) ? order : latest
      )
    : null;

  const getLevelName = (level: number) => {
    switch (level) {
      case 5: return 'Diamante';
      case 4: return 'Ouro';
      case 3: return 'Prata';
      case 2: return 'Bronze';
      default: return 'Iniciante';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 5: return 'bg-blue-500';
      case 4: return 'bg-yellow-500';
      case 3: return 'bg-gray-400';
      case 2: return 'bg-amber-800';
      default: return 'bg-gray-200';
    }
  };

  const handleSendMessage = (phone: string, name: string) => {
    // Formatar número de telefone para o formato internacional
    const formattedPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${formattedPhone}?text=Olá ${encodeURIComponent(name)}, tudo bem?`;
    window.open(whatsappUrl, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Cliente</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div>
                <h2 className="text-xl font-bold">{customer.customerName}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.customerPhone}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Registro: {formatDate(customer.registrationDate)}</span>
              </div>
              {lastOrder && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Último pedido: {formatDate(new Date(lastOrder.createdAt))}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Programa de Fidelidade */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Programa de Fidelidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Badge className={getLevelColor(customer.level)}>
                  {getLevelName(customer.level)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{customer.points} pontos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-orange-500" />
                <span>{customer.stamps?.length || 0} carimbos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-500" />
                <span>{customer.rewardsClaimed} recompensas resgatadas</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Estatísticas de Compras */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Estatísticas de Compras</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-2xl font-bold">{customerOrders.length}</div>
                <div className="text-sm text-muted-foreground">Total de Pedidos</div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                <div className="text-sm text-muted-foreground">Valor Total Gasto</div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {customerOrders.length > 0 
                    ? formatCurrency(totalSpent / customerOrders.length) 
                    : formatCurrency(0)}
                </div>
                <div className="text-sm text-muted-foreground">Ticket Médio</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Histórico de Pedidos Resumido */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Últimos Pedidos</h3>
            {customerOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Nenhum pedido registrado</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {[...customerOrders]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">Pedido #{order.id.substring(0, 8)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(new Date(order.createdAt))}
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(order.totalPrice)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Ações */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ações</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => handleSendMessage(customer.customerPhone, customer.customerName)}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;