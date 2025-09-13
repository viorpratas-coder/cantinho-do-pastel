import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Phone, Star, Users, Award } from 'lucide-react';

// Import product images
import pastelCarne from '@/assets/pastel-carne.jpg';
import pastelQueijo from '@/assets/pastel-queijo.jpg';
import pastelFrango from '@/assets/pastel-frango.jpg';

const Index = () => {
  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Pastel de Carne',
      description: 'Carne temperada com especiarias especiais, cebola e tempero da casa',
      price: 8.50,
      image: pastelCarne,
      category: 'Tradicionais',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Pastel de Queijo',
      description: 'Queijo derretido de primeira qualidade com orégano fresco',
      price: 7.00,
      image: pastelQueijo,
      category: 'Tradicionais',
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

  const promoProducts = [
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
      name: 'Pastel Gigante',
      description: 'Nosso maior pastel com recheio duplo de sua escolha',
      price: 12.90,
      originalPrice: 16.90,
      image: pastelFrango,
      category: 'Especiais',
      rating: 4.9,
      isPromo: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Products Section */}
      <section id="cardapio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="text-gradient-primary">Destaques</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Os pastéis mais pedidos pelos nossos clientes. Cada um com seu sabor único e inconfundível.
            </p>
          </div>
          
          <ProductCarousel title="Mais Pedidos" products={featuredProducts} />
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promocoes" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-accent">Promoções</span> Especiais
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Ofertas imperdíveis que vão fazer você querer maratonar nossos sabores!
            </p>
          </div>
          
          <ProductCarousel title="Ofertas Limitadas" products={promoProducts} />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Nossa <span className="text-gradient-primary">História</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                Há mais de 10 anos servindo os melhores pastéis da cidade. Nossa paixão pela culinária 
                brasileira e pelo atendimento de qualidade nos tornou referência no bairro.
              </p>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Cada pastel é preparado na hora, com ingredientes frescos e receitas especiais 
                que passam de geração em geração. Venha fazer parte da nossa família!
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-sm text-foreground/60">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-accent">4.9</div>
                  <div className="text-sm text-foreground/60">Avaliação Média</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-accent">10</div>
                  <div className="text-sm text-foreground/60">Anos de Tradição</div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <Card className="card-gradient border-border p-8 card-shadow">
                <h3 className="text-2xl font-bold mb-6 text-gradient-accent">Por que escolher o Cantinho?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-foreground/80">Ingredientes frescos e de qualidade</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-foreground/80">Receitas tradicionais e exclusivas</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-foreground/80">Atendimento rápido e carinhoso</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-foreground/80">Delivery em toda a região</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Entre em <span className="text-gradient-primary">Contato</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Estamos sempre prontos para atender você da melhor forma possível!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-gradient border-border p-6 text-center hover:scale-105 smooth-transition">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Endereço</h3>
              <p className="text-foreground/70">
                Rua dos Pastéis, 123<br />
                Centro - São Paulo/SP
              </p>
            </Card>
            
            <Card className="card-gradient border-border p-6 text-center hover:scale-105 smooth-transition">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telefone</h3>
              <p className="text-foreground/70">
                (11) 9 9999-9999<br />
                (11) 3333-3333
              </p>
            </Card>
            
            <Card className="card-gradient border-border p-6 text-center hover:scale-105 smooth-transition">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Horário</h3>
              <p className="text-foreground/70">
                Seg - Dom<br />
                18h às 23h
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de fazer um pedido!', '_blank')}
              size="lg"
              className="primary-gradient text-white text-lg px-8 py-4 hover:scale-105 smooth-transition glow-effect"
            >
              Fale Conosco pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gradient-primary mb-4">Cantinho do Pastel</h3>
          <p className="text-foreground/60 mb-4">
            © 2024 Cantinho do Pastel. Todos os direitos reservados.
          </p>
          <p className="text-sm text-foreground/50">
            Feito com ❤️ para os amantes de pastéis
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;