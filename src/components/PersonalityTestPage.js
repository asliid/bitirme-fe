import React, { useEffect, useState } from "react";
import { fetchQuestions, submitTest, testResult } from "../services/TestService";
import "./PersonalityTestPage.css";
import { useNavigate } from 'react-router-dom';

const PersonalityTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [buttonColors, setButtonColors] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const motivationalMessages = [
    "Kendine güven! Her soruyla kariyerin için bir adım atıyorsun.",
    "Gerçekten ne istediğini keşfetme zamanı.",
    "Cevapların seni en uygun mesleğe götürüyor.",
    "Her tercih, kişiliğinin aynasıdır.",
    "Unutma, kariyer yolculuğu bir maraton.",
    "İç sesini dinle, o seni doğru yönlendirir.",
    "Hayalindeki işe ulaşmak için güzel bir adım attın.",
    "Kendini ifade etmekten çekinme, bu test senin için!",
    "Sabırlı ol, sonuca adım adım yaklaşıyorsun.",
    "Her cevap bir iz bırakır, senin izini çiziyoruz."
  ];

  const personalityLabels = {
    "REALISTIC": "Gerçekçi",
    "INVESTIGATIVE": "Araştırmacı",
    "ARTISTIC": "Sanatsal",
    "SOCIAL": "Sosyal",
    "ENTERPRISING": "Girişimci",
    "CONVENTIONAL": "Geleneksel"
  };

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Sorular alınırken hata oluştu:", error);
      }
    };
    getQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setButtonColors((prev) => ({ ...prev, [questionId]: answer }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 200);
    }
  };

  const getRecommendations = (personality) => {
    switch (personality?.toUpperCase()) {
      case "REALISTIC":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Makine Mühendisi</li><li>Elektrik Teknisyeni</li><li>İnşaat Ustası</li><li>Otomotiv Teknisyeni</li></ul></>);
      case "INVESTIGATIVE":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Data Scientist</li><li>Fizikçi</li><li>Biyomedikal Mühendisi</li><li>Yapay Zeka Uzmanı</li></ul></>);
      case "ARTISTIC":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Grafik Tasarımcı</li><li>Müzisyen</li><li>Yazar</li><li>Moda Tasarımcısı</li></ul></>);
      case "SOCIAL":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Psikolog</li><li>Öğretmen</li><li>Sosyal Hizmet Uzmanı</li><li>Danışman</li></ul></>);
      case "ENTERPRISING":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Girişimci</li><li>Satış Yöneticisi</li><li>Proje Lideri</li><li>Reklam Uzmanı</li></ul></>);
      case "CONVENTIONAL":
        return (<><h3>Önerilen Meslekler:</h3><ul><li>Muhasebeci</li><li>Veri Girişi Uzmanı</li><li>İdari Asistan</li><li>Finans Analisti</li></ul></>);
      default:
        return <p>Öneri bulunamadı.</p>;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitTest(answers);
      setResult(result);
      const personalityData = await testResult();
      setPersonalityResult(personalityData);
    } catch (error) {
      console.error("Test gönderilirken hata:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="personality-test-container">
      <div className="test-wrapper">
        <h1>Kişilik Testi</h1>
        <div className="other-tests-buttons">
          <button onClick={() => navigate("/personality-test/values")}>✨ Değerler Testi</button>
          <button onClick={() => navigate("/personality-test/environment")}>🪨 Çalışma Ortamı Testi</button>
          <button onClick={() => navigate("/personality-test/motivation")}>🚀 Motivasyon Testi</button>
        </div>

        {!personalityResult && (
          <>
            <p className="intro-text">
              Bu test, <strong>Holland Kişilik Tipi Teorisi</strong> temel alınarak hazırlanmıştır ve toplamda <strong>90 sorudan</strong> oluşmaktadır.
              İlgi alanlarınıza ve tercihlerinize göre en uygun kariyer yollarını belirlemenize yardımcı olur.
            </p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">
              Soru {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="motivational-box">
              {motivationalMessages[currentQuestionIndex % motivationalMessages.length]}
            </div>
            {questions.length > 0 && currentQuestion && (
              <div className="question-card">
                <p><strong>{currentQuestionIndex + 1}.</strong> {currentQuestion.text}</p>
                <div className="button-group">
                  <button style={{ backgroundColor: buttonColors[currentQuestion.id] === "evet" ? "#218838" : "initial" }} onClick={() => handleAnswerChange(currentQuestion.id, "evet")}>Evet</button>
                  <button style={{ backgroundColor: buttonColors[currentQuestion.id] === "hayır" ? "#c82333" : "initial" }} onClick={() => handleAnswerChange(currentQuestion.id, "hayır")}>Hayır</button>
                  <button style={{ backgroundColor: buttonColors[currentQuestion.id] === "fark etmez" ? "#5a6268" : "initial" }} onClick={() => handleAnswerChange(currentQuestion.id, "fark etmez")}>Fark Etmez</button>
                </div>
                <div className="navigation-buttons">
                  <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Önceki</button>
                  <button disabled={currentQuestionIndex === questions.length - 1} onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Sonraki</button>
                </div>
                <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Yükleniyor..." : "Testi Bitir"}
                </button>
              </div>
            )}
          </>
        )}

        {personalityResult && (
          <>
            <div className="question-card personality-result-card">
              <h2>Kişilik Sonucu</h2>
              <p><strong>Kişilik Tipi:</strong> {personalityLabels[personalityResult.personality?.toUpperCase()] || "Tanımsız"}</p>
              <p><strong>Açıklama:</strong> {personalityResult.personalityDescription}</p>
              {!showRecommendations && (
                <button className="submit-button" style={{ marginTop: '20px' }} onClick={() => setShowRecommendations(true)}>
                  Bu kişilik tipi için önerilen meslekleri görmek ister misin?
                </button>
              )}
              {showRecommendations && (
                <>
                  <div className="recommendation-box">{getRecommendations(personalityResult.personality)}</div>
                  <button className="chat-button" onClick={() => navigate("/chatbot")}>
                    Daha fazla öneri istersen, sohbet asistanıma sor!
                  </button>
                </>
              )}
            </div>
            <div className="result-buttons">
              <button className="retry-button" onClick={() => window.location.reload()}>Yeniden Testi Yap</button>
              <button className="more-tests-button" onClick={() => navigate("/personality-test")}>Diğer Testleri Gör</button>
              <button className="chat-button" onClick={() => navigate("/chatbot")}>Kariyer Asistanıyla Konuş</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalityTestPage;
