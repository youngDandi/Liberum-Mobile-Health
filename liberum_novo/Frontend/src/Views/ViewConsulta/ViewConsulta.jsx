import './ViewConsulta.css';
import React, {useEffect,useState} from 'react';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import axios from 'axios'; // Vamos usar axios para fazer as requisições HTTP
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewConsulta(){
        const [nome, SetNome] = useState('');
        const [telefone, SetTelefone] = useState('');
        const [email, SetEmail] = useState('');
        const [patologia, SetPatologia] = useState('');
        const [intervencao, SetIntervencao] = useState('');
        const [areaAfetada, SetAreaAfetada]= useState('');
        
        const [PressaoArterialDistolica, SetPressaoArterialDistolica]= useState('');
        const [PressaoArterialSistolica, SetPressaoArterialSistolica]= useState('');
        const [PressaoArterialCifra, SetPressaoArterialCifra]= useState('');
        const [temperatura, SetTemperatura] = useState('');
        const [TemperaturaCifra, SetTemperaturaCifra] = useState('');
        const [direccao, SetDireccao] = useState('');
        const [tipoContrato, SetTipoContrato]= useState('');
        const [Glicemia, SetGlicemia]= useState('');
        const [glicemiaCifra, SetGlicemiaCifra]= useState('');
        const [departamento, SetDepartamento] = useState('');
        const [curso, SetCurso] = useState('');
        const [instituicaoExterna, SetInstituicaoExterna] = useState('');
        const [dataConsulta, SetDataConsulta]= useState('');
        const [horaEntradaDC, SetHoraEntradaDC]= useState('');
        const [horaSaidaDC, SetHoraSaidaDC]= useState('');
        const [dataPConsulta, SetDataPConsulta]= useState('');
        const [horaEntradaDPC, SetHoraEntradaDPC]= useState('');
        const [horaSaidaDPC, SetHoraSaidaDPC]= useState('');
        const [imagemFile, setImagemFile] = useState(null);
        const [employeeId, SetEmployeeId]= useState('');
        const [redirectToHome, setRedirectToHome] = useState(false);
        const { id } = useParams(); // 'id' vem de /ScheduleConsultas/:id
        const [medicamentos, setMedicamentos] = useState([]);

        const api= 'http://192.168.1.5:3000';

        useEffect(() => {
            const fetchPaciente = async () => {
              try {
                const response = await axios.get(`${api}/ViewConsulta/${id}`);
                if (response.status === 200) {
                  const dados = response.data;
          
                  // ✅ Campos comuns
                  SetNome(dados.pacienteNome || "");
                  SetTelefone(dados.telefone || "");
                  SetEmail(dados.email || "");
                  SetDataConsulta(dados.dataConsulta || "");
                  SetGlicemiaCifra(dados.glicemiaCifra || "");
                  SetPressaoArterialSistolica(dados.pressaoArterialSistolica || "");
                  SetPressaoArterialDistolica(dados.pressaoArterialDiastolica || "");
                  SetGlicemia(dados.glicemia || "");
                  SetTemperatura(dados.temperatura || "");
                  SetDataPConsulta(dados.dataPConsulta || "");
                  SetHoraEntradaDC(dados.horaEntrada || "");
                  SetHoraEntradaDPC(dados.horaEntradaDPC || "");
                  SetHoraSaidaDC(dados.horaSaida || "");
                  SetHoraSaidaDPC(dados.horaSaidaDPC || "");
                  SetIntervencao(dados.intervencao || "");
                  SetPatologia(dados.patologia || "");
                  SetPressaoArterialCifra(dados.pressaoArterialCifra || "");
                  SetTemperaturaCifra(dados.temperaturaCifra || "");
          
                  // ✅ Específicos de estudante
                  SetDepartamento(dados.departamento || "");
                  SetCurso(dados.curso || "");
                  setMedicamentos(dados.medicamentos || []);
          
                  // ✅ Específicos de funcionário
                  SetDireccao(dados.direccao || "");
                  SetTipoContrato(dados.tipoContrato || "");
                  SetAreaAfetada(dados.areaAfetada || "");
          
                  // ✅ Específicos de externo
                  SetInstituicaoExterna(dados.instituicaoExterna || "");
                } else {
                  console.warn("⚠️ Paciente não encontrado.");
                }
              } catch (error) {
                console.error("❌ Erro ao buscar dados do paciente:", error);
              }
            };
          
            if (id) {
              fetchPaciente();
            }
          }, [id]);


    return(
        <div className='FullContentViewConsulta'>
            <div className='HeaderViewConsulta'>
                <div className='goBackDivViewConsulta'>
                <Link to={'/Home'}>
                    <img src={goBack} alt='Voltar' />
                </Link>
                </div>

                <h2>Consulta</h2>
                <div className='threeDotsdivViewConsulta'>
                <Link to={'/Settings'}>
                    <img src={threeDots} alt='Opções' />
                </Link>
                </div>
            </div>

            <div className='inputsDiv2'>
            <p className='labelViewConsulta1'>Nome:</p>    
            <input className='inputStyleViewconsulta' placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <p className='labelViewConsulta2'>Intervenção:</p> 
            <input className='inputStyleViewconsulta' placeholder="Nome" value={intervencao} onChange={(e) => SetPatologia(e.target.value)} required />
            <p className='labelViewConsulta3'>Patologia:</p> 
            <input className='inputStyleViewconsulta' placeholder="Nome" value={patologia} onChange={(e) => SetIntervencao(e.target.value)} required />
            <p className='labelViewConsulta4'>Tempertatura:</p> 
            <input className='inputStyleViewconsulta' placeholder="Nome" value={TemperaturaCifra} onChange={(e) => SetTemperaturaCifra(e.target.value)} required />
            <p className='labelViewConsulta5'>Pressão Arterial:</p> 
            <input className='inputStyleViewconsulta' placeholder="Nome" value={PressaoArterialCifra} onChange={(e) => SetPressaoArterialCifra(e.target.value)} required />
            <p className='labelViewConsulta6'>Glicemia:</p> 
            <input className='inputStyleViewconsulta' placeholder="Nome" value={glicemiaCifra} onChange={(e) => SetGlicemiaCifra(e.target.value)} required />
            
            </div>

        </div>
    );
}


export default ViewConsulta;