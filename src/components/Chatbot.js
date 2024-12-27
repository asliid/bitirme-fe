import React, { useState } from "react";
import { sendMessageToChatbot } from "../services/ChatbotService"; // API fonksiyonunuzu import edin

function ChatPage() {
  const [userId, setUserId] = useState(1); // Kullanıcı ID'si
  const [message, setMessage] = useState(""); // Kullanıcının mesajı
  const [chatResponse, setChatResponse] = useState(""); // ChatGPT yanıtı

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mesajı gönder
    sendMessageToChatbot(userId, message)
      .then((response) => {
        setChatResponse(response.responseMessage); // Gelen yanıtı ekrana bas
      })
      .catch((error) => {
        console.error("Chatbot mesaj gönderme hatası:", error);
      });
  };

  return (
    <div>
      <h1>Chat with Bot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}

export default ChatPage;