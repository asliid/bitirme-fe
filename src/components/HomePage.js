import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css'; // CSS dosyasını import ediyoruz

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/"; // Anasayfaya yönlendirme
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Kariyer Tavsiye Sistemi'ne Hoşgeldiniz</h1>
        <p>
          Kişiselleştirilmiş kariyer tavsiyesi ile geleceğinizi keşfedin! Gerçek potansiyelinizi ortaya çıkarın!
        </p>
      </div>
      
      <div className="features-container">
        <div className="feature-box">
          <h2>1. Kişilik Testini Yapın</h2>
          <p>
            Kişilik testimiz ile size en uygun kariyer yolunu keşfedin. Bilimsel temellere dayalı sonuçlar ile doğru yönlendirmeler alın.
          </p>
          <Link to="/personality-test" className="cta-button">Testi Yap</Link>
        </div>
        
        <div className="feature-box">
          <h2>2. Kariyer Asistanı ile Sohbet Edin</h2>
          <p>
            AI destekli asistanımızla konuşarak ilgi alanlarınıza ve becerilerinize dayalı kişiselleştirilmiş kariyer tavsiyeleri alın.
          </p>
          <Link to="/chatbot" className="cta-button">Sohbete Başla</Link>
        </div>

        <div className="feature-box">
          <h2>3. Profilinizi Görüntüleyin</h2>
          <p>
            Profilinizi görüntüleyerek kariyer yolculuğunuzu takip edin ve size özel kariyer önerilerini keşfedin.
          </p>
          <Link to="/profile" className="cta-button">Profili Görüntüle</Link>
        </div>
      </div>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
      </div>

      <div className="home-footer">
        <p>Geleceğinizi keşfetmeye hazır mısınız? Hadi başlayalım!</p>
      </div>
    </div>
  );
};

export default HomePage;