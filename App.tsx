import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import DoshaQuiz from './pages/DoshaQuiz';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import GeminiAdvisor from './components/GeminiAdvisor';
import { CartItem, Product } from './types';

// Cart Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Layout Component to handle conditional rendering of Navbar/Footer
const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    
    return (
        <>
            {!isAdmin && <Navbar />}
            <main className={isAdmin ? '' : 'min-h-screen'}>
                {children}
            </main>
            {!isAdmin && <Footer />}
            {!isAdmin && <GeminiAdvisor />}
        </>
    );
}

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dosha-quiz" element={<DoshaQuiz />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<div className="p-20 text-center">About Page Placeholder</div>} />
            </Routes>
        </Layout>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
