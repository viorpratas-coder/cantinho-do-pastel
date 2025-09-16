import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  // Função para verificar código de acesso especial
  checkSpecialAccess: (code: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Senha padrão para acesso ao painel administrativo
const ADMIN_PASSWORD = 'pastelaria123';
// Código especial para acesso discreto (não visível aos clientes)
const SPECIAL_ACCESS_CODE = 'acessosecreto123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado no localStorage
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  // Função para verificar código de acesso especial
  const checkSpecialAccess = (code: string): boolean => {
    if (code === SPECIAL_ACCESS_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkSpecialAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};