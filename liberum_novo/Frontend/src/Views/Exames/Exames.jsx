import './Exames.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function Exames() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [exames, setExames] = useState([]);
  const [erro, setErro] = useState('');
  const api = 'http://192.168.1.5:3000';

  // ✅ Buscar exames do utilizador
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
    }
  }, [user?.id]);

  return (
    <div className='FullContentOperationsEX'>
      <div className='HeaderOperationsEX'>
        <div className='goBackDivOperationsEX'>
          <Link to={'/Home'}>
            <img src={goBack} alt='Voltar' />
          </Link>
        </div>

        <h2 id='consultasPendentesEX'>Exames Submetidos</h2>

        <div className='threeDotsdivOperationsEX'>
          <Link to={'/Settings'}>
            <img src={threeDots} alt='Opções' />
          </Link>
        </div>
      </div>

      <div>
        {loading ? (
          <Loading text="A carregar Exames..." />
        ) : erro ? (
          <p>{erro}</p>
        ) : exames.length === 0 ? (
          <p>⚠️ Nenhum exame encontrado</p>
        ) : (
          <div className='activeListPP'>
            {exames.map((exame, index) => (
              <div key={exame.id || index}>
                <div className='activeItemdivOperationsEX'>
                  <div
                    className={
                      index % 2 === 0
                        ? 'activeLogoDivOperationsSaque'
                        : 'activeLogoDivOperationsDeposito'
                    }
                  >
                    <h2 id='activeLogoOperationsEX'>E</h2>
                  </div>

                  <div className='interventionDivEX'>
                    <Link to={`/ViewExam/${exame.id}`} className='Link'> <h3 id='activeNameOperationsEX'>{`Exame ${index + 1}`}</h3></Link>

                    <div className='horarioDivEX'>
                      <h5 id='dataConsultaEX'>{exame.dataExame}</h5>

                      <div
                        id='estadoEX'
                        style={{
                          backgroundColor:
                            exame.requestStatus === 'Pendente'
                              ? '#F3D37C'
                              : exame.requestStatus === 'Validado'
                              ? '#A9D680'
                              : 'transparent',
                          border: `2px solid ${
                            exame.requestStatus === 'Pendente'
                              ? '#DEBE69'
                              : exame.requestStatus === 'Validado'
                              ? '#A9D680'
                              : 'transparent'
                          }`,
                        }}
                      >
                        <h5>{exame.requestStatus || 'Pendente'}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bordaOperationsEX'></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exames;
