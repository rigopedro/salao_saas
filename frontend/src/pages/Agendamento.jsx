import { useState, useEffect } from 'react';
import axios from 'axios';
import EtapaCard from '../components/EtapaCard.jsx';
import ServicosLista from '../components/ServicosLista.jsx';
import ProfissionaisLista from '../components/ProfissionaisLista.jsx';
import CalendarioEtapa from '../components/CalendarioEtapa.jsx';

function Agendamento() {
  const [etapa, setEtapa] = useState(1);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
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
        setError("Não foi possível carregar os dados iniciais.");
        console.error("Erro detalhado:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleServicoSelect = (servicoClicado) => {
    setServicosSelecionados(prevSelecionados => {
      const jaSelecionado = prevSelecionados.find(s => s.id === servicoClicado.id);
      if (jaSelecionado) {
        return prevSelecionados.filter(s => s.id !== servicoClicado.id);
      } else {
        return [...prevSelecionados, servicoClicado];
      }
    });
  };

  const avancarParaProfissionais = () => {
    if (servicosSelecionados.length > 0) {
      setEtapa(2);
    }
  };

  const handleProfissionalSelect = (profissional) => {
    setProfissionalSelecionada(profissional);
    setEtapa(3);
  };

  const handleAgendamentoConfirmado = async (dataHoraFinal) => {
    const nomesServicos = servicosSelecionados.map(s => s.nome).join(', ');
    alert(`Agendamento para ${nomesServicos} com ${profissionalSelecionada.usuario.username} às ${dataHoraFinal.toLocaleString('pt-BR')} foi solicitado!`);
    setEtapa(4);
  };

  const getProfissionaisFiltrados = () => {
    if (servicosSelecionados.length === 0) return [];
    const primeiroServico = servicosSelecionados[0];
    const tipoServico = primeiroServico.nome.toLowerCase().includes('unha') || primeiroServico.nome.toLowerCase().includes('pé') 
      ? 'Manicure' 
      : 'Cabeleireira';
    return profissionais.filter(p => p.especialidade === tipoServico);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <div className="page-header">
        <h1>Agende sua ida</h1>
        <p>Escolha seus serviços e o melhor horário para uma experiência incrível!</p>
      </div>
      <div className="container">
        {etapa === 1 && (
            <EtapaCard numero="1" titulo="Escolha o(s) Serviço(s)">
              <ServicosLista 
                servicos={servicos} 
                onServicoSelect={handleServicoSelect} 
                servicosSelecionados={servicosSelecionados}
              />
              {servicosSelecionados.length > 0 && (
                <button onClick={avancarParaProfissionais} className="botao-confirmar">
                  Avançar
                </button>
              )}
            </EtapaCard>
          )}
        {etapa === 2 && (
            <EtapaCard numero="2" titulo="Escolha a Profissional">
              <p>Serviços: <strong>{servicosSelecionados.map(s => s.nome).join(', ')}</strong></p>
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
                Serviços: <strong>{servicosSelecionados.map(s => s.nome).join(', ')}</strong><br/>
                Profissional: <strong> {profissionalSelecionada.usuario.username}</strong>
              </p>
              <CalendarioEtapa 
                servicoSelecionado={servicosSelecionados[0]}
                profissionalSelecionada={profissionalSelecionada}
                onAgendamentoConfirmado={handleAgendamentoConfirmado}
              />
              <button onClick={() => setEtapa(2)}>Voltar</button>
            </EtapaCard>
          )}
        {etapa === 4 && (
            <EtapaCard numero="✓" titulo="Agendamento Concluído!">
              <p>Seu agendamento foi realizado com sucesso!</p>
              <button onClick={() => {
                setEtapa(1);
                setServicosSelecionados([]);
                setProfissionalSelecionada(null);
              }}>Marcar outro horário</button>
            </EtapaCard>
          )}
      </div>
    </>
  );
}

export default Agendamento;