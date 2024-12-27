import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import PersonalityTest from "./components/PersonalityTest";
import Chatbot from "./components/Chatbot";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoutesConfig = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/chatbot"); // Token varsa chat ekranına yönlendir
    } else {
      navigate("/login"); // Token yoksa login sayfasına yönlendir
    }
  }, [token, navigate]);

  const routes = [
    { path: "/", name: "Ana Sayfa", component: HomePage },
    { path: "/login", name: "Giriş Yap", component: Login },
    { path: "/register", name: "Kayıt Ol", component: Register },
    { path: "/personality-test", name: "Kişilik Testi", component: PersonalityTest},
    { path: "/chatbot", name: "Chatbot", component: Chatbot },
    { path: "/profile", name: "Profil", component: Profile },
 
  ];

  return routes;
};

export default RoutesConfig;