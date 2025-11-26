import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChatBot.css";
import botAvatar from "../../assets/img/bot.png";
import { useAuth } from '../../hooks/AuthContext.jsx';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const API_URL = "http://192.168.1.7:3000/api/chat/message";

  // Auto scroll para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensagem de boas-vindas inicial
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: `Olá ${user?.nome || 'utilizador'}! 👋\n\nSou o assistente virtual da Liberum. Como posso ajudar-te hoje?\n\n• Informações sobre consultas\n• Dúvidas sobre exames\n• Agendamentos\n• Outras questões`,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, {
        text: input,
        user: {
          nome: user?.nome,
          email: user?.email,
          userType: user?.userType,
        },
        patientId: user?.id,
      });

      const botReply = {
        sender: "bot",
        text: res.data.reply || "Desculpa, não consegui processar essa informação.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Ocorreu um erro ao comunicar com o servidor. Por favor, tenta novamente.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <header className="chatbot-header">
        <Link to="/Home" className="back-btn">
          <span className="back-icon">←</span>
        </Link>
        
        <div className="bot-info">
          <div className="bot-avatar-wrapper">
            <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
            <span className="online-indicator"></span>
          </div>
          <div className="bot-details">
            <h2 className="bot-name">Assistente Liberum</h2>
            <p className="bot-status">
              <span className="status-dot"></span>
              Online
            </p>
          </div>
        </div>
        <Link to='/Settings' className='back-btn-consultas'>
          <button className="menu-btn">
            <span>⋮</span>
          </button>
        </Link>

      </header>

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-wrapper">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-bubble ${msg.sender}`}
            >
              {msg.sender === "bot" && (
                <div className="message-avatar">
                  <img src={botAvatar} alt="Bot" />
                </div>
              )}
              
              <div className="message-content">
                <div className={`message-text ${msg.sender}`}>
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.timestamp?.toLocaleTimeString('pt-PT', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {msg.sender === "user" && (
                <div className="message-avatar user-avatar">
                  <span>{user?.nome?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="message-bubble bot">
              <div className="message-avatar">
                <img src={botAvatar} alt="Bot" />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <button className="attach-btn" title="Anexar arquivo">
            <span>📎</span>
          </button>
          
          <input
            type="text"
            className="message-input"
            value={input}
            placeholder="Escreve a tua mensagem..."
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />

          <button
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            <span className="send-icon">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
