import axiosInstance from '../core/axiosInstance';

// Login user
export const login = async (username, password) => {
  try {
      const response = await axiosInstance.post('/api/auth/login', {
          username,
          password
      });
      // Eğer login başarılıysa, token'ı localStorage'a kaydet
      if (response.data.token) {
          localStorage.setItem('token', response.data.token);
      }
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
  try {
    const response = await axiosInstance.get("/api/auth/profile");
    return response.data; // Kullanıcı profil bilgilerini döndür
  } catch (error) {
    // Hata durumunda, hata mesajını döndür
    throw new Error(error.response ? error.response.data.message : "Profil bilgileri alınırken bir hata oluştu");
  }
};