import React, { createContext, useContext, useState, useEffect } from 'react';

interface CustomerPreferences {
  favoriteProducts: number[]; // IDs dos produtos favoritos
  dietaryRestrictions: string[]; // Restrições alimentares (ex: vegetariano, vegano, sem lactose)
  preferredCategories: string[]; // Categorias preferidas
  notificationPreferences: {
    orderUpdates: boolean;
    promotions: boolean;
    loyalty: boolean;
  };
  theme: 'light' | 'dark' | 'auto'; // Preferência de tema
  language: string; // Idioma preferido
}

interface PreferencesContextType {
  preferences: CustomerPreferences;
  updatePreferences: (newPreferences: Partial<CustomerPreferences>) => void;
  addFavoriteProduct: (productId: number) => void;
  removeFavoriteProduct: (productId: number) => void;
  getCustomerPreferences: (customerPhone: string) => CustomerPreferences | null;
  saveCustomerPreferences: (customerPhone: string, preferences: CustomerPreferences) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CustomerPreferences>(() => {
    const savedPreferences = localStorage.getItem('customerPreferences');
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch (error) {
        console.error('Erro ao carregar preferências:', error);
      }
    }
    
    // Valores padrão
    return {
      favoriteProducts: [],
      dietaryRestrictions: [],
      preferredCategories: [],
      notificationPreferences: {
        orderUpdates: true,
        promotions: true,
        loyalty: true
      },
      theme: 'auto',
      language: 'pt-BR'
    };
  });

  // Salvar preferências no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('customerPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  }, [preferences]);

  // Atualizar preferências
  const updatePreferences = (newPreferences: Partial<CustomerPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Adicionar produto favorito
  const addFavoriteProduct = (productId: number) => {
    setPreferences(prev => ({
      ...prev,
      favoriteProducts: [...new Set([...prev.favoriteProducts, productId])]
    }));
  };

  // Remover produto favorito
  const removeFavoriteProduct = (productId: number) => {
    setPreferences(prev => ({
      ...prev,
      favoriteProducts: prev.favoriteProducts.filter(id => id !== productId)
    }));
  };

  // Obter preferências de um cliente específico
  const getCustomerPreferences = (customerPhone: string): CustomerPreferences | null => {
    try {
      const savedCustomers = localStorage.getItem('customerPreferencesData');
      if (savedCustomers) {
        const customers = JSON.parse(savedCustomers);
        return customers[customerPhone] || null;
      }
    } catch (error) {
      console.error('Erro ao carregar preferências do cliente:', error);
    }
    return null;
  };

  // Salvar preferências de um cliente específico
  const saveCustomerPreferences = (customerPhone: string, preferences: CustomerPreferences) => {
    try {
      const savedCustomers = localStorage.getItem('customerPreferencesData');
      let customers: Record<string, CustomerPreferences> = {};
      
      if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
      }
      
      customers[customerPhone] = preferences;
      localStorage.setItem('customerPreferencesData', JSON.stringify(customers));
    } catch (error) {
      console.error('Erro ao salvar preferências do cliente:', error);
    }
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      updatePreferences,
      addFavoriteProduct,
      removeFavoriteProduct,
      getCustomerPreferences,
      saveCustomerPreferences
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};