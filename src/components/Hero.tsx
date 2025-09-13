import { Button } from '@/components/ui/button';
import { ArrowDown, Star } from 'lucide-react';
import heroImage from '@/assets/hero-pastels.jpg';

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Deliciosos pastéis do Cantinho do Pastel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6 animate-pulse-glow">
            <Star className="w-4 h-4 text-accent animate-bounce-gentle" fill="currentColor" />
            <span className="text-accent font-medium text-sm">
              Os melhores pastéis da cidade
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            O Sabor que
            <br />
            <span className="text-gradient-primary">Merece Maratona!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubra os melhores pastéis da cidade e nossas promoções imperdíveis. 
            Cada mordida é uma experiência única!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          </div>

          {/* Scroll Indicator */}
          <div className="animate-float">
            <ArrowDown className="w-6 h-6 text-foreground/60 mx-auto cursor-pointer hover:text-primary smooth-transition" onClick={scrollToMenu} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default Hero;