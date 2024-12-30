import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // Tüm istekler için temel URL
  headers: {
    'Content-Type': 'application/json',
  },
  
});

//İstek gönderilirken yapılacak işlemler
axiosInstance.interceptors.request.use(
  function (config) {
    // İstek gönderilmeden önce yapılacak işlemler
    console.log('sending request:', config);
  
    return config;
  }, 
  function (error) {
    // İstek hatası durumunda yapılacak işlemler
    console.error('request error:', error);
    return Promise.reject(error);
  }
);


//İstek geri döndüğünde yapılacak işlemler
axiosInstance.interceptors.response.use(
  function (response) {
    // Yanıt başarılı olduğunda yapılacak işlemler
    console.log('response:', response.data);
    return response;
  },
  function (error) {
    // Yanıtta hata olduğunda yapılacak işlemler
    console.error('response error:', error);
    
    // Örneğin, 401 (Unauthorized) hatası durumunda oturumun süresinin dolmuş olabileceğini varsayalım.
    if (error.response?.status === 401) {
      // Oturumu yeniden yönlendirme veya kullanıcıyı oturum açma sayfasına yönlendirme gibi işlemler yapılabilir.
      console.log('Oturum süresi dolmuş. Yeniden yönlendiriliyor...');
      // Örnek olarak, kullanıcıyı oturum açma sayfasına yönlendirme:
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;