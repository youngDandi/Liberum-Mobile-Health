import './SignUp.css';
import medicine from '../../assets/img/medicine.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('');
  const [sexo, setSexo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const api = 'http://192.168.1.7:3000';
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!nome || !telefone || !email || !password || !tipo || !sexo) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(api + '/register-mobile', {
        nome: nome,
        telefone: telefone,
        email: email,
        password: password,
        user: tipo,
        sexo: sexo
      });

      alert("✅ Cadastro realizado com sucesso!");
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      alert("❌ Erro: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='signup-container'>
      {/* Background Gradient */}
      <div className='background-gradient'></div>

      {/* Content Container */}
      <div className='content-wrapper-signup'>
        {/* Logo Section */}
        <div className='logo-section-mobile'>
          <div className='logo-circle-mobile'>
            <span className='logo-letter-mobile'>L</span>
          </div>
          <h1 className='logo-text-mobile'>Liberum</h1>
          <p className='logo-subtitle'>Sistema de Gestão Médica</p>
        </div>

        {/* Auth Toggle */}
        <div className='auth-toggle'>
          <Link to='/' className='toggle-option'>
            <span className='toggle-text'>Login</span>
          </Link>
          <div className='toggle-option active'>
            <span className='toggle-text'>Cadastro</span>
          </div>
        </div>

        {/* SignUp Form */}
        <form className='signup-form' onSubmit={handleSignUp}>
          <h2 className='form-title'>Criar Conta</h2>

          <div className='form-group-mobile'>
            <div className='input-wrapper'>
              <span className='input-icon'>👤</span>
              <input
                type='text'
                className='input-mobile'
                placeholder='Nome completo'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='form-group-mobile'>
            <div className='input-wrapper'>
              <span className='input-icon'>📞</span>
              <input
                type='tel'
                className='input-mobile'
                placeholder='Número de Telefone'
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          </div>

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

          <div className='form-group-mobile'>
            <div className='select-wrapper'>
              <span className='input-icon'>👥</span>
              <select
                className='select-mobile'
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value='' disabled>Tipo de utilizador</option>
                <option value='Estudante'>🎓 Estudante</option>
                <option value='Funcionario'>💼 Funcionário</option>
                <option value='Externo'>🏥 Externo</option>
              </select>
            </div>
          </div>

          <div className='form-group-mobile'>
            <div className='select-wrapper'>
              <span className='input-icon'>⚧</span>
              <select
                className='select-mobile'
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              >
                <option value='' disabled>Selecione o sexo</option>
                <option value='Masculino'>♂️ Masculino</option>
                <option value='Feminino'>♀️ Feminino</option>
              </select>
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
            className='signup-btn'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className='btn-loader'></span>
                <span>Cadastrando...</span>
              </>
            ) : (
              <>
                <span className='btn-icon'>✅</span>
                <span>Cadastrar</span>
              </>
            )}
          </button>

          <div className='form-footer'>
            <p className='footer-link'>
              Já tem uma conta?{' '}
              <Link to='/Login' className='link-text'>
                Entrar agora
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className='signup-footer'>
          <p className='footer-text'>© 2025 Liberum - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
