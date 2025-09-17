import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  Settings,
  LogOut,
  Menu,
  X,
  Award
} from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import AdminRouteGuard from '@/components/AdminRouteGuard';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoading } = useSupabaseAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Pedidos',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Fidelidade',
      href: '/admin/loyalty',
      icon: Award,
    },
    {
      name: 'Pagamentos',
      href: '/admin/payments',
      icon: CreditCard,
    },
    {
      name: 'Clientes',
      href: '/admin/customers',
      icon: Users,
    },
    {
      name: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AdminRouteGuard>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75" 
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Fechar sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt="Logo"
                  />
                  <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`
                          ${isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                          group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors
                        `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon
                          className={`
                            ${isActive(item.href) ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-gray-500'}
                            mr-4 flex-shrink-0 h-6 w-6
                          `}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Button
                  variant="ghost"
                  className="flex items-center w-full"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-6 w-auto md:h-8"
                  src="/logo.png"
                  alt="Logo"
                />
                <span className="ml-2 text-lg font-bold text-gray-900 md:text-xl">Admin</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        ${isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                      `}
                    >
                      <Icon
                        className={`
                          ${isActive(item.href) ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-gray-500'}
                          mr-3 flex-shrink-0 h-6 w-6
                        `}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Button
                variant="ghost"
                className="flex items-center w-full"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Abrir sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
};

export default AdminLayout;