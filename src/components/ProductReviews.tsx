import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import StarRating from './StarRating';
import { useReviews, Review } from '@/contexts/ReviewsContext';

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const { reviews, getReviewsByProduct, addReview } = useReviews();
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productReviews, setProductReviews] = useState<Review[]>([]);

  // Atualizar avaliações quando o contexto de avaliações mudar
  useEffect(() => {
    const updatedReviews = getReviewsByProduct(productId);
    setProductReviews(updatedReviews);
  }, [reviews, productId, getReviewsByProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userRating === 0) {
      toast({
        title: "Avaliação incompleta",
        description: "Por favor, selecione uma avaliação.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Adicionar a nova avaliação
    addReview(productId, {
      userName,
      rating: userRating,
      comment
    });
    
    // Resetar formulário
    setUserRating(0);
    setUserName('');
    setComment('');
    setIsSubmitting(false);
    
    // Mostrar mensagem de sucesso
    toast({
      title: "Avaliação enviada!",
      description: "Sua avaliação foi registrada com sucesso. Obrigado por compartilhar sua experiência!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Formulário de Avaliação */}
      <Card>
        <CardHeader>
          <CardTitle>Deixe sua avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Sua avaliação
              </label>
              <StarRating 
                rating={userRating} 
                size="lg" 
                interactive 
                onRatingChange={setUserRating} 
              />
            </div>
            
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-2">
                Seu nome
              </label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Comentário (opcional)
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Compartilhe sua experiência com este produto..."
                rows={3}
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Avaliações Existentes */}
      {productReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Avaliações dos Clientes ({productReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <p className="text-sm text-foreground/70">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  {review.comment ? (
                    <p className="text-foreground/80">{review.comment}</p>
                  ) : (
                    <p className="text-foreground/50 italic">Nenhum comentário adicionado.</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Mensagem quando não há avaliações */}
      {productReviews.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Avaliações dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 text-center py-4">
              Ainda não há avaliações para este produto. Seja o primeiro a compartilhar sua experiência!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductReviews;