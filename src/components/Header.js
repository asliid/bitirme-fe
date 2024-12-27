import React from "react";
import { Link } from "react-router-dom";

const Header = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // State güncelleniyor
    window.location.href = "/"; // Ana sayfaya yönlendir
  };

  return (
    <nav>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/chat">Chatbot</Link>
      <Link to="/profile">Profil</Link>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </nav>
  );
};

export default Header;