import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Salão SaaS</h4>
          <p>O melhor lugar para cuidar da sua beleza com os melhores profissionais.</p>
        </div>
        <div className="footer-section">
          <h4>Serviços</h4>
          <ul>
            <li><a href="#">Cabelo</a></li>
            <li><a href="#">Manicure & Pedicure</a></li>
            <li><a href="#">Tratamentos</a></li>
            <li><a href="#">Escova</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <ul>
            <li><a href="#">(21) 99999-8888</a></li>
            <li><a href="#">email@salao.com</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Salão SaaS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;