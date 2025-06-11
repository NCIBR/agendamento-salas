import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    api.get('/agendamentos')
      .then(response => setAgendamentos(response.data))
      .catch(error => console.error('Erro ao buscar agendamentos', error));
  }, []);

  return (
    <div>
      <h2>Agendamentos Realizados</h2>
      <ul>
        {agendamentos.map((item, index) => (
          <li key={index}>
            <strong>{item.nome}</strong> reservou <strong>{item.sala}</strong> em {item.data}
            das {item.hora_inicial} às {item.hora_final}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Agendamentos;