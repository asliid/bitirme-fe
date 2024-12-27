import axiosInstance from '../core/axiosInstance';

// Chatbot API'si ile iletişim kurmak için bir fonksiyon
export const sendMessageToChatbot = (userId, message) => {
    // İstek body'sini oluşturuyoruz
    const chatbotInputRequest = {
      userId: userId,
      message: message,
    };
}  