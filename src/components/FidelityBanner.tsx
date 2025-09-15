import { Star, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FidelityBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-6 px-4 rounded-lg text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Star className="h-8 w-8 mr-3 text-yellow-300" />
            <div>
              <h3 className="text-xl font-bold">Programa de Fidelidade</h3>
              <p className="text-primary-foreground/90">
                Colete 5 carimbos e ganhe um pastel grátis!
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild variant="secondary" size="sm">
              <Link to="/fidelidade">
                <Gift className="mr-2 h-4 w-4" />
                Participar agora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FidelityBanner;