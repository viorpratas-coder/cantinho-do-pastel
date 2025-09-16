import React, { useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import SupabaseAdminLogin from '@/components/SupabaseAdminLogin';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado e não estiver carregando, redirecionar para login
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Se estiver carregando, mostrar um indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Verificando autenticação...</span>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar o formulário de login
  if (!isAuthenticated) {
    return <SupabaseAdminLogin />;
  }

  // Se estiver autenticado, renderizar o conteúdo solicitado
  return <>{children}</>;
};

export default AdminRouteGuard;