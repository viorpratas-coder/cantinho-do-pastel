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
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Cardápio Netflix-style - Como escolher filmes/séries
  const featuredProducts = [
    {
      id: 1,
      name: 'Frango com Catupiry',
      description: 'Frango desfiado, catupiry cremoso e tempero especial da casa',
      price: 9.50,
      image: pastelFrango,
      category: 'Oferta do Dia',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Carne com Queijo',
      description: 'Carne temperada com especiarias e queijo mussarela derretido',
      price: 9.50,
      image: pastelCarne,
      category: 'Oferta do Dia', 
      rating: 4.8
    },
    {
      id: 3,
      name: 'Queijo',
      description: 'Queijo mussarela derretido com orégano fresco',
      price: 7.00,
      image: pastelQueijo,
      category: 'Oferta do Dia',
      rating: 4.9
    },
    {
      id: 17,
      name: 'Pizza',
      description: 'Presunto, queijo, tomate e orégano',
      price: 10.00,
      image: pastelQueijo,
      category: 'Oferta do Dia',
      rating: 4.7
    },
    {
      id: 18,
      name: 'Brócolis',
      description: 'Brócolis fresco com queijo e bacon crocante',
      price: 9.50,
      image: pastelQueijo,
      category: 'Oferta do Dia',
      rating: 4.8
    }
  ];

  // Novo array para pastéis tradicionais
  const traditionalProducts = [
    {
      id: 10,
      name: 'Brócolis',
      description: 'Brócolis, queijo e bacon',
      price: 12.00,
      image: pastelQueijo,
      category: 'Clássicos',
      rating: 4.8
    },
    {
      id: 11,
      name: 'Queijo',
      description: 'Queijo mussarela derretido',
      price: 12.00,
      image: pastelQueijo,
      category: 'Clássicos',
      rating: 4.9
    },
    {
      id: 12,
      name: 'Frango com Queijo',
      description: 'Frango temperado e mussarela',
      price: 12.00,
      image: pastelFrango,
      category: 'Clássicos',
      rating: 4.8
    },
    {
      id: 13,
      name: 'Frango com Catupiry',
      description: 'Frango, catupiry e tempero da casa',
      price: 12.00,
      image: pastelFrango,
      category: 'Clássicos',
      rating: 4.9
    },
    {
      id: 14,
      name: 'Pizza',
      description: 'Presunto, queijo, tomate e orégano',
      price: 12.00,
      image: pastelQueijo,
      category: 'Clássicos',
      rating: 4.7
    },
    {
      id: 15,
      name: 'Carne com Queijo',
      description: 'Carne temperada e queijo',
      price: 12.00,
      image: pastelCarne,
      category: 'Clássicos',
      rating: 4.8
    },
    {
      id: 16,
      name: 'Carne com Queijo e Bacon',
      description: 'Carne temperada, queijo e bacon',
      price: 12.00,
      image: pastelCarne,
      category: 'Clássicos',
      rating: 4.9
    }
  ];

  const especialProducts = [
    {
      id: 7,
      name: 'X-Tudo 5 Recheios',
      description: 'Frango temperado, presunto, queijo, catupiry e brócolis',
      price: 17.00,
      image: pastelCarne,
      category: 'Especiais',
      rating: 4.9
    },
    {
      id: 8,
      name: 'X-Tudo 3 Recheios',
      description: 'Frango, carne e queijo ou catupiry',
      price: 15.00,
      image: pastelFrango,
      category: 'Especiais',
      rating: 4.8
    },
    {
      id: 9,
      name: 'Costela com Queijo',
      description: 'Costela com queijo',
      price: 15.00,
      image: pastelCarne,
      category: 'Especiais',
      rating: 4.7
    },
    {
      id: 19,
      name: 'Hot Dog',
      description: 'Purê de batata, salsicha, presunto e queijo',
      price: 15.00,
      image: pastelFrango,
      category: 'Especiais',
      rating: 4.8
    }
  ];

  const comboProducts = [
    {
      id: 4,
      name: 'Combo Família',
      description: '6 pastéis variados + 3 refrigerantes + batata frita grande',
      price: 39.90,
      originalPrice: 49.90,
      image: pastelCarne,
      category: 'Combos',
      rating: 5.0,
      isPromo: true
    },
    {
      id: 5,
      name: 'Combo Dupla',
      description: '3 pastéis variados + 2 refrigerantes + porção de batata média',
      price: 24.90,
      originalPrice: 32.90,
      image: pastelQueijo,
      category: 'Combos',
      rating: 4.8,
      isPromo: true
    },
    {
      id: 6,
      name: 'Combo Individual',
      description: '1 pastel + 1 refrigerante + batata pequena',
      price: 14.90,
      originalPrice: 18.90,
      image: pastelFrango,
      category: 'Combos',
      rating: 4.9,
      isPromo: true
    },
    {
      id: 22,
      name: 'Combo Mega',
      description: '8 pastéis variados + 4 refrigerantes + batata gigante + nuggets',
      price: 55.90,
      originalPrice: 69.90,
      image: pastelCarne,
      category: 'Combos',
      rating: 5.0,
      isPromo: true
    },
    {
      id: 23,
      name: 'Combo Vegetariano',
      description: '4 pastéis vegetarianos + 2 sucos naturais + salada',
      price: 29.90,
      originalPrice: 37.90,
      image: pastelQueijo,
      category: 'Combos',
      rating: 4.7,
      isPromo: true
    }
  ];

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