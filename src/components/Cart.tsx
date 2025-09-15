import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Minus, ShoppingCart, MessageCircle, Info, CreditCard, QrCode, Wallet } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { usePayment } from '@/contexts/PaymentContext';
import logoImage from '@/assets/Logo.png';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen,
    closeCart,
    removeFromCart, 
    updateQuantity, 
    updateObservations, 
    addAdditionalFilling, 
    removeAdditionalFilling,
    getTotalPrice,
    clearCart
  } = useCart();
  
  const { getDefaultPaymentMethod } = usePayment();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('whatsapp');

  // Complementos pré-definidos
  const predefinedFillings = [
    { name: 'Queijo', price: 2.00 },
    { name: 'Bacon', price: 2.00 },
    { name: 'Catupiry', price: 2.00 },
    { name: 'Presunto', price: 2.00 }
  ];

  const sendOrderToWhatsApp = () => {
    let message = 'Olá! Gostaria de fazer o seguinte pedido:%0A%0A';
    
    if (cartItems.length > 0) {
      // Adicionar resumo do pedido no topo
      message += '=== RESUMO DO PEDIDO ===%0A%0A';
      
      cartItems.forEach((item, index) => {
        message += '   Pastel%0A%0A';
        message += `   ${item.name}%0A`;
        message += `   Quantidade: ${item.quantity}%0A`;
        
        // Mostrar preço unitário apenas quando a quantidade for maior que 1
        if (item.quantity > 1) {
          message += `   Preço unitário: R$ ${item.price.toFixed(2)}%0A`;
          message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
        } else {
          message += `   Preço: R$ ${item.price.toFixed(2)}%0A`;
        }
        
        message += '%0A   Complementos:%0A';
        
        if (item.additionalFillings && item.additionalFillings.length > 0) {
          // Calcular valor total dos complementos
          let totalFillingsPrice = 0;
          const predefinedFillings = [
            { name: 'Queijo', price: 2.00 },
            { name: 'Bacon', price: 2.00 },
            { name: 'Catupiry', price: 2.00 },
            { name: 'Presunto', price: 2.00 }
          ];
          
          // Contar a quantidade de cada complemento
          const fillingCounts: { [key: string]: { count: number, price: number } } = {};
          
          item.additionalFillings.forEach(filling => {
            const predefined = predefinedFillings.find(pf => filling.startsWith(pf.name));
            if (predefined) {
              totalFillingsPrice += predefined.price;
              if (fillingCounts[predefined.name]) {
                fillingCounts[predefined.name].count += 1;
              } else {
                fillingCounts[predefined.name] = { count: 1, price: predefined.price };
              }
            }
          });
          
          // Adicionar informações dos complementos na mensagem
          Object.keys(fillingCounts).forEach(fillingName => {
            const { count, price } = fillingCounts[fillingName];
            message += `%0A   - ${fillingName}: ${count}x (R$ ${price.toFixed(2)} cada) = R$ ${(count * price).toFixed(2)}`;
          });
          
          if (totalFillingsPrice > 0) {
            message += `%0A     Total Complementos: R$ ${totalFillingsPrice.toFixed(2)}%0A`;
          }
        } else {
          message += '%0A   Nenhum complemento adicionado%0A';
        }
        
        if (item.observations) {
          message += `%0A   Observações: ${item.observations}%0A`;
        }
        
        message += '%0A';
      });
      
      message += `=== TOTAL DO PEDIDO: R$ ${getTotalPrice().toFixed(2)} ===%0A%0A`;
    
    // Adicionar informações de pagamento
    const paymentMethodText = {
      'whatsapp': 'Pagamento via WhatsApp (dinheiro ou cartão na entrega)',
      'card': 'Pagamento com cartão (será confirmado na entrega)',
      'pix': 'Pagamento via PIX (código será enviado após confirmação do pedido)'
    }[selectedPaymentMethod] || 'Pagamento a combinar';
    
    message += `Forma de pagamento preferida: ${paymentMethodText}%0A%0A`;
    } else {
      message += 'Gostaria de saber mais sobre os produtos disponíveis.%0A%0A';
    }
    
    message += 'Aguardarei confirmação do pedido. Obrigado!';
    
    // Limpar o carrinho após enviar o pedido
    clearCart();
    closeCart();
    
    window.open(`https://wa.me/5511972239005?text=${message}`, '_blank');
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay - sem preventScroll */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md transition-transform duration-300 ease-in-out transform translate-x-0">
          <div className="h-full flex flex-col bg-background border-l border-border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center">
                <img 
                  src={logoImage} 
                  alt="Cantinho do Pastel" 
                  className="h-8 w-auto object-contain mr-2"
                />
                <h2 className="text-xl font-bold">Seu Carrinho</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={closeCart}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="space-y-6">
                  <div className="text-center py-8 animate-fade-in">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={logoImage} 
                        alt="Cantinho do Pastel" 
                        className="h-24 w-auto object-contain animate-bounce-gentle"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Carrinho Vazio</h3>
                    <p className="text-foreground/70 mb-4">Adicione itens deliciosos ao seu carrinho!</p>
                    <p className="text-foreground/50 text-sm">Mas você ainda pode nos enviar uma mensagem</p>
                  </div>
                  
                  {/* Informações sobre opções de personalização */}
                  <Card className="overflow-hidden animate-slide-up">
                    <div className="p-4 bg-muted/50">
                      <h4 className="font-semibold flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        O que você pode personalizar:
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Bebidas</h5>
                        <p className="text-sm text-foreground/70">
                          Temos várias bebidas disponíveis! Consulte a pastelaria para saber quais estão disponíveis no momento.
                        </p>
                      </div>
                    
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Complementos</h5>
                        <p className="text-sm text-foreground/70">
                          Quer mais recheio no seu pastel? Adicione extras!
                        </p>
                      </div>
                    
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Observações</h5>
                        <p className="text-sm text-foreground/70">
                          Tem alguma preferência especial? Ex: "Sem cebola", "Mais molho", "Borda recheada", etc.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden animate-slide-up">
                      <div className="p-4">
                        {/* Product Header */}
                        <div className="flex items-start space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-accent font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Quantity */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm">Quantidade:</span>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Predefined Fillings Selection */}
                        <div className="mt-3">
                          <label className="text-sm font-medium">Complementos (R$ 2,00 cada):</label>
                          <div className="mt-1 space-y-2">
                            {predefinedFillings.map((filling, index) => {
                              // Contar quantas vezes este complemento foi adicionado
                              const count = item.additionalFillings?.filter(f => f.startsWith(filling.name)).length || 0;
                              return (
                                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                  <div className="flex flex-col">
                                    <span className="text-sm">{filling.name}</span>
                                    {count > 0 && (
                                      <span className="text-xs text-muted-foreground">R$ {(count * filling.price).toFixed(2)}</span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {count > 0 && (
                                      <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          // Remover o complemento
                                          const fillingIndex = item.additionalFillings?.findIndex(f => f.startsWith(filling.name)) ?? -1;
                                          if (fillingIndex >= 0) {
                                            removeAdditionalFilling(item.id, fillingIndex);
                                          }
                                        }}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                    )}
                                    <span className="w-6 text-center text-sm">{count}</span>
                                    <Button 
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        // Adicionar o complemento
                                        addAdditionalFilling(item.id, `${filling.name} (R$ ${filling.price.toFixed(2)})`);
                                      }}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Observations */}
                        <div className="mt-3">
                          <label className="text-sm font-medium">Observações:</label>
                          <Textarea 
                            placeholder="Ex: Tirar cebola, adicionar mais queijo..."
                            value={item.observations || ''}
                            onChange={(e) => updateObservations(item.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        {/* Beverage Information */}
                        <div className="mt-3 p-3 bg-muted/50 rounded">
                          <h5 className="font-medium text-foreground mb-1 flex items-center">
                            <Info className="w-4 h-4 mr-2" />
                            Bebidas
                          </h5>
                          <p className="text-sm text-foreground/70">
                            Temos várias bebidas disponíveis! Consulte a pastelaria para saber quais estão disponíveis no momento.
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border p-4">
              {cartItems.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-accent">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  {/* Opções de pagamento */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Forma de Pagamento</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={selectedPaymentMethod === 'whatsapp' ? 'default' : 'outline'}
                        onClick={() => setSelectedPaymentMethod('whatsapp')}
                        className="flex flex-col h-auto p-2"
                      >
                        <MessageCircle className="w-5 h-5 mb-1" />
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button 
                        variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                        onClick={() => setSelectedPaymentMethod('card')}
                        className="flex flex-col h-auto p-2"
                      >
                        <CreditCard className="w-5 h-5 mb-1" />
                        <span className="text-xs">Cartão</span>
                      </Button>
                      <Button 
                        variant={selectedPaymentMethod === 'pix' ? 'default' : 'outline'}
                        onClick={() => setSelectedPaymentMethod('pix')}
                        className="flex flex-col h-auto p-2"
                      >
                        <QrCode className="w-5 h-5 mb-1" />
                        <span className="text-xs">PIX</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <Button 
                onClick={sendOrderToWhatsApp}
                className="w-full primary-gradient text-white hover:scale-105 smooth-transition font-semibold py-3 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {cartItems.length > 0 ? 'Finalizar Pedido via WhatsApp' : 'Enviar Mensagem via WhatsApp'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;