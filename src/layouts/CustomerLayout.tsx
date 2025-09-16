import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { Button } from '@/components/ui/button';
import { 
  User, 
  ShoppingBag, 
  Award, 
  Home,
  Menu,
  X
} from 'lucide-react';
import Logo from '@/assets/Logo.png';

interface CustomerMenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentCustomer, setCurrentCustomer } = useFidelityCode();

  const menuItems: CustomerMenuItem[] = [
    {
      id: 'home',
      title: 'Início',
      icon: <Home className="h-5 w-5" />,
      path: '/'
    },
    {
      id: 'profile',
      title: 'Meu Perfil',
      icon: <User className="h-5 w-5" />,
      path: '/cliente/perfil'
    },
    {
      id: 'orders',
      title: 'Meus Pedidos',
      icon: <ShoppingBag className="h-5 w-5" />,
      path: '/cliente/pedidos'
    },
    {
      id: 'fidelity',
      title: 'Fidelidade',
      icon: <Award className="h-5 w-5" />,
      path: '/cliente/fidelidade'
    }
  ];

  const handleLogout = () => {
    setCurrentCustomer(null);
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card shadow-md transition-all duration-300 ease-in-out flex flex-col border-r`}>
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            {sidebarOpen ? (
              <div className="flex items-center">
                <img src={Logo} alt="Cantinho do Pastel" className="h-12 w-12 object-contain mr-3" />
                <h1 className="text-xl font-bold text-primary">Cantinho do Pastel</h1>
              </div>
            ) : (
              <img src={Logo} alt="Cantinho do Pastel" className="h-10 w-10 object-contain mx-auto" />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Customer Info */}
          {currentCustomer && sidebarOpen && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {currentCustomer.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm truncate">{currentCustomer.customerName}</p>
                  <p className="text-xs text-muted-foreground">{currentCustomer.customerPhone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} py-2 h-auto`}
                    >
                      <span className={sidebarOpen ? '' : 'mx-auto'}>
                        {item.icon}
                      </span>
                      {sidebarOpen && (
                        <span className="ml-3">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          {currentCustomer && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} py-2 h-auto text-destructive hover:text-destructive hover:bg-destructive/10`}
                onClick={handleLogout}
              >
                <X className="h-5 w-5" />
                {sidebarOpen && (
                  <span className="ml-3">Sair</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;