import axiosInstance from '../core/axiosInstance';
import {jwtDecode}from 'jwt-decode';

// Login user
export const login = async (username, password) => {
  try {
      const response = await axiosInstance.post('/api/auth/login', {
          username,
          password
      });
      return response.data; // AuthResponseDto döndürülür
  } catch (error) {
      // Hata durumunda daha ayrıntılı mesaj gösterebilirsiniz
      throw new Error(error.response ? error.response.data.message : 'An error occurred');
  }
};

// Register API isteği
export const registerUser = async (username, password, name, surname) => {
  try {
      const response = await axiosInstance.post('/api/auth/register', {
          username,
          password,
          name, 
          surname
      });
      return response.data; // Başarı mesajını veya diğer dönen verileri döndürür
  } catch (error) {
      // Hata durumunda daha ayrıntılı mesaj gösterebilirsiniz
      throw new Error(error.response ? error.response.data.message : 'An error occurred');
  }
};

// Profil bilgilerini almak için API isteği
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');

if (token) {
  try {
    const data = jwtDecode(token); // Token'ı decode ediyoruz
    console.log(data); // Decode edilmiş data'yı kontrol edin
    const username = data.sub; // Token'dan kullanıcı adı alıyoruz
    console.log('Username:', username);
    
    // Testi gönder
    const response = await axiosInstance.get(`/api/auth/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error('Token decode edilirken hata oluştu:', error);
    throw error;
  }
} else {
  console.error('Token bulunamadı');
  throw new Error('Token bulunamadı');
}
};