import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const handleLogout = () => {
    // Çıkış yapma işlemi burada yapılabilir.
    // Örneğin, localStorage'dan token'ı kaldırarak kullanıcıyı çıkış yapabilirsiniz.
    localStorage.removeItem("authToken");
    window.location.href = "/"; // Anasayfaya yönlendirme
  };

  return (
    <div>
      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <div>
          <Link to="/profile" style={{ marginRight: "10px" }}>Profil</Link>
          <Link to="/personality-test" style={{ marginRight: "10px" }}>Kişilik Testi</Link>
          <Link to="/chat">Chatbot</Link>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "10px" }}>
          Çıkış Yap
        </button>
      </div>

      {/* Ana içerik */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Career Recommendation System</h1>
        <p>
          Discover your ideal career path with our AI-powered assistant. Take the
          personality test, chat with the bot, and explore opportunities.
        </p>
        <p>
          Use the navigation bar above to access your profile, personality test,
          or chatbot.
        </p>
      </div>
    </div>
  );
};

export default HomePage;