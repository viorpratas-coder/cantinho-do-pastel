import React, { createContext, useContext, useState, useEffect } from 'react';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'pix' | 'cash';
  name: string;
  lastFour?: string; // Últimos 4 dígitos para cartões
  expiryDate?: string; // Data de expiração para cartões
  isDefault: boolean;
  isActive: boolean;
}

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'isActive'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  getDefaultPaymentMethod: () => PaymentMethod | undefined;
  getActivePaymentMethods: () => PaymentMethod[];
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const savedMethods = localStorage.getItem('paymentMethods');
    if (savedMethods) {
      try {
        return JSON.parse(savedMethods);
      } catch (error) {
        console.error('Erro ao carregar métodos de pagamento:', error);
      }
    }
    return [];
  });

  // Salvar métodos de pagamento no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    } catch (error) {
      console.error('Erro ao salvar métodos de pagamento:', error);
    }
  }, [paymentMethods]);

  // Adicionar método de pagamento
  const addPaymentMethod = (method: Omit<PaymentMethod, 'id' | 'isActive'>) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm_${Date.now()}`,
      isActive: true
    };
    
    setPaymentMethods(prev => {
      // Se for definido como padrão, remover o padrão dos outros métodos
      if (newMethod.isDefault) {
        return [...prev.map(pm => ({ ...pm, isDefault: false })), newMethod];
      }
      return [...prev, newMethod];
    });
  };

  // Remover método de pagamento
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  // Definir método de pagamento padrão
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  // Obter método de pagamento padrão
  const getDefaultPaymentMethod = () => {
    return paymentMethods.find(method => method.isDefault && method.isActive);
  };

  // Obter métodos de pagamento ativos
  const getActivePaymentMethods = () => {
    return paymentMethods.filter(method => method.isActive);
  };

  // Atualizar método de pagamento
  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethod>) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, ...updates } 
          : method
      )
    );
  };

  return (
    <PaymentContext.Provider value={{
      paymentMethods,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
      getDefaultPaymentMethod,
      getActivePaymentMethods,
      updatePaymentMethod
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};