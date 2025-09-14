import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Star, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useReviews } from '@/contexts/ReviewsContext';
import ProductReviews from '@/components/ProductReviews';
import StarRating from '@/components/StarRating';
import pastelFrango from '@/assets/pastel-frango.jpg';
import pastelCarne from '@/assets/pastel-carne.jpg';
import pastelQueijo from '@/assets/pastel-queijo.jpg';

// Dados dos produtos (usando as imagens reais do projeto)
const productData = [
  // Oferta do Dia
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
  },
  
  // Pastéis Tradicionais
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
  },
  
  // Sabores Exclusivos
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
  },
  
  // Combos
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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getAverageRating, getReviewsByProduct } = useReviews();
  const [product, setProduct] = useState<any>(null);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    // Encontrar o produto pelo ID
    const foundProduct = productData.find(p => p.id === parseInt(id || '0'));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Se não encontrar o produto, redirecionar para a página inicial
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  // Obter avaliações reais do produto
  const averageRating = getAverageRating(product.id);
  const reviews = getReviewsByProduct(product.id);
  const displayRating = averageRating > 0 ? averageRating : product.rating;

  // Função para adicionar ao carrinho com feedback visual
  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedToCart(true);
    
    // Esconder a mensagem após 2 segundos
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div>
            <Card>
              <CardContent className="p-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="mb-6">
              <span className="text-sm text-accent font-medium uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-foreground mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-foreground/80 mb-6">
                {product.description}
              </p>
              
              {/* Avaliação */}
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={displayRating} size="lg" />
                <span className="text-lg font-medium">
                  {displayRating.toFixed(1)} ({reviews.length} avaliações)
                </span>
              </div>
              
              {/* Preço */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-accent">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-foreground/50 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.isPromo && (
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                    Promoção
                  </span>
                )}
              </div>
              
              {/* Botão Adicionar ao Carrinho */}
              <div className="relative">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full btn-primary primary-gradient text-white hover:scale-105 smooth-transition font-semibold py-3 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                {/* Mensagem de feedback visual */}
                {showAddedToCart && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-lg transition-opacity duration-300">
                    <div className="flex items-center text-white font-semibold">
                      <Check className="w-5 h-5 mr-2" />
                      Adicionado ao carrinho!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Avaliações */}
        <div className="mt-12">
          <ProductReviews productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;