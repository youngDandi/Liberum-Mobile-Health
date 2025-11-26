import './Login.css';
import medicine from '../../assets/img/medicine.svg';
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const api = 'http://192.168.1.3:3000';

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(api + '/login-mobile', {
        email: email,
        password: password,
      });

      console.log("📩 Resposta do backend:", response.data);

      if (response.data.status === "Success" && response.data.user) {
        const userData = response.data.user;
        alert(`👋 Seja Bem-Vindo Sr.(a) ${userData.nome}`);
        login(userData);
        setRedirectToHome(true);
      } else {
        alert("Email ou Palavra-passe incorrectas!!");
        throw new Error("Resposta inesperada do servidor.");
      }
    } catch (err) {
      console.error("❌ Erro no login:", err);

      if (err.response && (err.response.status === 404 || err.response.data.message === "Usuário não encontrado")) {
        alert("⚠️ Email ou palavra-passe incorrecta!!");
        setError("Email ou palavra-passe incorrecta!!");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao tentar conectar ao servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToHome) {
    return <Navigate to='/Home' />;
  }

  return (
    <div className='login-container'>
      {/* Background Gradient */}
      <div className='background-gradient'></div>

      {/* Content Container */}
      <div className='content-wrapper'>
        {/* Logo Section */}
        <div className='logo-section-mobile'>
          <div className='logo-circle-mobile'>
            <span className='logo-letter-mobile'>L</span>
          </div>
          <h1 className='logo-text-mobile'>Liberum</h1>
          <p className='logo-subtitle'>Sistema de Gestão Médica</p>
        </div>

        {/* Illustration */}
        <div className='illustration-section'>
          <img src={medicine} alt='Medical Illustration' className='medical-image' />
        </div>

        {/* Auth Toggle */}
        <div className='auth-toggle'>
          <div className='toggle-option active'>
            <span className='toggle-text'>Login</span>
          </div>
          <Link to='/SignUp' className='toggle-option'>
            <span className='toggle-text'>Cadastro</span>
          </Link>
        </div>

        {/* Login Form */}
        <form className='login-form' onSubmit={handleLogin}>
          <div className='form-group-mobile'>
            <div className='input-wrapper'>
              <span className='input-icon'>✉️</span>
              <input
                type='email'
                className='input-mobile'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='form-group-mobile'>
            <div className='input-wrapper'>
              <span className='input-icon'>🔒</span>
              <input
                type='password'
                className='input-mobile'
                placeholder='Palavra-passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className='error-message'>
              <span className='error-icon'>⚠️</span>
              <span className='error-text'>{error}</span>
            </div>
          )}

          <button
            type='submit'
            className='login-btn'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className='btn-loader'></span>
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <span className='btn-icon'>🔓</span>
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className='login-footer'>
          <p className='footer-text'>© 2025 Liberum - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
