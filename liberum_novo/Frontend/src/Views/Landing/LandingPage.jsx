import './LandingPage.css';
import invest from '../../assets/img/Invest.png';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div className='landing-container'>
      {/* Background Decorations */}
      <div className='bg-circle bg-circle-1'></div>
      <div className='bg-circle bg-circle-2'></div>
      <div className='bg-circle bg-circle-3'></div>

      {/* Content */}
      <div className={`landing-content ${isVisible ? 'visible' : ''}`}>
        {/* Logo Section */}
        <div className='logo-section'>
          <h1 className='logo-title'>Liberum</h1>
          <p className='logo-subtitle'>Sistema de Gestão de Saúde</p>
        </div>

        {/* Image Section */}
        <div className='image-section'>
          <div className='image-circle circle-outer'>
            <div className='image-circle circle-middle'>
              <div className='image-circle circle-inner'>
                <img src={invest} alt='Liberum' className='hero-image' />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='features-section'>
          <div className='feature-item'>
            <span className='feature-icon'>📋</span>
            <span className='feature-text'>Gestão de Consultas</span>
          </div>
          <div className='feature-item'>
            <span className='feature-icon'>🔬</span>
            <span className='feature-text'>Análise de Exames</span>
          </div>
          <div className='feature-item'>
            <span className='feature-icon'>📊</span>
            <span className='feature-text'>Relatórios Médicos</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link to='/Login' className='cta-link'>
          <button className='cta-button'>
            <span className='cta-text'>Continuar</span>
            <span className='cta-arrow'>→</span>
          </button>
        </Link>

        {/* Footer */}
        <div className='landing-footer'>
          <p className='footer-text'>© 2025 Liberum. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
