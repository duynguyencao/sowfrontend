import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './styles.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const navLabels = language === 'en'
    ? {
      home: 'Home',
      order: 'Order',
      customers: 'Our Customers',
      about: 'About us',
      contact: 'Contact Us',
    }
    : {
      home: 'Hem',
      order: 'Beställ',
      customers: 'Våra Kunder',
      about: 'Om oss',
      contact: 'Kontakta oss',
    };

  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="top-bar"></div>
      <div className="header-container">
        <div className="header-left">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
          <div className="logo">
            <img
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="Logo"
              className="logo-icon"
            />
          </div>
        </div>

        <div className="header-right">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>{navLabels.home}</Link>
            <Link to="/pricelist" className="nav-link" onClick={closeMenu}>{navLabels.order}</Link>
            <Link to="/" className="nav-link" onClick={closeMenu}>{navLabels.customers}</Link>
            <Link to="/" className="nav-link" onClick={closeMenu}>{navLabels.about}</Link>
            <Link to="/" className="nav-link" onClick={closeMenu}>{navLabels.contact}</Link>
          </nav>

          <div className="language-selector">
            <button
              className="language-toggle"
              onClick={toggleLanguageDropdown}
              aria-label="Select language"
            >
              <span className="language-text">
                {language === 'en' ? 'English' : 'Svenska'}
              </span>
              <img
                src={language === 'en'
                  ? 'https://storage.123fakturere.no/public/flags/GB.png'
                  : 'https://storage.123fakturere.no/public/flags/SE.png'
                }
                alt={language === 'en' ? 'English' : 'Swedish'}
                className="flag-icon"
              />
            </button>

            {isLanguageDropdownOpen && (
              <div className="language-dropdown">
                <button
                  className="language-option"
                  onClick={() => selectLanguage('en')}
                >
                  <img
                    src="https://storage.123fakturere.no/public/flags/GB.png"
                    alt="English"
                    className="flag-icon"
                  />
                  <span>English</span>
                </button>
                <button
                  className="language-option"
                  onClick={() => selectLanguage('sv')}
                >
                  <img
                    src="https://storage.123fakturere.no/public/flags/SE.png"
                    alt="Svenska"
                    className="flag-icon"
                  />
                  <span>Svenska</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
