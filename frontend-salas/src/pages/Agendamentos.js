import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Importa o Link aqui
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

  const formatarData = (dataStr) => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const agendamentosFiltrados = agendamentos.filter(ag => {
    return (
      (filtroData === '' || ag.data === filtroData) &&
      (filtroSala === '' || ag.sala === filtroSala)
    );
  });

  return (
    <div className="agendamentos-container">
      {/* Botão de Voltar */}
      <Link to="/" className="botao-voltar">← Voltar</Link>

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
          <select 
            value={filtroSala} 
            onChange={e => setFiltroSala(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Sala de reunião 1">Sala de reunião 1</option>
            <option value="Sala de reunião 2">Sala de reunião 2</option>
            <option value="Recepção">Recepção</option>
          </select>
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
              <p><strong>Data:</strong> {formatarData(ag.data)}</p>
              <p><strong>Horário:</strong> {ag.hora_inicial} - {ag.hora_final}</p>
              <p><strong>Motivo:</strong> {ag.motivo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Agendamentos;
