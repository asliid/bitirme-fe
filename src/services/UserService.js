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
export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', formData);
    return response.data;
  } catch (error) {
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
    return response.data
  } catch (error) {
    console.error('Token decode edilirken hata oluştu:', error);
    throw error;
  }
} else {
  console.error('Token bulunamadı');
  throw new Error('Token bulunamadı');
}
};


export const submitProfile = async (userDetails) => {
  const token = localStorage.getItem('token'); // Token'ı localStorage'dan alıyoruz

  if (token) {
    try {
      const data = jwtDecode(token); // Token'ı decode ediyoruz
      const username = data.sub; // Token'dan kullanıcı adı alıyoruz

      // Profil bilgilerini gönderiyoruz
      const response = await axiosInstance.post(`/api/auth/submit/${username}`, userDetails );
       
      return response.data; // Başarıyla güncellenen veriyi döndürüyoruz
    } catch (error) {
      console.error('Token decode edilirken hata oluştu:', error);
      throw error;
    }
  } else {
    console.error('Token bulunamadı');
    throw new Error('Token bulunamadı');
  }
};

// Kurs önerilerini çekmek için
export const getRecommendedCourses = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const data = jwtDecode(token); // Token'dan kullanıcı adı al
      const username = data.sub;

      const response = await axiosInstance.get(`/api/kurslar/oneriler/grup/${username}`);
      return response.data;
    } catch (error) {
      console.error("Kurs önerileri alınırken hata oluştu:", error);
      throw error;
    }
  } else {
    throw new Error("Token bulunamadı");
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/kurslar/kategoriler');
    return response.data;
  } catch (error) {
    console.error("Kategori alınamadı:", error);
    throw error;
  }
};
export const getCoursesByCategory = async (kategori) => {
  try {
    const response = await axiosInstance.get(`/api/kurslar/kategori/${encodeURIComponent(kategori)}`);
    return response.data;
  } catch (error) {
    console.error("Kurslar alınamadı:", error);
    throw error;
  }
};