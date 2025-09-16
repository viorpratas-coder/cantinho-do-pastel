import React, { createContext, useState, useContext, useEffect } from 'react';
import { FidelityService } from '@/services/fidelityService';
import { FidelityCode, CustomerFidelityData } from '@/lib/types';

interface SupabaseFidelityContextType {
  // Admin functions
  generateCode: (customerName: string, customerPhone: string) => Promise<string>;
  getAllCodes: () => Promise<FidelityCode[]>;
  markCodeAsUsed: (code: string, customerName: string, customerPhone: string) => Promise<boolean>;
  getUsedCodes: () => Promise<FidelityCode[]>;
  getUnusedCodes: () => Promise<FidelityCode[]>;
  getAllCustomers: () => Promise<CustomerFidelityData[]>;
  
  // Customer functions
  authenticateCustomer: (name: string, phone: string) => Promise<boolean>;
  getCustomerStamps: (name: string, phone: string) => Promise<FidelityCode[]>;
  canClaimReward: (name: string, phone: string) => Promise<boolean>;
  getStampCount: (name: string, phone: string) => Promise<number>;
  resetStamps: (name: string, phone: string) => Promise<void>;
  addPoints: (phone: string, points: number) => Promise<void>;
  addPointsFromPurchase: (phone: string, amount: number) => Promise<void>;
  claimReward: (phone: string) => Promise<boolean>;
  getCustomerLevel: (points: number) => number;
  
  // Profile image functions
  setCustomerProfileImage: (phone: string, imageData: string) => Promise<void>;
  getCustomerProfileImage: (phone: string) => Promise<string | null>;
  
  // Current customer state
  currentCustomer: CustomerFidelityData | null;
  setCurrentCustomer: (customer: CustomerFidelityData | null) => void;
  
  // Customer registration
  registerCustomer: (name: string, phone: string) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

const SupabaseFidelityContext = createContext<SupabaseFidelityContextType | undefined>(undefined);

export const SupabaseFidelityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = useState<CustomerFidelityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Admin functions
  const generateCode = async (customerName: string, customerPhone: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.generateCode(customerName, customerPhone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao gerar código');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCodes = async (): Promise<FidelityCode[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getAllCodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar códigos');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const markCodeAsUsed = async (code: string, customerName: string, customerPhone: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.markCodeAsUsed(code, customerName, customerPhone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao marcar código como usado');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUsedCodes = async (): Promise<FidelityCode[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getUsedCodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar códigos usados');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getUnusedCodes = async (): Promise<FidelityCode[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getUnusedCodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar códigos não usados');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Customer functions
  const registerCustomer = async (name: string, phone: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.registerCustomer(name, phone);
      setCurrentCustomer(customer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao registrar cliente');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addPoints = async (phone: string, points: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.addPoints(phone, points);
      
      // Atualizar cliente atual se for o mesmo
      if (currentCustomer && currentCustomer.customer_phone === phone) {
        setCurrentCustomer(customer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao adicionar pontos');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addPointsFromPurchase = async (phone: string, amount: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.addPointsFromPurchase(phone, amount);
      
      // Atualizar cliente atual se for o mesmo
      if (currentCustomer && currentCustomer.customer_phone === phone) {
        setCurrentCustomer(customer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao adicionar pontos da compra');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const claimReward = async (phone: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.claimReward(phone);
      
      if (customer) {
        // Atualizar cliente atual se for o mesmo
        if (currentCustomer && currentCustomer.customer_phone === phone) {
          setCurrentCustomer(customer);
        }
        return true;
      }
      
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao resgatar recompensa');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerLevel = (points: number): number => {
    return FidelityService.getCustomerLevel(points);
  };

  const authenticateCustomer = async (name: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.authenticateCustomer(name, phone);
      
      if (customer) {
        setCurrentCustomer(customer);
        return true;
      }
      
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao autenticar cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerStamps = async (name: string, phone: string): Promise<FidelityCode[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getCustomerStamps(name, phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar carimbos do cliente');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const canClaimReward = async (name: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.canClaimReward(name, phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao verificar recompensa');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getStampCount = async (name: string, phone: string): Promise<number> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getStampCount(name, phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar contagem de carimbos');
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  const resetStamps = async (name: string, phone: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await FidelityService.resetStamps(name, phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao resetar carimbos');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Profile image functions
  const setCustomerProfileImage = async (phone: string, imageData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const customer = await FidelityService.setCustomerProfileImage(phone, imageData);
      
      // Atualizar cliente atual se for o mesmo
      if (currentCustomer && currentCustomer.customer_phone === phone) {
        setCurrentCustomer(customer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao definir imagem do cliente');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerProfileImage = async (phone: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getCustomerProfileImage(phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar imagem do cliente');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para obter todos os clientes cadastrados
  const getAllCustomers = async (): Promise<CustomerFidelityData[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await FidelityService.getAllCustomers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar clientes');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SupabaseFidelityContext.Provider value={{
      // Admin functions
      generateCode,
      getAllCodes,
      markCodeAsUsed,
      getUsedCodes,
      getUnusedCodes,
      getAllCustomers,
      
      // Customer functions
      authenticateCustomer,
      getCustomerStamps,
      canClaimReward,
      getStampCount,
      resetStamps,
      registerCustomer,
      addPoints,
      addPointsFromPurchase,
      claimReward,
      getCustomerLevel,
      
      // Profile image functions
      setCustomerProfileImage,
      getCustomerProfileImage,
      
      // Current customer state
      currentCustomer,
      setCurrentCustomer,
      
      // Loading states
      isLoading,
      error
    }}>
      {children}
    </SupabaseFidelityContext.Provider>
  );
};

export const useSupabaseFidelity = () => {
  const context = useContext(SupabaseFidelityContext);
  if (context === undefined) {
    throw new Error('useSupabaseFidelity must be used within a SupabaseFidelityProvider');
  }
  return context;
};