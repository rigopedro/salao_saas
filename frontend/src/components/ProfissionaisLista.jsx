import React from 'react';

function ProfissionaisLista({ profissionais, onProfissionalSelect }) {
  if (profissionais.length === 0) {
    return <p>Nenhuma profissional encontrada para este tipo de serviço.</p>;
  }

  return (
    <div className="profissionais-lista">
      {profissionais.map(profissional => (
        <div 
          key={profissional.id} 
          className="profissional-item"
          onClick={() => onProfissionalSelect(profissional)}
        >
          {/* Lembre-se que o nome está dentro do objeto 'usuario' */}
          <span className="profissional-nome">
            {profissional.usuario.first_name || profissional.usuario.username}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProfissionaisLista;