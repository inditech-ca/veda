export type Dosha = 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dosha: Dosha;
  image: string;
  rating: number;
  reviews: number;
  benefits: string[];
  ingredients: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface QuizResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: Dosha;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
