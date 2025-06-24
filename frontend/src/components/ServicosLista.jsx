import React from 'react';

function ServicosLista({ servicos, onServicoSelect, servicosSelecionados }) {
  if (!Array.isArray(servicos)) {
    return null;
  }

  return (
    <div className="servicos-lista">
      {servicos.map(servico => {
        const isSelected = servicosSelecionados.some(s => s.id === servico.id);
        
        return (
          <div 
            key={servico.id} 
            className={`servico-item ${isSelected ? 'item-selecionado' : ''}`} 
            onClick={() => onServicoSelect(servico)}
          >
            <span className="servico-nome">{servico.nome}</span>
            <span className="servico-preco">R$ {Number(servico.preco).toFixed(2).replace('.', ',')}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ServicosLista;