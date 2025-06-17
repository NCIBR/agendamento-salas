import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agendamento-salas.onrender.com'  // sua URL pública do Render
});

export default api;