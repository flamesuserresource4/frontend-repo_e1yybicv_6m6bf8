import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = ({ onShop }) => {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs uppercase tracking-wider text-fuchsia-600 font-semibold mb-4">Digital Goods Marketplace</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            Sell and download premium digital products instantly
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Ebooks, design templates, and software licenses — secure checkout with popular wallets and bank transfer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onShop} className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
              Browse Products
            </button>
            <a href="#how-it-works" className="px-5 py-3 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50">
              How it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-slate-500">
            <div>
              <div className="text-2xl font-bold text-slate-900">Secure</div>
              <div className="text-sm">Wallets + QR Payments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">Instant</div>
              <div className="text-sm">Get downloads right away</div>
            </div>
          </div>
        </div>
        <div className="h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-50 via-cyan-50 to-fuchsia-50 border border-slate-200">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      {/* Soft gradients */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute -bottom-10 right-0 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;
