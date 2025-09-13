import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { termsAPI } from '../services/api.js';
import './terms.css';

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
  }, []);

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
      <div className="terms-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {language === 'en' ? 'Terms and Conditions' : 'Villkor'}
          </h1>
          <p className="hero-subtitle">
            {language === 'en'
              ? 'Please read these terms carefully before using our services'
              : 'Läs dessa villkor noggrant innan du använder våra tjänster'
            }
          </p>
        </div>
      </div>
      <div className="terms-content">
        <div className="terms-container">
          {termsData.map((term) => (
            <section key={term.id} className="terms-section">
              <h2 className="section-title">
                {language === 'en' ? term.title_en : term.title_sv}
              </h2>
              <div className="section-content">
                <p>{language === 'en' ? term.content_en : term.content_sv}</p>
              </div>
            </section>
          ))}
          <section className="terms-section contact-section">
            <h2 className="section-title">
              {language === 'en' ? 'Contact Information' : 'Kontaktinformation'}
            </h2>
            <div className="section-content">
              <p>
                {language === 'en'
                  ? 'If you have any questions about these terms and conditions, please contact us:'
                  : 'Om du har några frågor om dessa villkor, vänligen kontakta oss:'
                }
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@123fakturera.se</p>
                <p><strong>Phone:</strong> +46 123 456 789</p>
                <p><strong>Address:</strong> 123 Business Street, Stockholm, Sweden</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
