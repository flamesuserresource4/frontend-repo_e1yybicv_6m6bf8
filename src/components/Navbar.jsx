import React from 'react';
import { ShoppingCart, Home, Store, Receipt } from 'lucide-react';

const Navbar = ({ currentPage, setPage, cartCount }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400" />
            <span className="font-semibold text-slate-800 text-lg">DigiMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-slate-600">
            <button onClick={() => setPage('home')} className={`flex items-center gap-2 hover:text-slate-900 transition ${currentPage==='home' ? 'text-slate-900' : ''}`}>
              <Home size={18} /> Home
            </button>
            <button onClick={() => setPage('products')} className={`flex items-center gap-2 hover:text-slate-900 transition ${currentPage==='products' ? 'text-slate-900' : ''}`}>
              <Store size={18} /> Products
            </button>
            <button onClick={() => setPage('orders')} className={`flex items-center gap-2 hover:text-slate-900 transition ${currentPage==='orders' ? 'text-slate-900' : ''}`}>
              <Receipt size={18} /> My Orders
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setPage('cart')} className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-fuchsia-500 text-white text-xs grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 rounded-lg border border-slate-200" onClick={() => setPage(currentPage==='menu' ? 'home' : 'menu')}>
              ☰
            </button>
          </div>
        </div>
        {currentPage === 'menu' && (
          <div className="md:hidden pb-4 flex flex-col gap-2 text-slate-700">
            <button onClick={() => setPage('home')} className="text-left px-2 py-2 rounded-lg hover:bg-slate-100">Home</button>
            <button onClick={() => setPage('products')} className="text-left px-2 py-2 rounded-lg hover:bg-slate-100">Products</button>
            <button onClick={() => setPage('orders')} className="text-left px-2 py-2 rounded-lg hover:bg-slate-100">My Orders</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
