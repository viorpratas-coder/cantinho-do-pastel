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
import AdminSettings from "./pages/AdminSettings";
import { AuthProvider } from "./contexts/AuthContext";

import AdminLayout from "./layouts/AdminLayout";
import AdminPayments from "./pages/AdminPayments";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerLoyalty from "./pages/CustomerLoyalty";
import CustomerRouteGuard from "@/components/CustomerRouteGuard";
import { SupabaseFidelityProvider } from "./contexts/SupabaseFidelityContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import SupabaseAdminLogin from "./components/SupabaseAdminLogin";
import SupabaseCustomerLoyalty from "./pages/SupabaseCustomerLoyalty";
import SupabaseAdminLoyalty from "./pages/SupabaseAdminLoyalty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SupabaseAuthProvider>
        <PaymentProvider>
          <PreferencesProvider>
            <OrdersProvider>
              <FidelityCodeProvider>
                <SupabaseFidelityProvider>
                  <CartProvider>
                    <ReviewsProvider>
                      <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/fidelidade" element={<LoyaltyProgram />} />
                            
                            {/* Login administrativo */}
                            <Route path="/admin/login" element={<SupabaseAdminLogin />} />
                            
                            {/* Área Administrativa - Protegida */}
                            <Route path="/admin" element={<AdminLayout />}>
                              <Route path="dashboard" element={<AdminDashboard />} />
                              <Route path="orders" element={<AdminOrders />} />
                              <Route path="loyalty" element={<SupabaseAdminLoyalty />} />
                              <Route path="payments" element={<AdminPayments />} />
                              <Route path="customers" element={<AdminCustomers />} />
                              <Route path="settings" element={<AdminSettings />} />
                            </Route>
                            
                            {/* Área do Cliente com Layout Unificado */}
                            <Route path="/cliente" element={<CustomerLayout />}> 
                              <Route index element={
                                <CustomerRouteGuard>
                                  <CustomerProfile />
                                </CustomerRouteGuard>
                              } />
                              <Route path="perfil" element={
                                <CustomerRouteGuard>
                                  <CustomerProfile />
                                </CustomerRouteGuard>
                              } />
                              <Route path="pedidos" element={
                                <CustomerRouteGuard>
                                  <CustomerOrders />
                                </CustomerRouteGuard>
                              } />
                              <Route path="fidelidade" element={
                                <CustomerRouteGuard>
                                  <SupabaseCustomerLoyalty />
                                </CustomerRouteGuard>
                              } />
                            </Route>
                            
                            {/* Outras rotas */}
                            <Route path="/pagamento/metodos" element={<PaymentMethods />} />
                            
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </BrowserRouter>
                      </TooltipProvider>
                    </ReviewsProvider>
                  </CartProvider>
                </SupabaseFidelityProvider>
              </FidelityCodeProvider>
            </OrdersProvider>
          </PreferencesProvider>
        </PaymentProvider>
      </SupabaseAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;