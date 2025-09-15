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
import CustomerFidelity from "./pages/CustomerFidelity";
import AdminLoyalty from "./pages/AdminLoyalty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              <Route path="/fidelidade/cliente" element={<CustomerFidelity />} />
              <Route path="/admin/fidelidade" element={<AdminLoyalty />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FidelityCodeProvider>
    </ReviewsProvider>
  </CartProvider>
</QueryClientProvider>
);

export default App;