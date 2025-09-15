import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useReviews } from '@/contexts/ReviewsContext';

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

// Componente para exibir estrelas de avaliação
const RatingDisplay = ({ rating, hasReviews }: { rating: number; hasReviews: boolean }) => {
  // Se não houver avaliações, não mostrar nenhuma estrela preenchida
  if (!hasReviews) {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 text-gray-300"
          />
        ))}
        <span className="text-xs font-medium ml-1">Sem avaliações</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-accent fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-xs font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getAverageRating, getReviewsByProduct, reviews } = useReviews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(3); // Padrão para desktop
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [reviewCounts, setReviewCounts] = useState<Record<number, number>>({});
  
  // Atualizar o número de produtos visíveis com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleProducts(1); // Mobile
      } else {
        setVisibleProducts(3); // Desktop
      }
    };

    handleResize(); // Verificar no carregamento
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualizar avaliações e contagem quando os produtos mudarem
  useEffect(() => {
    const newRatings: Record<number, number> = {};
    const newReviewCounts: Record<number, number> = {};
    products.forEach(product => {
      const productReviews = getReviewsByProduct(product.id);
      if (productReviews.length > 0) {
        const averageRating = getAverageRating(product.id);
        newRatings[product.id] = averageRating;
      } else {
        newRatings[product.id] = 0; // Sem avaliações
      }
      newReviewCounts[product.id] = productReviews.length;
    });
    setRatings(newRatings);
    setReviewCounts(newReviewCounts);
  }, [products, getAverageRating, getReviewsByProduct]);

  // Atualizar avaliações e contagem quando as avaliações no contexto mudarem
  useEffect(() => {
    const newRatings: Record<number, number> = {};
    const newReviewCounts: Record<number, number> = {};
    products.forEach(product => {
      const productReviews = getReviewsByProduct(product.id);
      if (productReviews.length > 0) {
        const averageRating = getAverageRating(product.id);
        newRatings[product.id] = averageRating;
      } else {
        newRatings[product.id] = 0; // Sem avaliações
      }
      newReviewCounts[product.id] = productReviews.length;
    });
    setRatings(newRatings);
    setReviewCounts(newReviewCounts);
  }, [reviews]); // Dependência nas avaliações do contexto

  // Número total de "slides" possíveis
  const maxIndex = Math.max(0, products.length - visibleProducts);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > maxIndex ? maxIndex : newIndex;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? 0 : newIndex;
    });
  }, []);

  // Adicionar navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Função para lidar com o clique no produto
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
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
            disabled={currentIndex === 0}
            className="border-border hover:bg-primary hover:text-white smooth-transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="border-border hover:bg-primary hover:text-white smooth-transition"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
        >
          {products.map((product) => {
            // Usar a avaliação armazenada no estado
            const displayRating = ratings[product.id] || product.rating;
            const reviewCount = reviewCounts[product.id] || 0;
            
            return (
              <div key={product.id} className="flex-none w-full md:w-1/3 px-3">
                <Card className="card-gradient border-border hover-shadow netflix-hover group cursor-pointer overflow-hidden relative backdrop-blur-sm bg-card/80">
                  {/* Product Image */}
                  <div 
                    className="relative overflow-hidden rounded-t-lg"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 smooth-transition"
                    />
                    
                    {/* Promo Badge */}
                    {product.isPromo && (
                      <div className="absolute top-3 left-3 primary-gradient text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-gentle glow-effect">
                        🔥 Promoção!
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <RatingDisplay rating={displayRating} hasReviews={reviewCount > 0} />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-accent font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary smooth-transition cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    
                    <p 
                      className="text-sm text-foreground/70 mb-4 line-clamp-2 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.description}
                    </p>

                    {/* Reviews Info */}
                    {reviewCount > 0 && (
                      <div 
                        className="flex items-center space-x-1 mb-3 text-sm text-foreground/70 cursor-pointer hover:text-primary"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{reviewCount} avaliação{reviewCount > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {/* Call to Action for Reviews */}
                    {reviewCount === 0 && (
                      <div 
                        className="flex items-center space-x-1 mb-3 text-sm text-foreground/70 cursor-pointer hover:text-primary"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <Star className="w-4 h-4" />
                        <span>Seja o primeiro a avaliar</span>
                      </div>
                    )}

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

                    {/* Add to Cart Button */}
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full btn-primary primary-gradient text-white hover:scale-105 smooth-transition font-semibold py-3 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-6 md:hidden">
        <div className="flex space-x-2">
          {Array.from({ length: Math.max(1, products.length - visibleProducts + 1) }).map((_, index) => (
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