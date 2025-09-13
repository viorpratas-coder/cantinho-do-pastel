import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import product images
import pastelCarne from '@/assets/pastel-carne.jpg';
import pastelQueijo from '@/assets/pastel-queijo.jpg';
import pastelFrango from '@/assets/pastel-frango.jpg';

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
      
      {/* Netflix-style Menu Categories */}
      <section id="cardapio" className="py-20 px-4">
        <div className="container mx-auto">
          {/* Continue Assistindo - Mais Pedidos */}
          <div id="oferta-do-dia" className="mb-16 animate-fade-in">
            <ProductCarousel title="🔥 Oferta do Dia" products={featuredProducts} />
          </div>

          {/* Pastéis Tradicionais */}
          <div id="pasteis-tradicionais" className="mb-16 animate-fade-in">
            <ProductCarousel title="🏮 Pastéis Tradicionais" products={traditionalProducts} />
          </div>

          {/* Combos em Promoção */}
          <div id="combos-imperdiveis" className="mb-16 animate-slide-up">
            <ProductCarousel title="💥 Combos Imperdíveis" products={comboProducts} />
          </div>

          {/* Especialidades */}
          <div id="sabores-exclusivos" className="mb-16 animate-fade-in">
            <ProductCarousel title="⭐ Sabores Exclusivos" products={especialProducts} />
          </div>
        </div>
      </section>

      {/* Footer Netflix-style */}
      <footer className="bg-background border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gradient-primary mb-4">Cantinho do Pastel</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Sua plataforma de streaming de sabores. Os melhores pastéis da cidade estão aqui!
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Categorias</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li className="hover:text-primary cursor-pointer smooth-transition" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                  Início
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition" onClick={() => document.getElementById('oferta-do-dia')?.scrollIntoView({ behavior: 'smooth' })}>
                  Oferta do Dia
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition" onClick={() => document.getElementById('pasteis-tradicionais')?.scrollIntoView({ behavior: 'smooth' })}>
                  Pastéis Tradicionais
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition" onClick={() => document.getElementById('combos-imperdiveis')?.scrollIntoView({ behavior: 'smooth' })}>
                  Combos Imperdíveis
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition" onClick={() => document.getElementById('sabores-exclusivos')?.scrollIntoView({ behavior: 'smooth' })}>
                  Sabores Exclusivos
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Delivery</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>📍 Rua Idalina Gonçalves Dias número 15</li>
                <li>🕐 Seg - Dom: 17h às 00h</li>
                <li>📱 (11) 9 7223-9005</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Redes Sociais</h4>
              <div className="flex space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer smooth-transition relative"
                  onClick={() => window.open('https://www.instagram.com/_.cantinhodopastel_?utm_source=qr&igsh=MXAyODNjYTlraWFxZA==', '_blank')}
                  style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white/50"></div>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer smooth-transition relative"
                  onClick={() => window.open('https://wa.me/5511972239005', '_blank')}
                  style={{ backgroundColor: '#25D366' }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white/50"></div>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer smooth-transition relative"
                  onClick={() => window.open('https://www.tiktok.com', '_blank')}
                  style={{ background: 'radial-gradient(circle at 30% 107%, #69C9D0 0%, #EE1D52 100%)' }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white/50"></div>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 text-center">
            <p className="text-foreground/50 text-sm">
              © 2025 Cantinho do Pastel - Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;