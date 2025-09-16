import React from 'react';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Navigate } from 'react-router-dom';
import CustomerLogin from '@/components/CustomerLogin';

interface CustomerRouteGuardProps {
  children: React.ReactNode;
}

const CustomerRouteGuard: React.FC<CustomerRouteGuardProps> = ({ children }) => {
  const { currentCustomer } = useFidelityCode();

  // Se o cliente não estiver autenticado, mostrar o formulário de login
  if (!currentCustomer) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <CustomerLogin />
      </div>
    );
  }

  // Se o cliente estiver autenticado, renderizar o conteúdo solicitado
  return <>{children}</>;
};

export default CustomerRouteGuard;