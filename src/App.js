import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import Header from "./container/Header"; // Header bileşenini ekleyin

const App = () => {
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem("isLogin") === "true");
  const [loading, setLoading] = useState(true);

  // Kullanıcının login durumunu kontrol et
  //deneme
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      setLoading(false); // Yükleme durumu sona erdi
    };

    checkLoginStatus();
  }, [localStorage.getItem("isLogin")]);

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleme ekranı
  }

  return (
    <Router>
      <div style={{ height: "100%" }}>
        {/* Giriş yapılmışsa Header göster */}
        {isLogin && <Header setIsLogin={setIsLogin} />}
        
        {/* Route'ları render et */}
        <RoutesConfig isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </Router>
  );
};

export default App;