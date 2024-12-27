import axiosInstance from '../core/axiosInstance';

// Login API isteği
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
export const register = async (username, password) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', {
            username,
            password
        });
        return response.data; // Başarı mesajını veya diğer dönen verileri döndürür
    } catch (error) {
        // Hata durumunda daha ayrıntılı mesaj gösterebilirsiniz
        throw new Error(error.response ? error.response.data.message : 'An error occurred');
    }
};