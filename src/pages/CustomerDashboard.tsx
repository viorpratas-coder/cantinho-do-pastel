import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Phone,
  Star,
  Heart,
  Bell,
  Palette,
  Globe,
  ShoppingBag,
  Clock,
  MapPin,
  CreditCard,
  Shield,
  Award,
  Gift,
  Target,
  Zap,
  Share2,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';
import CustomerFidelityCard from '@/components/CustomerFidelityCard';
import WhatsAppProfile from '@/components/WhatsAppProfile';

const CustomerDashboard = () => {
  const { currentCustomer, setCurrentCustomer, getStampCount, setCustomerProfileImage, getCustomerProfileImage, claimReward, addPoints } = useFidelityCode();
  const { preferences, updatePreferences } = usePreferences();
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentCustomer?.customerName || '');
  const [editedPhone, setEditedPhone] = useState(currentCustomer?.customerPhone || '');
  
  // Estados para preferências
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(preferences.dietaryRestrictions);
  const [preferredCategories, setPreferredCategories] = useState<string[]>(preferences.preferredCategories);
  const [notificationPrefs, setNotificationPrefs] = useState(preferences.notificationPreferences);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(preferences.theme);
  const [language, setLanguage] = useState(preferences.language);

  // Atualizar estados quando o cliente mudar
  React.useEffect(() => {
    if (currentCustomer) {
      setEditedName(currentCustomer.customerName);
      setEditedPhone(currentCustomer.customerPhone);
    }
  }, [currentCustomer]);

  // Função para salvar alterações
  const handleSave = () => {
    if (currentCustomer) {
      // Atualizar dados do cliente
      setCurrentCustomer({
        ...currentCustomer,
        customerName: editedName,
        customerPhone: editedPhone
      });
      
      // Atualizar preferências
      updatePreferences({
        dietaryRestrictions,
        preferredCategories,
        notificationPreferences: notificationPrefs,
        theme,
        language
      });
      
      toast.success('Perfil atualizado!', {
        description: 'Suas informações foram salvas com sucesso.'
      });
      
      setIsEditing(false);
    }
  };

  // Função para cancelar edição
  const handleCancel = () => {
    // Reverter para os valores originais
    if (currentCustomer) {
      setEditedName(currentCustomer.customerName);
      setEditedPhone(currentCustomer.customerPhone);
      setDietaryRestrictions(preferences.dietaryRestrictions);
      setPreferredCategories(preferences.preferredCategories);
      setNotificationPrefs(preferences.notificationPreferences);
      setTheme(preferences.theme);
      setLanguage(preferences.language);
    }
    
    setIsEditing(false);
  };

  // Função para alternar restrição alimentar
  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction) 
        : [...prev, restriction]
    );
  };

  // Função para alternar categoria preferida
  const togglePreferredCategory = (category: string) => {
    setPreferredCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Função para alternar preferência de notificação
  const toggleNotificationPref = (pref: keyof typeof notificationPrefs) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
  };

  // Função para formatar a data
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Função para lidar com o upload de imagem
  const handleImageUpload = (imageData: string) => {
    if (currentCustomer) {
      setCustomerProfileImage(currentCustomer.customerPhone, imageData);
      toast.success('Foto de perfil atualizada!', {
        description: 'Sua foto de perfil foi salva com sucesso.'
      });
    }
  };

  // Função para obter o nome do nível
  const getLevelName = (level: number): string => {
    switch (level) {
      case 1: return 'Iniciante';
      case 2: return 'Bronze';
      case 3: return 'Prata';
      case 4: return 'Ouro';
      case 5: return 'Diamante';
      default: return 'Iniciante';
    }
  };

  // Função para obter pontos necessários para o próximo nível
  const getPointsToNextLevel = (points: number): number => {
    if (points >= 1000) return 0; // Máximo nível
    if (points >= 500) return 1000 - points; // Para Diamante
    if (points >= 250) return 500 - points;   // Para Ouro
    if (points >= 100) return 250 - points;   // Para Prata
    return 100 - points;                      // Para Bronze
  };

  // Função para obter progresso para o próximo nível (em porcentagem)
  const getProgressToNextLevel = (points: number): number => {
    if (points >= 1000) return 100; // Máximo nível
    if (points >= 500) return ((points - 500) / 500) * 100; // Para Diamante
    if (points >= 250) return ((points - 250) / 250) * 100; // Para Ouro
    if (points >= 100) return ((points - 100) / 150) * 100; // Para Prata
    return (points / 100) * 100; // Para Bronze
  };

  // Função para resgatar recompensa
  const handleClaimReward = () => {
    if (currentCustomer) {
      const success = claimReward(currentCustomer.customerPhone);
      
      if (success) {
        toast.success('Recompensa resgatada!', {
          description: 'Você ganhou uma recompensa especial. Entre em contato com a pastelaria para resgatar.'
        });
      } else {
        toast.error('Pontos insuficientes', {
          description: 'Você precisa de 100 pontos para resgatar uma recompensa.'
        });
      }
    }
  };

  // Filtrar pedidos do cliente atual
  const customerOrders = currentCustomer 
    ? orders.filter(order => order.customerPhone === currentCustomer.customerPhone)
    : [];

  // Status descriptions
  const statusDescriptions = {
    pending: 'Esperando pagamento',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  // Status colors
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    delivered: 'bg-purple-500',
    cancelled: 'bg-red-500'
  };

  // Função para compartilhar no WhatsApp
  const shareOnWhatsApp = () => {
    if (currentCustomer) {
      const stampCount = getStampCount(currentCustomer.customerName, currentCustomer.customerPhone);
      const message = `Olha quantos pontos já tenho na Pastelaria 🍴🔥\n\n${stampCount} carimbos conquistados!`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Opções de restrições alimentares
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano' },
    { id: 'vegan', label: 'Vegano' },
    { id: 'gluten-free', label: 'Sem glúten' },
    { id: 'lactose-free', label: 'Sem lactose' },
    { id: 'low-carb', label: 'Baixo carboidrato' }
  ];

  // Categorias de produtos
  const productCategories = [
    'Pastéis Tradicionais',
    'Combos',
    'Bebidas',
    'Sobremesas',
    'Aperitivos'
  ];

  if (!currentCustomer) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Você não está logado</h3>
            <p className="text-muted-foreground mb-4">
              Faça login para acessar seu perfil e personalizar sua experiência.
            </p>
            <Button onClick={() => navigate('/fidelidade/cliente')}>
              Entrar na minha conta
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-foreground/70">
          Gerencie suas informações, pedidos e programa de fidelidade
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Perfil */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </span>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      Salvar
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                    <Input
                      id="phone"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-muted rounded-lg">
                    <WhatsAppProfile 
                      phoneNumber={currentCustomer.customerPhone} 
                      customerName={currentCustomer.customerName} 
                      onImageUpload={handleImageUpload}
                      uploadedImage={currentCustomer.profileImage || getCustomerProfileImage(currentCustomer.customerPhone) || undefined}

                    />
                    <div className="ml-4">
                      <p className="font-medium text-lg">{currentCustomer.customerName}</p>
                      <p className="text-muted-foreground">{currentCustomer.customerPhone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cliente desde</p>
                      <p className="font-medium">
                        {currentCustomer.stamps.length > 0 
                          ? formatDate(currentCustomer.stamps[0]?.createdAt) 
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Última atividade</p>
                      <p className="font-medium">
                        {currentCustomer.lastActivityDate 
                          ? formatDate(currentCustomer.lastActivityDate) 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferências de Comunicação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Preferências de Comunicação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Atualizações de pedidos</p>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre status dos seus pedidos
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPrefs.orderUpdates}
                    onCheckedChange={() => toggleNotificationPref('orderUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Promoções e ofertas</p>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações sobre promoções especiais
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPrefs.promotions}
                    onCheckedChange={() => toggleNotificationPref('promotions')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Programa de fidelidade</p>
                      <p className="text-sm text-muted-foreground">
                        Atualizações sobre seus carimbos e recompensas
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPrefs.loyalty}
                    onCheckedChange={() => toggleNotificationPref('loyalty')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Preferências de Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Restrições Alimentares</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {dietaryOptions.map(option => (
                      <Button
                        key={option.id}
                        variant={dietaryRestrictions.includes(option.id) ? "default" : "outline"}
                        onClick={() => toggleDietaryRestriction(option.id)}
                        className="h-10 text-sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Categorias Preferidas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {productCategories.map(category => (
                      <Button
                        key={category}
                        variant={preferredCategories.includes(category) ? "default" : "outline"}
                        onClick={() => togglePreferredCategory(category)}
                        className="h-10 text-sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Preferências de Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automático</SelectItem>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (United States)</SelectItem>
                      <SelectItem value="es-ES">Español (España)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6">
          {/* Cartão de Fidelidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Meu Cartão Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerFidelityCard 
                customerName={currentCustomer.customerName} 
                customerPhone={currentCustomer.customerPhone} 
              />
              
              {/* Gamificação */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-primary/5 p-2 rounded-lg border border-primary/20 text-center">
                    <div className="text-lg font-bold text-primary">{currentCustomer.level}</div>
                    <div className="text-xs text-muted-foreground">Nível</div>
                  </div>
                  
                  <div className="bg-secondary p-2 rounded-lg text-center">
                    <div className="text-lg font-bold">{currentCustomer.points}</div>
                    <div className="text-xs text-muted-foreground">Pontos</div>
                  </div>
                  
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 text-center">
                    <div className="text-lg font-bold text-green-600">{currentCustomer.rewardsClaimed}</div>
                    <div className="text-xs text-muted-foreground">Recompensas</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Próximo nível: {getLevelName(currentCustomer.level + 1)}</span>
                    <span className="text-sm font-medium">
                      {getPointsToNextLevel(currentCustomer.points)} pts
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${getProgressToNextLevel(currentCustomer.points)}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleClaimReward}
                  disabled={currentCustomer.points < 100}
                  className="w-full"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Resgatar Recompensa (100 pts)
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={shareOnWhatsApp}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Pedidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Meus Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customerOrders.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">Pedido #{order.id.substring(0, 6)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-500'} text-white`}>
                          {statusDescriptions[order.status] || order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(new Date(order.createdAt))}</span>
                        <span className="font-medium">
                          {order.totalPrice.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => navigate('/cliente/pedidos')}
                  >
                    Ver todos os pedidos
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum pedido ainda
                </p>
              )}
            </CardContent>
          </Card>

          {/* Termos e Condições */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Termos e Condições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Leia os termos do nosso programa de fidelidade
              </p>
              <Button variant="outline" className="w-full">
                Ver Termos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;