import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  Package, 
  ChefHat, 
  CheckCircle, 
  XCircle,
  Star
} from 'lucide-react';

// Definindo as interfaces localmente para evitar problemas de importação
interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  observations?: string;
  additionalFillings?: string[];
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  estimatedTime: number;
  totalPrice: number;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  order, 
  isOpen, 
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'preparing':
        return <Badge className="bg-blue-500"><ChefHat className="h-3 w-3 mr-1" />Em preparo</Badge>;
      case 'ready':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Pronto</Badge>;
      case 'delivered':
        return <Badge className="bg-purple-500"><CheckCircle className="h-3 w-3 mr-1" />Entregue</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Pedido #{order.id.substring(0, 8)}</span>
            {getStatusBadge(order.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Informações do Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Tempo estimado: {order.estimatedTime} min</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Itens do Pedido */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Itens do Pedido</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantidade: {item.quantity}
                    </div>
                    {item.observations && (
                      <div className="text-sm mt-1">
                        <span className="font-medium">Observações:</span> {item.observations}
                      </div>
                    )}
                    {item.additionalFillings && item.additionalFillings.length > 0 && (
                      <div className="text-sm mt-1">
                        <span className="font-medium">Adicionais:</span> {item.additionalFillings.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Resumo do Pedido */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ações</h3>
            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <Button 
                  onClick={() => onUpdateStatus(order.id, 'preparing')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Iniciar Preparo
                </Button>
              )}
              {order.status === 'preparing' && (
                <Button 
                  onClick={() => onUpdateStatus(order.id, 'ready')}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Pronto
                </Button>
              )}
              {order.status === 'ready' && (
                <Button 
                  onClick={() => onUpdateStatus(order.id, 'delivered')}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Entregue
                </Button>
              )}
              {(order.status === 'pending' || order.status === 'preparing') && (
                <Button 
                  variant="destructive" 
                  onClick={() => onUpdateStatus(order.id, 'cancelled')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar Pedido
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;