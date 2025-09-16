import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import { useEffect } from 'react';
import TermsPage from './pages/Terms';
import PricelistPage from './pages/Pricelist';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isPricelistPage = location.pathname === '/pricelist';
  const isTermsPage = location.pathname === '/terms';

  useEffect(() => {
    const supportsObs = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('overscroll-behavior-y', 'none');
    if (supportsObs) return;

    const scroller = document.scrollingElement || document.documentElement;
    let startY = 0;

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const goingDown = startY > currentY;
      const scrollTop = scroller.scrollTop;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;

      const atTopAndPullingDown = scrollTop <= 0 && !goingDown;
      const atBottomAndPullingUp = scrollTop >= maxScroll && goingDown;

      if (atTopAndPullingDown || atBottomAndPullingUp) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="app">
      {!isPricelistPage && !isTermsPage && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/terms" replace />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/pricelist" element={<PricelistPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}


export default App;
