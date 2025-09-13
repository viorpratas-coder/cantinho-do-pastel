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
      name: 'Pastel de Carne',
      description: 'Carne temperada com especiarias especiais, cebola e tempero da casa',
      price: 8.50,
      image: pastelCarne,
      category: 'Clássicos',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Pastel de Queijo',
      description: 'Queijo derretido de primeira qualidade com orégano fresco',
      price: 7.00,
      image: pastelQueijo,
      category: 'Clássicos', 
      rating: 4.8
    },
    {
      id: 3,
      name: 'Pastel de Frango',
      description: 'Frango desfiado temperado com catupiry cremoso',
      price: 9.00,
      image: pastelFrango,
      category: 'Especiais',
      rating: 4.9
    }
  ];

  const especialProducts = [
    {
      id: 7,
      name: 'Pastel de Pizza',
      description: 'Molho de tomate, mussarela, presunto e orégano',
      price: 10.50,
      image: pastelQueijo,
      category: 'Gourmet',
      rating: 4.8
    },
    {
      id: 8,
      name: 'Pastel de Chocolate',
      description: 'Chocolate cremoso com banana e morango',
      price: 9.50,
      image: pastelFrango,
      category: 'Doces',
      rating: 4.9
    },
    {
      id: 9,
      name: 'Pastel Vegano',
      description: 'Recheio vegetal com tofu temperado e legumes',
      price: 11.00,
      image: pastelCarne,
      category: 'Saudáveis',
      rating: 4.7
    }
  ];

  const comboProducts = [
    {
      id: 4,
      name: 'Combo Família',
      description: '4 pastéis + 2 refrigerantes + batata frita',
      price: 29.90,
      originalPrice: 39.90,
      image: pastelCarne,
      category: 'Combos',
      rating: 5.0,
      isPromo: true
    },
    {
      id: 5,
      name: 'Combo Dupla',
      description: '2 pastéis + 1 refrigerante + porção de batata',
      price: 18.90,
      originalPrice: 24.90,
      image: pastelQueijo,
      category: 'Combos',
      rating: 4.8,
      isPromo: true
    },
    {
      id: 6,
      name: 'Combo Individual',
      description: '1 pastel + 1 refrigerante + batata pequena',
      price: 12.90,
      originalPrice: 16.90,
      image: pastelFrango,
      category: 'Combos',
      rating: 4.9,
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
          <div className="mb-16 animate-fade-in">
            <ProductCarousel title="🔥 Mais Pedidos da Semana" products={featuredProducts} />
          </div>

          {/* Combos em Promoção */}
          <div className="mb-16 animate-slide-up">
            <ProductCarousel title="💥 Combos Especiais" products={comboProducts} />
          </div>

          {/* Especialidades */}
          <div className="mb-16 animate-fade-in">
            <ProductCarousel title="⭐ Especialidades da Casa" products={especialProducts} />
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
                <li className="hover:text-primary cursor-pointer smooth-transition">Clássicos</li>
                <li className="hover:text-primary cursor-pointer smooth-transition">Especiais</li>
                <li className="hover:text-primary cursor-pointer smooth-transition">Combos</li>
                <li className="hover:text-primary cursor-pointer smooth-transition">Doces</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Delivery</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>📍 Centro - São Paulo/SP</li>
                <li>🕐 Seg - Dom: 18h às 23h</li>
                <li>📱 (11) 9 9999-9999</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Redes Sociais</h4>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/40 cursor-pointer smooth-transition">
                  <span className="text-xs">📘</span>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/40 cursor-pointer smooth-transition">
                  <span className="text-xs">📷</span>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/40 cursor-pointer smooth-transition">
                  <span className="text-xs">🐦</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 text-center">
            <p className="text-foreground/50 text-sm">
              © 2024 Cantinho do Pastel - Plataforma de Streaming de Sabores. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;