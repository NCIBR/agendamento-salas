import React, { useState } from 'react';
import api from '../services/api';

const salas = ['Sala de reunião 1', 'Sala de reunião 2', 'Recepção'];

function Agendar() {
  const [nome, setNome] = useState('');
  const [sala, setSala] = useState(salas[0]);
  const [data, setData] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const validarFormulario = () => {
    if (!nome || !data || !horaInicial || !horaFinal) {
      setErro('Por favor, preencha todos os campos.');
      return false;
    }
    if (horaFinal <= horaInicial) {
      setErro('Hora final deve ser maior que hora inicial.');
      return false;
    }
    setErro('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setMensagem('');
    try {
      const res = await api.post('/agendamentos', {
        nome,
        sala,
        data,
        hora_inicial: horaInicial,
        hora_final: horaFinal
      });
      setMensagem(res.data.mensagem);
      setNome('');
      setSala(salas[0]);
      setData('');
      setHoraInicial('');
      setHoraFinal('');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao agendar');
    }
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const messageStyle = {
    color: 'green',
    marginTop: '10px',
    fontWeight: 'bold',
  };

  return (
    <div style={formStyle}>
      <h2>Agendar Sala</h2>
      {erro && <div style={errorStyle}>{erro}</div>}
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Nome:</label>
        <input
          style={inputStyle}
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <label style={labelStyle}>Sala:</label>
        <select
          style={inputStyle}
          value={sala}
          onChange={e => setSala(e.target.value)}
          required
        >
          {salas.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <label style={labelStyle}>Data:</label>
        <input
          style={inputStyle}
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
          required
        />

        <label style={labelStyle}>Hora Inicial:</label>
        <input
          style={inputStyle}
          type="time"
          value={horaInicial}
          onChange={e => setHoraInicial(e.target.value)}
          required
        />

        <label style={labelStyle}>Hora Final:</label>
        <input
          style={inputStyle}
          type="time"
          value={horaFinal}
          onChange={e => setHoraFinal(e.target.value)}
          required
        />

        <button style={buttonStyle} type="submit">Agendar</button>
      </form>

      {mensagem && <div style={messageStyle}>{mensagem}</div>}
    </div>
  );
}

export default Agendar;
