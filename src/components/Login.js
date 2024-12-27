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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Backend'e POST isteği gönder
        const response = await axios.post('api/auth/login', { username, password });

        // Token'ı localStorage'a kaydet
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('token', response.data.token);

        // Ana sayfaya yönlendir
        navigate('/');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Giriş başarısız, lütfen bilgilerinizi kontrol edin.';
        setApiError(errorMessage);
      }
    } else {
      setErrors(validationErrors);
    }
  };

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
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <h2>Giriş Yap</h2>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adınızı girin"
          />
          {errors.username && <small className="error-text">{errors.username}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
          />
          {errors.password && <small className="error-text">{errors.password}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Giriş Yap</button>
        {apiError && <div className="api-error">{apiError}</div>}
      </form>
    </div>
  );
}
