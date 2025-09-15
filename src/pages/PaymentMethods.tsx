import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '@/contexts/PaymentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Check, 
  QrCode,
  Wallet,
  ChevronLeft
} from 'lucide-react';
import { toast } from 'sonner';

const PaymentMethods = () => {
  const { 
    paymentMethods, 
    addPaymentMethod, 
    removePaymentMethod, 
    setDefaultPaymentMethod, 
    getDefaultPaymentMethod 
  } = usePayment();
  const navigate = useNavigate();
  
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'credit' as 'credit' | 'debit' | 'pix' | 'cash',
    name: '',
    lastFour: '',
    expiryDate: ''
  });

  // Função para adicionar novo método de pagamento
  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMethod.name) {
      toast.error('Nome do método é obrigatório');
      return;
    }
    
    // Validar campos específicos para cartões
    if ((newMethod.type === 'credit' || newMethod.type === 'debit') && 
        (!newMethod.lastFour || !newMethod.expiryDate)) {
      toast.error('Preencha todos os campos do cartão');
      return;
    }
    
    // Validar formato da data de expiração (MM/YY)
    if ((newMethod.type === 'credit' || newMethod.type === 'debit') && 
        !/^\d{2}\/\d{2}$/.test(newMethod.expiryDate)) {
      toast.error('Formato de data inválido. Use MM/YY');
      return;
    }
    
    // Validar últimos 4 dígitos
    if ((newMethod.type === 'credit' || newMethod.type === 'debit') && 
        !/^\d{4}$/.test(newMethod.lastFour)) {
      toast.error('Últimos 4 dígitos devem conter apenas números');
      return;
    }
    
    addPaymentMethod({
      ...newMethod,
      isDefault: paymentMethods.length === 0 // Primeiro método é padrão
    });
    
    // Resetar formulário
    setNewMethod({
      type: 'credit',
      name: '',
      lastFour: '',
      expiryDate: ''
    });
    
    setIsAddingMethod(false);
    
    toast.success('Método de pagamento adicionado com sucesso!');
  };

  // Função para obter ícone do método de pagamento
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'credit':
      case 'debit':
        return <CreditCard className="w-5 h-5" />;
      case 'pix':
        return <QrCode className="w-5 h-5" />;
      case 'cash':
        return <Wallet className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  // Função para obter nome do tipo de pagamento
  const getPaymentTypeName = (type: string) => {
    switch (type) {
      case 'credit': return 'Cartão de Crédito';
      case 'debit': return 'Cartão de Débito';
      case 'pix': return 'PIX';
      case 'cash': return 'Dinheiro';
      default: return 'Cartão';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Métodos de Pagamento</h1>
            <p className="text-foreground/70">
              Gerencie suas formas de pagamento preferidas
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/perfil')}
            className="mt-4 md:mt-0"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar para o perfil
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de métodos de pagamento */}
          <div className="lg:col-span-2 space-y-4">
            {paymentMethods.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum método de pagamento</h3>
                  <p className="text-muted-foreground mb-4">
                    Adicione um método de pagamento para agilizar suas compras.
                  </p>
                  <Button onClick={() => setIsAddingMethod(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar método
                  </Button>
                </CardContent>
              </Card>
            ) : (
              paymentMethods.map(method => {
                const isDefault = method.isDefault;
                const Icon = getPaymentIcon(method.type);
                
                return (
                  <Card key={method.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-lg mr-4">
                            {Icon}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{method.name}</h3>
                              {isDefault && (
                                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                                  <Check className="w-3 h-3 mr-1" />
                                  Padrão
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {getPaymentTypeName(method.type)}
                              {(method.type === 'credit' || method.type === 'debit') && (
                                <span> •••• {method.lastFour}</span>
                              )}
                            </p>
                            {(method.type === 'credit' || method.type === 'debit') && (
                              <p className="text-xs text-muted-foreground">
                                Válido até {method.expiryDate}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {!isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setDefaultPaymentMethod(method.id)}
                            >
                              Tornar padrão
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removePaymentMethod(method.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Formulário para adicionar método */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {isAddingMethod ? (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Adicionar Método
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Opções
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAddingMethod ? (
                  <form onSubmit={handleAddMethod} className="space-y-4">
                    <div>
                      <Label htmlFor="type">Tipo de Pagamento</Label>
                      <Select 
                        value={newMethod.type} 
                        onValueChange={(value: any) => setNewMethod({...newMethod, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">Cartão de Crédito</SelectItem>
                          <SelectItem value="debit">Cartão de Débito</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="cash">Dinheiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Nome do Método *</Label>
                      <Input
                        id="name"
                        value={newMethod.name}
                        onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                        placeholder="Ex: Cartão Nubank"
                      />
                    </div>
                    
                    {(newMethod.type === 'credit' || newMethod.type === 'debit') && (
                      <>
                        <div>
                          <Label htmlFor="lastFour">Últimos 4 dígitos</Label>
                          <Input
                            id="lastFour"
                            value={newMethod.lastFour}
                            onChange={(e) => setNewMethod({...newMethod, lastFour: e.target.value})}
                            placeholder="1234"
                            maxLength={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="expiryDate">Data de Expiração</Label>
                          <Input
                            id="expiryDate"
                            value={newMethod.expiryDate}
                            onChange={(e) => setNewMethod({...newMethod, expiryDate: e.target.value})}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddingMethod(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="flex-1">
                        Adicionar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => setIsAddingMethod(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Novo Método
                    </Button>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">Dica de Segurança</h3>
                      <p className="text-sm text-muted-foreground">
                        Armazenamos apenas informações básicas dos seus métodos de pagamento. 
                        Números completos de cartões nunca são salvos.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Informações sobre métodos de pagamento */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="w-5 h-5 mr-2" />
                  Métodos Aceitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-muted rounded-lg">
                    <CreditCard className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cartões</p>
                      <p className="text-sm text-muted-foreground">Crédito e débito</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted rounded-lg">
                    <QrCode className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">PIX</p>
                      <p className="text-sm text-muted-foreground">Transferência instantânea</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted rounded-lg">
                    <Wallet className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Dinheiro</p>
                      <p className="text-sm text-muted-foreground">Pagamento na entrega</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;