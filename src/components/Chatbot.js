import React, { useState } from 'react';
import { sendMessageToChatbot } from '../services/ChatbotService'; // Servisi import ediyoruz
import './Chatbot.css'; // Stil dosyası

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Boş mesaj gönderme

    // Kullanıcı mesajını ekrana ekle
    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);

    setIsLoading(true);
    try {
      const botResponse = await sendMessageToChatbot(message); // Artık sadece content döner
      setChatHistory((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setMessage(''); // Mesaj kutusunu temizle
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {/* Üst kısmı ekliyoruz */}
        <div className="chatbot-welcome">
          <h2>Merhaba, ben Kariyer Asistanınız!</h2>
          <p>
            Bana ilgi alanlarınızdan, becerilerinizden ya da kariyer hedeflerinizden bahsedebilirsiniz. 
            Size en uygun kariyer yollarını bulmanıza yardımcı olacağım!
          </p>
        </div>

        {/* Sohbet geçmişi */}
        <div className="chat-history">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Mesaj yazma bölümü */}
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
          />
          <button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Yükleniyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;