import React, { useState, useContext } from 'react';
import EtapaCard from '../components/EtapaCard.jsx';
import AuthContext from '../context/AuthContext.jsx';

function Login() {
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginAction(telefone, password);
  };

  return (
    <div className="container">
      <EtapaCard numero="🔑" titulo="Acesse sua Conta">
        <form onSubmit={handleSubmit} className="form-cadastro">
          <div className="form-grupo">
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required 
            />
          </div>
          <div className="form-grupo">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="botao-confirmar">Entrar</button>
        </form>
      </EtapaCard>
    </div>
  );
}

export default Login;