import './MarcarConsultas.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { useState } from 'react';
import axios from 'axios';

function MarcarConsultas() {
  const [dataConsulta, setDataConsulta] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [horaEntradaDC, setHoraEntradaDC] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const api = 'http://192.168.1.7:3000';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagemFile) {
      alert("Por favor, selecione uma imagem antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome || user?.nome || "");
    formData.append("email", email || user?.email || "");
    formData.append("telefone", telefone || user?.telefone || "");
    formData.append("dataConsulta", dataConsulta);
    formData.append("horaEntradaDC", horaEntradaDC);
    formData.append("requestStatus", "Pendente");
    formData.append("userId", user?.id || "");
    formData.append("userType", user?.userType || "Desconhecido");
    formData.append("imagem", imagemFile);

    console.log("📤 Enviando FormData da consulta...");

    try {
      setLoading(true);
      const response = await axios.post(api + "/api/consultas-pendentes-mobile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Consulta registrada com sucesso:", response.data);
      alert("✅ Pedido submetido com sucesso!");
      navigate("/Home");
    } catch (error) {
      console.error("❌ Erro ao enviar consulta:", error);
      alert("❌ Já existe uma consulta marcada para esta data e hora. Por favor, tente marcar para outra data ou hora!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marcar-consultas-container">
      {/* Header */}
      <header className="marcar-header">
        <Link to="/Home" className="back-btn-marcar">
          <span className="back-icon-marcar">←</span>
        </Link>

        <h1 className="page-title-marcar">Marcar Consulta</h1>

        <Link to="/Settings" className="back-btn-marcar">
            <button className="menu-btn-marcar">
              <span>⋮</span>
            </button>
        </Link> 
      </header>

      {/* Form */}
      <form className="marcar-form" onSubmit={handleSubmit}>
        <div className="form-info-card">
          <h2 className="form-section-title">
            <span className="section-icon">📋</span>
            Informações da Consulta
          </h2>
          <p className="form-section-subtitle">Preencha os dados para agendar</p>
        </div>

        {/* Nome */}
        <div className="form-group-marcar">
          <label className="form-label-marcar">
            <span className="label-icon-marcar">👤</span>
            Nome Completo
          </label>
          <input
            type="text"
            className="form-input-marcar"
            placeholder="Digite seu nome"
            value={nome || user?.nome || ''}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        {/* Data */}
        <div className="form-group-marcar">
          <label className="form-label-marcar">
            <span className="label-icon-marcar">📅</span>
            Data da Consulta
          </label>
          <input
            type="date"
            className="form-input-marcar date-input"
            value={dataConsulta}
            onChange={(e) => setDataConsulta(e.target.value)}
            required
          />
        </div>

        {/* Hora */}
        <div className="form-group-marcar">
          <label className="form-label-marcar">
            <span className="label-icon-marcar">🕐</span>
            Hora de Entrada
          </label>
          <input
            type="time"
            className="form-input-marcar time-input"
            value={horaEntradaDC}
            onChange={(e) => setHoraEntradaDC(e.target.value)}
            required
          />
        </div>

        {/* Upload de Foto */}
        <div className="form-group-marcar">
          <label className="form-label-marcar">
            <span className="label-icon-marcar">📷</span>
            Foto de Identificação
          </label>

          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              className="file-input-hidden"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {imagePreview ? (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <label htmlFor="file-upload" className="change-photo-btn">
                  <span>📷</span>
                  Alterar Foto
                </label>
              </div>
            ) : (
              <label htmlFor="file-upload" className="upload-placeholder">
                <div className="upload-icon-wrapper">
                  <span className="upload-icon">📸</span>
                </div>
                <p className="upload-text">Clique para adicionar foto</p>
                <p className="upload-hint">PNG, JPG até 5MB</p>
              </label>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="info-card-marcar">
          <span className="info-icon-card">💡</span>
          <div className="info-text-wrapper">
            <p className="info-title">Importante</p>
            <p className="info-description">
              A foto será usada para identificação no dia da consulta. 
              Certifique-se de que está nítida e visível.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn-marcar"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-loader-marcar"></span>
              <span>Agendando...</span>
            </>
          ) : (
            <>
              <span className="btn-icon-marcar">✅</span>
              <span>Confirmar Agendamento</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default MarcarConsultas;
