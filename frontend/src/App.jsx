import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import RotaPrivada from './utils/RotaPrivada.jsx';
import MeusAgendamentos from './pages/MeusAgendamentos.jsx';
import Home from './pages/Home.jsx';
import PaginaAgendamento from './pages/PaginaAgendamento.jsx';
import './App.css';

function App() {
  return (
    <>
       <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/agendar" element={<PaginaAgendamento />} />

          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/meus-agendamentos" 
            element={
              <RotaPrivada>
                <MeusAgendamentos />
              </RotaPrivada>
            }  />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;