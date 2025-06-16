import React from 'react';

function ServicosLista({ servicos, onServicoSelect }) {
  return (
    <div className="servicos-lista">
      {servicos.map(servico => (
        <div 
          key={servico.id} 
          className="servico-item" 
          onClick={() => onServicoSelect(servico)}
        >
          <span className="servico-nome">{servico.nome}</span>
          <span className="servico-preco">R$ {Number(servico.preco).toFixed(2).replace('.', ',')}</span>
        </div>
      ))}
    </div>
  );
}

export default ServicosLista;