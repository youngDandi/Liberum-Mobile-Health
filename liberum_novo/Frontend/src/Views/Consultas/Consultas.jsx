import './Consultas.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function Consultas() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const api = 'http://192.168.1.5:3000';

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
    }
  }, [user?.patientId, user?.id]);

  return (
    <div className='FullContentOperations'>
      <div className='HeaderOperations'>
        <div className='goBackDivOperations'>
          <Link to={'/Home'}>
            <img src={goBack} alt='Voltar' />
          </Link>
        </div>

        <h2>Consultas</h2>
        <div className='threeDotsdivOperations'>
          <Link to={'/Settings'}>
            <img src={threeDots} alt='Opções' />
          </Link>
        </div>
      </div>

      <div>
        

        {loading ? (
          <Loading text="A carregar consultas..." />
        ) : consultas.length === 0 ? (
          <p>⚠️ Nenhuma consulta encontrada</p>
        ) : (
          <div className='activeList'>
            {consultas.map((consulta, index) => (
              <div key={consulta.id || index}>
                <div className='activeItemdivOperations'>
                  <div
                    className={
                      index % 2 === 0
                        ? 'activeLogoDivOperationsSaque'
                        : 'activeLogoDivOperationsDeposito'
                    }
                  >
                    <h2 id='activeLogoOperations'>C</h2>
                  </div>

                  <div className='interventionDiv'>
                   <Link to={`/ViewConsulta/${consulta.id }`}> <h3 id='activeName'>{consulta.intervencao}</h3> </Link>
                    <div className='horarioDiv'>
                      <h5 id='dataConsulta'>{consulta.dataConsulta}</h5>
                      
                      <h5 id='horaEntrada'>Entrada:{consulta.horaEntrada}</h5>
                      <h5 id='horaSaida'>Saída:{consulta.horaSaida}</h5>
                    </div>
                  </div>
                </div>

                <div className='bordaOperations'></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultas;
