import React, { useEffect, useState } from 'react';
import api from '../services/api'; // seu axios configurado

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/agendamentos')
      .then(res => setAgendamentos(res.data))
      .catch(() => setErro('Erro ao carregar agendamentos'));
  }, []);

  return (
    <div>
      <h2>Agendamentos</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {!erro && agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}
      <ul>
        {agendamentos.map(ag => (
          <li key={ag.id}>
            <strong>{ag.nome}</strong> - {ag.sala} - {ag.data} ({ag.hora_inicial} às {ag.hora_final})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAgendamentos;