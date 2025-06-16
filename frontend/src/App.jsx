import { useState, useEffect } from 'react';
import axios from 'axios';
import ServicosLista from './components/ServicosLista.jsx';
import ProfissionaisLista from './components/ProfissionaisLista.jsx';
import './App.css';

function App() {
  const [etapa, setEtapa] = useState(1);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [profissionalSelecionada, setProfissionalSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicosResponse, profissionaisResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/v1/servicos/'),
          axios.get('http://127.0.0.1:8000/api/v1/profissionais/')
        ]);
        setServicos(servicosResponse.data);
        setProfissionais(profissionaisResponse.data);
      } catch (err) {
        setError("Não foi possível carregar os dados iniciais. Verifique se a API (backend) está rodando.");
        console.error("Erro detalhado:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleServicoSelect = (servico) => {
    setServicoSelecionado(servico);
    setEtapa(2);
  };

  const handleProfissionalSelect = (profissional) => {
    setProfissionalSelecionada(profissional);
    setEtapa(3);
  };

  const getProfissionaisFiltrados = () => {
    if (!servicoSelecionado) return [];
    const tipoServico = servicoSelecionado.nome.toLowerCase().includes('unha') || servicoSelecionado.nome.toLowerCase().includes('pé') 
      ? 'Manicure' 
      : 'Cabeleireira';
    return profissionais.filter(p => p.especialidade === tipoServico);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">

      {etapa === 1 && (
        <>
          <h1>Escolha o Serviço</h1>
          <p>Clique no serviço que você deseja agendar.</p>
          <ServicosLista 
            servicos={servicos} 
            onServicoSelect={handleServicoSelect} 
          />
        </>
      )}

      {etapa === 2 && (
        <>
          <h1>Escolha a Profissional</h1>
          <p>Você selecionou: <strong>{servicoSelecionado.nome}</strong></p>
          <ProfissionaisLista 
            profissionais={getProfissionaisFiltrados()}
            onProfissionalSelect={handleProfissionalSelect}
          />
          <button onClick={() => setEtapa(1)}>Voltar para serviços</button>
        </>
      )}

      {etapa === 3 && (
        <>
          <h1>Escolha a Data e Horário</h1>
          <p>
            Você selecionou: <strong>{servicoSelecionado.nome}</strong> com 
            <strong> {profissionalSelecionada.usuario.username}</strong>
          </p>
          <p>Em breve, o calendário aparecerá aqui...</p>
          <button onClick={() => setEtapa(2)}>Voltar para profissionais</button>
        </>
      )}

    </div>
  );
}

export default App;