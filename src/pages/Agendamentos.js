import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Agendamentos.css';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtroData, setFiltroData] = useState('');
  const [filtroSala, setFiltroSala] = useState('');

  // Buscar agendamentos do backend
  const fetchAgendamentos = () => {
    api.get('/agendamentos')
      .then(res => setAgendamentos(res.data))
      .catch(err => console.error("Erro ao buscar agendamentos:", err));
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Filtrar agendamentos localmente
  const agendamentosFiltrados = agendamentos.filter(ag => {
    return (
      (filtroData === '' || ag.data === filtroData) &&
      (filtroSala === '' || ag.sala.toLowerCase().includes(filtroSala.toLowerCase()))
    );
  });

  return (
    <div className="agendamentos-container">
      <h2>Agendamentos Registrados</h2>

      <div className="filtros">
        <label>
          Filtrar por data: 
          <input 
            type="date" 
            value={filtroData} 
            onChange={e => setFiltroData(e.target.value)} 
          />
        </label>

        <label>
          Filtrar por sala: 
          <input 
            type="text" 
            placeholder="Digite a sala" 
            value={filtroSala} 
            onChange={e => setFiltroSala(e.target.value)} 
          />
        </label>
      </div>

      {agendamentosFiltrados.length === 0 ? (
        <p className="mensagem-vazia">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="lista-agendamentos">
          {agendamentosFiltrados.map(ag => (
            <div key={ag.id} className="card-agendamento">
              <h3>{ag.nome}</h3>
              <p><strong>Sala:</strong> {ag.sala}</p>
              <p><strong>Data:</strong> {ag.data}</p>
              <p><strong>Horário:</strong> {ag.hora_inicial} - {ag.hora_final}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Agendamentos;

