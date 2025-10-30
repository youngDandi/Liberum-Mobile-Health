import './SignUp.css';
import graphic from '../../assets/img/graphic.png';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import medicine from '../../assets/img/medicine.png';
import axios from 'axios';

function SignUp() {
  const [nome, setNome]= useState('');
  const [telefone, setTelefone]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [tipo, setTipo]= useState('');
  const [sexo, setSexo]= useState('');
  const [error, setError]= useState('');
  const api ='http://192.168.1.5:3000'


  const handleSignUp = () => {

    
    // Limpa a mensagem de erro antes de tentar registrar
    setError('');

    axios.post(api+'/register-mobile', {
      nome: nome,
      telefone: telefone,
      email: email,
      password: password,
      user: tipo,
      sexo: sexo
      
    }).then((response) => {
      // Redireciona para outra página ou atualiza a UI
      alert("Dados dos Utilizadores Salvos com Sucesso!!");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      alert("Error:" + errorCode + " " + errorMessage);
    });
  };


  return (
    <div className='ImageDiv'>
      
      <div className='ContentDiv2'>
            <div className='LogandSign2'>
             <Link to={"/"} className='link'> 
                <h2 id='LoginS'>Login</h2>
             </Link>
              <h2 id='SignUp1S'>Sign Up</h2>
            </div>
            
            <h2 id='SignUp2S'>Sign Up</h2>
            <div className='inputsDiv2'>
              <input className='inputStyle2' placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <input className='inputStyle2' placeholder="Número de Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required/>
              <input className='inputStyle2' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              
              <input className='inputStyle2' placeholder="Palavra-passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>

              <select className='inputStyle3' value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="" disabled> Seleccione o tipo de utilizador</option>
                <option value="Estudante" >Estudante</option>
                <option value="Funcionario" >Funcionário</option>
                <option value="Externo" >Externo</option>
              </select>

              <select className='inputStyle3' value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="" disabled> Seleccione o sexo</option>
                <option value="Masculino" >Masculino</option>
                <option value="Femenino" >Femenino</option>
                
              </select>

              <button id='CadastrarBtn' onClick={handleSignUp}>Cadastrar</button>
              {error && <p>{error}</p>}
            </div>
      </div>
      
      
    </div>
  )
}

export default SignUp