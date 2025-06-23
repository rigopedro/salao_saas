import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <span className="logo-icon"></span> 
          <span className="logo-text">Salão SaaS</span>
        </div>
        <div className="contact-info">
          <span>📞 (21) 99999-8888</span>
          <span>📍 Rua Teste, 123 - Niterói, RJ</span>
        </div>
      </div>
    </header>
  );
}

export default Header;