import { useState } from "react";
import axios from "axios";
import "./ChatBot.css";
import botAvatar from "../../assets/img/bot.png"; // coloca uma imagem de avatar do bot aqui
import { useAuth } from '../../hooks/AuthContext.jsx';

 function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.6:3000/api/chat/message";
const  {user}  = useAuth();
 
const sendMessage = async () => {
  if (!input.trim()) return;

  // Adiciona mensagem do utilizador no chat
  const newMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput("");
  setLoading(true);

  try {
    // 🔹 Envia o texto, user e patientId ao backend
    const res = await axios.post(API_URL, {
      text: input,
      user: {
        nome: user?.nome,
        email: user?.email,
        userType: user?.userType,
      },
      patientId: user?.id,
    });

    const botReply = { sender: "bot", text: res.data.reply || "Sem resposta do servidor." };
    setMessages((prev) => [...prev, botReply]);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Ocorreu um erro ao comunicar com o servidor." },
    ]);
  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src={botAvatar} alt="Bot" className="chatbot-avatar" />
        <h2>Olá 👋</h2>
        <p>Como posso ajudar-te hoje?</p>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-loading">A pensar...</div>}
      </div>

      <div className="chatbot-input-container">
        <input
          type="text"
          value={input}
          placeholder="Escreve a tua dúvida..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default ChatBot;
