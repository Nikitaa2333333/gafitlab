import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import {
  Search,
  FlaskConical,
  Microscope,
  Thermometer,
  Package,
  Beaker,
  Gauge,
  RefreshCw,
  Droplets,
  Pill,
  Wind,
  Sparkles,
  Armchair,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, SUBCATEGORIES } from '../lib/data';
import clsx from 'clsx';
import type { Product } from '../types';
import { ROUTES } from '../lib/routes';

const Home: React.FC = () => {
  const [searchMode, setSearchMode] = useState<'category' | 'manufacturer'>('category');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (id: string) => {
    const iconClass = "w-full h-full opacity-30 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110";
    switch (id) {
      case 'general-lab': return <FlaskConical className={iconClass} stroke="url(#grad-blue)" />;
      case 'consumables': return <Package className={iconClass} stroke="url(#grad-green)" />;
      case 'analytical': return <Beaker className={iconClass} stroke="url(#grad-purple)" />;
      case 'thermo': return <Thermometer className={iconClass} stroke="url(#grad-orange)" />;
      case 'measuring': return <Gauge className={iconClass} stroke="url(#grad-yellow)" />;
      case 'centrifuge': return <RefreshCw className={iconClass} stroke="url(#grad-teal)" />;
      case 'distillation': return <Droplets className={iconClass} stroke="url(#grad-cyan)" />;
      case 'pharmaceutical': return <Pill className={iconClass} stroke="url(#grad-pink)" />;
      case 'microscopes': return <Microscope className={iconClass} stroke="url(#grad-indigo)" />;
      case 'laminar': return <Wind className={iconClass} stroke="url(#grad-sky)" />;
      case 'cleaning': return <Sparkles className={iconClass} stroke="url(#grad-emerald)" />;
      case 'furniture': return <Armchair className={iconClass} stroke="url(#grad-amber)" />;
      default: return <FlaskConical className={iconClass} stroke="url(#grad-blue)" />;
    }
  }

  // Calculate products per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach(product => {
      const sub = SUBCATEGORIES.find(s => s.id === product.subcategoryId);
      if (sub) {
        counts[sub.categoryId] = (counts[sub.categoryId] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Enrich products with category and subcategory names
  const enrichedProducts = useMemo(() => {
    return PRODUCTS.map(product => {
      const subcategory = SUBCATEGORIES.find(s => s.id === product.subcategoryId);
      const category = CATEGORIES.find(c => c.id === subcategory?.categoryId);
      return {
        ...product,
        subcategoryName: subcategory?.name,
        categoryName: category?.name,
        categoryId: category?.id,
      };
    });
  }, []);

  // Fuse.js configuration
  const fuse = useMemo(() => {
    return new Fuse(enrichedProducts, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'specs', weight: 1.5 },
        { name: 'categoryName', weight: 0.5 },
        { name: 'subcategoryName', weight: 0.7 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [enrichedProducts]);

  // Search results
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length >= 2) {
      const results = fuse.search(searchQuery);
      return results.map(result => result.item).slice(0, 5);
    }
    return [];
  }, [searchQuery, fuse]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
      {/* SVG Gradients Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
          <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="grad-sky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 text-center">
          GRAPHIC LAB
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
            <Search className="h-7 w-7 text-gray-500 group-focus-within:text-blue-600 transition-colors stroke-[2.5]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Поиск оборудования"
            className="block w-full pl-12 pr-4 py-4 rounded-2xl glass-panel bg-white/80 text-lg font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100/50 transition-all shadow-lg"
            placeholder="Поиск оборудования..."
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full glass-panel rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={ROUTES.PRODUCT(product.categoryId!, product.subcategoryId, product.id)}
                  onClick={() => setSearchQuery('')}
                  className="block px-4 py-3 hover:bg-white/50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {product.categoryName} → {product.subcategoryName}
                      </p>
                    </div>

                    <div className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${product.inStock
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                      }`}>
                      {product.inStock ? 'В наличии' : 'Под заказ'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="flex flex-row justify-center gap-4 sm:gap-8 py-3 sm:py-4 px-4 sm:px-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          <div className="text-center min-w-[70px]">
            <span className="block text-xl sm:text-2xl font-bold text-gray-900">{PRODUCTS.length}</span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-widest whitespace-nowrap">Товаров</span>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center min-w-[70px]">
            <span className="block text-xl sm:text-2xl font-bold text-gray-900">{CATEGORIES.length}</span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-widest whitespace-nowrap">Категорий</span>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center min-w-[70px]">
            <span className="block text-xl sm:text-2xl font-bold text-gray-900">12</span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-widest whitespace-nowrap">Брендов</span>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 p-1 bg-white/30 backdrop-blur-md rounded-xl border border-white/40">
          <button
            onClick={() => setSearchMode('category')}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-semibold min-h-[44px]",
              searchMode === 'category' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Категории
          </button>
          <button
            onClick={() => setSearchMode('manufacturer')}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-semibold min-h-[44px]",
              searchMode === 'manufacturer' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            Производители
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
        {searchMode === 'category' ? (
          CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={ROUTES.CATEGORY(category.id)}
              className="glass-card glass-panel rounded-3xl p-8 relative overflow-hidden group border border-white/40 hover:bg-white/60"
            >
              <div className="absolute -bottom-4 -right-4 w-40 h-40 transform rotate-12">
                {getIcon(category.id)}
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {categoryCounts[category.id] || 0} позиций
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight hyphens-auto break-words">
                    {category.name}
                  </h3>
                </div>

                <div className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100">
                  Посмотреть все
                </div>
              </div>
            </Link>
          ))
        ) : (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-3xl p-8 flex items-center justify-center col-span-1 row-span-1 hover:bg-white/60 cursor-pointer group text-center">
              <span className="text-2xl font-bold text-gray-300 group-hover:text-gray-800">BRAND {i + 1}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;