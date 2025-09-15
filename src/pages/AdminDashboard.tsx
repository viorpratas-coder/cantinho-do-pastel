import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  Award, 
  TrendingUp, 
  Package, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  CreditCard,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const { getAllCodes, getUsedCodes, getAllCustomers } = useFidelityCode();
  const { cartItems } = useCart();
  const { orders } = useOrders();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    activeOrders: 0,
    totalCustomers: 0,
    fidelityPoints: 0,
    salesData: [] as { date: string; sales: number }[],
    orderStatusData: [] as { status: string; count: number }[],
    topCustomers: [] as { name: string; orders: number }[]
  });

  // Cores para os gráficos
  const COLORS = ['#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  const CHART_COLORS = {
    sales: 'hsl(var(--primary))',
    orders: 'hsl(var(--primary))'
  };

  useEffect(() => {
    // Calcular dados do dashboard
    const allCustomers = getAllCustomers();
    const usedCodes = getUsedCodes();
    const allCodes = getAllCodes();
    
    // Total de vendas
    const totalSales = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Pedidos ativos (não entregues)
    const activeOrders = orders.filter(order => 
      order.status === 'pending' || 
      order.status === 'preparing' || 
      order.status === 'ready'
    ).length;
    
    // Total de clientes
    const totalCustomers = allCustomers.length;
    
    // Pontos de fidelidade distribuídos (códigos usados)
    const fidelityPoints = usedCodes.length;
    
    // Dados de vendas para o gráfico (simulados)
    const salesData = [
      { date: 'Seg', sales: 1200 },
      { date: 'Ter', sales: 1900 },
      { date: 'Qua', sales: 1500 },
      { date: 'Qui', sales: 2200 },
      { date: 'Sex', sales: 1800 },
      { date: 'Sáb', sales: 2500 },
      { date: 'Dom', sales: 1700 }
    ];
    
    // Dados de status dos pedidos
    const orderStatusData = [
      { status: 'Pendente', count: orders.filter(o => o.status === 'pending').length },
      { status: 'Preparando', count: orders.filter(o => o.status === 'preparing').length },
      { status: 'Pronto', count: orders.filter(o => o.status === 'ready').length },
      { status: 'Entregue', count: orders.filter(o => o.status === 'delivered').length },
      { status: 'Cancelado', count: orders.filter(o => o.status === 'cancelled').length }
    ];
    
    // Clientes mais fiéis (simulados)
    const topCustomers = [
      { name: 'Carlos Silva', orders: 15 },
      { name: 'Maria Oliveira', orders: 12 },
      { name: 'João Santos', orders: 10 },
      { name: 'Ana Costa', orders: 8 },
      { name: 'Pedro Almeida', orders: 7 }
    ];
    
    setDashboardData({
      totalSales,
      activeOrders,
      totalCustomers,
      fidelityPoints,
      salesData,
      orderStatusData,
      topCustomers
    });
  }, [cartItems, orders, getAllCodes, getUsedCodes, getAllCustomers]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral das métricas da pastelaria
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total de Vendas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ {dashboardData.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao período anterior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pedidos Ativos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardData.activeOrders}</div>
            <p className="text-xs text-muted-foreground">Pedidos em preparação ou pendentes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Clientes Cadastrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pontos de Fidelidade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardData.fidelityPoints}</div>
            <p className="text-xs text-muted-foreground">Carimbos registrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas */}
        <Card className="col-span-1 bg-card border">
          <CardHeader>
            <CardTitle className="text-foreground">Evolução de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={CHART_COLORS.sales} 
                    strokeWidth={2}
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Status dos Pedidos */}
        <Card className="col-span-1 bg-card border">
          <CardHeader>
            <CardTitle className="text-foreground">Pedidos por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="status" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking de Clientes e Métricas Adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clientes Mais Fiéis */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <UserCheck className="h-5 w-5 mr-2" />
              Ranking de Clientes Mais Fiéis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-3">
                      {index + 1}
                    </Badge>
                    <span className="font-medium text-foreground">{customer.name}</span>
                  </div>
                  <Badge variant="outline">
                    {customer.orders} pedidos
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas Adicionais */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <CreditCard className="h-5 w-5 mr-2" />
              Métricas Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Média de Pedidos por Dia</span>
                  <span className="font-bold text-lg text-foreground">24</span>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ticket Médio</span>
                  <span className="font-bold text-lg text-foreground">R$ 32,50</span>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxa de Conversão</span>
                  <span className="font-bold text-lg text-foreground">68%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;