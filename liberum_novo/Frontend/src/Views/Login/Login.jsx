import './Login.css';

import cashPig from '../../assets/img/cashPig.png';
import medicine from '../../assets/img/medicine.png';
import {Link, Navigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; // Vamos usar axios para fazer as requisições HTTP
import { useAuth } from '../../hooks/AuthContext.jsx';


function Login() {
  // States para armazenar os dados do formulário e o erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const api ='http://192.168.1.6:3000'

  const  {login}  = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
  
    setError(''); // Limpar mensagens de erro anteriores
  
    try {
      const response = await axios.post(api + '/login-mobile', {
        email: email,
        password: password,
      });
  
      console.log("📩 Resposta do backend:", response.data);
  
      // Se a resposta for bem-sucedida e contiver um usuário
      if (response.data.status === "Success" && response.data.user) {
        const userData = response.data.user;
  
        alert(`👋 Seja Bem-Vindo Sr.(a) ${userData.nome}`);
        login(userData);
        setRedirectToHome(true);
      } else {
        throw new Error("Resposta inesperada do servidor.");
      }
  
    } catch (err) {
      console.error("❌ Erro no login:", err);
  
      // Se o erro vem do backend e o código for 404, significa que o usuário não foi encontrado
      if (err.response && (err.response.status === 404 || err.response.data.message === "Usuário não encontrado")) {
        alert("⚠️ Email ou palavra-passe incorrecta!!");
        setError("Email ou palavra-passe incorrecta!!");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao tentar conectar ao servidor.');
      }
    }
  };
  
  
  

  if (redirectToHome) {
    return <Navigate to='/Home' />;
  }


  return (
    <div className='ImageDiv'>
      <div className='ContentDiv'>
            <div className='LogandSign'>
              <h2 id='Login1'>Login</h2>
             <Link to={"/SignUp"} className='link'> <h2 id='SignUp'>Sign Up</h2></Link>
            </div>
            <img id='cashPig' src={medicine} />
            <h2 id='Login2'>Login</h2>
            <div className='inputsDiv'>
              <input className='inputStyle' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <input className='inputStyle' placeholder="Palavra-passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button id='EntrarBtn' onClick={handleLogin}>Entrar</button>
            </div>
      </div>
      
      
    </div>
  )
}

export default Login