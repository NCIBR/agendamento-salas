import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Agendar from './pages/Agendar';
import Agendamentos from './pages/Agendamentos';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;