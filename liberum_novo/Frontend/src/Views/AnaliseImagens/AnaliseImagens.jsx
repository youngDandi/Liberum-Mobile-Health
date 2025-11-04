import './AnaliseImagens.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import portfolioIcon from '../../assets/img/portfolioicon.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext.jsx';
import axios from 'axios';
  const api ='http://192.168.1.5:3000';


function AnaliseImagens (){
    const [dataExame, setDataExame] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [imagemFile, setImagemFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
   
    const { user } = useAuth();
    const navigate = useNavigate();

    // ✅ Função para enviar dados + imagem ao backend
    const handleSubmitExam = async (e) => {
        e.preventDefault();
        console.log("🚀 [FRONTEND] Início do envio do formulário");
      
        if (!imagemFile) {
          alert("Por favor, selecione uma imagem antes de enviar.");
          console.log("⚠️ [FRONTEND] Nenhuma imagem selecionada!");
          return;
        }
      
        const formData = new FormData();
        formData.append("imagem", imagemFile);
        formData.append("nome", user?.nome);
        formData.append("email", user?.email);
        formData.append("telefone", user?.telefone);
        formData.append("dataExame", dataExame);
        formData.append("requestStatus", "Pendente");
        formData.append("userId", user?.id || "");
        formData.append("userType", user?.userType || "Desconhecido");
      
        console.log("📦 [FRONTEND] Dados prontos para envio:");
        console.log({
          nome,
          email,
          telefone,
          dataExame,
          requestStatus: "Pendente",
          userId: user?.id || "",
          userType: user?.userType || "Desconhecido",
          imagem: imagemFile ? imagemFile.name : "nenhuma",
        });
      
        try {
          console.log("📡 [FRONTEND] A enviar requisição para o backend...");
          const response = await axios.post(api + "/analise-imagens-mobile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      
          console.log("✅ [FRONTEND] Resposta recebida do servidor:", response.data);
          alert("Exame guardado com sucesso!");
          navigate("/Home");
      
        } catch (error) {
          console.error("❌ [FRONTEND] Erro ao enviar formulário:", error);
          alert("Erro ao enviar os dados. Verifique a ligação com o servidor.");
        }
      };
      
      

    return(
        <div className='FullContentOperationsAI'>
                <div className='HeaderOperationsAI'>
                    <div className='goBackDivOperationsAI'>
                       <Link to={'/Home'}> <img src={goBack} /></Link>
                    </div>
                    
                    <h2 id="consultasAI">Análise de Imagens</h2>
                    <div className='threeDotsdiv'>
                       <Link to={'/Settings'}><img src={threeDots} /></Link> 
                    </div>
                </div>

                





                <div>

                    
                <form className="inputsDiv2" onSubmit={handleSubmitExam}>
          <p className="labelViewConsulta1AI">Nome:</p>
          <input
            className="inputStyleViewconsultaAI"
            placeholder="Nome"
            value={user?.nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <p className="labelViewConsulta1AI">Email:</p>
          <input
            className="inputStyleViewconsultaAI"
            placeholder="Email"
            value={user?.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className="labelViewConsulta1AI">Telefone:</p>
          <input
            className="inputStyleViewconsultaAI"
            placeholder="Telefone"
            value={user?.telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <p className="labelViewConsulta2AI">Data do Exame:</p>
          <input
            className="inputStyleViewconsultaAI"
            type="date"
            value={dataExame}
            onChange={(e) => setDataExame(e.target.value)}
            required
          />

          <p className="labelViewConsulta3AI">Foto:</p>
          <input
            type="file"
            id="inputImagemMC"
            className="labelViewConsulta4AI"
            accept="image/*"
            onChange={(e) => setImagemFile(e.target.files[0])}
            required
          />

          <div className='buttondivAI'>
            <button type="submit" className="submitButtonAI" id='MarcarConsultaBtn' >Submeter Exame</button>
          </div>
        </form>


                </div>

                
        </div>
    );
}


export default AnaliseImagens;