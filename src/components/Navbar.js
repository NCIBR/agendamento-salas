import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: '#eee',
      padding: '10px',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000
    }}>
      <Link to="/" style={{ marginRight: '10px' }}>Início</Link>
      <Link to="/agendar" style={{ marginRight: '10px' }}>Agendar Sala</Link>
      <Link to="/agendamentos">Ver Agendamentos</Link>
    </nav>
  );
}

export default Navbar;
