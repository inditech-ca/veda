import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

// Simulating Async Backend Calls
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS.find((p) => p.id === id)), 300);
  });
};

export const submitOrder = async (cart: any, user: any): Promise<{ success: boolean; orderId: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, orderId: `ORD-${Math.floor(Math.random() * 10000)}` }), 1500);
  });
};

export const getRecommendedProducts = async (dosha: string): Promise<Product[]> => {
    const products = await getProducts();
    return products.filter(p => p.dosha === dosha || p.dosha === 'Tridoshic');
}
