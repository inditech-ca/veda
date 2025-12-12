import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import { submitOrder } from '../services/api';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Mock user
    const user = { id: 'u1', name: 'Guest' };
    await submitOrder(cart, user);
    clearCart();
    setIsCheckingOut(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
        <div className="max-w-md mx-auto py-20 text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌿</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-veda-900 mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-8">Thank you for choosing VedaLife. Your path to wellness is on its way. An email confirmation has been sent.</p>
            <Link to="/" className="inline-block bg-nature text-white px-8 py-3 rounded-full hover:bg-nature-dark transition">
                Return Home
            </Link>
        </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-veda-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any remedies yet.</p>
        <Link to="/shop" className="text-nature font-bold hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-veda-900 mb-8">Your Wellness Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-veda-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-veda-900 text-lg">{item.name}</h3>
                <p className="text-sm text-veda-500 mb-2">{item.category}</p>
                <div className="font-bold text-nature">${item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-veda-200 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-veda-50"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-veda-50"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2">
                    <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-veda-100 sticky top-24">
                <h3 className="font-serif font-bold text-xl mb-6 text-veda-900">Order Summary</h3>
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-veda-200 pt-4 flex justify-between font-bold text-lg text-veda-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-nature hover:bg-nature-dark text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isCheckingOut ? 'Processing...' : (
                        <>Proceed to Checkout <ArrowRight className="w-5 h-5" /></>
                    )}
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">Secure Payment via MockPay</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
