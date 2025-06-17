import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Agendamento de Salas da NCI</h1>
      <p>
        Use o menu ou o botão abaixo para acessar a área de agendamentos.
      </p>
      <Link to="/agendamentos" className="home-button">
        Ver Agendamentos
      </Link>
    </div>
  );
}


export default Home;