import './PedidosPendentes.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function PedidosPendentes() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const api = 'http://192.168.1.5:3000';
  const [pedidos, setPedidos] = useState([]);
  
  
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`${api}/api/pedido-mobile/${user?.id}`);
        if (response.status === 200) {
            setPedidos(response.data.pedidos);
        }
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.id) {
      fetchPedido();
    }
  }, [user?.id]);
  

  return (
    <div className='FullContentOperationsPP'>
      <div className='HeaderOperationsPP'>
        <div className='goBackDivOperationsPP'>
          <Link to={'/Home'}>
            <img src={goBack} alt='Voltar' />
          </Link>
        </div>

        <h2 id='consultasPendentesPP'>Consultas Pendentes</h2>
        <div className='threeDotsdivOperationsPP'>
          <Link to={'/Settings'}>
            <img src={threeDots} alt='Opções' />
          </Link>
        </div>
      </div>

      <div>
        

      {loading ? (
        <Loading text="A carregar Pedidos..." />
        ) : pedidos.length === 0 ? (
        <p>⚠️ Nenhum pedido encontrado</p>
        ) : (
        <div className='activeListPP'>
            {pedidos.map((pedido, index) => (
            <div key={pedido.id || index}>
                <div className='activeItemdivOperationsPP'>
                <div
                    className={
                    index % 2 === 0
                        ? 'activeLogoDivOperationsSaque'
                        : 'activeLogoDivOperationsDeposito'
                    }
                >
                    <h2 id='activeLogoOperationsPP'>P</h2>
                </div>

                <div className='interventionDivPP'>
                    <Link to={`/ViewPedido/${pedido.id}`}>
                    <h3 id='activeNameOperationsPP' className='link'>{pedido.nome}</h3>
                    </Link>
                    <div className='horarioDivPP'>
                    <h5 id='dataConsultaPP'>{pedido.dataConsulta}</h5>
                    <h5 id='horaEntradaPP'>{pedido.horaEntradaDC}</h5>
                    <div id='estadoPP' style={{backgroundColor:pedido.requestStatus === 'Pendente'? '#F3D37C': pedido.requestStatus === 'Validado'? '#A9D680': 'transparent',
    border: `2px solid ${
      pedido.requestStatus === 'Pendente'
        ? '#DEBE69'
        : pedido.requestStatus === 'Validado'
        ? '#A9D680'
        : 'transparent'
    }`}}>
                        <h5 >{pedido.requestStatus}</h5>
                    </div>
                    
                    </div>
                </div>
                </div>
                <div className='bordaOperationsPP'></div>
            </div>
            ))}
        </div>
        )}

      </div>
    </div>
  );
}

export default PedidosPendentes;
