import { useSupabaseFidelity } from '@/contexts/SupabaseFidelityContext';

export const useFidelity = () => {
  const fidelityContext = useSupabaseFidelity();
  
  return {
    ...fidelityContext
  };
};