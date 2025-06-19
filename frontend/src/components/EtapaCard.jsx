import React from 'react';

function EtapaCard({ numero, titulo, className, children }) {
  return (
    <div className={`etapa-card ${className || ''}`}>
      <div className="etapa-header">
        <span className="etapa-numero">{numero}</span>
        <h2 className="etapa-titulo">{titulo}</h2>
      </div>
      <div className="etapa-conteudo">
        {children}
      </div>
    </div>
  );
}

export default EtapaCard;