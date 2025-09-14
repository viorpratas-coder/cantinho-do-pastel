import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511972239005?text=Olá! Gostaria de fazer um pedido no Cantinho do Pastel!', '_blank');
  };

  return (
    <Button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full primary-gradient text-white hover:scale-125 smooth-transition glow-effect animate-glow shadow-2xl btn-primary"
      size="icon"
    >
      <MessageCircle className="w-7 h-7" />
    </Button>
  );
};

export default WhatsAppButton;