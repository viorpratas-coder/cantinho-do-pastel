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
    topCustomers: [] as { name: string; orders: number; totalSpent: number }[],
    customerLevels: [] as { level: string; count: number }[]
  });

  // Cores para os gráficos
  const COLORS = ['#f97316', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  const CHART_COLORS = {
    sales: 'hsl(var(--primary))',
    orders: 'hsl(var(--primary))'
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  // Função para obter o nome do nível do cliente
  const getLevelName = (level: number) => {
    switch (level) {
      case 5: return 'Diamante';
      case 4: return 'Ouro';
      case 3: return 'Prata';
      case 2: return 'Bronze';
      default: return 'Iniciante';
    }
  };

  useEffect(() => {
    // Calcular dados do dashboard
    const allCustomers = getAllCustomers();
    const usedCodes = getUsedCodes();
    const allCodes = getAllCodes();
    
    // Total de vendas (baseado nos pedidos registrados)
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
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
    
    // Dados de vendas para o gráfico (baseados nos pedidos dos últimos 7 dias)
    const salesData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      // Filtrar pedidos do dia
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === date.toDateString();
      });
      
      const daySales = dayOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      salesData.push({ date: dateString, sales: daySales });
    }
    
    // Dados de status dos pedidos
    const orderStatusData = [
      { status: 'Pendente', count: orders.filter(o => o.status === 'pending').length },
      { status: 'Preparando', count: orders.filter(o => o.status === 'preparing').length },
      { status: 'Pronto', count: orders.filter(o => o.status === 'ready').length },
      { status: 'Entregue', count: orders.filter(o => o.status === 'delivered').length },
      { status: 'Cancelado', count: orders.filter(o => o.status === 'cancelled').length }
    ];
    
    // Clientes mais fiéis (baseados no número de pedidos e valor gasto)
    const customerOrderCounts: { [key: string]: { name: string; orders: number; totalSpent: number; phone: string } } = {};
    
    // Contar pedidos por cliente
    orders.forEach(order => {
      if (!customerOrderCounts[order.customerPhone]) {
        customerOrderCounts[order.customerPhone] = {
          name: order.customerName,
          orders: 0,
          totalSpent: 0,
          phone: order.customerPhone
        };
      }
      
      customerOrderCounts[order.customerPhone].orders += 1;
      customerOrderCounts[order.customerPhone].totalSpent += order.totalPrice;
    });
    
    // Converter para array e ordenar por número de pedidos
    const sortedCustomers = Object.values(customerOrderCounts)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
    
    const topCustomers = sortedCustomers.map(customer => ({
      name: customer.name,
      orders: customer.orders,
      totalSpent: customer.totalSpent
    }));
    
    // Distribuição de níveis dos clientes
    const levelCounts: { [key: number]: number } = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    allCustomers.forEach(customer => {
      levelCounts[customer.level] = (levelCounts[customer.level] || 0) + 1;
    });
    
    const customerLevels = Object.entries(levelCounts)
      .filter(([_, count]) => count > 0)
      .map(([level, count]) => ({
        level: getLevelName(parseInt(level)),
        count
      }));
    
    setDashboardData({
      totalSales,
      activeOrders,
      totalCustomers,
      fidelityPoints,
      salesData,
      orderStatusData,
      topCustomers,
      customerLevels
    });
  }, [cartItems, orders, getAllCodes, getUsedCodes, getAllCustomers]);

  // Calcular métricas adicionais
  const calculateAdditionalMetrics = () => {
    // Média de pedidos por dia
    const daysWithOrders = new Set(orders.map(order => 
      new Date(order.createdAt).toDateString()
    )).size;
    
    const averageOrdersPerDay = daysWithOrders > 0 ? 
      (orders.length / daysWithOrders).toFixed(1) : '0';
    
    // Ticket médio
    const averageTicket = orders.length > 0 ? 
      (dashboardData.totalSales / orders.length).toFixed(2) : '0';
    
    // Taxa de conversão (pedidos / clientes cadastrados)
    const conversionRate = dashboardData.totalCustomers > 0 ? 
      ((orders.length / dashboardData.totalCustomers) * 100).toFixed(1) : '0';
    
    return {
      averageOrdersPerDay,
      averageTicket,
      conversionRate
    };
  };

  const { averageOrdersPerDay, averageTicket, conversionRate } = calculateAdditionalMetrics();

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
            <div className="text-2xl font-bold text-foreground">{formatCurrency(dashboardData.totalSales)}</div>
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
                    formatter={(value) => [formatCurrency(Number(value)), 'Vendas']}
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
                  <div className="text-right">
                    <div className="font-medium">{customer.orders} pedidos</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                  </div>
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
                  <span className="font-bold text-lg text-foreground">{averageOrdersPerDay}</span>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ticket Médio</span>
                  <span className="font-bold text-lg text-foreground">{formatCurrency(parseFloat(averageTicket))}</span>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxa de Conversão</span>
                  <span className="font-bold text-lg text-foreground">{conversionRate}%</span>
                </div>
              </div>
              
              {/* Distribuição de níveis dos clientes */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2">Distribuição de Níveis</h4>
                <div className="space-y-2">
                  {dashboardData.customerLevels.map((level, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{level.level}</span>
                      <span className="font-medium">{level.count} clientes</span>
                    </div>
                  ))}
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