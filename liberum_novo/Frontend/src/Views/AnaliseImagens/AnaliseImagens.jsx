import './AnaliseImagens.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext.jsx';
import axios from 'axios';

const api = 'http://192.168.1.3:3000';

function AnaliseImagens() {
  const [dataExame, setDataExame] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Função para preview da imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      console.log("📷 [FRONTEND] Imagem selecionada:", file.name);
    }
  };

  // ✅ Função para enviar dados + imagem ao backend
  const handleSubmitExam = async (e) => {
    e.preventDefault();
    console.log("🚀 [FRONTEND] Início do envio do formulário");
  
    if (!imagemFile) {
      alert("Por favor, selecione uma imagem antes de enviar.");
      console.log("⚠️ [FRONTEND] Nenhuma imagem selecionada!");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("imagem", imagemFile);
    formData.append("nome", user?.nome);
    formData.append("email", user?.email);
    formData.append("telefone", user?.telefone);
    formData.append("dataExame", dataExame);
    formData.append("requestStatus", "Pendente");
    formData.append("userId", user?.id || "");
    formData.append("userType", user?.userType || "Desconhecido");
  
    console.log("📦 [FRONTEND] Dados prontos para envio:", {
      nome: user?.nome,
      email: user?.email,
      telefone: user?.telefone,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='analise-imagens-container'>
      {/* Header */}
      <header className='analise-imagens-header'>
        <Link to='/Home' className='back-btn-ai'>
          <span className='back-icon-ai'>←</span>
        </Link>
        
        <h1 className='page-title-ai'>Análise de Imagens</h1>
        
        <Link to='/Settings' className='menu-btn-ai'>
          <span>⋮</span>
        </Link>
      </header>

      {/* Form */}
      <form className='analise-form' onSubmit={handleSubmitExam}>
        {/* Patient Info Section */}
        <div className='form-section-ai'>
          <h3 className='section-title-ai'>
            <span className='section-icon-ai'>👤</span>
            Dados do Paciente
          </h3>

          <div className='form-group-ai'>
            <label className='form-label-ai'>
              <span className='label-icon-ai'>📝</span>
              Nome
            </label>
            <input
              type='text'
              className='form-input-ai'
              placeholder='Nome do paciente'
              value={user?.nome || ''}
              readOnly
            />
          </div>

          <div className='form-group-ai'>
            <label className='form-label-ai'>
              <span className='label-icon-ai'>📅</span>
              Data do Exame
            </label>
            <input
              type='date'
              className='form-input-ai'
              value={dataExame}
              onChange={(e) => setDataExame(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className='form-section-ai'>
          <h3 className='section-title-ai'>
            <span className='section-icon-ai'>📷</span>
            Imagem do Exame
          </h3>

          <div className='upload-area'>
            <input
              type='file'
              id='inputImagemAI'
              className='file-input-ai'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
            <label htmlFor='inputImagemAI' className='upload-label'>
              {imagePreview ? (
                <div className='preview-container'>
                  <img src={imagePreview} alt='Preview' className='image-preview' />
                  <div className='preview-overlay'>
                    <span className='change-icon'>🔄</span>
                    <span className='change-text'>Alterar Imagem</span>
                  </div>
                </div>
              ) : (
                <div className='upload-placeholder'>
                  <span className='upload-icon'>📸</span>
                  <p className='upload-text'>Clique para selecionar uma imagem</p>
                  <p className='upload-hint'>JPG, PNG ou JPEG</p>
                </div>
              )}
            </label>
          </div>

          {imagemFile && (
            <div className='file-info'>
              <span className='file-icon'>📄</span>
              <span className='file-name'>{imagemFile.name}</span>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className='info-card-ai'>
          <span className='info-icon-ai'>💡</span>
          <div className='info-text-wrapper-ai'>
            <p className='info-title-ai'>Dica</p>
            <p className='info-description-ai'>
              Certifique-se de que a imagem está nítida e bem iluminada para uma análise precisa.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='form-actions-ai'>
          <button
            type='button'
            className='cancel-btn-ai'
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            <span className='btn-icon-ai'>✕</span>
            Cancelar
          </button>
          <button
            type='submit'
            className='submit-btn-ai'
            disabled={loading}
          >
            {loading ? (
              <>
                <span className='btn-loader-ai'></span>
                <span>A Enviar...</span>
              </>
            ) : (
              <>
                <span className='btn-icon-ai'>📤</span>
                <span>Submeter Exame</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnaliseImagens;
