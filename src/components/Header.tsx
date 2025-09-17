import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Star, Home, Gift, ShoppingCart, Pizza, Heart, User } from 'lucide-react';
import Logo from './Logo';
import CartButton from './CartButton';
import { Link, useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getAllCodes, currentCustomer } = useFidelityCode();
  const { checkSpecialAccess } = useAuth();
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const navigate = useNavigate();
  
  // Contar códigos não utilizados do cliente atual
  const getCustomerStampCount = () => {
    if (!currentCustomer) return 0;
    
    const customerCodes = getAllCodes().filter(
      code => code.customerName === currentCustomer.customerName && 
              code.customerPhone === currentCustomer.customerPhone && 
              code.used
    );
    
    return customerCodes.length;
  };
  
  const stampCount = getCustomerStampCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentCustomer]);

  const menuItems = [
    { name: 'Início', href: '#home', icon: Home },
    { name: 'Do Dia', href: '#oferta-do-dia', icon: Gift },
    { name: 'Tradicionais', href: '#pasteis-tradicionais', icon: Pizza },
    { name: 'Combos', href: '#combos-imperdiveis', icon: ShoppingCart },
    { name: 'Exclusivos', href: '#sabores-exclusivos', icon: Heart },
  ];

  // Função para verificar código de acesso especial
  const handleSpecialAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingAccess(true);
    
    setTimeout(() => {
      const hasAccess = checkSpecialAccess(accessCode);
      
      if (hasAccess) {
        toast.success('Acesso concedido!', {
          description: 'Redirecionando para o painel administrativo.'
        });
        // Ocultar o painel de acesso
        setShowAdminAccess(false);
        // Redirecionar para o painel administrativo
        navigate('/admin/dashboard');
      } else {
        toast.error('Acesso negado', {
          description: 'Código de acesso inválido.'
        });
        setAccessCode('');
      }
      
      setIsCheckingAccess(false);
    }, 500);
  };

  // Função para mostrar/ocultar acesso admin (ativa com clique no logo)
  const handleLogoClick = () => {
    setShowAdminAccess(true);
    // Ocultar automaticamente após 10 segundos
    setTimeout(() => setShowAdminAccess(false), 10000);
  };

  return (
    <header className={`fixed top-0 w-full z-50 smooth-transition ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div onClick={handleLogoClick} className="cursor-pointer flex-shrink-0">
              <Logo showText={true} />
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-foreground/80 hover:text-primary smooth-transition hover:scale-105"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.name}
                </a>
              );
            })}
            <Link
              to="/fidelidade"
              className="flex items-center text-foreground/80 hover:text-primary smooth-transition hover:scale-105"
            >
              <Star className="w-4 h-4 mr-1" />
              Fidelidade
              {stampCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stampCount}
                </span>
              )}
            </Link>
            <Link
              to="/cliente"
              className="flex items-center text-foreground/80 hover:text-primary smooth-transition hover:scale-105"
            >
              <User className="w-4 h-4 mr-1" />
              Perfil
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cliente">
              <Button variant="ghost" size="sm" className="relative p-2">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/fidelidade">
              <Button variant="ghost" size="sm" className="relative p-2">
                <Star className="w-5 h-5" />
                {stampCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stampCount}
                  </span>
                )}
              </Button>
            </Link>
            <CartButton />
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden card-gradient border border-border rounded-lg mt-2 p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-foreground/80 hover:text-primary smooth-transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
              <Link
                to="/fidelidade"
                className="flex items-center text-foreground/80 hover:text-primary smooth-transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star className="w-4 h-4 mr-2" />
                Fidelidade
                {stampCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stampCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cliente"
                className="flex items-center text-foreground/80 hover:text-primary smooth-transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Seção oculta de acesso administrativo */}
      {showAdminAccess && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Acesso Administrativo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSpecialAccess} className="space-y-3">
                <Input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Código de acesso especial"
                  className="text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="w-full"
                  disabled={isCheckingAccess || !accessCode}
                >
                  {isCheckingAccess ? 'Verificando...' : 'Acessar'}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Acesso exclusivo para equipe autorizada.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;