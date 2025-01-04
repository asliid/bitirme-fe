import React from "react";
import "./container.css";

import { Link } from "react-router-dom";

const Header = ({ setIsLogin }) => {
  const handleLogout = () => {
    localStorage.removeItem("isLogin"); // Giriş durumunu kaldır
    localStorage.removeItem("token"); // Token'ı kaldır
    setIsLogin(false); // Login durumunu güncelle
  };

  return (
    <nav className="navbar">
      <Link to="/">Ana Sayfa</Link>
      <Link to="/profile">Profil</Link>
      <Link to="/chatbot">Chatbot</Link>
      <Link to="/personality-test">Kişilik Testi</Link>

      <button onClick={handleLogout}>Çıkış Yap</button>
    </nav>
  );
};

export default Header;