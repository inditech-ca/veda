import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-veda-100 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-veda-800 uppercase tracking-wider">
          {product.dosha}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-veda-500 font-bold uppercase tracking-wide mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-serif font-semibold text-veda-900 mb-1 group-hover:text-nature-dark truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-veda-100">
          <span className="text-xl font-bold text-veda-800">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-veda-100 text-veda-800 hover:bg-veda-800 hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
