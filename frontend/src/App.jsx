import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/servicos/');
        setServicos(response.data);
      } catch (err) {
        setError("Não foi possível carregar os serviços. Verifique se a API (backend) está rodando.");
        console.error("Erro detalhado:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []); 

  if (loading) {
    return <p>Carregando serviços...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="App">
      <h1>Serviços Disponíveis no Salão</h1>
      <ul>
        {servicos.map(servico => (
          <li key={servico.id}>
            {servico.nome} - R$ {servico.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;