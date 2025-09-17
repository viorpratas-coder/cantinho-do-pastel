import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Package, 
  Clock, 
  CheckCircle,
  XCircle,
  User,
  Phone,
  Calendar,
  MoreHorizontal,
  ChefHat,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { useOrders, Order } from '@/contexts/OrdersContext';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { getAllCustomers } = useFidelityCode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obter todos os clientes para referência
  const customers = getAllCustomers();

  // Filtrar pedidos com base na pesquisa e filtros
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm);
    
    let matchesFilter = true;
    if (filter === 'pending') {
      matchesFilter = order.status === 'pending';
    } else if (filter === 'preparing') {
      matchesFilter = order.status === 'preparing';
    } else if (filter === 'ready') {
      matchesFilter = order.status === 'ready';
    } else if (filter === 'delivered') {
      matchesFilter = order.status === 'delivered';
    }
    
    return matchesSearch && matchesFilter;
  });

  // Verificar se o cliente está cadastrado no programa de fidelidade
  const isCustomerRegistered = (phone: string) => {
    return customers.some(customer => customer.customerPhone === phone);
  };

  // Obter nível do cliente
  const getCustomerLevel = (phone: string) => {
    const customer = customers.find(c => c.customerPhone === phone);
    return customer ? customer.level : 0;
  };

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

  const getLevelBadge = (level: number) => {
    const levelNames = {
      5: 'Diamante',
      4: 'Ouro',
      3: 'Prata',
      2: 'Bronze',
      1: 'Iniciante',
      0: 'Não cadastrado'
    };

    const levelColors = {
      5: 'bg-blue-500',
      4: 'bg-yellow-500',
      3: 'bg-gray-400',
      2: 'bg-amber-800',
      1: 'bg-gray-200',
      0: 'bg-muted'
    };

    return (
      <Badge className={levelColors[level as keyof typeof levelColors] || 'bg-muted'}>
        {levelNames[level as keyof typeof levelNames] || 'Desconhecido'}
      </Badge>
    );
  };

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled') => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os pedidos em tempo real
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por ID, nome ou telefone..."
              className="pl-10 w-full md:w-64 bg-background border-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter('all')}>
                Todos os pedidos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('pending')}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('preparing')}>
                Em preparo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('ready')}>
                Prontos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('delivered')}>
                Entregues
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('cancelled')}>
                Cancelados
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">ID do Pedido</TableHead>
                <TableHead className="text-foreground">Cliente</TableHead>
                <TableHead className="text-foreground">Telefone</TableHead>
                <TableHead className="text-foreground">Nível</TableHead>
                <TableHead className="text-foreground">Itens</TableHead>
                <TableHead className="text-foreground">Total</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Data</TableHead>
                <TableHead className="text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const customerRegistered = isCustomerRegistered(order.customerPhone);
                const customerLevel = customerRegistered ? getCustomerLevel(order.customerPhone) : 0;
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="font-mono text-foreground">#{order.id.substring(0, 8)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{order.customerName}</span>
                        {!customerRegistered && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Não cadastrado
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{order.customerPhone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLevelBadge(customerLevel)}
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{order.items.length} item(s)</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{formatCurrency(order.totalPrice)}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(order.id, 'preparing')}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <ChefHat className="h-4 w-4 mr-1" />
                            Preparar
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(order.id, 'ready')}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Pronto
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(order.id, 'delivered')}
                            className="bg-purple-500 hover:bg-purple-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Entregue
                          </Button>
                        )}
                        {(order.status === 'pending' || order.status === 'preparing') && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'pending')}>
                                Marcar como pendente
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'preparing')}>
                                Marcar como em preparo
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'ready')}>
                                Marcar como pronto
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>
                                Marcar como entregue
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                                className="text-red-600"
                              >
                                Cancelar pedido
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">Nenhum pedido encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleStatusChange}
      />
    </div>
  );
};

export default AdminOrders;