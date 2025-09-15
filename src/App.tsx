import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import { FidelityCodeProvider } from "./contexts/FidelityCodeContext";
import LoyaltyProgram from "./pages/LoyaltyProgram";
import AdminLoyalty from "./pages/AdminLoyalty";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";

import PaymentMethods from "./pages/PaymentMethods";
import { OrdersProvider } from "./contexts/OrdersContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import AdminCustomers from "./pages/AdminCustomers";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminPayments from "./pages/AdminPayments";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerLoyalty from "./pages/CustomerLoyalty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PaymentProvider>
        <PreferencesProvider>
          <OrdersProvider>
            <CartProvider>
              <ReviewsProvider>
                <FidelityCodeProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/fidelidade" element={<LoyaltyProgram />} />
                {/* Rotas de Autenticação Administrativa */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Área Administrativa - Protegida */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="loyalty" element={<AdminLoyalty />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="customers" element={<AdminCustomers />} />
                </Route>
                
                {/* Área do Cliente com Layout Unificado */}
                <Route path="/cliente" element={<CustomerLayout />}> 
                  <Route index element={<CustomerDashboard />} />
                  <Route path="perfil" element={<CustomerDashboard />} />
                  <Route path="pedidos" element={<CustomerOrders />} />
                  <Route path="fidelidade" element={<CustomerLoyalty />} />
                </Route>
                
                {/* Outras rotas */}
                <Route path="/pagamento/metodos" element={<PaymentMethods />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
                </FidelityCodeProvider>
              </ReviewsProvider>
            </CartProvider>
          </OrdersProvider>
        </PreferencesProvider>
      </PaymentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;