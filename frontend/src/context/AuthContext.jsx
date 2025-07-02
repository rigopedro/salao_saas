import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null);

  const navigate = useNavigate();

  const loginAction = async (telefone, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', {
        username: telefone,
        password: password
      });

      if (response.status === 200) {
        setTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        alert('Login bem-sucedido!');
        navigate('/');
      }
    } catch (error) {
      console.error('Erro no login!', error);
      alert('Telefone ou senha inválidos.');
    }
  };

  const logoutAction = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const contextData = {
    user,
    tokens,
    loginAction,
    logoutAction,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;