import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { termsAPI } from '../services/api';
import './terms.css';
import Header from '../components/Header';

const TermsPage = () => {
  const { language } = useLanguage();
  const [termsData, setTermsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const response = await termsAPI.getAll();
        setTermsData(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load terms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [language]);

  if (loading) {
    return (
      <div className="terms-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading terms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="terms-page">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="terms-page">
      <Header />
      <div className="terms-content">
        <h1 className="terms-title">
          {language === 'en' ? 'Terms' : 'Villkor'}
        </h1>
        <button className="close-button">
          {language === 'en' ? 'Close and Go Back' : 'Stäng och gå tillbaka'}
        </button>

        <div className="terms-container">
          <div className="terms-text">
            {termsData.map((term) => (
              <div key={term.id} className="term-section">
                <div
                  className="term-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      language === 'en'
                        ? term.content_html_en || `<p>${term.content_en}</p>`
                        : term.content_html_sv || `<p>${term.content_sv}</p>`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="close-button">
          {language === 'en' ? 'Close and Go Back' : 'Stäng och gå tillbaka'}
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
