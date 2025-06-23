import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

function CalendarioEtapa({ servicoSelecionado, profissionalSelecionada, onAgendamentoConfirmado }) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [erroHorarios, setErroHorarios] = useState('');

  useEffect(() => {
    if (dataSelecionada && profissionalSelecionada && servicoSelecionado) {
      const fetchHorarios = async () => {
        setLoadingHorarios(true);
        setErroHorarios('');
        setHorariosDisponiveis([]);
        setHorarioSelecionado(null);

        const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd');
        const url = `http://127.0.0.1:8000/api/v1/profissionais/${profissionalSelecionada.id}/disponibilidade/?data=${dataFormatada}&servico_id=${servicoSelecionado.id}`;

        try {
          const response = await axios.get(url);
          setHorariosDisponiveis(response.data);
        } catch (error) {
          setErroHorarios('Não foi possível buscar os horários para esta data.');
        } finally {
          setLoadingHorarios(false);
        }
      };
      fetchHorarios();
    }
  }, [dataSelecionada, profissionalSelecionada, servicoSelecionado]);

  const handleConfirmarClick = () => {
    const [hora, minuto] = horarioSelecionado.split(':');
    const dataHoraFinal = new Date(dataSelecionada);
    dataHoraFinal.setHours(hora);
    dataHoraFinal.setMinutes(minuto);

    onAgendamentoConfirmado(dataHoraFinal); 
  };

  return (
    <div className="calendario-container">
      <div className="datepicker-wrapper">
        <DatePicker
          selected={dataSelecionada}
          onChange={(date) => setDataSelecionada(date)}
          locale="pt-BR"
          dateFormat="dd 'de' MMMM 'de' yyyy"
          minDate={new Date()}
          inline
        />
      </div>
      <div className="horarios-wrapper">
        <h3>Horários Disponíveis</h3>
        {loadingHorarios && <p>Buscando horários...</p>}
        {erroHorarios && <p style={{ color: 'red' }}>{erroHorarios}</p>}

        <div className="horarios-grid">
          {!loadingHorarios && horariosDisponiveis.length > 0 && (
            horariosDisponiveis.map(horario => (
              <button 
                key={horario} 
                className={`horario-botao ${horario === horarioSelecionado ? 'horario-selecionado' : ''}`}
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))
          )}
        </div>

        {horarioSelecionado && (
          <button className="botao-confirmar" onClick={handleConfirmarClick}>
            Confirmar Agendamento
          </button>
        )}
      </div>
    </div>
  );
}

export default CalendarioEtapa;