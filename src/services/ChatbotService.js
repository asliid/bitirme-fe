import axiosInstance from '../core/axiosInstance';
import {jwtDecode}from 'jwt-decode';

export const sendMessageToChatbot = async (message) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Kullanıcı girişi yapılmamış!'); // Token yoksa hata fırlat
  }

  try {
    // Token'ı decode et ve username'i al
    const data = jwtDecode(token);
    console.log(data,message,token,"dfıfhfo"); // Token'dan çözülen bilgileri kontrol edin
    const username = data.sub; // Kullanıcı adını al
    console.log('Username:', username);

    // Mesajı gönder
    const response = await axiosInstance.post('/chatbot/chat', {
      username, // Decode edilmiş username gönderiliyor
      message,
    });

    // Backend'den dönen JSON'dan sadece `content` kısmını döndür
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    throw error;
  }
};