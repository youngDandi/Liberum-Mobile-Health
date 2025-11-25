import './Home.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  console.log("🔍 Dados do utilizador logado:", user);

  return (
    <div className='home-container'>
      {/* Header Section */}
      <header className='home-header'>
        <div className='user-section'>
          <div className='user-avatar'>
            <span className='avatar-text'>
              {user?.nome?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className='user-info'>
            <p className='greeting'>Olá, <span className='user-name'>{user?.nome || 'Utilizador'}!</span></p>
            <p className='subgreeting'>Pronto para começar o dia?</p>
          </div>
        </div>

        <div className='health-badge'>
          <span className='badge-icon'>🏥</span>
          <span className='badge-text'>Saúde</span>
        </div>
      </header>

      {/* Logo Section */}
      <div className='logo-section-home'>
        <div className='logo-circle-home'>
          <span className='logo-letter-home'>L</span>
        </div>
        <h1 className='logo-text-home'>Liberum</h1>
      </div>

      {/* Main Menu Grid */}
      <section className='main-menu'>
        <h2 className='section-title-home'>Menu Principal</h2>
        
        <div className='menu-grid'>
          <Link to='/PedidosPendentes' className='menu-card'>
            <div className='menu-icon'>
              <span className='icon-text'>📅</span>
            </div>
            <h3 className='menu-title'>Marcações</h3>
            <p className='menu-subtitle'>Ver agendamentos</p>
          </Link>

          <Link to='/Consultas' className='menu-card'>
            <div className='menu-icon'>
              <span className='icon-text'>📋</span>
            </div>
            <h3 className='menu-title'>Histórico</h3>
            <p className='menu-subtitle'>Consultas anteriores</p>
          </Link>

          <Link to='/ChatBot' className='menu-card'>
            <div className='menu-icon'>
              <span className='icon-text'>💬</span>
            </div>
            <h3 className='menu-title'>ChatBot</h3>
            <p className='menu-subtitle'>Assistente virtual</p>
          </Link>

          <Link to='/Exames' className='menu-card'>
            <div className='menu-icon'>
              <span className='icon-text'>🔬</span>
            </div>
            <h3 className='menu-title'>Exames</h3>
            <p className='menu-subtitle'>Resultados médicos</p>
          </Link>
        </div>
      </section>

      {/* Prescriptions Section */}
      <section className='prescriptions-section'>
        <div className='section-header-home'>
          <h2 className='section-title-home'>Receitas</h2>
          <div className='time-filter'>
            <span className='filter-text'>Hoje</span>
            <span className='filter-icon'>📅</span>
          </div>
        </div>

        <div className='prescriptions-scroll'>
          <button className='add-prescription-btn'>
            <span className='plus-icon'>+</span>
          </button>

          <div className='prescription-card'>
            <div className='prescription-icon'>
              <span>💊</span>
            </div>
            <p className='prescription-name'>Receita 1</p>
          </div>

          <div className='prescription-card'>
            <div className='prescription-icon'>
              <span>💊</span>
            </div>
            <p className='prescription-name'>Receita 2</p>
          </div>

          <div className='prescription-card'>
            <div className='prescription-icon'>
              <span>💊</span>
            </div>
            <p className='prescription-name'>Receita 3</p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className='modules-section'>
        <h2 className='section-title-home'>Módulos</h2>
        
        <div className='modules-grid'>
          <Link to='/MarcarConsultas' className='module-card'>
            <div className='module-icon-wrapper'>
              <div className='module-icon'>
                <span className='module-icon-text'>📆</span>
              </div>
            </div>
            <h3 className='module-title'>Marcar Consultas</h3>
            <p className='module-description'>Agende sua consulta médica</p>
          </Link>

          {/* Condicional: Análise de Imagens apenas para mulheres */}
          {user?.sexo === "Feminino" && (
            <Link to='/AnaliseImagens' className='module-card module-card-featured'>
              <div className='featured-badge'>
                <span>♀️</span>
              </div>
              <div className='module-icon-wrapper'>
                <div className='module-icon module-icon-pink'>
                  <span className='module-icon-text'>🩺</span>
                </div>
              </div>
              <h3 className='module-title'>Análise de Imagens</h3>
              <p className='module-description'>Exames mamográficos</p>
            </Link>
          )}
        </div>
      </section>

      
    </div>
  );
}

export default Home;
