import './ViewPedido.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import React, {useEffect,useState} from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

function ViewPedido() {
  const [dataConsulta, SetDataConsulta] = useState('');
  const [nome, SetNome] = useState('');
  const [telefone, SetTelefone] = useState('');
  const [email, SetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [horaEntradaDC, SetdataHoraentradaDC]= useState('');
  const [comentario, setComentario] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Define a URL da tua API (ajusta conforme IP e porta)
  const api = 'http://192.168.1.6:3000';


  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`${api}/api/pedidos-mobile/${id}`);
        if (response.status === 200) {
          const dados = response.data; // ajusta com o que seu backend retorna
          
          SetNome(dados.nome);
          SetEmail(dados.email);
          SetTelefone(dados.telefone);
          SetDataConsulta(dados.dataConsulta);
          SetdataHoraentradaDC(dados.horaEntradaDC);
          setComentario(dados.comentario);
          setImagemFile(dados.imagemPath);
          // aqui você pode setar outros estados com os dados do pedido
        } else {
          console.warn('Pedido não encontrado ou erro na requisição.');
        }
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
      }
    };
  
    if (id) {
      fetchPedido();
    }
  }, [id]);
  

  // ✅ Função para enviar dados ao backend
  const handleUpdate = async (e) => {
    e.preventDefault(); // impede o refresh do formulário ao clicar
    if (!comentario.trim()) {
      alert('Por favor, preencha o campo Comentários.');
      return;
    }
  
    try {
      // Aqui, use método PUT ou POST, dependendo da sua API
      const response = await axios.put(`${api}/api/pedidos/${id}`, {
        nome,
        email,
        telefone,
        dataConsulta,
        horaEntradaDC,
        requestStatus: 'Pendente', // ou o status que desejar
        comentario, // campo obrigatório
        // Você pode incluir outros campos aqui
      });
  
      if (response.status === 200) {
        alert('Pedido atualizado com sucesso.');
         navigate("/PedidosPendentes");
        // Opcional: redirecionar ou fazer algo após sucesso
      } else {
        alert('Erro ao atualizar o pedido.');
      }
    } catch (error) {
      console.error('Erro ao enviar atualização:', error);
      alert('Erro ao atualizar o pedido.');
    }
  };
  

  return (
    <div className="FullContentOperationsVP">
      

      <div className="HeaderOperationsVP">
        <div className="goBackDivOperationsVP">
          <Link to="/Home">
            <img src={goBack} alt="Voltar" />
          </Link>
        </div>

        <h2 id="consultasVP">Consultas Pendentes</h2>
        <div className="threeDotsdivOperationsVP">
          <Link to="/Settings">
            <img src={threeDots} alt="Opções" />
          </Link>
        </div>
      </div>

      <form className="inputsDiv2" onSubmit={handleUpdate}>
        <p className="labelViewConsulta1VP">Nome:</p>
        <input
          className="inputStyleViewconsultaVP"
          placeholder="Nome"
          value={nome || ''}
          onChange={(e) => SetNome(e.target.value)}
          required
        />

        <p className="labelViewConsulta1VP">Email:</p>
        <input
          className="inputStyleViewconsultaVP"
          placeholder="Email"
          value={email || ''}
          onChange={(e) => SetEmail(e.target.value)}
          required
        />

        <p className="labelViewConsulta1VP">Telefone:</p>
        <input
          className="inputStyleViewconsultaVP"
          placeholder="Telefone"
          value={telefone || ''}
          onChange={(e) => SetTelefone(e.target.value)}
          required
        />

        <p className="labelViewConsulta2VP">Data da Consulta:</p>
        <input
          className="inputStyleViewconsultaVP"
          
          type="date"
          value={dataConsulta}
          onChange={(e) => SetDataConsulta(e.target.value)}
          required
        />

        <p className="labelViewConsulta2VP">Hora de Entrada:</p>
        <input
          className="inputStyleViewconsultaVP"
          id='inputDatadivVP'
          type="time"
          value={horaEntradaDC}
          onChange={(e) => SetdataHoraentradaDC(e.target.value)}
          required
        />
        
        <p className="labelViewConsulta3VP">Comentário:</p>
        <input
                type="text"
                id="inputImagemVP"
                className="inputStyleViewconsultaVP"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
        />
        
        

        <div className='buttondivVP'>
            <button type="submit" className="validateButtonVP" id='MarcarConsultaBtnVP'>Validar</button>
            <button type="submit" className="rescheduleButtonVP" onClick={handleUpdate} id='MarcarConsultaBtnVP'>Reagendar</button>
        </div>

        
      </form>
    </div>
  );
}

export default ViewPedido;
