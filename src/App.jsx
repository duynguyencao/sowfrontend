import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import TermsPage from './pages/Terms';
import PricelistPage from './pages/Pricelist';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isPricelistPage = location.pathname === '/pricelist';
  const isTermsPage = location.pathname === '/terms';

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
