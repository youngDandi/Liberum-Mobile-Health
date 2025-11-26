import './Exames.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Exames() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [exames, setExames] = useState([]);
  const [erro, setErro] = useState('');
  const [filter, setFilter] = useState('todos'); // 'todos', 'pendentes', 'validados'
  const api = 'http://192.168.1.3:3000';

  useEffect(() => {
    const fetchExames = async () => {
      console.log("📡 [FRONTEND] A buscar exames do utilizador...");

      try {
        const response = await axios.get(`${api}/analise-imagens-mobile/${user?.id}`);

        if (response.status === 200) {
          console.log("✅ [FRONTEND] Exames recebidos:", response.data.exames);
          setExames(response.data.exames || []);
        }
      } catch (error) {
        console.error("❌ [FRONTEND] Erro ao buscar exames:", error);
        setErro('Erro ao carregar exames. Tenta novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchExames();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const filteredExames = exames.filter((exame) => {
    if (filter === 'todos') return true;
    if (filter === 'pendentes') return exame.requestStatus === 'Pendente';
    if (filter === 'validados') return exame.requestStatus === 'Validado';
    return true;
  });

  const pendentesCount = exames.filter(e => e.requestStatus === 'Pendente').length;
  const validadosCount = exames.filter(e => e.requestStatus === 'Validado').length;

  return (
    <div className='exames-container'>
      {/* Header */}
      <header className='exames-header'>
        <Link to='/Home' className='back-btn-exames'>
          <span className='back-icon-exames'>←</span>
        </Link>

        <h1 className='page-title-exames'>Meus Exames</h1>
        <Link to='/Settings' className='back-btn-consultas'>
        <button className='menu-btn-exames'>
          <span>⋮</span>
        </button>
        </Link>
      </header>

      {/* Stats Card */}
      <div className='stats-card-exames'>
        <div className='stat-item-exames'>
          <span className='stat-icon-exames'>🔬</span>
          <div className='stat-info-exames'>
            <p className='stat-label-exames'>Total</p>
            <p className='stat-value-exames'>{exames.length}</p>
          </div>
        </div>
        <div className='stat-divider-exames'></div>
        <div className='stat-item-exames'>
          <span className='stat-icon-exames'>⏳</span>
          <div className='stat-info-exames'>
            <p className='stat-label-exames'>Pendentes</p>
            <p className='stat-value-exames pending-color'>{pendentesCount}</p>
          </div>
        </div>
        <div className='stat-divider-exames'></div>
        <div className='stat-item-exames'>
          <span className='stat-icon-exames'>✅</span>
          <div className='stat-info-exames'>
            <p className='stat-label-exames'>Validados</p>
            <p className='stat-value-exames success-color'>{validadosCount}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='filter-tabs-exames'>
        <button
          className={`filter-tab-exames ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button
          className={`filter-tab-exames ${filter === 'pendentes' ? 'active' : ''}`}
          onClick={() => setFilter('pendentes')}
        >
          Pendentes
        </button>
        <button
          className={`filter-tab-exames ${filter === 'validados' ? 'active' : ''}`}
          onClick={() => setFilter('validados')}
        >
          Validados
        </button>
      </div>

      {/* Content */}
      <div className='exames-content'>
        {loading ? (
          <div className='loading-state-exames'>
            <div className='loader-spinner-exames'></div>
            <p className='loading-text-exames'>A carregar exames...</p>
          </div>
        ) : erro ? (
          <div className='error-state-exames'>
            <span className='error-icon-exames'>⚠️</span>
            <p className='error-text-exames'>{erro}</p>
            <button className='retry-btn-exames' onClick={() => window.location.reload()}>
              Tentar Novamente
            </button>
          </div>
        ) : filteredExames.length === 0 ? (
          <div className='empty-state-exames'>
            <span className='empty-icon-exames'>🔬</span>
            <h3 className='empty-title-exames'>Nenhum exame encontrado</h3>
            <p className='empty-text-exames'>
              {filter === 'todos' 
                ? 'Ainda não tens exames registados no sistema.'
                : filter === 'pendentes'
                ? 'Não tens exames pendentes no momento.'
                : 'Não tens exames validados no momento.'}
            </p>
            <Link to='/AnaliseImagens' className='cta-btn-exames'>
              <span>🩺</span>
              Submeter Novo Exame
            </Link>
          </div>
        ) : (
          <div className='exames-list'>
            {filteredExames.map((exame, index) => (
              <Link
                to={`/ViewExam/${exame.id}`}
                key={exame.id || index}
                className='exame-card'
              >
                <div className='exame-icon-wrapper'>
                  <div className={`exame-icon ${index % 2 === 0 ? 'blue' : 'pink'}`}>
                    <span>🔬</span>
                  </div>
                </div>

                <div className='exame-details'>
                  <h3 className='exame-title'>Exame Mamográfico {index + 1}</h3>

                  <div className='exame-info-grid'>
                    <div className='info-item-exame'>
                      <span className='info-icon-exame'>📅</span>
                      <span className='info-text-exame'>
                        {new Date(exame.dataExame).toLocaleDateString('pt-PT')}
                      </span>
                    </div>

                    <div className={`status-badge-exame ${
                      exame.requestStatus === 'Pendente' ? 'pending' : 'validated'
                    }`}>
                      <span className='status-icon-exame'>
                        {exame.requestStatus === 'Pendente' ? '⏳' : '✅'}
                      </span>
                      <span>{exame.requestStatus || 'Pendente'}</span>
                    </div>
                  </div>

                  {exame.prediction && (
                    <div className={`prediction-badge ${
                      exame.prediction === 'malignant' ? 'malignant' : 'benign'
                    }`}>
                      <span className='prediction-icon'>
                        {exame.prediction === 'malignant' ? '⚠️' : '✓'}
                      </span>
                      <span className='prediction-text'>
                        {exame.prediction === 'malignant' ? 'Maligno' : 'Benigno'}
                      </span>
                      {exame.confidence && (
                        <span className='confidence-text'>
                          ({Math.round(exame.confidence * 100)}%)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className='exame-arrow'>
                  <span>›</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && !erro && filteredExames.length > 0 && (
        <div className='exames-footer'>
          <p className='footer-info-exames'>
            Exibindo {filteredExames.length} de {exames.length} exames
          </p>
        </div>
      )}
    </div>
  );
}

export default Exames;
