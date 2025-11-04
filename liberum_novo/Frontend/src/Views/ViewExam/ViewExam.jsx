import './ViewExam.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import React, {useEffect,useState} from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function ViewExam() {
      const [dataExame, setDataExame] = useState('');
      const [nome, setNome] = useState('');
      const [telefone, setTelefone] = useState('');
      const [email, setEmail] = useState('');
      const [imagemFile, setImagemFile] = useState(null);
      const [loading, setLoading] = useState(true);
      const [erro, setErro] = useState(null);
      const [diagnostico, setDiagnostico] = useState('');
      const [medicoNome, setMedicoNome] = useState('');
      const [recomendacoes, setRecomendacoes] = useState('');
      
      
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Define a URL da tua API (ajusta conforme IP e porta)
  const api = 'http://192.168.1.5:3000';


  useEffect(() => {
    const fetchRecomendation = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
        console.log(`📡 A buscar dados do exame com ID: ${id}`);
  
        const response = await axios.get(`${api}/api/recomendation/${id}`);
  
        if (response.status === 200) {
          const dados = response.data;
          console.log("✅ Dados recebidos do backend:", dados);
  
          // Atualiza os estados com os dados do backend
          setNome(dados.nome || "");
          setEmail(dados.email || "");
          setTelefone(dados.telefone || "");
          setDataExame(dados.dataExame || "");
          setDiagnostico(dados.diagnostico || "");
          setMedicoNome(dados.medicoNome || "");
          setRecomendacoes(dados.recomendacoes || "");
          setImagemFile(dados.imagem || "");
          
        } else {
          console.warn("⚠️ Nenhum dado encontrado para o ID:", id);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados do exame:", error);
        alert("Erro ao buscar dados do exame. Verifica o servidor.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecomendation();
  }, [id]);
  
  

  
  

  return (
    <div className="FullContentOperationsVE">
      

      <div className="HeaderOperationsVE">
        <div className="goBackDivOperationsVE">
          <Link to="/Home">
            <img src={goBack} alt="Voltar" />
          </Link>
        </div>

        <h2 id="consultasVE">Detalhes do Exame</h2>
        <div className="threeDotsdivOperationsVE">
          <Link to="/Settings">
            <img src={threeDots} alt="Opções" />
          </Link>
        </div>
      </div>

      
      <form className="inputsDiv2" >
      
        <p className="labelViewConsulta1VE">Nome:</p>
        <input
          className="inputStyleViewconsultaVE"
          placeholder="Nome"
          value={nome }
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <p className="labelViewConsulta1VE">Email:</p>
        <input
          className="inputStyleViewconsultaVE"
          placeholder="Email"
          value={email || ''}
          onChange={(e) => SetEmail(e.target.value)}
          required
        />

        <p className="labelViewConsulta1VE">Telefone:</p>
        <input
          className="inputStyleViewconsultaVE"
          placeholder="Telefone"
          value={telefone || ''}
          onChange={(e) => SetTelefone(e.target.value)}
          required
        />

<p className="labelViewConsulta1VE">Médico:</p>
        <input
          className="inputStyleViewconsultaVE"
          placeholder="Telefone"
          value={medicoNome || ''}
          onChange={(e) => setMedicoNome(e.target.value)}
          required
        />
        
        
        <p className="labelViewConsulta3VE">Diagnóstico:</p>
        <input
                type="text"
                id="inputImagemVE"
                className="inputStyleViewconsultaVE"
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                required
        />
        <p className="labelViewConsulta4VE">Recomendações:</p>
        <input
                type="text"
                id="inputImagemVE"
                className="inputStyleViewconsultaVE"
                value={recomendacoes}
                onChange={(e) => setRecomendacoes(e.target.value)}
                required
        />
        
        <p className="labelViewConsulta2VE">Data do Exame:</p>
        <input
          className="inputStyleViewconsultaVE"
          
          type="date"
          value={dataExame}
          onChange={(e) => setDataExame(e.target.value)}
          required
        />
            

        
      </form>
    </div>
  );
}

export default ViewExam;
