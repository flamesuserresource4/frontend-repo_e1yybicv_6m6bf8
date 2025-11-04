import React, { useMemo, useState } from 'react';
import { X, Trash2, CheckCircle2, Download } from 'lucide-react';

const PaymentModal = ({ open, onClose, onConfirm, total }) => {
  if (!open) return null;

  const QR = ({ label, color }) => (
    <div className="flex flex-col items-center p-4 rounded-2xl border border-slate-200 bg-white">
      <div className={`h-28 w-28 rounded-xl grid place-items-center bg-gradient-to-br ${color}`}>
        <div className="h-20 w-20 bg-white" style={{ backgroundSize: '12px 12px', backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)' }} />
      </div>
      <div className="mt-3 text-sm font-medium text-slate-700">{label}</div>
      <div className="text-xs text-slate-500">Scan to pay</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-30 grid place-items-center p-4 bg-slate-900/60">
      <div className="w-full max-w-3xl rounded-3xl bg-white overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <div className="text-lg font-semibold text-slate-900">Proceed to Payment</div>
            <div className="text-sm text-slate-600">Total due: <span className="font-semibold text-slate-900">${total.toFixed(2)}</span></div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QR label="QRIS" color="from-fuchsia-200 to-indigo-200" />
          <QR label="DANA" color="from-sky-200 to-blue-200" />
          <QR label="ShopeePay" color="from-orange-200 to-amber-200" />
          <QR label="Bank Transfer" color="from-emerald-200 to-teal-200" />
        </div>
        <div className="px-6 pb-6 text-sm text-slate-600">
          After payment, click the confirmation button below. We will verify and unlock your downloads instantly.
        </div>
        <div className="px-6 pb-6">
          <button onClick={onConfirm} className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition flex items-center justify-center gap-2">
            <CheckCircle2 size={18} /> I have paid
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, setCart, onPaymentSuccess }) => {
  const [showPayment, setShowPayment] = useState(false);

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);

  const updateQty = (id, delta) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
            Your cart is empty. Add some products to proceed.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-sm text-slate-600">${item.price} • Qty: {item.qty}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 rounded-lg border">-</button>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 rounded-lg border">+</button>
                      <button onClick={() => removeItem(item.id)} className="ml-2 px-2 py-1 rounded-lg border text-red-600 flex items-center gap-1">
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold text-slate-900">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between mb-2 text-slate-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-4 text-slate-700">
                  <span>Fees</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button onClick={() => setShowPayment(true)} className="mt-4 w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
                  Proceed to Payment
                </button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-800"><Download size={16} /> Instant download available after payment.</div>
              </div>
            </aside>
          </div>
        )}
      </div>
      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onConfirm={() => {
          setShowPayment(false);
          onPaymentSuccess();
        }}
        total={total}
      />
    </section>
  );
};

export default CartPage;
