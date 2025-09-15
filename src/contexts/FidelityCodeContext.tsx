import React, { createContext, useState, useContext, useEffect } from 'react';

interface FidelityCode {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  used: boolean;
  usedDate?: Date;
  createdAt: Date;
}

interface CustomerFidelityData {
  customerName: string;
  customerPhone: string;
  stamps: FidelityCode[];
  lastRewardDate?: Date;
  profileImage?: string; // Adicionando suporte para foto de perfil
  level: number; // Nível do cliente no programa de fidelidade
  points: number; // Pontos acumulados
  totalSpent: number; // Valor total gasto
  rewardsClaimed: number; // Recompensas resgatadas
  lastActivityDate?: Date; // Data da última atividade
}

interface FidelityCodeContextType {
  // Admin functions
  generateCode: (customerName: string, customerPhone: string) => string;
  getAllCodes: () => FidelityCode[];
  markCodeAsUsed: (code: string, customerName: string, customerPhone: string) => boolean;
  getUsedCodes: () => FidelityCode[];
  getUnusedCodes: () => FidelityCode[];
  getAllCustomers: () => CustomerFidelityData[]; // Adicionando a nova função
  
  // Customer functions
  authenticateCustomer: (name: string, phone: string) => boolean;
  getCustomerStamps: (name: string, phone: string) => FidelityCode[];
  canClaimReward: (name: string, phone: string) => boolean;
  getStampCount: (name: string, phone: string) => number;
  resetStamps: (name: string, phone: string) => void;
  addPoints: (phone: string, points: number) => void; // Adicionar pontos
  claimReward: (phone: string) => boolean; // Resgatar recompensa
  getCustomerLevel: (points: number) => number; // Obter nível do cliente
  
  // Profile image functions
  setCustomerProfileImage: (phone: string, imageData: string) => void;
  getCustomerProfileImage: (phone: string) => string | null;
  
  // Current customer state
  currentCustomer: CustomerFidelityData | null;
  setCurrentCustomer: (customer: CustomerFidelityData | null) => void;
  
  // Customer registration
  registerCustomer: (name: string, phone: string) => void;
}

const FidelityCodeContext = createContext<FidelityCodeContextType | undefined>(undefined);

export const FidelityCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [codes, setCodes] = useState<FidelityCode[]>(() => {
    const savedCodes = localStorage.getItem('fidelityCodes');
    if (savedCodes) {
      try {
        const parsed = JSON.parse(savedCodes);
        return parsed.map((code: any) => ({
          ...code,
          createdAt: new Date(code.createdAt),
          usedDate: code.usedDate ? new Date(code.usedDate) : undefined
        }));
      } catch (error) {
        console.error('Erro ao parsear códigos de fidelidade:', error);
        return [];
      }
    }
    return [];
  });

  const [currentCustomer, setCurrentCustomer] = useState<CustomerFidelityData | null>(() => {
    const savedCustomer = localStorage.getItem('currentFidelityCustomer');
    if (savedCustomer) {
      try {
        const parsed = JSON.parse(savedCustomer);
        return {
          ...parsed,
          stamps: parsed.stamps.map((stamp: any) => ({
            ...stamp,
            createdAt: new Date(stamp.createdAt),
            usedDate: stamp.usedDate ? new Date(stamp.usedDate) : undefined
          })),
          lastRewardDate: parsed.lastRewardDate ? new Date(parsed.lastRewardDate) : undefined
        };
      } catch (error) {
        console.error('Erro ao parsear cliente atual:', error);
        return null;
      }
    }
    return null;
  });

  // Salvar dados no localStorage sempre que mudarem
  useEffect(() => {
    try {
      localStorage.setItem('fidelityCodes', JSON.stringify(codes));
    } catch (error) {
      console.error('Erro ao salvar códigos de fidelidade:', error);
    }
  }, [codes]);

  useEffect(() => {
    try {
      if (currentCustomer) {
        localStorage.setItem('currentFidelityCustomer', JSON.stringify(currentCustomer));
      } else {
        localStorage.removeItem('currentFidelityCustomer');
      }
    } catch (error) {
      console.error('Erro ao salvar cliente atual:', error);
    }
  }, [currentCustomer]);

  // Admin functions
  const generateCode = (customerName: string, customerPhone: string): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'FID-';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const newCode: FidelityCode = {
      id: `code-${Date.now()}`,
      code,
      customerName,
      customerPhone,
      used: false,
      createdAt: new Date()
    };

    setCodes(prev => [...prev, newCode]);
    return code;
  };

  const getAllCodes = (): FidelityCode[] => {
    return [...codes];
  };

  const markCodeAsUsed = (code: string, customerName: string, customerPhone: string): boolean => {
    const codeIndex = codes.findIndex(c => c.code === code && !c.used);
    
    if (codeIndex === -1) {
      return false; // Código não encontrado ou já utilizado
    }

    const updatedCodes = [...codes];
    updatedCodes[codeIndex] = {
      ...updatedCodes[codeIndex],
      used: true,
      usedDate: new Date()
    };

    setCodes(updatedCodes);
    return true;
  };

  const getUsedCodes = (): FidelityCode[] => {
    return codes.filter(code => code.used);
  };

  const getUnusedCodes = (): FidelityCode[] => {
    return codes.filter(code => !code.used);
  };

  // Customer functions
  const registerCustomer = (name: string, phone: string) => {
    const customerData: CustomerFidelityData = {
      customerName: name,
      customerPhone: phone,
      stamps: [],
      lastRewardDate: undefined,
      profileImage: undefined,
      level: 1,
      points: 0,
      totalSpent: 0,
      rewardsClaimed: 0
    };
    
    setCurrentCustomer(customerData);
  };

  // Função para adicionar pontos ao cliente
  const addPoints = (phone: string, points: number) => {
    // Atualizar o cliente atual se for o mesmo
    if (currentCustomer && currentCustomer.customerPhone === phone) {
      const newPoints = currentCustomer.points + points;
      const newLevel = getCustomerLevel(newPoints);
      
      setCurrentCustomer({
        ...currentCustomer,
        points: newPoints,
        level: newLevel,
        lastActivityDate: new Date()
      });
    }
    
    // Salvar no localStorage
    try {
      const savedCustomers = localStorage.getItem('fidelityCustomers');
      let customers: CustomerFidelityData[] = [];
      
      if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
      }
      
      // Encontrar o cliente existente ou criar um novo
      const customerIndex = customers.findIndex(c => c.customerPhone === phone);
      
      if (customerIndex !== -1) {
        // Atualizar cliente existente
        const newPoints = customers[customerIndex].points + points;
        const newLevel = getCustomerLevel(newPoints);
        
        customers[customerIndex] = {
          ...customers[customerIndex],
          points: newPoints,
          level: newLevel,
          lastActivityDate: new Date()
        };
      } else {
        // Criar novo cliente (isso não deve acontecer normalmente)
        customers.push({
          customerName: 'Unknown',
          customerPhone: phone,
          stamps: [],
          profileImage: undefined,
          level: 1,
          points: points,
          totalSpent: 0,
          rewardsClaimed: 0,
          lastActivityDate: new Date()
        });
      }
      
      localStorage.setItem('fidelityCustomers', JSON.stringify(customers));
    } catch (error) {
      console.error('Erro ao adicionar pontos ao cliente:', error);
    }
  };

  // Função para resgatar recompensa
  const claimReward = (phone: string): boolean => {
    // Verificar se o cliente tem pontos suficientes
    if (currentCustomer && currentCustomer.customerPhone === phone) {
      if (currentCustomer.points >= 100) { // 100 pontos para resgatar recompensa
        // Atualizar o cliente
        setCurrentCustomer({
          ...currentCustomer,
          points: currentCustomer.points - 100,
          rewardsClaimed: currentCustomer.rewardsClaimed + 1,
          lastRewardDate: new Date()
        });
        
        return true;
      }
    }
    
    return false;
  };

  // Função para obter o nível do cliente com base nos pontos
  const getCustomerLevel = (points: number): number => {
    if (points >= 1000) return 5; // Diamante
    if (points >= 500) return 4;   // Ouro
    if (points >= 250) return 3;   // Prata
    if (points >= 100) return 2;   // Bronze
    return 1;                      // Iniciante
  };

  const authenticateCustomer = (name: string, phone: string): boolean => {
    // Verificar se o cliente já tem códigos associados
    const customerCodes = codes.filter(
      code => code.customerName === name && code.customerPhone === phone
    );
    
    // Buscar dados do cliente no localStorage
    const savedCustomers = localStorage.getItem('fidelityCustomers');
    let customerData: CustomerFidelityData = {
      customerName: name,
      customerPhone: phone,
      stamps: customerCodes.filter(code => code.used),
      lastRewardDate: undefined,
      profileImage: undefined,
      level: 1,
      points: 0,
      totalSpent: 0,
      rewardsClaimed: 0
    };
    
    if (savedCustomers) {
      try {
        const customers = JSON.parse(savedCustomers);
        const existingCustomer = customers.find((c: CustomerFidelityData) => 
          c.customerPhone === phone
        );
        
        if (existingCustomer) {
          customerData = {
            ...customerData,
            profileImage: existingCustomer.profileImage
          };
        }
      } catch (error) {
        console.error('Erro ao carregar dados do cliente:', error);
      }
    }
    
    setCurrentCustomer(customerData);
    return true;
  };

  const getCustomerStamps = (name: string, phone: string): FidelityCode[] => {
    return codes.filter(
      code => code.customerName === name && 
              code.customerPhone === phone && 
              code.used
    );
  };

  const canClaimReward = (name: string, phone: string): boolean => {
    const stamps = getCustomerStamps(name, phone);
    return stamps.length >= 5;
  };

  const getStampCount = (name: string, phone: string): number => {
    return getCustomerStamps(name, phone).length;
  };

  const resetStamps = (name: string, phone: string) => {
    // Marcar todos os códigos do cliente como não utilizados
    const updatedCodes = codes.map(code => {
      if (code.customerName === name && code.customerPhone === phone) {
        return {
          ...code,
          used: false,
          usedDate: undefined
        };
      }
      return code;
    });
    
    setCodes(updatedCodes);
  };

  // Profile image functions
  const setCustomerProfileImage = (phone: string, imageData: string) => {
    // Atualizar o cliente atual se for o mesmo
    if (currentCustomer && currentCustomer.customerPhone === phone) {
      setCurrentCustomer({
        ...currentCustomer,
        profileImage: imageData
      });
    }
    
    // Salvar no localStorage
    try {
      const savedCustomers = localStorage.getItem('fidelityCustomers');
      let customers: CustomerFidelityData[] = [];
      
      if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
      }
      
      // Encontrar o cliente existente ou criar um novo
      const customerIndex = customers.findIndex(c => c.customerPhone === phone);
      
      if (customerIndex !== -1) {
        // Atualizar cliente existente
        customers[customerIndex] = {
          ...customers[customerIndex],
          profileImage: imageData
        };
      } else {
        // Criar novo cliente (isso não deve acontecer normalmente)
        customers.push({
          customerName: 'Unknown',
          customerPhone: phone,
          stamps: [],
          profileImage: imageData,
          level: 1,
          points: 0,
          totalSpent: 0,
          rewardsClaimed: 0
        });
      }
      
      localStorage.setItem('fidelityCustomers', JSON.stringify(customers));
    } catch (error) {
      console.error('Erro ao salvar imagem do cliente:', error);
    }
  };

  const getCustomerProfileImage = (phone: string): string | null => {
    try {
      const savedCustomers = localStorage.getItem('fidelityCustomers');
      
      if (savedCustomers) {
        const customers = JSON.parse(savedCustomers);
        const customer = customers.find((c: CustomerFidelityData) => 
          c.customerPhone === phone
        );
        
        return customer?.profileImage || null;
      }
    } catch (error) {
      console.error('Erro ao carregar imagem do cliente:', error);
    }
    
    return null;
  };

  // Função para obter todos os clientes cadastrados
  const getAllCustomers = (): CustomerFidelityData[] => {
    try {
      const savedCustomers = localStorage.getItem('fidelityCustomers');
      
      if (savedCustomers) {
        const customers = JSON.parse(savedCustomers);
        return customers.map((customer: any) => ({
          ...customer,
          stamps: customer.stamps || []
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
    
    return [];
  };

  return (
    <FidelityCodeContext.Provider value={{
      // Admin functions
      generateCode,
      getAllCodes,
      markCodeAsUsed,
      getUsedCodes,
      getUnusedCodes,
      
      // Customer functions
      authenticateCustomer,
      getCustomerStamps,
      canClaimReward,
      getStampCount,
      resetStamps,
      registerCustomer,
      addPoints,
      claimReward,
      getCustomerLevel,
      
      // Profile image functions
      setCustomerProfileImage,
      getCustomerProfileImage,
      
      // Customer management functions
      getAllCustomers,
      
      // Current customer state
      currentCustomer,
      setCurrentCustomer
    }}>
      {children}
    </FidelityCodeContext.Provider>
  );
};

export const useFidelityCode = () => {
  const context = useContext(FidelityCodeContext);
  if (context === undefined) {
    throw new Error('useFidelityCode must be used within a FidelityCodeProvider');
  }
  return context;
};