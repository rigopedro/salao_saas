import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axiosInstance.get('/agendamentos/');
        const agendamentosOrdenados = response.data.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
        setAgendamentos(agendamentosOrdenados);
      } catch (err) {
        setError('Não foi possível carregar seus agendamentos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  if (loading) return <p>Carregando seus agendamentos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Meus Agendamentos</h1>
        <p>Seu histórico</p>
      </div>
      <div className="lista-agendamentos">
        {agendamentos.length > 0 ? (
          agendamentos.map(ag => (
            <div key={ag.id} className="agendamento-card">
              <h4>{new Date(ag.data_hora).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}</h4>
              <p><strong>Profissional:</strong> {ag.profissional.usuario.first_name || ag.profissional.usuario.username}</p>
              <ul>
                {ag.servicos.map(servico => <li key={servico.id}>{servico.nome}</li>)}
              </ul>
              <span className="agendamento-status">{ag.status}</span>
            </div>
          ))
        ) : (
          <p>Você ainda não tem nenhum agendamento.</p>
        )}
      </div>
    </div>
  );
}

export default MeusAgendamentos;