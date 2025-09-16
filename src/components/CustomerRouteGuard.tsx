import React from 'react';
import { useSupabaseFidelity } from '@/contexts/SupabaseFidelityContext';
import { Navigate } from 'react-router-dom';
import SupabaseCustomerLogin from '@/components/SupabaseCustomerLogin';

interface CustomerRouteGuardProps {
  children: React.ReactNode;
}

const CustomerRouteGuard: React.FC<CustomerRouteGuardProps> = ({ children }) => {
  const { currentCustomer } = useSupabaseFidelity();

  // Se o cliente não estiver autenticado, mostrar o formulário de login
  if (!currentCustomer) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <SupabaseCustomerLogin />
      </div>
    );
  }

  // Se o cliente estiver autenticado, renderizar o conteúdo solicitado
  return <>{children}</>;
};

export default CustomerRouteGuard;