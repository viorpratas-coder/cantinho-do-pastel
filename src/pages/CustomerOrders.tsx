import React, { useState } from 'react';
import { useOrders, Order } from '@/contexts/OrdersContext';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck,
  Timer,
  Search,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const { orders } = useOrders();
  const { currentCustomer } = useFidelityCode();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Status descriptions
  const statusDescriptions = {
    pending: 'Esperando pagamento',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  // Status icons
  const statusIcons = {
    pending: Clock,
    preparing: Package,
    ready: CheckCircle,
    delivered: Truck,
    cancelled: Clock
  };

  // Status colors
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    delivered: 'bg-purple-500',
    cancelled: 'bg-red-500'
  };

  // Filtrar pedidos do cliente atual
  const customerOrders = currentCustomer 
    ? orders.filter(order => order.customerPhone === currentCustomer.customerPhone)
    : [];

  // Filtrar pedidos com base na pesquisa e status
  const filteredOrders = customerOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para calcular o tempo estimado restante
  const getEstimatedTimeLeft = (order: Order) => {
    const created = new Date(order.createdAt);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - created.getTime()) / 60000); // em minutos
    const remaining = Math.max(0, order.estimatedTime - elapsed);
    return remaining;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Meus Pedidos</h1>
        <p className="text-foreground/70">
          Acompanhe o histórico e status dos seus pedidos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Lista de Pedidos
            </span>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar pedido..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="pending">Esperando pagamento</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Pronto</option>
                <option value="delivered">Entregue</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Nenhum pedido corresponde aos critérios de busca.' 
                  : 'Você ainda não fez nenhum pedido.'}
              </p>
              <Button onClick={() => navigate('/')}>Nova Compra</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                const timeLeft = getEstimatedTimeLeft(order);
                
                return (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <StatusIcon className={`w-5 h-5 ${statusColors[order.status]}`} />
                            <span className="font-semibold">Pedido #{order.id.slice(0, 8)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]} text-white`}>
                              {statusDescriptions[order.status]}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-1">
                            Feito em: {formatDate(order.createdAt)}
                          </p>
                          
                          <p className="font-medium">
                            Total: {order.totalPrice.toLocaleString('pt-BR', { 
                              style: 'currency', 
                              currency: 'BRL' 
                            })}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          {order.status === 'pending' || order.status === 'preparing' ? (
                            <div className="flex items-center gap-2 text-sm">
                              <Timer className="w-4 h-4" />
                              <span>
                                {timeLeft > 0 
                                  ? `Pronto em ~${timeLeft} min` 
                                  : 'Quase pronto!'}
                              </span>
                            </div>
                          ) : null}
                          
                          <Button variant="outline" size="sm" className="mt-2">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      
                      {/* Barra de progresso */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Recebido</span>
                          <span>Preparando</span>
                          <span>Pronto</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{
                              width: order.status === 'pending' ? '33%' : 
                                     order.status === 'preparing' ? '66%' : 
                                     '100%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrders;