import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import FeedbackModal from './components/FeedbackModal';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import ProductPage from './pages/ProductPage';
import { GlobalSearch } from './components/GlobalSearch';
import { ROUTES } from './lib/routes';
import { useModal } from './context/ModalContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { openModal } = useModal();

  return (
    <div className={`relative min-h-screen font-sans text-gray-900 ${isHomePage ? 'bg-gradient-to-br from-slate-50 to-blue-50/50' : 'bg-[#f8fafc]'}`}>
      <ScrollToTop />

      <GlobalSearch />

      <main className="relative z-10">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="/catalog/:categoryId" element={<CategoryPage />} />
          <Route path="/catalog/:categoryId/:subcategoryId" element={<SubcategoryPage />} />
          <Route path="/catalog/:categoryId/:subcategoryId/:productId" element={<ProductPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <FeedbackModal />

      {/* Floating Action Button - Global */}
      <button
        onClick={() => openModal()}
        aria-label="Связаться с менеджером"
        className="fixed bottom-8 right-8 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center justify-center font-semibold whitespace-nowrap hover:bg-gray-800 active:scale-95 transition-all"
      >
        Связаться с менеджером
      </button>

      <footer className="relative z-10 py-12 text-center text-gray-400 text-sm mt-12 glass-panel border-t border-b-0 border-x-0 rounded-none bg-white/30">
        <p>&copy; {new Date().getFullYear()} Graphic Lab. Premium Equipment.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </Router>
  );
};

export default App;
