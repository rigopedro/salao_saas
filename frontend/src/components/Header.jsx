import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logoutAction } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <span className="logo-text">Salão SaaS</span>
        </Link>
        <nav className="main-nav">
          {user ? (
            <>
      <Link to="/meus-agendamentos" className="nav-link">Meus Agendamentos</Link>
      
      <span className="welcome-message">Olá, {user.first_name}!</span>
      <button onClick={logoutAction} className="nav-link button-logout">Sair</button>
    </>
  ) : (
    <>
      <Link to="/cadastro" className="nav-link">Cadastre-se</Link>
      <Link to="/login" className="nav-link button-login">Entrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;