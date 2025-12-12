import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Leaf, ShieldCheck } from 'lucide-react';
import { useCart } from '../App';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? 'text-veda-600 font-semibold' : 'text-veda-800 hover:text-veda-600';

  return (
    <nav className="bg-veda-50 border-b border-veda-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-nature" />
              <span className="font-serif text-2xl font-bold text-veda-900 tracking-wide">VedaLife</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/shop" className={isActive('/shop')}>Shop</Link>
              <Link to="/dosha-quiz" className={isActive('/dosha-quiz')}>Dosha Quiz</Link>
              <Link to="/about" className={isActive('/about')}>About</Link>
              <Link to="/admin" className={isActive('/admin')}>Admin</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-veda-800 hover:text-veda-600">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm text-veda-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Organic</span>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-veda-800 hover:bg-veda-200 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-veda-100 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-veda-900 hover:bg-veda-200">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-veda-900 hover:bg-veda-200">Shop</Link>
            <Link to="/dosha-quiz" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-veda-900 hover:bg-veda-200">Dosha Quiz</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-veda-900 hover:bg-veda-200">Admin Panel</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
