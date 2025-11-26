import './ViewExam.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewExam() {
  const [dataExame, setDataExame] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [diagnostico, setDiagnostico] = useState('');
  const [medicoNome, setMedicoNome] = useState('');
  const [recomendacoes, setRecomendacoes] = useState('');
  
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Define a URL da tua API (ajusta conforme IP e porta)
  const api = 'http://192.168.1.3:3000';

  useEffect(() => {
    const fetchRecomendation = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
        console.log(`📡 A buscar dados do exame com ID: ${id}`);
  
        const response = await axios.get(`${api}/api/recomendation/${id}`);
  
        if (response.status === 200) {
          const dados = response.data;
          console.log("✅ Dados recebidos do backend:", dados);
  
          // Atualiza os estados com os dados do backend
          setNome(dados.nome || "");
          setEmail(dados.email || "");
          setTelefone(dados.telefone || "");
          setDataExame(dados.dataExame || "");
          setDiagnostico(dados.diagnostico || "");
          setMedicoNome(dados.medicoNome || "");
          setRecomendacoes(dados.recomendacoes || "");
          setImagemFile(dados.imagem || "");
        } else {
          console.warn("⚠️ Nenhum dado encontrado para o ID:", id);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados do exame:", error);
        setErro("Erro ao buscar dados do exame. Verifica o servidor.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecomendation();
  }, [id]);

  return (
    <div className="view-exam-container">
      {/* Header */}
      <header className="view-exam-header">
        <Link to="/Home" className="back-btn-exam">
          <span className="back-icon-exam">←</span>
        </Link>

        <h1 className="page-title-exam">Detalhes do Exame</h1>

        <Link to="/Settings" className="menu-btn-exam">
          <span>⋮</span>
        </Link>
      </header>

      {loading ? (
        <div className='loading-state-exam'>
          <div className='loader-spinner-exam'></div>
          <p className='loading-text-exam'>A carregar dados...</p>
        </div>
      ) : erro ? (
        <div className="error-state-exam">
          <span className="error-icon-exam">⚠️</span>
          <p className="error-text-exam">{erro}</p>
        </div>
      ) : (
        <>
          {/* Patient Image */}
          {imagemFile && (
            <div className="image-section-exam">
              <img src={imagemFile} alt="Exame" className="exam-image" />
              <p className="image-label-exam">Imagem do Exame</p>
            </div>
          )}

          {/* Form */}
          <form className="view-form-exam">
            {/* Doctor Info Card */}
            {medicoNome && (
              <div className="doctor-card-exam">
                <div className="doctor-card-header-exam">
                  <span className="doctor-icon-exam">👨‍⚕️</span>
                  <h3 className="doctor-card-title-exam">Médico Responsável</h3>
                </div>
                <div className="doctor-info-exam">
                  <div className="doctor-info-item-exam">
                    <span className="info-label-exam">Nome:</span>
                    <span className="info-value-exam">{medicoNome}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Patient Details */}
            <div className="form-section-exam">
              <h3 className="section-title-exam">
                <span className="section-icon-exam">👤</span>
                Dados do Paciente
              </h3>

              <div className="form-group-exam">
                <label className="form-label-exam">
                  <span className="label-icon-exam">📝</span>
                  Nome
                </label>
                <input
                  type="text"
                  className="form-input-exam"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  readOnly
                />
              </div>

              <div className="form-group-exam">
                <label className="form-label-exam">
                  <span className="label-icon-exam">📅</span>
                  Data do Exame
                </label>
                <input
                  type="date"
                  className="form-input-exam"
                  value={dataExame}
                  onChange={(e) => setDataExame(e.target.value)}
                  readOnly
                />
              </div>
            </div>

            {/* Exam Results */}
            <div className="form-section-exam">
              <h3 className="section-title-exam">
                <span className="section-icon-exam">🔬</span>
                Resultados do Exame
              </h3>

              <div className="form-group-exam">
                <label className="form-label-exam">
                  <span className="label-icon-exam">📋</span>
                  Diagnóstico
                </label>
                <textarea
                  className="form-textarea-exam"
                  placeholder="Diagnóstico"
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  rows="4"
                  readOnly
                />
              </div>

              <div className="form-group-exam">
                <label className="form-label-exam">
                  <span className="label-icon-exam">💊</span>
                  Recomendações
                </label>
                <textarea
                  className="form-textarea-exam"
                  placeholder="Recomendações médicas"
                  value={recomendacoes}
                  onChange={(e) => setRecomendacoes(e.target.value)}
                  rows="4"
                  readOnly
                />
              </div>
            </div>

            {/* Info Card */}
            <div className="info-card-exam">
              <span className="info-icon-exam">ℹ️</span>
              <div className="info-text-wrapper-exam">
                <p className="info-title-exam">Exame Concluído</p>
                <p className="info-description-exam">
                  Este exame foi processado e os resultados estão disponíveis para consulta.
                </p>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default ViewExam;
