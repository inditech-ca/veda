import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Check, Shield, Truck, ShoppingCart } from 'lucide-react';
import { getProductById } from '../services/api';
import { Product } from '../types';
import { useCart } from '../App';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'benefits'>('desc');
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-veda-600">Preparing herbal wisdom...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-veda-100">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl object-cover" />
        </div>

        {/* Info Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-nature-light text-nature-dark rounded-full text-xs font-bold uppercase tracking-wide">
              {product.dosha} Friendly
            </span>
            <span className="text-veda-500 text-sm">{product.category}</span>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-veda-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-500">
               {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
               ))}
            </div>
            <span className="text-veda-600 text-sm border-l border-veda-300 pl-4">{product.reviews} Reviews</span>
          </div>

          <p className="text-xl font-bold text-veda-800 mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 mb-8">
            <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-nature hover:bg-nature-dark text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-nature/20"
            >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button className="px-6 py-4 border border-veda-300 rounded-xl hover:bg-veda-50 transition">
                <span className="sr-only">Wishlist</span>
                <span className="text-2xl text-veda-400">♥</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 text-center text-xs text-veda-600">
            <div className="flex flex-col items-center p-3 bg-veda-50 rounded-lg">
                <Shield className="w-6 h-6 mb-2 text-veda-500" />
                <span>100% Organic</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-veda-50 rounded-lg">
                <Check className="w-6 h-6 mb-2 text-veda-500" />
                <span>Lab Tested</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-veda-50 rounded-lg">
                <Truck className="w-6 h-6 mb-2 text-veda-500" />
                <span>Free Shipping</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-veda-200 pt-6">
            <div className="flex space-x-6 border-b border-veda-200 mb-4">
                {['desc', 'ingredients', 'benefits'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                            activeTab === tab ? 'text-nature border-b-2 border-nature' : 'text-veda-400 hover:text-veda-600'
                        }`}
                    >
                        {tab === 'desc' ? 'Description' : tab}
                    </button>
                ))}
            </div>
            <div className="text-gray-600 text-sm leading-relaxed min-h-[100px]">
                {activeTab === 'desc' && <p>{product.description} Handcrafted in small batches to ensure potency and purity.</p>}
                {activeTab === 'ingredients' && (
                    <ul className="list-disc ml-5 space-y-1">
                        {product.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                )}
                {activeTab === 'benefits' && (
                    <div className="grid grid-cols-2 gap-2">
                         {product.benefits.map(ben => (
                             <div key={ben} className="flex items-center gap-2">
                                 <Check className="w-4 h-4 text-nature" /> {ben}
                             </div>
                         ))}
                    </div>
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
