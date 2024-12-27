import React, { useState } from 'react';
import { registerUser } from '../services/UserService';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    userPersonality: '', // Yeni bir alan ekledik
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Kayıt fonksiyonunu çağırıyoruz
      await registerUser(formData);
      setSuccessMessage('User registered successfully!');
      setError('');
    } catch (err) {
      setError('Error registering user. Username might be taken.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Surname"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />
      <input
        type="text"
        placeholder="Personality (Optional)"
        value={formData.userPersonality}
        onChange={(e) =>
          setFormData({ ...formData, userPersonality: e.target.value })
        }
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;