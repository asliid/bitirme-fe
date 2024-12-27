import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Chatbot from "./components/Chatbot"; 
import HomePage from "./components/HomePage";
import Header from "./components/Header"; // Header bileşenini ekleyin

function App() {
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem("isLogin") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      setLoading(false); // Yükleme durumu sona erdi
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleme durumu
  }

  let page;

  if (!isLogin) {
    page = <Login setIsLogin={setIsLogin} />;
  } else {
    page = (
      <Router>
        <Header setIsLogin={setIsLogin} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/chat" 
              element={isLogin ? <Chatbot /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isLogin ? <Profile /> : <Navigate to="/login" />} 
            />
          </Routes>
    
      </Router>
    );
  }

  return (
    <div style={{ height: "100%" }}>
      {page}
    </div>
  );
}

export default App;
