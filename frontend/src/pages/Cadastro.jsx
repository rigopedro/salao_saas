import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EtapaCard from '../components/EtapaCard.jsx';
import '../App.css';

function Cadastro() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const dadosParaEnviar = {
      first_name: firstName,
      last_name: lastName,
      telefone: telefone,
      password: password,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/v1/cadastro/', dadosParaEnviar);
      
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');

    } catch (err) {
      if (err.response && err.response.data) {
        const errosDaApi = err.response.data;
        let mensagemErro = 'Ocorreu um erro. Verifique os dados.';
        
        if (errosDaApi.username) {
            mensagemErro = 'Este número de telefone já está em uso.';
        }
        setError(mensagemErro);

      } else {
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      }
      console.error("Erro ao criar cadastro:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <EtapaCard numero="👤" titulo="Crie sua Conta">
        <form onSubmit={handleSubmit} className="form-cadastro">
          <div className="form-grupo-horizontal">
            <div className="form-grupo">
              <label htmlFor="firstName">Nome</label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-grupo">
              <label htmlFor="lastName">Sobrenome</label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="form-grupo">
            <label htmlFor="telefone">Telefone (apenas números, com DDD)</label>
            <input type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>

          <div className="form-grupo">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="botao-confirmar" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar Minha Conta'}
          </button>

        </form>
      </EtapaCard>
    </div>
  );
}

export default Cadastro;