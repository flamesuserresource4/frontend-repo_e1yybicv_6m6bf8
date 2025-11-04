import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid, { productsData } from './components/ProductGrid';
import CartPage from './components/CartPage';
import { CheckCircle2, ExternalLink } from 'lucide-react';

const LS_CART = 'digimarket_cart_v1';
const LS_ORDERS = 'digimarket_orders_v1';

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [paidToast, setPaidToast] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(LS_CART) || '[]');
      const o = JSON.parse(localStorage.getItem(LS_ORDERS) || '[]');
      setCart(c);
      setOrders(o);
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(LS_CART, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setPage('cart');
  };

  const handlePaymentSuccess = () => {
    const order = {
      id: `ord_${Date.now()}`,
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      createdAt: new Date().toISOString(),
      downloads: cart.map((i) => ({ id: i.id, title: i.title, url: i.downloadUrl }))
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setPage('orders');
    setPaidToast(true);
    setTimeout(() => setPaidToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Navbar currentPage={page} setPage={setPage} cartCount={cartCount} />

      {paidToast && (
        <div className="fixed top-20 inset-x-0 z-30 px-4">
          <div className="max-w-md mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 shadow">
            <CheckCircle2 className="text-emerald-600" size={20} />
            <div className="text-sm text-emerald-800">Payment confirmed! Your downloads are now available in My Orders.</div>
          </div>
        </div>
      )}

      {page === 'home' && (
        <>
          <HeroSection onShop={() => setPage('products')} />
          <ProductGrid onAddToCart={addToCart} />
        </>
      )}

      {page === 'products' && (
        <ProductGrid onAddToCart={addToCart} />
      )}

      {page === 'cart' && (
        <CartPage cart={cart} setCart={setCart} onPaymentSuccess={handlePaymentSuccess} />
      )}

      {page === 'orders' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
                No orders yet. Complete a payment to unlock downloads.
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b bg-slate-50">
                      <div className="text-sm text-slate-600">Order <span className="font-medium text-slate-900">{o.id}</span></div>
                      <div className="text-sm text-slate-600">Placed on {new Date(o.createdAt).toLocaleString()}</div>
                      <div className="text-sm font-semibold">Total ${o.total.toFixed(2)}</div>
                    </div>
                    <div className="p-5 grid md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        {o.items.map((it) => (
                          <div key={it.id} className="flex items-center gap-3">
                            <img src={it.image} alt={it.title} className="h-14 w-14 rounded-lg object-cover" />
                            <div>
                              <div className="font-medium">{it.title}</div>
                              <div className="text-sm text-slate-600">Qty {it.qty} • ${it.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm text-slate-600">Downloads</div>
                        {o.downloads.map((d) => (
                          <a key={d.id} href={d.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border p-3 hover:bg-slate-50">
                            <span className="truncate">{d.title}</span>
                            <ExternalLink size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>© {new Date().getFullYear()} DigiMarket. All rights reserved.</div>
          <nav className="flex items-center gap-6">
            <a className="hover:text-slate-900" href="#about">About</a>
            <a className="hover:text-slate-900" href="#privacy">Privacy Policy</a>
            <a className="hover:text-slate-900" href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
