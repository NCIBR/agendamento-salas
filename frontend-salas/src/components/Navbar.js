import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#eee', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Início</Link>
      <Link to="/agendar" style={{ marginRight: '10px' }}>Agendar Sala</Link>
      <Link to="/agendamentos">Ver Agendamentos</Link>
    </nav>
  );
}

export default Navbar;