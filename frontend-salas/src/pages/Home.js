import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="nome-criacao">Desenvolvido por: Ana Kobayashi</div> {/* Novo elemento */}

      <h1>
        Bem-vindo ao Sistema de Agendamento de Salas da 
        <p></p>
        Nippon Carbide
      </h1>
      <p>
        Use o menu ou os botões abaixo para acessar a área de agendamentos.
      </p>

      <div className="botoes-home">
        <Link to="/agendamentos" className="home-button">
          Ver Agendamentos
        </Link>
        <Link to="/agendar" className="home-button agendar-button">
          Agendar sala
        </Link>
      </div>
    </div>
  );
}

export default Home;
