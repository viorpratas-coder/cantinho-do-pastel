import pastelFrango from '@/assets/pastel-frango.jpg';
import pastelCarne from '@/assets/pastel-carne.jpg';
import pastelQueijo from '@/assets/pastel-queijo.jpg';

const products = [
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

  // Especiais
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

export default products;