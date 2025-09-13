import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, MessageCircle, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isPromo?: boolean;
  originalPrice?: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2));
  };

  const handleWhatsApp = (product: Product) => {
    const message = `Olá! Quero pedir o ${product.name} no valor de R$ ${product.price.toFixed(2)}.`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="mb-12">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="border-border hover:bg-primary hover:text-white smooth-transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="border-border hover:bg-primary hover:text-white smooth-transition"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex smooth-transition"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none w-full md:w-1/3 px-3">
              <Card className="card-gradient border-border hover-shadow netflix-hover group cursor-pointer">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 smooth-transition"
                  />
                  
                  {/* Promo Badge */}
                  {product.isPromo && (
                    <div className="absolute top-3 left-3 primary-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Promoção!
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-accent" fill="currentColor" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-accent font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary smooth-transition">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-accent">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-foreground/50 line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <Button 
                    onClick={() => handleWhatsApp(product)}
                    className="w-full primary-gradient text-white hover:scale-105 smooth-transition"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Pedir pelo WhatsApp
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-6 md:hidden">
        <div className="flex space-x-2">
          {Array.from({ length: Math.max(1, products.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full smooth-transition ${
                currentIndex === index ? 'bg-primary' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;