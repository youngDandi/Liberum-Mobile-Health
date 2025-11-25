import './Consultas.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Consultas() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState('');
  const [filter, setFilter] = useState('todas'); // 'todas', 'recentes', 'antigas'
  const api = 'http://192.168.1.7:3000';

  useEffect(() => {
    const fetchConsultasPaciente = async () => {
      console.log("📡 Buscando consultas para o paciente ID:", user?.patientId || user?.id);
      setLoading(true);
      setErro('');

      try {
        const response = await axios.get(`${api}/consultas/${user?.patientId || user?.id}`);
        console.log("📬 Resposta da API:", response.data);

        if (response.status === 200 && Array.isArray(response.data.consultas)) {
          const consultasFormatadas = response.data.consultas.map((c) => ({
            id: c.id,
            intervencao: c.intervencao || "Sem intervenção",
            dataConsulta: c.dataConsulta || "Sem data",
            horaEntrada: c.horaEntrada || "Sem hora de entrada",
            horaSaida: c.horaSaida || "Sem hora de saída"
          }));

          setConsultas(consultasFormatadas);
        } else {
          console.warn("⚠️ Formato de resposta inesperado:", response.data);
          setConsultas([]);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar consultas:", error);
        setErro("Erro ao buscar dados das consultas.");
        setConsultas([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.patientId || user?.id) {
      fetchConsultasPaciente();
    } else {
      console.warn("⛔ Nenhum ID de paciente fornecido.");
      setLoading(false);
    }
  }, [user?.patientId, user?.id]);

  const filteredConsultas = consultas.filter((consulta) => {
    if (filter === 'todas') return true;
    // Adicione lógica de filtro se necessário
    return true;
  });

  return (
    <div className='consultas-container'>
      {/* Header */}
      <header className='consultas-header'>
        <Link to='/Home' className='back-btn-consultas'>
          <span className='back-icon-consultas'>←</span>
        </Link>
        
        <h1 className='page-title-consultas'>Histórico de Consultas</h1>

        <button className='menu-btn-consultas'>
          <span>⋮</span>
        </button>
      </header>

      {/* Stats Card */}
      <div className='stats-card'>
        <div className='stat-item'>
          <span className='stat-icon'>📅</span>
          <div className='stat-info'>
            <p className='stat-label'>Total</p>
            <p className='stat-value'>{consultas.length}</p>
          </div>
        </div>
        <div className='stat-divider'></div>
        <div className='stat-item'>
          <span className='stat-icon'>✅</span>
          <div className='stat-info'>
            <p className='stat-label'>Realizadas</p>
            <p className='stat-value'>{consultas.length}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='filter-tabs'>
        <button
          className={`filter-tab ${filter === 'todas' ? 'active' : ''}`}
          onClick={() => setFilter('todas')}
        >
          Todas
        </button>
        <button
          className={`filter-tab ${filter === 'recentes' ? 'active' : ''}`}
          onClick={() => setFilter('recentes')}
        >
          Recentes
        </button>
        <button
          className={`filter-tab ${filter === 'antigas' ? 'active' : ''}`}
          onClick={() => setFilter('antigas')}
        >
          Antigas
        </button>
      </div>

      {/* Content */}
      <div className='consultas-content'>
        {loading ? (
          <div className='loading-state'>
            <div className='loader-spinner'></div>
            <p className='loading-text'>A carregar consultas...</p>
          </div>
        ) : erro ? (
          <div className='error-state'>
            <span className='error-icon'>⚠️</span>
            <p className='error-text'>{erro}</p>
            <button className='retry-btn' onClick={() => window.location.reload()}>
              Tentar Novamente
            </button>
          </div>
        ) : filteredConsultas.length === 0 ? (
          <div className='empty-state'>
            <span className='empty-icon'>📋</span>
            <h3 className='empty-title'>Nenhuma consulta encontrada</h3>
            <p className='empty-text'>Ainda não tens consultas registadas no sistema.</p>
            <Link to='/MarcarConsultas' className='cta-btn'>
              <span>📆</span>
              Marcar Consulta
            </Link>
          </div>
        ) : (
          <div className='consultas-list'>
            {filteredConsultas.map((consulta, index) => (
              <Link
                to={`/ViewConsulta/${consulta.id}`}
                key={consulta.id || index}
                className='consulta-card'
              >
                <div className='consulta-icon-wrapper'>
                  <div className={`consulta-icon ${index % 2 === 0 ? 'blue' : 'cyan'}`}>
                    <span>📋</span>
                  </div>
                </div>

                <div className='consulta-details'>
                  <h3 className='consulta-title'>Consulta {index + 1}</h3>
                  
                  <div className='consulta-info-grid'>
                    <div className='info-item-consulta'>
                      <span className='info-icon-consulta'>📅</span>
                      <span className='info-text-consulta'>{consulta.dataConsulta}</span>
                    </div>
                    
                    <div className='info-item-consulta'>
                      <span className='info-icon-consulta'>🕐</span>
                      <span className='info-text-consulta'>{consulta.horaEntrada}</span>
                    </div>
                    
                    <div className='info-item-consulta'>
                      <span className='info-icon-consulta'>🕑</span>
                      <span className='info-text-consulta'>{consulta.horaSaida}</span>
                    </div>
                  </div>

                  {consulta.intervencao !== "Sem intervenção" && (
                    <div className='consulta-badge'>
                      <span>💊</span>
                      {consulta.intervencao}
                    </div>
                  )}
                </div>

                <div className='consulta-arrow'>
                  <span>›</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && !erro && consultas.length > 0 && (
        <div className='consultas-footer'>
          <p className='footer-info'>
            Exibindo {filteredConsultas.length} de {consultas.length} consultas
          </p>
        </div>
      )}
    </div>
  );
}

export default Consultas;
