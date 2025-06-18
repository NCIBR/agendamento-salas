import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-salas.onrender.com'  // sua URL pública do Render
});

export default api;