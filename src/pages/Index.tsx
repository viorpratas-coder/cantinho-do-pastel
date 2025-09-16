import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import WhatsAppButton from '@/components/WhatsAppButton';
import Logo from '@/components/Logo';
import Cart from '@/components/Cart';
import FidelityBanner from '@/components/FidelityBanner';
import pastelFrango from '@/assets/pastel-frango.jpg';
import pastelCarne from '@/assets/pastel-carne.jpg';
import pastelQueijo from '@/assets/pastel-queijo.jpg';
import { Star, Gift } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFidelityCode } from '@/contexts/FidelityCodeContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';

// Dados dos produtos (mantendo os dados existentes)
const featuredProducts = [
  { 
    id: 1, 
    name: 'Pastel de Frango', 
    description: 'Frango desfiado com temperos especiais', 
    price: 6.50, 
    image: pastelFrango, 
    rating: 4.8,
    category: 'Oferta do Dia'
  },
  { 
    id: 2, 
    name: 'Pastel de Carne', 
    description: 'Carne moída temperada na hora', 
    price: 6.50, 
    image: pastelCarne, 
    rating: 4.7,
    category: 'Oferta do Dia'
  },
  { 
    id: 3, 
    name: 'Pastel de Queijo', 
    description: 'Queijo mussarela derretido', 
    price: 6.00, 
    image: pastelQueijo, 
    rating: 4.9,
    category: 'Oferta do Dia'
  }
];

const traditionalProducts = [
  { 
    id: 4, 
    name: 'Pastel de Frango', 
    description: 'Frango desfiado com temperos especiais', 
    price: 6.50, 
    image: pastelFrango, 
    rating: 4.8,
    category: 'Clássicos'
  },
  { 
    id: 5, 
    name: 'Pastel de Carne', 
    description: 'Carne moída temperada na hora', 
    price: 6.50, 
    image: pastelCarne, 
    rating: 4.7,
    category: 'Clássicos'
  },
  { 
    id: 6, 
    name: 'Pastel de Queijo', 
    description: 'Queijo mussarela derretido', 
    price: 6.00, 
    image: pastelQueijo, 
    rating: 4.9,
    category: 'Clássicos'
  },
  { 
    id: 7, 
    name: 'Pastel de Camarão', 
    description: 'Camarão fresco com catupiry', 
    price: 8.50, 
    image: pastelFrango, 
    rating: 4.9,
    category: 'Clássicos'
  }
];

const comboProducts = [
  { 
    id: 8, 
    name: 'Combo 2 Pastéis', 
    description: '2 pastéis + 1 refrigerante 350ml', 
    price: 15.00, 
    image: pastelFrango, 
    rating: 4.8,
    category: 'Combos'
  },
  { 
    id: 9, 
    name: 'Combo Família', 
    description: '6 pastéis variados + 2 refrigerantes 2L', 
    price: 45.00, 
    image: pastelCarne, 
    rating: 4.9,
    category: 'Combos'
  },
  { 
    id: 10, 
    name: 'Combo Individual', 
    description: '1 pastel + 1 suco natural', 
    price: 10.00, 
    image: pastelQueijo, 
    rating: 4.7,
    category: 'Combos'
  }
];

const especialProducts = [
  { 
    id: 11, 
    name: 'Pastel de Camarão', 
    description: 'Camarão fresco com catupiry', 
    price: 8.50, 
    image: pastelFrango, 
    rating: 4.9,
    category: 'Especiais'
  },
  { 
    id: 12, 
    name: 'Pastel de Chocolate', 
    description: 'Chocolate derretido com morango', 
    price: 7.00, 
    image: pastelQueijo, 
    rating: 4.8,
    category: 'Especiais'
  },
  { 
    id: 13, 
    name: 'Pastel de Palmito', 
    description: 'Palmito com queijo e azeitonas', 
    price: 7.50, 
    image: pastelCarne, 
    rating: 4.7,
    category: 'Especiais'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Banner de Fidelidade */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <FidelityBanner />
        </div>
      </section>
      
      {/* Oferta do Dia */}
      <section id="oferta-do-dia" className="py-16 px-4">
        <div className="container mx-auto">
          <ProductCarousel title="🔥 Oferta do Dia" products={featuredProducts} />
        </div>
      </section>

      {/* Pastéis Tradicionais */}
      <section id="pasteis-tradicionais" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <ProductCarousel title="🥟 Pastéis Tradicionais" products={traditionalProducts} />
        </div>
      </section>

      {/* Combos Imperdíveis */}
      <section id="combos-imperdiveis" className="py-16 px-4">
        <div className="container mx-auto">
          <ProductCarousel title="🎉 Combos Imperdíveis" products={comboProducts} />
        </div>
      </section>

      {/* Sabores Exclusivos */}
      <section id="sabores-exclusivos" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <ProductCarousel title="🌟 Sabores Exclusivos" products={especialProducts} />
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <Logo showText={true} />
              </div>
              <p className="text-foreground/70 mb-4">
                O melhor pastel da cidade, feito com ingredientes frescos e muito carinho.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/5511972239005" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-primary hover:text-white smooth-transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.33.24-.53.24-.2 0-.37-.12-.53-.24l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.33-.24.53-.24.2 0 .37.12.53.24l7.9 4.44c.32.17.53.5.53.88v9z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/_.cantinhodopastel_?utm_source=qr&igsh=MXAyODNjYTlraWFxZA==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-primary hover:text-white smooth-transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@cantinhodopastel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-primary hover:text-white smooth-transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-foreground/70 hover:text-primary smooth-transition">Início</a></li>
                <li><a href="#oferta-do-dia" className="text-foreground/70 hover:text-primary smooth-transition">Do Dia</a></li>
                <li><a href="#pasteis-tradicionais" className="text-foreground/70 hover:text-primary smooth-transition">Tradicionais</a></li>
                <li><a href="#combos-imperdiveis" className="text-foreground/70 hover:text-primary smooth-transition">Combos</a></li>
                <li><a href="#sabores-exclusivos" className="text-foreground/70 hover:text-primary smooth-transition">Exclusivos</a></li>
                <li><a href="#fidelidade" className="text-foreground/70 hover:text-primary smooth-transition">Programa de Fidelidade</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>Segunda a Domingo: 17h às 00h</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>📍 Rua Idalina Gonçalves Dias, 15</li>
                <li>📞 (11) 97223-9005</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-foreground/50">
            <p>&copy; 2025 Cantinho do Pastel. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <WhatsAppButton />
      <Cart />
    </div>
  );
};

export default Index;