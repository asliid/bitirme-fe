import React, { useEffect, useState } from "react";
import { fetchQuestions, submitTest, testResult } from "../services/TestService";
import "./PersonalityTestPage.css"; // CSS dosyasını ekliyoruz

const PersonalityTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [buttonColors, setButtonColors] = useState({});
  const [personalityResult, setPersonalityResult] = useState(null);  // Sonuçları tutmak için state
  const [isSubmitting, setIsSubmitting] = useState(false);  // Submit durumu

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
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
    setButtonColors((prevColors) => ({
      ...prevColors,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers || {}).length === 0) {
      alert("En az bir soruya cevap vermen gerek");
      return;
    }

    setIsSubmitting(true); // Submit başlatıldığında durumu "true" yapıyoruz
    try {
      // Testi gönder
      const result = await submitTest(answers); 
      setResult(result);  // Test sonucu set ediliyor

      // Sonuçları al
      const personalityData = await testResult(); 
      setPersonalityResult(personalityData);  // Kişilik testi sonucu set ediliyor

    } catch (error) {
      console.error("Test gönderilirken veya sonuç alınırken hata oluştu:", error);
    } finally {
      setIsSubmitting(false); // İşlem tamamlandığında "false" yapıyoruz
    }
  };

  return (
    <div className="personality-test-container">
      <h1>Kişilik Testi</h1>
      {questions.length === 0 ? (
        <p className="loading-text">Yükleniyor...</p>
      ) : (
        <div>
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <p>{question.text}</p>
              <div className="button-group">
                <button
                  style={{
                    backgroundColor: buttonColors[question.id] === "evet" ? "#218838" : "initial",
                  }}
                  onClick={() => handleAnswerChange(question.id, "evet")}
                >
                  Evet
                </button>
                <button
                  style={{
                    backgroundColor: buttonColors[question.id] === "hayır" ? "#c82333" : "initial",
                  }}
                  onClick={() => handleAnswerChange(question.id, "hayır")}
                >
                  Hayır
                </button>
                <button
                  style={{
                    backgroundColor: buttonColors[question.id] === "fark etmez" ? "#5a6268" : "initial",
                  }}
                  onClick={() => handleAnswerChange(question.id, "fark etmez")}
                >
                  Fark Etmez
                </button>
              </div>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Yükleniyor...' : 'Testi Gönder'}
          </button>
        </div>
      )}
      {result && (
        <div className="question-card">
          <h2>Test Sonucu:</h2>
          <p>{result}</p>
        </div>
      )}
      {personalityResult && (
        <div className="question-card personality-result-card">
          <h2>Kişilik Sonucu</h2>
          <p><strong>Kişilik Tipi:</strong> {personalityResult.personality}</p>
          <p><strong>Açıklama:</strong> {personalityResult.personalityDescription}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalityTestPage;