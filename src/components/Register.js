import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import './Register.css'; 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (formData.username.length < 6 || formData.username.length > 30) {
      errors.username = 'Kullanıcı adı 6 ile 30 karakter arasında olmalıdır.';
    }
    if (formData.password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalıdır.';
    }
    if (!formData.name.trim()) {
      errors.name = 'İsim boş olamaz.';
    }
    if (!formData.surname.trim()) {
      errors.surname = 'Soyisim boş olamaz.';
    }
    return errors;
  };

  const handleRegister = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      setSuccessMessage('User registered successfully!');
      setError('');
      setErrors({});

      // 1 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setError('Error registering user. Username might be taken.');
    }
  };
  return (
    <div className="register-container">
    <div className="header-section">
      <p className="welcome-message">
        Aramıza katıl, potansiyelini keşfet ve kariyer yolculuğuna bizimle başla!
      </p>
      <h1>Kayıt Ol</h1>
   
  <div className="form-grid">
    <div className="input-container">
      <label className="input-label" htmlFor="username">Kullanıcı Adı</label>
      <input
        type="text"
        id="username"
        className="input-field"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
    </div>
    <div className="input-container">
      <label className="input-label" htmlFor="password">Şifre</label>
      <input
        type="password"
        id="password"
        className="input-field"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </div>
    <div className="input-container">
      <label className="input-label" htmlFor="name">İsim</label>
      <input
        type="text"
        id="name"
        className="input-field"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
    <div className="input-container">
      <label className="input-label" htmlFor="surname">Soyisim</label>
      <input
        type="text"
        id="surname"
        className="input-field"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />
    </div>
  </div>

  <button className="register-button" onClick={handleRegister}>
    Hemen Katıl ve Başla
  </button>
</div>
</div>
  );
}

export default Register;