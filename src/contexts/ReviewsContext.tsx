import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Review {
  id: string;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Interface para a função addReview (sem productId pois é passado separadamente)
interface ReviewInput {
  userName: string;
  rating: number;
  comment: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (productId: number, review: ReviewInput) => void;
  getReviewsByProduct: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('productReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  // Salvar avaliações no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId: number, review: ReviewInput) => {
    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      ...review,
      date: new Date().toLocaleDateString('pt-BR') // Formato DD/MM/YYYY
    };
    
    setReviews(prev => [...prev, newReview]);
  };

  const getReviewsByProduct = (productId: number) => {
    return reviews.filter(review => review.productId === productId);
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getReviewsByProduct(productId);
    if (productReviews.length === 0) return 0;
    
    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / productReviews.length) * 10) / 10; // Arredondar para 1 casa decimal
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getReviewsByProduct,
        getAverageRating
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};