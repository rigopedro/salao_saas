import { useState, useEffect } from 'react';
import axios from 'axios';
import ServicosLista from './components/ServicosLista.jsx';
import ProfissionaisLista from './components/ProfissionaisLista.jsx';
import EtapaCard from './components/EtapaCard.jsx';
import CalendarioEtapa from './components/CalendarioEtapa.jsx';
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

  const handleServicoSelect = (servicoClicado) => {
    if (servicoSelecionado && servicoSelecionado.id === servicoClicado.id) {
      setServicoSelecionado(null);
  } else {
    setServicoSelecionado(servicoClicado);
    setEtapa(2)
  }
};

  const handleProfissionalSelect = (profissionalClicada) => {
    if (profissionalSelecionada && profissionalSelecionada.id === profissionalClicada.id) {
      setProfissionalSelecionada(null);
  } else {
    setProfissionalSelecionada(profissionalClicada);
    setEtapa(3);
  }
};

 const handleAgendamentoConfirmado = async (dataHoraFinal) => {
    const agendamentoParaEnviar = {
      servico: servicoSelecionado.id,
      profissional: profissionalSelecionada.id,
      data_hora: dataHoraFinal.toISOString(), // Envia a data no formato padrão ISO 8601
    };
    try {
      // AQUI PRECISAMOS ESTAR AUTENTICADOS!
      // Por enquanto, isso vai falhar, mas vamos preparar o código.
      // const response = await axios.post('http://127.0.0.1:8000/api/v1/agendamentos/', agendamentoParaEnviar);
      // console.log("Agendamento criado com sucesso:", response.data);
      alert(`Agendamento para ${servicoSelecionado.nome} com ${profissionalSelecionada.usuario.username} às ${dataHoraFinal.toLocaleString('pt-BR')} foi solicitado! (Ainda sem salvar no BD)`);
      setEtapa(4); // Avança para uma tela de sucesso
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert("Houve um erro ao tentar agendar. Tente novamente.");
    }
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
        <EtapaCard numero="1" titulo="Escolha o Serviço">
          <ServicosLista 
            servicos={servicos} 
            onServicoSelect={handleServicoSelect} 
            servicoSelecionado={servicoSelecionado}
          />
        </EtapaCard>
      )}

      {etapa === 2 && (
        <EtapaCard numero="2" titulo="Escolha a Profissional">
          <p>Serviço: <strong>{servicoSelecionado.nome}</strong></p>
          <ProfissionaisLista 
            profissionais={getProfissionaisFiltrados()}
            onProfissionalSelect={handleProfissionalSelect}
             profissionalSelecionada={profissionalSelecionada}
          />
          <button onClick={() => setEtapa(1)}>Voltar</button>
        </EtapaCard>
      )}

      {etapa === 3 && (
        <EtapaCard numero="3" titulo="Escolha a Data e Horário">
        <p>
            Você selecionou: <strong>{servicoSelecionado.nome}</strong> com 
            <strong> {profissionalSelecionada.usuario.username}</strong>
        </p>
        <CalendarioEtapa 
            servicoSelecionado={servicoSelecionado}
            profissionalSelecionada={profissionalSelecionada}
            onAgendamentoConfirmado={handleAgendamentoConfirmado}
        />
        <button onClick={() => setEtapa(2)}>Voltar</button>
    </EtapaCard>
      )}

      {etapa === 4 && (
        <EtapaCard numero="✓" titulo="Agendamento Concluído!">
          <p>Seu agendamento foi realizado com sucesso.</p>
          <p>Você receberá uma confirmação em breve.</p>
          <button onClick={() => {
            setEtapa(1);
            setServicoSelecionado(null);
            setProfissionalSelecionada(null);
          }}>Marcar outro horário</button>
        </EtapaCard>
      )}
    </div>
  );
}

export default App;