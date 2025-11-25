import './ViewPedido.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPedido() {
  const [dataConsulta, SetDataConsulta] = useState('');
  const [nome, SetNome] = useState('');
  const [telefone, SetTelefone] = useState('');
  const [email, SetEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [horaEntradaDC, SetdataHoraentradaDC] = useState('');
  const [comentario, setComentario] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [requestStatus, setRequestStatus] = useState('');
  const [medicoNome, setMedicoNome] = useState('');
  const [medicoEmail, setMedicoEmail] = useState('');
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();
  const api = 'http://192.168.1.7:3000';

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        console.log(`📡 A buscar dados do pedido com ID: ${id}...`);
        const response = await axios.get(`${api}/api/pedidos-mobile/${id}`);

        if (response.status === 200) {
          const dados = response.data;
          console.log("✅ Pedido recebido do backend:", dados);

          SetNome(dados.nome || "");
          SetEmail(dados.email || "");
          SetTelefone(dados.telefone || "");
          SetDataConsulta(dados.dataConsulta || "");
          SetdataHoraentradaDC(dados.horaEntradaDC || "");
          setComentario(dados.comentario || "");
          setImagemFile(dados.imagemPath || "");
          setRequestStatus(dados.requestStatus || "");

          if (dados.validadoPor) {
            console.log("👨‍⚕️ Médico validador:", dados.validadoPor);
            setMedicoNome(dados.validadoPor.nome || "");
            setMedicoEmail(dados.validadoPor.email || "");
          } else {
            console.log("⚠️ Nenhum médico associado a este pedido.");
            setMedicoNome("");
            setMedicoEmail("");
          }
        } else {
          console.warn("⚠️ Pedido não encontrado ou erro na requisição.");
        }
      } catch (error) {
        console.error("❌ Erro ao buscar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPedido();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!comentario.trim()) {
      alert('Por favor, preencha o campo Comentários.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`${api}/api/pedidos/${id}`, {
        nome,
        email,
        telefone,
        dataConsulta,
        horaEntradaDC,
        requestStatus: 'Pendente',
        comentario,
      });

      if (response.status === 200) {
        alert('✅ Pedido reagendado com sucesso!');
        navigate("/PedidosPendentes");
      } else {
        alert('❌ Erro ao reagendar o pedido.');
      }
    } catch (error) {
      console.error('Erro ao enviar atualização:', error);
      alert('❌ Erro ao reagendar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-pedido-container">
      {/* Header */}
      <header className="view-pedido-header">
        <Link to="/PedidosPendentes" className="back-btn-view">
          <span className="back-icon-view">←</span>
        </Link>

        <h1 className="page-title-view">Detalhes da Marcação</h1>

        <button className="menu-btn-view">
          <span>⋮</span>
        </button>
      </header>

      {loading ? (
        <div className='loading-state-view'>
          <div className='loader-spinner-view'></div>
          <p className='loading-text-view'>A carregar dados...</p>
        </div>
      ) : (
        <>
          
          

          {/* Patient Image */}
          {imagemFile && (
            <div className="image-section-view">
              <img src={imagemFile} alt="Paciente" className="patient-image-view" />
              <p className="image-label-view">Foto do Paciente</p>
            </div>
          )}

          {/* Form */}
          <form className="view-form" onSubmit={handleUpdate}>
            {/* Doctor Info Card (só se validado) */}
            {requestStatus === 'Validado' && medicoNome && (
              <div className="doctor-card">
                <div className="doctor-card-header">
                  <span className="doctor-icon">👨‍⚕️</span>
                  <h3 className="doctor-card-title">Médico Responsável</h3>
                </div>
                <div className="doctor-info">
                  <div className="doctor-info-item">
                    <span className="info-label-view">Nome:</span>
                    <span className="info-value-view">{medicoNome}</span>
                  </div>
                  {medicoEmail && (
                    <div className="doctor-info-item">
                      <span className="info-label-view">Email:</span>
                      <span className="info-value-view">{medicoEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Consultation Details */}
            <div className="form-section-view">
              <h3 className="section-title-view">
                <span className="section-icon-view">📋</span>
                Dados da Consulta
              </h3>

              <div className="form-group-view">
                <label className="form-label-view">
                  <span className="label-icon-view">📅</span>
                  Data da Consulta
                </label>
                <input
                  type="date"
                  className="form-input-view"
                  value={dataConsulta}
                  onChange={(e) => SetDataConsulta(e.target.value)}
                  disabled={requestStatus === 'Validado'}
                  required
                />
              </div>

              <div className="form-group-view">
                <label className="form-label-view">
                  <span className="label-icon-view">🕐</span>
                  Hora de Entrada
                </label>
                <input
                  type="time"
                  className="form-input-view"
                  value={horaEntradaDC}
                  onChange={(e) => SetdataHoraentradaDC(e.target.value)}
                  disabled={requestStatus === 'Validado'}
                  required
                />
              </div>

              <div className="form-group-view">
                <label className="form-label-view">
                  <span className="label-icon-view">💬</span>
                  Comentários
                </label>
                <textarea
                  className="form-textarea-view"
                  placeholder="Adicione comentários sobre a consulta..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  disabled={requestStatus === 'Validado'}
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            {requestStatus !== 'Validado' && (
              <div className="form-actions-view">
                <button
                  type="button"
                  className="cancel-btn-view"
                  onClick={() => navigate(-1)}
                >
                  <span className="btn-icon-view">✕</span>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="submit-btn-view"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-loader-view"></span>
                      <span>Reagendando...</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon-view">🔄</span>
                      <span>Reagendar</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Info when validated */}
            {requestStatus === 'Validado' && (
              <div className="validated-info-card">
                <span className="validated-icon">✅</span>
                <div className="validated-text-wrapper">
                  <p className="validated-title">Consulta Confirmada</p>
                  <p className="validated-description">
                    Esta marcação foi validada pelo médico e não pode ser alterada.
                  </p>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default ViewPedido;
