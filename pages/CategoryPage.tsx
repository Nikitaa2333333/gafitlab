import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBCATEGORIES, CATEGORIES } from '../lib/data';
import Breadcrumbs from '../components/Breadcrumbs';
import { ROUTES } from '../lib/routes';
import { Folder } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const subcategories = SUBCATEGORIES.filter(s => s.categoryId === categoryId);

  if (!category) return <div className="p-20 text-center">Категория не найдена</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs />

      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          {category.name}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          Выберите подкатегорию для просмотра доступного оборудования.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <Link
              key={sub.id}
              to={ROUTES.SUBCATEGORY(categoryId!, sub.id)}
              className="glass-panel group relative p-8 rounded-3xl overflow-hidden border border-white/40 hover:bg-white/60"
            >
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <Folder className="w-10 h-10 text-gray-300 group-hover:text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {sub.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 glass-panel rounded-3xl">
            Нет доступных подкатегорий
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
