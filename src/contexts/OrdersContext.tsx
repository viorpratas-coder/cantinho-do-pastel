import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';

interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  observations?: string;
  additionalFillings?: string[];
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  estimatedTime: number; // em minutos
  totalPrice: number;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByCustomer: (customerPhone: string) => Order[];
  getActiveOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  isCustomerRegistered: (phone: string) => boolean; // Nova função para verificar registro
  requireRegistration: boolean; // Nova propriedade para controlar se o cadastro é obrigatório
  setRequireRegistration: (require: boolean) => void; // Nova função para controlar o cadastro obrigatório
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        return parsed.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt)
        }));
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        return [];
      }
    }
    return [];
  });

  // Estado para controlar se o cadastro é obrigatório
  const [requireRegistration, setRequireRegistration] = useState<boolean>(() => {
    const savedSetting = localStorage.getItem('requireCustomerRegistration');
    return savedSetting ? JSON.parse(savedSetting) : false;
  });

  // Hook para verificar se o cliente está registrado
  let fidelityContext;
  try {
    fidelityContext = useFidelityCode();
  } catch (error) {
    console.warn('FidelityCodeContext não disponível:', error);
    fidelityContext = null;
  }
  
  const getAllCustomers = fidelityContext?.getAllCustomers || (() => []);
  const addPointsFromPurchase = fidelityContext?.addPointsFromPurchase || (() => {});

  // Salvar pedidos no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  }, [orders]);

  // Salvar configuração de cadastro obrigatório no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('requireCustomerRegistration', JSON.stringify(requireRegistration));
    } catch (error) {
      console.error('Erro ao salvar configuração de cadastro:', error);
    }
  }, [requireRegistration]);

  // Função para verificar se o cliente está registrado
  const isCustomerRegistered = (phone: string): boolean => {
    const customers = getAllCustomers();
    return customers.some(customer => customer.customerPhone === phone);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Verificar se o cadastro é obrigatório e o cliente não está registrado
    if (requireRegistration && !isCustomerRegistered(orderData.customerPhone)) {
      throw new Error('Cliente precisa estar cadastrado para fazer pedidos');
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setOrders(prev => [...prev, newOrder]);
    
    // Adicionar pontos ao cliente com base no valor da compra
    addPointsFromPurchase(orderData.customerPhone, orderData.totalPrice);
    
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() } 
          : order
      )
    );
  };

  const getOrdersByCustomer = (customerPhone: string) => {
    return orders.filter(order => order.customerPhone === customerPhone);
  };

  const getActiveOrders = () => {
    return orders.filter(order => 
      order.status === 'pending' || 
      order.status === 'preparing' || 
      order.status === 'ready'
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      getOrdersByCustomer,
      getActiveOrders,
      getOrderById,
      isCustomerRegistered, // Nova função
      requireRegistration, // Nova propriedade
      setRequireRegistration // Nova função
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};