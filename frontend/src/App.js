import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuscarCita from './pages/BuscarCita';
import Login from './pages/Login';


function App() {
  // Simulación de sesión
  const rol = 'PACIENTE';
  const usuarioId = 1;

  return (
      <Router>
        <Header rol={rol} usuarioId={usuarioId} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/buscar" element={<BuscarCita />} />
              <Route path="/login" element={<Login />} />

              {/* Aquí irán más páginas */}
          </Routes>
        </main>
        <Footer />
      </Router>
  );
}

export default App;
