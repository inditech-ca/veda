import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { Product } from '../types';
import { CATEGORIES, DOSHAS } from '../constants';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDosha, setSelectedDosha] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(100);

  const location = useLocation();

  useEffect(() => {
    // Check for query params (e.g., from Home page Dosha cards)
    const params = new URLSearchParams(location.search);
    const doshaParam = params.get('dosha');
    if (doshaParam) {
      setSelectedDosha(doshaParam);
    }
    
    fetchProducts();
  }, [location]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedDosha !== 'All') {
      result = result.filter(p => p.dosha === selectedDosha || p.dosha === 'Tridoshic');
    }

    result = result.filter(p => p.price <= priceRange);

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedDosha, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-veda-900">Apothecary Shop</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mt-4 flex items-center gap-2 px-4 py-2 bg-veda-100 rounded-lg text-veda-800"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-veda-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-veda-800 border-b border-veda-100 pb-2">
              <SlidersHorizontal className="w-5 h-5" />
              <h2 className="font-bold">Filters</h2>
            </div>

            {/* Dosha Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm text-veda-600 mb-3 uppercase tracking-wide">Dosha</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="dosha" checked={selectedDosha === 'All'} onChange={() => setSelectedDosha('All')} className="text-nature focus:ring-nature" />
                  <span className="text-veda-800">All Doshas</span>
                </label>
                {DOSHAS.map(dosha => (
                  <label key={dosha} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="dosha" checked={selectedDosha === dosha} onChange={() => setSelectedDosha(dosha)} className="text-nature focus:ring-nature" />
                    <span className="text-veda-800">{dosha}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm text-veda-600 mb-3 uppercase tracking-wide">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" checked={selectedCategory === 'All'} onChange={() => setSelectedCategory('All')} className="text-nature focus:ring-nature" />
                  <span className="text-veda-800">All Categories</span>
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="text-nature focus:ring-nature" />
                    <span className="text-veda-800">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold text-sm text-veda-600 mb-3 uppercase tracking-wide">Max Price: ${priceRange}</h3>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-veda-200 rounded-lg appearance-none cursor-pointer accent-nature"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="bg-veda-200 h-96 rounded-xl"></div>
               ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-veda-50 rounded-xl">
              <p className="text-xl text-veda-600">No natural remedies found matching your criteria.</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedDosha('All'); setPriceRange(100); }} className="mt-4 text-nature font-bold hover:underline">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
