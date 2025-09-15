import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ProductReviews from '@/components/ProductReviews';
import products from '@/data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const productId = parseInt(id || '0');
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      // Adiciona 1 como quantidade padrão
      addToCart({ ...product, quantity: 1 });
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a página principal
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div className="flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          
          {/* Informações do Produto */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">{product.rating}</span>
            </div>
            
            <div className="text-3xl font-bold mb-6">
              R$ {product.price.toFixed(2).replace('.', ',')}
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through ml-2">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            
            {/* Botão Adicionar ao Carrinho */}
            <Button 
              onClick={handleAddToCart}
              className="w-full btn-primary primary-gradient text-white hover:scale-105 smooth-transition font-semibold py-3 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
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