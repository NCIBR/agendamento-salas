import React, { useState } from 'react';
import api from '../services/api';

function Agendar() {
  const [nome, setNome] = useState('');
  const [sala, setSala] = useState('Sala de reunião 1'); // Valor padrão
  const [data, setData] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (horaFinal <= horaInicial) {
      setMensagem('Erro: Hora final deve ser maior que hora inicial.');
      return;
    }

    try {
      await api.post('/agendamentos', {
        nome,
        sala,
        data,
        hora_inicial: horaInicial,
        hora_final: horaFinal,
      });

      setMensagem('Agendamento realizado com sucesso!');
      setNome('');
      setSala('Sala de reunião 1');
      setData('');
      setHoraInicial('');
      setHoraFinal('');
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao agendar sala. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Agendar Sala</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Sala:</label><br />
          <select value={sala} onChange={e => setSala(e.target.value)} required>
            <option value="Sala de reunião 1">Sala de reunião 1</option>
            <option value="Sala de reunião 2">Sala de reunião 2</option>
            <option value="Recepção">Recepção</option>
          </select>
        </div>
        <div>
          <label>Data:</label><br />
          <input type="date" value={data} onChange={e => setData(e.target.value)} required />
        </div>
        <div>
          <label>Hora Inicial:</label><br />
          <input type="time" value={horaInicial} onChange={e => setHoraInicial(e.target.value)} required />
        </div>
        <div>
          <label>Hora Final:</label><br />
          <input type="time" value={horaFinal} onChange={e => setHoraFinal(e.target.value)} required />
        </div>
        <br />
        <button type="submit">Agendar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Agendar;