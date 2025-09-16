import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Award, 
  Users, 
  CreditCard,
  LogOut,
  Menu,
  X,
  Shield,
  Settings
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Logo from '@/assets/Logo.png';

interface AdminMenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems: AdminMenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin/dashboard'
    },
    {
      id: 'loyalty',
      title: 'Programa de Fidelidade',
      icon: <Award className="h-5 w-5" />,
      path: '/admin/loyalty'
    },
    {
      id: 'orders',
      title: 'Gestão de Pedidos',
      icon: <ShoppingBag className="h-5 w-5" />,
      path: '/admin/orders'
    },
    {
      id: 'payments',
      title: 'Gestão de Pagamentos',
      icon: <CreditCard className="h-5 w-5" />,
      path: '/admin/payments'
    },
    {
      id: 'customers',
      title: 'Gestão de Clientes',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/customers'
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: <Settings className="h-5 w-5" />,
      path: '/admin/settings'
    }
  ];

  const handleLogout = () => {
    logout();
    // Redirecionar para a página inicial em vez de /admin/login
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card shadow-md transition-all duration-300 ease-in-out flex flex-col border-r`}>
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-4 border-b">
              {sidebarOpen ? (
                <div className="flex items-center">
                  <img src={Logo} alt="Cantinho do Pastel" className="h-12 w-12 object-contain mr-3" />
                  <h1 className="text-xl font-bold text-primary">Admin Cantinho</h1>
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
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} py-2 h-auto text-destructive hover:text-destructive hover:bg-destructive/10`}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {sidebarOpen && (
                  <span className="ml-3">Sair</span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - REMOVED the top bar section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;