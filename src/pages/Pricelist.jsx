import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { pricelistAPI } from '../services/api';
import './pricelist.css';

const PricelistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const handleRowClick = (itemId) => {
    setSelectedRowId(selectedRowId === itemId ? null : itemId);
  };

  const handleInputClick = (itemId) => {
    setSelectedRowId(itemId);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await pricelistAPI.getAll();
        setItems(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load pricelist. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  async function saveItemField(id, field) {
    try {
      const current = items.find(i => i.id === id);
      if (!current) return;
      await pricelistAPI.update(id, { [field]: current[field] });
    } catch (e) {
      setError('Failed to save item. Changes may not be persisted.');
    }
  }


  return (
    <div className="pricelist-page">
      {/* Header */}
      <header className="pricelist-header">
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
        </div>

        <div className="header-right">
          <div className="language-selector">
            <button
              className="language-toggle"
              onClick={toggleLanguageDropdown}
              aria-label="Select language"
            >
              <img
                src={language === 'en'
                  ? 'https://storage.123fakturere.no/public/flags/GB.png'
                  : 'https://storage.123fakturere.no/public/flags/SE.png'
                }
                alt={language === 'en' ? 'English' : 'Swedish'}
                className="flag-icon"
              />
              <span className="language-text">
                {language === 'en' ? 'English' : 'Norsk Bokmål'}
              </span>
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
                    alt="Norsk Bokmål"
                    className="flag-icon"
                  />
                  <span>Norsk Bokmål</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pricelist-layout">
        {/* Sidebar Menu */}
        <aside className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <h3>Menu</h3>
          </div>
          <nav className="sidebar-nav">
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">📄</span>
              Invoices
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">👥</span>
              Customers
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">⚙️</span>
              My Business
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">📋</span>
              Invoice Journal
            </Link>
            <Link to="/pricelist" className="sidebar-link active">
              <span className="nav-icon">🏷️</span>
              Price List
              <span className="active-dot"></span>
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">📄📄</span>
              Multiple Invoicing
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">❌</span>
              Unpaid Invoices
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">🎁</span>
              Offer
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">🏢</span>
              Inventory Control
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">👥📄</span>
              Member Invoicing
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">☁️</span>
              Import/Export
            </Link>
            <Link to="/" className="sidebar-link">
              <span className="nav-icon">🚪</span>
              Log out
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="pricelist-main">
          {/* Search and Action Bar */}
          <div className="pricelist-search-bar">
            <div className="search-fields">
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search Article No..."
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="action-btn new-product">
                <span className="btn-icon">+</span>
              </button>
              <button className="action-btn print-list">
                <span className="btn-icon">🖨️</span>
              </button>
              <button className="action-btn advanced-mode">
                <span className="btn-icon">⇄</span>
              </button>
            </div>
          </div>

          <div className="pricelist-container">
            {loading ? (
              <div className="loading">Loading pricelist...</div>
            ) : error ? (
              <div className="error">Error: {error}</div>
            ) : (
              <div className="pricelist-table-wrapper">
                <table className="pricelist-table">
                  <thead>
                    <tr>
                      <th className="col-article">Article No. ↓</th>
                      <th className="col-product">Product/Service ↓</th>
                      <th className="col-price">Price</th>
                      <th className="col-stock">In Stock</th>
                      <th className="col-unit">Unit</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={selectedRowId === item.id ? 'selected-row' : ''}
                        onClick={() => handleRowClick(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="col-article">
                          <div className="article-cell">
                            {selectedRowId === item.id && <span className="row-arrow">→</span>}
                            <input
                              type="text"
                              value={item.article_no || '1234567890'}
                              onChange={(e) => handleItemChange(item.id, 'article_no', e.target.value)}
                              onBlur={() => saveItemField(item.id, 'article_no')}
                              className="table-input"
                              onClick={() => handleInputClick(item.id)}
                            />
                          </div>
                        </td>
                        <td className="col-product">
                          <input
                            type="text"
                            value={item.product_service}
                            onChange={(e) => handleItemChange(item.id, 'product_service', e.target.value)}
                            onBlur={() => saveItemField(item.id, 'product_service')}
                            className="table-input"
                            onClick={() => handleInputClick(item.id)}
                          />
                        </td>
                        <td className="col-price">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                            onBlur={() => saveItemField(item.id, 'price')}
                            className="table-input"
                            onClick={() => handleInputClick(item.id)}
                          />
                        </td>
                        <td className="col-stock">
                          <input
                            type="number"
                            value={item.in_stock || item.price}
                            onChange={(e) => handleItemChange(item.id, 'in_stock', e.target.value)}
                            onBlur={() => saveItemField(item.id, 'in_stock')}
                            className="table-input"
                            onClick={() => handleInputClick(item.id)}
                          />
                        </td>
                        <td className="col-unit">
                          <div className="unit-cell">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                              onBlur={() => saveItemField(item.id, 'unit')}
                              className="table-input"
                              onClick={() => handleInputClick(item.id)}
                            />
                          </div>
                        </td>
                        <td className="col-actions">
                          <span className="more-icon">⋯</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PricelistPage;