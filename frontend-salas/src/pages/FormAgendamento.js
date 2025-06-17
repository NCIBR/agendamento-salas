import React, { useState } from 'react';
import api from '../services/api';

const salasDisponiveis = ['Sala 1', 'Sala 2', 'Sala 3'];

function FormAgendamento() {
  const [nome, setNome] = useState('');
  const [sala, setSala] = useState(salasDisponiveis[0]);
  const [data, setData] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!nome || !sala || !data || !horaInicial || !horaFinal) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (horaFinal <= horaInicial) {
      setMensagem('Hora final deve ser maior que hora inicial.');
      return;
    }

    try {
      const response = await api.post('/agendamentos', {
        nome,
        sala,
        data,
        hora_inicial: horaInicial,
        hora_final: horaFinal,
      });
      setMensagem(response.data.mensagem || 'Agendamento criado com sucesso!');
      // limpa formulário
      setNome('');
      setSala(salasDisponiveis[0]);
      setData('');
      setHoraInicial('');
      setHoraFinal('');
    } catch (error) {
      if (error.response && error.response.data.erro) {
        setMensagem(error.response.data.erro);
      } else {
        setMensagem('Erro ao criar agendamento.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h3>Agendar Sala</h3>
      <label>
        Nome:
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
      </label>
      <br />

      <label>
        Sala:
        <select value={sala} onChange={e => setSala(e.target.value)}>
          {salasDisponiveis.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Data:
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
      </label>
      <br />

      <label>
        Hora Inicial:
        <input type="time" value={horaInicial} onChange={e => setHoraInicial(e.target.value)} />
      </label>
      <br />

      <label>
        Hora Final:
        <input type="time" value={horaFinal} onChange={e => setHoraFinal(e.target.value)} />
      </label>
      <br />

      <button type="submit">Agendar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default FormAgendamento;