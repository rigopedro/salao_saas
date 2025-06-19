import React from 'react';

function ProfissionaisLista({ profissionais, onProfissionalSelect, profissionalSelecionada }) {
  if (profissionais.length === 0) {
    return <p>Nenhuma profissional encontrada para este tipo de serviço.</p>;
  }

   return (
        <div className="profissionais-lista">
            {profissionais.map(profissional => (
                <div 
                    key={profissional.id}
                    className={`profissional-item ${profissionalSelecionada?.id === profissional.id ? 'item-selecionado' : ''}`}
                    onClick={() => onProfissionalSelect(profissional)}
                >
                    <span className="profissional-nome">
                        {profissional.usuario.first_name || profissional.usuario.username}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ProfissionaisLista;