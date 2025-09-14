import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  observations?: string;
  beverages?: string[];
  additionalFillings?: string[];
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: any) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  updateObservations: (itemId: number, observations: string) => void;
  addAdditionalFilling: (itemId: number, filling: string) => void;
  removeAdditionalFilling: (itemId: number, fillingIndex: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([
        ...cartItems,
        {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          additionalFillings: []
        }
      ]);
    }
    
    // Abrir o carrinho automaticamente ao adicionar um item
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const updateObservations = (itemId: number, observations: string) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, observations } : item
    ));
  };

  const addAdditionalFilling = (itemId: number, filling: string) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const additionalFillings = item.additionalFillings || [];
        return { 
          ...item, 
          additionalFillings: [...additionalFillings, filling] 
        };
      }
      return item;
    }));
  };

  const removeAdditionalFilling = (itemId: number, fillingIndex: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const additionalFillings = [...(item.additionalFillings || [])];
        additionalFillings.splice(fillingIndex, 1);
        return { ...item, additionalFillings };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Calcular preço base dos itens
      let itemTotal = item.price * item.quantity;
      
      // Adicionar preço dos complementos pré-definidos
      if (item.additionalFillings && item.additionalFillings.length > 0) {
        const predefinedFillings = [
          { name: 'Queijo', price: 2.00 },
          { name: 'Bacon', price: 2.00 },
          { name: 'Catupiry', price: 2.00 },
          { name: 'Presunto', price: 2.00 }
        ];
        
        item.additionalFillings.forEach(filling => {
          const predefined = predefinedFillings.find(pf => filling.startsWith(pf.name));
          if (predefined) {
            itemTotal += predefined.price;
          }
        });
      }
      
      return total + itemTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateObservations,
        addAdditionalFilling,
        removeAdditionalFilling,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        getTotalItems,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};