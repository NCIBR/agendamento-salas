import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const response = await api.get('/agendamentos');
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    }

    carregarAgendamentos();
  }, []);

  return (
    <div>
      <h2>Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul>
          {agendamentos.map((item, index) => (
            <li key={index}>
              <strong>{item.nome}</strong> agendou a <strong>{item.sala}</strong> <br />
              Data: {item.data} <br />
              Das <strong>{item.hora_inicial}</strong> até <strong>{item.hora_final}</strong>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Agendamentos;