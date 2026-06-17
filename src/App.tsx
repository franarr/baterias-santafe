import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, MobileNav, WhatsAppFAB, Footer } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-20 pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<CatalogPage />} />
            <Route path="/productos/:slug" element={<ProductPage />} />
          </Routes>
        </main>
        <MobileNav />
        <WhatsAppFAB />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
