// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Agendamento from './pages/Agendamento.jsx'; 
import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Agendamento />} /> 
          
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/login" element={<Login />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;