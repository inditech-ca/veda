import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Flame, Droplets } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-cover bg-center flex items-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544367563-12123d8959f9?auto=format&fit=crop&q=80&w=2000")' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 drop-shadow-md">
            Balance Your Body,<br />Restore Your Soul
          </h1>
          <p className="text-xl text-veda-100 mb-8 max-w-2xl drop-shadow">
            Discover 100% organic Ayurvedic remedies tailored to your unique Dosha. Ancient wisdom for modern holistic health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link to="/shop" className="bg-nature hover:bg-nature-dark text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Shop Remedies <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dosha-quiz" className="bg-white/10 backdrop-blur-md border border-white/50 text-white hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition-all">
              Discover Your Dosha
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Dosha */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center text-veda-900 mb-12">Shop by Dosha</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/shop?dosha=Vata" className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="Vata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-indigo-900/30 group-hover:bg-indigo-900/40 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Wind className="w-12 h-12 mb-2" />
              <h3 className="text-2xl font-serif font-bold">Vata</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 mt-2">Air & Ether</p>
            </div>
          </Link>
          
          <Link to="/shop?dosha=Pitta" className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer">
            <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=800" alt="Pitta" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-red-900/30 group-hover:bg-red-900/40 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Flame className="w-12 h-12 mb-2" />
              <h3 className="text-2xl font-serif font-bold">Pitta</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 mt-2">Fire & Water</p>
            </div>
          </Link>

          <Link to="/shop?dosha=Kapha" className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800" alt="Kapha" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/40 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Droplets className="w-12 h-12 mb-2" />
              <h3 className="text-2xl font-serif font-bold">Kapha</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 mt-2">Earth & Water</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-veda-100 rounded-3xl p-8 sm:p-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-nature font-bold tracking-wider text-sm uppercase">Curated Collection</span>
            <h2 className="text-3xl font-serif font-bold text-veda-900 mt-2">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center text-veda-700 font-semibold hover:text-nature transition">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="text-veda-700 font-semibold hover:text-nature transition inline-flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
