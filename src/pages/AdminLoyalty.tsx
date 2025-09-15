import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  QrCode, 
  CheckCircle, 
  XCircle,
  Award,
  Calendar,
  User,
  Phone,
  Plus,
  Gift,
  Zap,
  Star
} from 'lucide-react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useCart } from '@/contexts/CartContext';
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

const AdminLoyalty = () => {
  const { getAllCodes, markCodeAsUsed, generateCode } = useFidelityCode();
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const allCodes = getAllCodes();
  
  // Filtrar códigos com base na pesquisa e filtros
  const filteredCodes = allCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.customerPhone.includes(searchTerm);
    
    let matchesFilter = true;
    if (filter === 'used') {
      matchesFilter = code.used;
    } else if (filter === 'unused') {
      matchesFilter = !code.used;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Obter clientes únicos
  const getUniqueCustomers = () => {
    const customersMap = new Map();
    allCodes.forEach(code => {
      if (!customersMap.has(code.customerPhone)) {
        customersMap.set(code.customerPhone, {
          name: code.customerName,
          phone: code.customerPhone,
          stamps: 0,
          totalCodes: 0
        });
      }
      
      const customer = customersMap.get(code.customerPhone);
      customer.totalCodes++;
      if (code.used) {
        customer.stamps++;
      }
    });
    
    return Array.from(customersMap.values());
  };

  const uniqueCustomers = getUniqueCustomers();

  // Filtrar clientes com base na pesquisa
  const filteredCustomers = uniqueCustomers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.phone.includes(searchTerm);
  });

  const handleMarkAsUsed = (code: string, customerName: string, customerPhone: string) => {
    markCodeAsUsed(code, customerName, customerPhone);
    toast.success('Código marcado como usado!', {
      description: `Carimbo registrado para ${customerName}`
    });
  };

  const handleGenerateCode = () => {
    if (!customerName || !customerPhone) {
      toast.error('Erro', {
        description: 'Preencha o nome e telefone do cliente'
      });
      return;
    }
    
    const code = generateCode(customerName, customerPhone);
    toast.success('Código gerado!', {
      description: `Código ${code} criado para ${customerName}`
    });
    
    // Limpar campos
    setCustomerName('');
    setCustomerPhone('');
  };

  const handleCreatePromotion = (promotion: string) => {
    toast.info(`Promoção: ${promotion}`, {
      description: 'Promoção especial ativada com sucesso!'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Programa de Fidelidade</h1>
        <p className="text-muted-foreground">
          Gerencie o programa de fidelidade e os carimbos dos clientes
        </p>
      </div>

      {/* Gerar Código */}
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Plus className="h-5 w-5 mr-2" />
            Gerar Novo Código
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium mb-1 text-foreground">
                Nome do Cliente
              </label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome completo"
                className="bg-background border-input"
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium mb-1 text-foreground">
                Telefone (WhatsApp)
              </label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="bg-background border-input"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerateCode} className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Gerar Código
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promoções */}
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Gift className="h-5 w-5 mr-2" />
            Promoções Especiais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleCreatePromotion("Pontos em Dobro (Segundas)")} variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Pontos em Dobro (Segundas)
            </Button>
            <Button onClick={() => handleCreatePromotion("Carimbo Bônus (Finais de Semana)")} variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Carimbo Bônus (Finais de Semana)
            </Button>
            <Button onClick={() => handleCreatePromotion("Recompensa Especial")} variant="outline">
              <Gift className="h-4 w-4 mr-2" />
              Recompensa Especial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes Participantes */}
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Clientes Participantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar clientes por nome ou telefone..."
                className="pl-10 bg-background border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Cliente</TableHead>
                <TableHead className="text-foreground">Telefone</TableHead>
                <TableHead className="text-foreground">Carimbos</TableHead>
                <TableHead className="text-foreground">Total de Códigos</TableHead>
                <TableHead className="text-foreground">Progresso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-500">
                      {customer.stamps}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {customer.totalCodes}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(customer.stamps / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-foreground">
                        {customer.stamps}/10
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gestão de Códigos/Carimbos */}
      <Card className="bg-card border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-foreground">Lista de Códigos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar códigos..."
                  className="pl-10 w-full md:w-48 bg-background border-input"
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
                    Todos os códigos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('used')}>
                    Códigos utilizados
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('unused')}>
                    Códigos disponíveis
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Código</TableHead>
                <TableHead className="text-foreground">Cliente</TableHead>
                <TableHead className="text-foreground">Telefone</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Data de Criação</TableHead>
                <TableHead className="text-foreground">Data de Uso</TableHead>
                <TableHead className="text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-foreground">{code.code}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{code.customerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{code.customerPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {code.used ? (
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Utilizado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="h-3 w-3 mr-1" />
                        Disponível
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(code.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {code.usedDate ? (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(code.usedDate).toLocaleDateString('pt-BR')}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!code.used && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkAsUsed(code.code, code.customerName, code.customerPhone)}
                      >
                        Registrar Carimbo
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCodes.length === 0 && (
            <div className="text-center py-10">
              <Award className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-foreground">Nenhum código encontrado</h3>
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

export default AdminLoyalty;