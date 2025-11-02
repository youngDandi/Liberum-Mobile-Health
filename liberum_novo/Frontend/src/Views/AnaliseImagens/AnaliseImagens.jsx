import './AnaliseImagens.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import portfolioIcon from '../../assets/img/portfolioicon.png';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext.jsx';
import axios from 'axios';
  const api ='http://192.168.1.6:3000';


function AnaliseImagens (){
    const [dataConsulta, setDataConsulta] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [horaEntradaDC, setHoraEntradaDC]= useState('');
  const [imagemFile, setImagemFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
   
    const { user } = useAuth();

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

                    
                <form className="inputsDiv2" >
                <p className="labelViewConsulta1AI">Nome:</p>
                <input
                className="inputStyleViewconsultaAI"
                placeholder="Nome"
                value={nome || user?.nome || ''}
                onChange={(e) => setNome(e.target.value)}
                required
                />

                <p className="labelViewConsulta1AI">Email:</p>
                <input
                className="inputStyleViewconsultaAI"
                placeholder="Email"
                value={email || user?.email || ''}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <p className="labelViewConsulta1AI">Telefone:</p>
                <input
                className="inputStyleViewconsultaAI"
                placeholder="Telefone"
                value={telefone || user?.telefone || ''}
                onChange={(e) => setTelefone(e.target.value)}
                required
                />

                <p className="labelViewConsulta2AI">Data do Exame:</p>
                <input
                className="inputStyleViewconsultaAI"
                
                type="date"
                value={dataConsulta}
                onChange={(e) => setDataConsulta(e.target.value)}
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
                    <button type="submit" className="submitButtonAI" id='MarcarConsultaBtn'>
                        Marcar Consulta
                    </button>
                </div>

        
      </form>


                </div>

                
        </div>
    );
}


export default AnaliseImagens;