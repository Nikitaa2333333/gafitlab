import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, SUBCATEGORIES } from '../lib/data';
import Breadcrumbs from '../components/Breadcrumbs';
import { ArrowRight, Check } from 'lucide-react';
import { ROUTES } from '../lib/routes';

const SubcategoryPage: React.FC = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId: string }>();
  const [sortBy, setSortBy] = React.useState<'name' | 'stock'>('name');

  const subcategory = SUBCATEGORIES.find(s => s.id === subcategoryId);
  const products = React.useMemo(() => {
    const list = PRODUCTS.filter(p => p.subcategoryId === subcategoryId);
    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return [...list].sort((a, b) => (a.inStock === b.inStock ? 0 : a.inStock ? -1 : 1));
    }
  }, [subcategoryId, sortBy]);

  if (!subcategory) return <div className="p-20 text-center">Подкатегория не найдена</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            {subcategory.name}
          </h1>
          <p className="text-gray-500 font-medium">{products.length} позиций в категории</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Сортировать:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="name">По имени</option>
            <option value="stock">По наличию</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              to={ROUTES.PRODUCT(categoryId!, subcategoryId!, product.id)}
              className="glass-panel group rounded-3xl overflow-hidden border border-white/40 hover:bg-white/60 flex flex-col"
            >
              <div className="aspect-[4/3] bg-white/50 relative overflow-hidden">
                <img
                  src={`https://placehold.co/600x450/f1f5f9/94a3b8?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.inStock && (
                  <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Check className="w-3 h-3" /> В наличии
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-gray-900 mt-auto group/btn">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 glass-panel rounded-3xl">
            Товары в данной категории временно отсутствуют
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
