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
          <h2>1. Kişilik Testlerini Yapın</h2>
          <p>
            Kişilik testlerimiz ile size en uygun kariyer yolunu keşfedin. Bilimsel temellere dayalı sonuçlar ile doğru yönlendirmeler alın.
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
      <div className="mini-test-section">
        <h3>Mini Testler</h3>
        <p className="mini-test-description">
        Bu kısa testlerle kariyer yolculuğunuzu derinleştirin! İlgi alanlarınızı, değerlerinizi, çalışma tarzınızı ve sizi neyin motive ettiğini keşfederek daha bilinçli kararlar alın.
        </p>
        <div className="mini-test-buttons">
          <Link to="/personality-test/values" className="mini-button">Değerler Testi</Link>
          <Link to="/personality-test/environment-test" className="mini-button">Çalışma Ortamı Testi</Link>
          <Link to="/personality-test/motivation-test" className="mini-button">Motivasyon Testi</Link>
          <Link to="/personality-test/skills-test" className="mini-button">Holland Testi</Link>
        </div>
      </div>
      <div className="course-suggestion-box">
        <h3>📚 Size Özel Kurs Önerileri</h3>
        <p>
          Kişilik testleri ve ilgi alanlarınıza göre hazırlanan kurs önerilerini profil sayfanızda inceleyebilirsiniz. Geleceğinize yatırım yapın!
        </p>
        <Link to="/profile" className="course-button">Kurslara Göz At</Link>
      </div>
      <div className="all-courses-explore-box">
      <h3>🔍 Tüm Kursları Keşfedin</h3>
      <p>
        Tüm kategorilerdeki kurslara göz atarak kendinize en uygun eğitim fırsatlarını yakalayın.
        İster yeni beceriler öğrenin, ister kariyerinizi geliştirin!
      </p>
      <Link to="/explore-courses" className="explore-button">Tüm Kursları Görüntüle</Link>
    </div>
      <div className="home-footer">
        <p>Geleceğinizi keşfetmeye hazır mısınız? Hadi başlayalım!</p>
      </div>
    </div>
  );
};

export default HomePage;