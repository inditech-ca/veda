import React, { useState } from 'react';
import { Package, Users, ShoppingBag, BarChart3, Edit, Trash, Plus } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  return (
    <div className="min-h-screen bg-veda-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-veda-900 min-h-screen text-veda-100 hidden md:block">
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Admin Panel</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-veda-800 text-white' : 'hover:bg-veda-800'}`}
              >
                <Package className="w-5 h-5" /> Products
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-veda-800 text-white' : 'hover:bg-veda-800'}`}
              >
                <ShoppingBag className="w-5 h-5" /> Orders
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-veda-800 transition-colors">
                <Users className="w-5 h-5" /> Customers
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-veda-800 transition-colors">
                <BarChart3 className="w-5 h-5" /> Analytics
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-veda-900 capitalize">{activeTab} Management</h1>
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm text-gray-500">Admin User</span>
              </div>
            </div>
          </header>

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm border border-veda-200 overflow-hidden">
              <div className="p-6 border-b border-veda-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-veda-800">Product List</h3>
                <button className="bg-nature text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-nature-dark">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-veda-50 text-veda-600 font-semibold text-sm">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-veda-100">
                    {MOCK_PRODUCTS.map(product => (
                      <tr key={product.id} className="hover:bg-veda-50/50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <span className="font-medium text-veda-900">{product.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-gray-900 font-medium">${product.price}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">In Stock</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 text-gray-400">
                            <button className="hover:text-nature"><Edit className="w-4 h-4" /></button>
                            <button className="hover:text-red-500"><Trash className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
             <div className="bg-white rounded-xl shadow-sm border border-veda-200 p-12 text-center text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-veda-300" />
                <p>No active orders in this demo environment.</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
