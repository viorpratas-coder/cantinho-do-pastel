import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TransformedCustomerFidelityData {
  id: string;
  customerName: string;
  customerPhone: string;
  stamps: number;
  lastRewardDate?: Date;
  profileImage?: string;
  level: number;
  points: number;
  totalSpent: number;
  rewardsClaimed: number;
  lastActivityDate?: Date;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Phone, 
  Star, 
  Calendar,
  Award,
  User,
  MoreHorizontal,
  MessageCircle,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { useFidelityCode, CustomerFidelityData } from '@/contexts/FidelityCodeContext';
import { useOrders } from '@/contexts/OrdersContext';
import CustomerDetailsModal from '@/components/admin/CustomerDetailsModal';
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

const AdminCustomers = () => {
  const { getAllCustomers } = useFidelityCode();
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFidelityData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'points' | 'orders' | 'spent'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const customers = getAllCustomers();

  // Filtrar clientes com base na pesquisa e filtros
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customerPhone.includes(searchTerm);
    
    let matchesFilter = true;
    if (filter === 'active') {
      matchesFilter = customer.stamps && customer.stamps.length > 0;
    } else if (filter === 'loyal') {
      matchesFilter = customer.level && customer.level > 1;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Ordenar clientes
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.customerName.localeCompare(b.customerName);
        break;
      case 'level':
        comparison = a.level - b.level;
        break;
      case 'points':
        comparison = a.points - b.points;
        break;
      case 'orders':
        comparison = getCustomerOrderHistory(a.customerPhone).length - getCustomerOrderHistory(b.customerPhone).length;
        break;
      case 'spent':
        comparison = getTotalSpent(a.customerPhone) - getTotalSpent(b.customerPhone);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Obter histórico de pedidos para cada cliente
  const getCustomerOrderHistory = (phone: string) => {
    return orders.filter(order => order.customerPhone === phone);
  };

  // Obter número de recompensas resgatadas
  const getRewardsClaimed = (phone: string) => {
    const customer = customers.find(c => c.customerPhone === phone);
    return customer ? customer.rewardsClaimed : 0;
  };

  // Obter valor total gasto pelo cliente
  const getTotalSpent = (phone: string) => {
    const customerOrders = getCustomerOrderHistory(phone);
    return customerOrders.reduce((total, order) => total + order.totalPrice, 0);
  };

  // Obter data do último pedido
  const getLastOrderDate = (phone: string) => {
    const customerOrders = getCustomerOrderHistory(phone);
    if (customerOrders.length === 0) return null;
    
    return customerOrders
      .map(order => new Date(order.createdAt))
      .sort((a, b) => b.getTime() - a.getTime())[0];
  };

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

  const handleViewDetails = (customer: CustomerFidelityData) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Função para formatar datas
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  // Função para lidar com ordenação
  const handleSort = (column: 'name' | 'level' | 'points' | 'orders' | 'spent') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os clientes cadastrados no sistema
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou telefone..."
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
                Todos os clientes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('active')}>
                Clientes ativos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('loyal')}>
                Clientes fiéis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('name')}>
                  Cliente {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-foreground">Telefone</TableHead>
                <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('level')}>
                  Nível {sortBy === 'level' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('points')}>
                  Pontos {sortBy === 'points' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-foreground">Carimbos</TableHead>
                <TableHead className="text-foreground">Recompensas</TableHead>
                <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('orders')}>
                  Pedidos {sortBy === 'orders' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('spent')}>
                  Total Gasto {sortBy === 'spent' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-foreground">Último Pedido</TableHead>
                <TableHead className="text-foreground">Data Registro</TableHead>
                <TableHead className="text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCustomers.map((customer) => {
                const orderHistory = getCustomerOrderHistory(customer.customerPhone);
                const lastOrderDate = getLastOrderDate(customer.customerPhone);
                const totalSpent = getTotalSpent(customer.customerPhone);
                
                return (
                  <TableRow key={customer.customerPhone}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                        <div>
                          <div className="font-medium text-foreground">{customer.customerName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{customer.customerPhone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(customer.level)}>
                        {getLevelName(customer.level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-foreground">{customer.points || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-orange-500" />
                        <span className="text-foreground">{(customer.stamps?.length || 0)}/10</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {getRewardsClaimed(customer.customerPhone)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {orderHistory.length} pedidos
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground font-medium">
                        {formatCurrency(totalSpent)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(lastOrderDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(customer.registrationDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendMessage(customer.customerPhone, customer.customerName)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              Ver histórico de pedidos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Ver detalhes do perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Bloquear cliente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {sortedCustomers.length === 0 && (
            <div className="text-center py-10">
              <User className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">Nenhum cliente encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <CustomerDetailsModal 
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminCustomers;