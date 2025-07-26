import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-subtitle">SPA & BEAUTY CENTER</p>
          <h1>Beleza e sucesso começam aqui.</h1>
          <p>Agende seu horário com os melhores profissionais e viva uma experiência de cuidado e bem-estar.</p>
          <Link to="/agendar" className="hero-button">Agendar Agora</Link>
        </div>
        <div className="hero-image-container">
        </div>
      </section>

    </div>
  );
}

export default Home;