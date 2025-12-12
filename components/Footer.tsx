import React from 'react';
import { Leaf, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-veda-900 text-veda-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-veda-300" />
              <span className="font-serif text-xl font-bold text-veda-50">VedaLife</span>
            </div>
            <p className="text-veda-300 text-sm leading-relaxed">
              Bringing ancient wisdom to modern living. 100% organic, ethically sourced Ayurvedic formulations for holistic wellness.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-veda-50">Shop</h3>
            <ul className="space-y-2 text-sm text-veda-300">
              <li><a href="#" className="hover:text-white transition">All Products</a></li>
              <li><a href="#" className="hover:text-white transition">By Dosha</a></li>
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Gift Sets</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-veda-50">Learn</h3>
            <ul className="space-y-2 text-sm text-veda-300">
              <li><a href="#" className="hover:text-white transition">About Ayurveda</a></li>
              <li><a href="#" className="hover:text-white transition">Take the Dosha Quiz</a></li>
              <li><a href="#" className="hover:text-white transition">Our Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Ingredient Sourcing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-veda-50">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-veda-300 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-veda-300 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-veda-300 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
            </div>
            <div className="flex items-center gap-2 text-sm text-veda-300">
              <Mail className="w-4 h-4" />
              <span>hello@vedalife.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-veda-800 mt-12 pt-8 text-center text-xs text-veda-400">
          <p>&copy; {new Date().getFullYear()} VedaLife Ayurveda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
