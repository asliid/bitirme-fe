import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../core/axiosInstance'; // Axios instance
import './UserForm.css'; // CSS dosyası

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form doğrulama

   
      try {
        // Backend'e POST isteği gönder
        const response = await axios.post('/api/auth/login', { username, password });
    
        // Token'ı localStorage'a kaydet
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('token', "Bearer " +response?.data?.accessToken);
        window.location.reload();
        navigate('/'); // Ana sayfaya yönlendir
      } catch (error) {
        // Hata mesajını ayıkla
        const errorMessage = error.response?.data?.message || 'Giriş başarısız, lütfen bilgilerinizi kontrol edin.';
        setApiError(errorMessage);
      }
  };

  // Form doğrulama fonksiyonu
  const validateForm = () => {
    const errors = {};
    if (username.length < 6 || username.length > 30) {
      errors.username = 'Kullanıcı adı 6 ile 30 karakter arasında olmalıdır.';
    }
    if (password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalıdır.';
    }
    return errors;
  };
  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Giriş Yap</h2>

        <div className="form-group">
          <label className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adınızı girin"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Şifre</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
          />
        </div>

        {apiError && <div className="error-message">{apiError}</div>}

        <button type="submit" className="submit-button">Giriş Yap</button>

        <div className="register-link">
          <span>Hesabınız yok mu?</span>
          <button type="button" onClick={() => navigate('/register')}>Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
}
