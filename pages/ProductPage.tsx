import React from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import Breadcrumbs from '../components/Breadcrumbs';
import { CheckCircle2, Download, Box } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find(p => p.id === productId);
  const { openModal } = useModal();

  if (!product) return <div className="p-20 text-center">Товар не найден</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Images */}
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl overflow-hidden aspect-[4/3] p-4 bg-white/40">
            <img
              src={`https://placehold.co/800x600/f8fafc/94a3b8?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel rounded-xl aspect-square cursor-pointer hover:border-blue-400 transition-colors overflow-hidden">
                <img
                  src={`https://placehold.co/200x200/f8fafc/cbd5e1?text=${i}`}
                  alt="thumbnail"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col">
          {product.inStock && (
            <div className="inline-flex items-center space-x-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full self-start mb-6 border border-green-100">
              <CheckCircle2 className="w-4 h-4" />
              <span>В наличии на складе</span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="prose prose-lg text-gray-500 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="glass-panel rounded-2xl p-8 mb-8 bg-white/40 border border-white shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 tracking-wider mb-6 flex items-center border-b border-gray-100 pb-4">
              <Box className="w-5 h-5 mr-3 text-blue-600" />
              Технические характеристики
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {product.specs.map((spec, idx) => {
                const [label, value] = spec.includes(':') ? spec.split(':') : [spec, ''];
                return (
                  <div key={idx} className="flex flex-col border-b border-gray-50 pb-2 last:border-0 md:last:border-b">
                    <span className="text-xs font-bold text-gray-400 tracking-tight">{label}</span>
                    <span className="text-gray-900 font-medium">{value || '✓'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => openModal(product.name)}
              className="flex-1 bg-gray-900 text-white font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Запросить КП
            </button>
            <button className="flex-1 border-2 border-gray-900 text-gray-900 font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              Связаться с менеджером
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
