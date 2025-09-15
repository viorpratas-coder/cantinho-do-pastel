import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Star } from 'lucide-react';
import { useState } from 'react';

const FidelityFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como faço para participar do programa de fidelidade?",
      answer: "É simples! Faça seu pedido através do nosso site, gere um código único e informe-o ao pagar via WhatsApp. Após a confirmação do pagamento, você receberá um carimbo automaticamente."
    },
    {
      question: "Quantos carimbos preciso para ganhar um pastel grátis?",
      answer: "Você precisa coletar 5 carimbos para ganhar 1 pastel grátis. Após acumular os 5 carimbos, você poderá resgatar seu prêmio na próxima compra."
    },
    {
      question: "Os carimbos têm validade?",
      answer: "Não, os carimbos não têm validade e não expiram. Você pode acumulá-los ao longo do tempo até completar os 5 necessários para o resgate."
    },
    {
      question: "Posso transferir meus carimbos para outra pessoa?",
      answer: "Não, os carimbos são pessoais e intransferíveis. Eles estão vinculados ao seu histórico de pedidos e não podem ser transferidos para outros clientes."
    },
    {
      question: "O que acontece se eu perder o código do pedido?",
      answer: "Se você perder o código, infelizmente não será possível recuperá-lo. Recomendamos copiar o código imediatamente após gerá-lo e salvá-lo em um local seguro antes de fechar a página."
    },
    {
      question: "Posso usar meu pastel grátis em qualquer pedido?",
      answer: "O pastel grátis pode ser usado em qualquer pedido, mas deve ser resgatado na próxima compra. O valor do pastel grátis será descontado do total do pedido."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 text-yellow-500" />
          Perguntas Frequentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FidelityFAQ;