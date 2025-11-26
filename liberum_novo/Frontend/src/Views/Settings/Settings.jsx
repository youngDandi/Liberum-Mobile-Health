import './Settings.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    
  };

  return (
    <div className='settings-container'>
      {/* Header */}
      <header className='settings-header'>
        <Link to='/Home' className='back-btn-settings'>
          <span className='back-icon-settings'>←</span>
        </Link>
        
        <h1 className='page-title-settings'>Definições</h1>
        
        <div className='menu-btn-settings'>
          <span>⚙️</span>
        </div>
      </header>

      {/* Settings Content */}
      <div className='settings-content'>
        {/* Account Section */}
        <div className='settings-section'>
          <h3 className='section-title-settings'>
            <span className='section-icon-settings'>👤</span>
            Conta
          </h3>

          <div className='settings-list'>
            <button className='settings-item' onClick={() => alert('Funcionalidade em desenvolvimento')}>
              <div className='item-left'>
                <span className='item-icon'>🔑</span>
                <span className='item-text'>Mudar palavra-passe</span>
              </div>
              <span className='item-arrow'>›</span>
            </button>

            <button className='settings-item' onClick={() => alert('Funcionalidade em desenvolvimento')}>
              <div className='item-left'>
                <span className='item-icon'>🌐</span>
                <span className='item-text'>Mudar Idioma</span>
              </div>
              <span className='item-arrow'>›</span>
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className='settings-section'>
          <h3 className='section-title-settings'>
            <span className='section-icon-settings'>🎨</span>
            Aparência
          </h3>

          <div className='settings-list'>
            <div className='settings-item'>
              <div className='item-left'>
                <span className='item-icon'>🌙</span>
                <span className='item-text'>Modo escuro</span>
              </div>
              <label className='switch'>
                <input 
                  type='checkbox' 
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className='slider'></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className='settings-section'>
          <h3 className='section-title-settings'>
            <span className='section-icon-settings'>🔒</span>
            Segurança
          </h3>

          <div className='settings-list'>
            <div className='settings-item'>
              <div className='item-left'>
                <span className='item-icon'>🛡️</span>
                <div className='item-text-wrapper'>
                  <span className='item-text'>Autenticação de 2 factores</span>
                  <span className='item-description'>Proteja a sua conta com segurança adicional</span>
                </div>
              </div>
              <label className='switch'>
                <input 
                  type='checkbox' 
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                />
                <span className='slider'></span>
              </label>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className='settings-section'>
          <h3 className='section-title-settings'>
            <span className='section-icon-settings'>ℹ️</span>
            Sobre
          </h3>

          <div className='settings-list'>
            <button className='settings-item' onClick={() => alert('Versão 1.0.0')}>
              <div className='item-left'>
                <span className='item-icon'>📱</span>
                <span className='item-text'>Versão da Aplicação</span>
              </div>
              <span className='item-value'>1.0.0</span>
            </button>

            <button className='settings-item' onClick={() => alert('Funcionalidade em desenvolvimento')}>
              <div className='item-left'>
                <span className='item-icon'>📄</span>
                <span className='item-text'>Termos e Condições</span>
              </div>
              <span className='item-arrow'>›</span>
            </button>

            <button className='settings-item' onClick={() => alert('Funcionalidade em desenvolvimento')}>
              <div className='item-left'>
                <span className='item-icon'>🔐</span>
                <span className='item-text'>Política de Privacidade</span>
              </div>
              <span className='item-arrow'>›</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className='logout-section'>
        
            <button className='logout-btn' onClick={handleLogout}>
              
              <span className='logout-icon'>🚪</span>
              <span className='logout-text'>Sair</span>
            </button>
          
        </div>

        {/* Footer Info */}
        <div className='settings-footer'>
          <p className='footer-text'>© 2025 Sistema de Saúde</p>
          <p className='footer-version'>Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
