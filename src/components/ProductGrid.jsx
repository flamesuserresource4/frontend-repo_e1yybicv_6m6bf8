import React from 'react';
import { Star } from 'lucide-react';

const productsData = [
  {
    id: 'ebook-design-systems',
    title: 'Design Systems Playbook (eBook)',
    price: 19,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEZXNpZ24lMjBTeXN0ZW1zJTIwUGxheWJvb2slMjAlMjhlQm9vayUyOXxlbnwwfDB8fHwxNzYyMjQ3MjgxfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    downloadUrl: 'https://files.samplescdn.com/sample.pdf'
  },
  {
    id: 'template-portfolio',
    title: 'Creative Portfolio Template (Figma)',
    price: 29,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    downloadUrl: 'https://files.samplescdn.com/sample.zip'
  },
  {
    id: 'icons-pack',
    title: 'Minimal Icons Pack (SVG)',
    price: 12,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27a?q=80&w=1600&auto=format&fit=crop',
    downloadUrl: 'https://files.samplescdn.com/sample.zip'
  },
  {
    id: 'license-manager',
    title: 'License Manager (JS Library)',
    price: 49,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    downloadUrl: 'https://files.samplescdn.com/sample.zip'
  }
];

const ProductCard = ({ product, onAdd }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
    <div className="relative">
      <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-slate-800 line-clamp-2 min-h-[48px]">{product.title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={16} fill="#f59e0b" />
          <span className="text-sm text-slate-600">{product.rating}</span>
        </div>
        <div className="text-lg font-bold text-slate-900">${product.price}</div>
      </div>
      <button onClick={() => onAdd(product)} className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductGrid = ({ onAddToCart }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-600">Handpicked digital assets to supercharge your work</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
export { productsData };
