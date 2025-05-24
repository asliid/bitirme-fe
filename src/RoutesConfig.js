import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Chatbot from "./components/Chatbot";
import HomePage from "./components/HomePage";
import TestSelectionPage from "./components/TestSelectionPage";
import EnvironmentTestPage from "./components/EnvironmentTestPage";
import ValuesTestPage from "./components/ValuesTestPage";
import MotivationTestPage from "./components/MotivationTestPage";
import PersonalityTestPage from "./components/PersonalityTestPage";
import CategoryCourses from "./components/CategoryCourses";

const RoutesConfig = ({ isLogin, setIsLogin }) => {
  
  return (
    <Routes>
      {/* Giriş yapılmışsa erişilebilecek yollar */}
      {isLogin ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personality-test" element={< PersonalityTestPage/>} />
          <Route path="/personality-test/values" element={<ValuesTestPage />} />
          <Route path="/personality-test/motivation" element={<MotivationTestPage />} /> 
         <Route path="/personality-test/environment" element={<EnvironmentTestPage />} /> 
          <Route path="/personality-test/a" element={<TestSelectionPage />} />
          <Route path="/personality-test/holland" element={<PersonalityTestPage />} />
          <Route path="/explore-courses" element={<CategoryCourses />} />
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