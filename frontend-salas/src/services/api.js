import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agendamento-salas-1.onrender.com',  // substitua pela URL do Render
});

export default api;