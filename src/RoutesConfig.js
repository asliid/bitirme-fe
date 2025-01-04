import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Chatbot from "./components/Chatbot";
import HomePage from "./components/HomePage";
import PersonalityTestPage from "./components/PersonalityTestPage";

const RoutesConfig = ({ isLogin, setIsLogin }) => {
  
  return (
    <Routes>
      {/* Giriş yapılmışsa erişilebilecek yollar */}
      {isLogin ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/personality-test" element={< PersonalityTestPage/>} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Tanımsız yollar */}
        </>
      ) : (
        <>
          {/* Giriş yapılmamışsa Login ve Register */}
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Tanımsız yollar */}
        </>
      )}
    </Routes>
  );
};

export default RoutesConfig;