import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './styles.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img 
            src="https://storage.123fakturera.se/public/icons/diamond.png" 
            alt="123fakturera" 
            className="logo-icon"
          />
          <span className="logo-text">123fakturera</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/terms" 
            className={`nav-link ${location.pathname === '/terms' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {language === 'en' ? 'Terms' : 'Villkor'}
          </Link>
          <Link 
            to="/pricelist" 
            className={`nav-link ${location.pathname === '/pricelist' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {language === 'en' ? 'Pricelist' : 'Prislista'}
          </Link>
        </nav>

        <div className="header-actions">
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <img 
              src={language === 'en' 
                ? 'https://storage.123fakturere.no/public/flags/GB.png' 
                : 'https://storage.123fakturere.no/public/flags/SE.png'
              } 
              alt={language === 'en' ? 'English' : 'Swedish'}
              className="flag-icon"
            />
          </button>

          <button 
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
