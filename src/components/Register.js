import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import './Register.css'; // Import the CSS file

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
      <h1>Register</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="input-container">
        <label htmlFor="username" className="input-label">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="input-field"
        />
        {errors.username && <p className="field-error">{errors.username}</p>}
      </div>

      <div className="input-container">
        <label htmlFor="password" className="input-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="input-field"
        />
        {errors.password && <p className="field-error">{errors.password}</p>}
      </div>

      <div className="input-container">
        <label htmlFor="name" className="input-label">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="input-container">
        <label htmlFor="surname" className="input-label">Surname</label>
        <input
          id="surname"
          type="text"
          placeholder="Surname"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          className="input-field"
        />
        {errors.surname && <p className="field-error">{errors.surname}</p>}
      </div>

      <button onClick={handleRegister} className="register-button">Register</button>
    </div>
  );
}

export default Register;