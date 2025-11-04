import './MarcarConsultas.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function MarcarConsultas() {
  const [dataConsulta, setDataConsulta] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [horaEntradaDC, setHoraEntradaDC]= useState('');
  const [imagemFile, setImagemFile] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Define a URL da tua API (ajusta conforme IP e porta)
  const api = 'http://192.168.1.5:3000';

  // ✅ Função para enviar dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!imagemFile) {
      alert("Por favor, selecione uma imagem antes de enviar.");
      return;
    }
  
    // ✅ Criar o FormData para enviar texto + imagem
    const formData = new FormData();
    formData.append("nome", nome || user?.nome || "");
    formData.append("email", email || user?.email || "");
    formData.append("telefone", telefone || user?.telefone || "");
    formData.append("dataConsulta", dataConsulta);
    formData.append("horaEntradaDC", horaEntradaDC);
    formData.append("requestStatus", "Pendente");
    formData.append("userId", user?.id || "");
    formData.append("userType", user?.userType || "Desconhecido");
    formData.append("imagem", imagemFile); // campo igual ao nome usado no backend
  
    console.log("📤 Enviando FormData da consulta...");
  
    try {
      setLoading(true);
      const response = await axios.post(api +"/api/consultas-pendentes-mobile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("✅ Consulta registrada com sucesso:", response.data);
      alert("Pedido submetido com sucesso!");
      navigate("/Home");
    } catch (error) {
      console.error("❌ Erro ao enviar consulta:", error);
      alert("Já existe uma Consulta marcada para esta data e hora. Por favor, Tente marcar para outra Data ou hora!!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="FullContentOperationsMC">
      

      <div className="HeaderOperationsMC">
        <div className="goBackDivOperationsMC">
          <Link to="/Home">
            <img src={goBack} alt="Voltar" />
          </Link>
        </div>

        <h2 id="consultasMC">Marcar Consultas</h2>
        <div className="threeDotsdivOperationsMC">
          <Link to="/Settings">
            <img src={threeDots} alt="Opções" />
          </Link>
        </div>
      </div>

      <form className="inputsDiv2" onSubmit={handleSubmit}>
        <p className="labelViewConsulta1MC">Nome:</p>
        <input
          className="inputStyleViewconsultaMC"
          placeholder="Nome"
          value={nome || user?.nome || ''}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <p className="labelViewConsulta1MC">Email:</p>
        <input
          className="inputStyleViewconsultaMC"
          placeholder="Email"
          value={email || user?.email || ''}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p className="labelViewConsulta1MC">Telefone:</p>
        <input
          className="inputStyleViewconsultaMC"
          placeholder="Telefone"
          value={telefone || user?.telefone || ''}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <p className="labelViewConsulta2MC">Data da Consulta:</p>
        <input
          className="inputStyleViewconsultaMC"
          
          type="date"
          value={dataConsulta}
          onChange={(e) => setDataConsulta(e.target.value)}
          required
        />

        <p className="labelViewConsulta2MC">Hora de Entrada:</p>
        <input
          className="inputStyleViewconsultaMC"
          id='inputDatadivMC'
          type="time"
          value={horaEntradaDC}
          onChange={(e) => setHoraEntradaDC(e.target.value)}
          required
        />
        
        <p className="labelViewConsulta3MC">Foto:</p>
        <input
                type="file"
                id="inputImagemMC"
                className="labelViewConsulta4MC"
                accept="image/*"
                onChange={(e) => setImagemFile(e.target.files[0])}
                required
        />
        
        

        <div className='buttondivMC'>
            <button type="submit" className="submitButtonMC" id='MarcarConsultaBtn'>
                Marcar Consulta
            </button>
        </div>

        
      </form>
    </div>
  );
}

export default MarcarConsultas;
