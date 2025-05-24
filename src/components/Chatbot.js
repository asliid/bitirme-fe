import React, { useState } from 'react';
import { sendMessageToChatbot } from '../services/ChatbotService';
import './Chatbot.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToChatbot(message);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setMessage('');
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="chatbot-welcome">
          <h2>Merhaba, ben Kariyer Asistanınız!</h2>
          <p>
            Bana ilgi alanlarınızdan, becerilerinizden ya da kariyer hedeflerinizden bahsedebilirsiniz. 
            Size en uygun kariyer yollarını bulmanıza yardımcı olacağım!
          </p>
        </div>

        <div className="chat-history">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
              {msg.sender === 'bot' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    )
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>

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