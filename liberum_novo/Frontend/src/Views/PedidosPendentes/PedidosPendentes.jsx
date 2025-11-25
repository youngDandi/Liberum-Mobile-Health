import './PedidosPendentes.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PedidosPendentes() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [filter, setFilter] = useState('todos'); // 'todos', 'pendentes', 'validados'
  const api = 'http://192.168.1.7:3000';

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`${api}/api/pedido-mobile/${user?.id}`);
        if (response.status === 200) {
          setPedidos(response.data.pedidos || []);
        }
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        setErro('Erro ao carregar pedidos. Tenta novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchPedido();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const filteredPedidos = pedidos.filter((pedido) => {
    if (filter === 'todos') return true;
    if (filter === 'pendentes') return pedido.requestStatus === 'Pendente';
    if (filter === 'validados') return pedido.requestStatus === 'Validado';
    return true;
  });

  const pendentesCount = pedidos.filter(p => p.requestStatus === 'Pendente').length;
  const validadosCount = pedidos.filter(p => p.requestStatus === 'Validado').length;

  return (
    <div className='pedidos-container'>
      {/* Header */}
      <header className='pedidos-header'>
        <Link to='/Home' className='back-btn-pedidos'>
          <span className='back-icon-pedidos'>←</span>
        </Link>

        <h1 className='page-title-pedidos'>Minhas Marcações</h1>

        <button className='menu-btn-pedidos'>
          <span>⋮</span>
        </button>
      </header>

      {/* Stats Card */}
      <div className='stats-card-pedidos'>
        <div className='stat-item-pedidos'>
          <span className='stat-icon-pedidos'>📋</span>
          <div className='stat-info-pedidos'>
            <p className='stat-label-pedidos'>Total</p>
            <p className='stat-value-pedidos'>{pedidos.length}</p>
          </div>
        </div>
        <div className='stat-divider-pedidos'></div>
        <div className='stat-item-pedidos'>
          <span className='stat-icon-pedidos'>⏳</span>
          <div className='stat-info-pedidos'>
            <p className='stat-label-pedidos'>Pendentes</p>
            <p className='stat-value-pedidos pending-color'>{pendentesCount}</p>
          </div>
        </div>
        <div className='stat-divider-pedidos'></div>
        <div className='stat-item-pedidos'>
          <span className='stat-icon-pedidos'>✅</span>
          <div className='stat-info-pedidos'>
            <p className='stat-label-pedidos'>Validados</p>
            <p className='stat-value-pedidos success-color'>{validadosCount}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='filter-tabs-pedidos'>
        <button
          className={`filter-tab-pedidos ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button
          className={`filter-tab-pedidos ${filter === 'pendentes' ? 'active' : ''}`}
          onClick={() => setFilter('pendentes')}
        >
          Pendentes
        </button>
        <button
          className={`filter-tab-pedidos ${filter === 'validados' ? 'active' : ''}`}
          onClick={() => setFilter('validados')}
        >
          Validados
        </button>
      </div>

      {/* Content */}
      <div className='pedidos-content'>
        {loading ? (
          <div className='loading-state-pedidos'>
            <div className='loader-spinner-pedidos'></div>
            <p className='loading-text-pedidos'>A carregar pedidos...</p>
          </div>
        ) : erro ? (
          <div className='error-state-pedidos'>
            <span className='error-icon-pedidos'>⚠️</span>
            <p className='error-text-pedidos'>{erro}</p>
            <button className='retry-btn-pedidos' onClick={() => window.location.reload()}>
              Tentar Novamente
            </button>
          </div>
        ) : filteredPedidos.length === 0 ? (
          <div className='empty-state-pedidos'>
            <span className='empty-icon-pedidos'>📅</span>
            <h3 className='empty-title-pedidos'>Nenhuma marcação encontrada</h3>
            <p className='empty-text-pedidos'>
              {filter === 'todos'
                ? 'Ainda não tens marcações registadas no sistema.'
                : filter === 'pendentes'
                ? 'Não tens marcações pendentes no momento.'
                : 'Não tens marcações validadas no momento.'}
            </p>
            <Link to='/MarcarConsultas' className='cta-btn-pedidos'>
              <span>📆</span>
              Marcar Nova Consulta
            </Link>
          </div>
        ) : (
          <div className='pedidos-list'>
            {filteredPedidos.map((pedido, index) => (
              <Link
                to={`/ViewPedido/${pedido.id}`}
                key={pedido.id || index}
                className='pedido-card'
              >
                <div className='pedido-icon-wrapper'>
                  <div className={`pedido-icon ${index % 2 === 0 ? 'cyan' : 'blue'}`}>
                    <span>📋</span>
                  </div>
                </div>

                <div className='pedido-details'>
                  <h3 className='pedido-title'>Marcação {index + 1}</h3>

                  <div className='pedido-info-grid'>
                    <div className='info-item-pedido'>
                      <span className='info-icon-pedido'>📅</span>
                      <span className='info-text-pedido'>{pedido.dataConsulta}</span>
                    </div>

                    <div className='info-item-pedido'>
                      <span className='info-icon-pedido'>🕐</span>
                      <span className='info-text-pedido'>{pedido.horaEntradaDC}</span>
                    </div>

                    <div className={`status-badge-pedido ${
                      pedido.requestStatus === 'Pendente' ? 'pending' : 'validated'
                    }`}>
                      <span className='status-icon-pedido'>
                        {pedido.requestStatus === 'Pendente' ? '⏳' : '✅'}
                      </span>
                      <span>{pedido.requestStatus || 'Pendente'}</span>
                    </div>
                  </div>

                  {pedido.nome && (
                    <div className='pedido-nome-badge'>
                      <span>👤</span>
                      {pedido.nome}
                    </div>
                  )}
                </div>

                <div className='pedido-arrow'>
                  <span>›</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && !erro && filteredPedidos.length > 0 && (
        <div className='pedidos-footer'>
          <p className='footer-info-pedidos'>
            Exibindo {filteredPedidos.length} de {pedidos.length} marcações
          </p>
        </div>
      )}
    </div>
  );
}

export default PedidosPendentes;
