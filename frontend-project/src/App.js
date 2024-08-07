// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import Login from './pages/Login'; // Importa el componente de Login
import Navbar from './components/Navbar';
import CreateTicket from './pages/CreateTicket'; // Importa el componente de crear ticket

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Añade la ruta de Login */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/create-ticket" element={<CreateTicket />} /> {/* Añade la ruta de crear ticket */}
      </Routes>
    </Router>
  );
}

export default App;
