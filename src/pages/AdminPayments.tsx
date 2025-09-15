import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  CreditCard, 
  Wallet, 
  CheckCircle,
  XCircle,
  Download,
  User,
  Phone,
  Calendar,
  FileText
} from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
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
import { toast } from 'sonner';

const AdminPayments = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Filtrar pedidos com base na pesquisa e filtros
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm);
    
    let matchesFilter = true;
    if (filter === 'paid') {
      matchesFilter = order.status !== 'pending';
    } else if (filter === 'pending') {
      matchesFilter = order.status === 'pending';
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleConfirmPayment = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing');
    toast.success('Pagamento confirmado!', {
      description: 'O pedido foi movido para a fila de preparação.'
    });
  };

  const handleExport = (format: 'csv' | 'excel') => {
    // Simular exportação
    toast.success(`Relatório exportado em ${format.toUpperCase()}`, {
      description: 'O arquivo foi baixado com sucesso.'
    });
    
    // Em uma implementação real, aqui você faria a chamada para a API
    // para gerar e baixar o relatório
  };

  const getPaymentStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Pendente</Badge>;
      default:
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Pago</Badge>;
    }
  };

  const getPaymentMethod = (orderId: string) => {
    // Simulação - em um sistema real, isso viria dos dados do pedido
    // Aqui estamos usando um mapeamento simples baseado no ID do pedido
    const methods = ['Cartão de Crédito', 'PIX', 'Dinheiro', 'Cartão de Débito'];
    const index = parseInt(orderId.replace(/\D/g, '').slice(-1)) % methods.length;
    return methods[index];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Pagamentos</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os pagamentos dos pedidos
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Exportar como CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                Exportar como Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por ID, nome ou telefone..."
            className="pl-10 bg-background border-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter('all')}>
              Todos os pagamentos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('paid')}>
              Pagos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('pending')}>
              Pendentes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">ID do Pedido</TableHead>
                <TableHead className="text-foreground">Cliente</TableHead>
                <TableHead className="text-foreground">Telefone</TableHead>
                <TableHead className="text-foreground">Valor</TableHead>
                <TableHead className="text-foreground">Método</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Data</TableHead>
                <TableHead className="text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-mono text-foreground">#{order.id.substring(0, 8)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{order.customerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{order.customerPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">R$ {order.totalPrice.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-foreground">{getPaymentMethod(order.id)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPaymentStatus(order.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleConfirmPayment(order.id)}
                      >
                        Confirmar Pagamento
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">Nenhum pagamento encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;