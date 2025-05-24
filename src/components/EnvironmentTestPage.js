// src/components/EnvironmentTestPage.js
import React, { useState } from 'react';
import './PersonalityTestPage.css';
import { useNavigate } from 'react-router-dom';
import { submitEnvironmentResult } from '../services/TestService';

const environmentQuestions = [
  { id: 1, text: "Birlikte çalışmaktan keyif alırım.", category: "Takım Çalışması" },
  { id: 2, text: "Kendi başıma verimli çalışırım.", category: "Bireysel Çalışma" },
  { id: 3, text: "Yaratıcı fikirlerle çalışmak beni motive eder.", category: "Yaratıcı Ortam" },
  { id: 4, text: "Belirlenmiş kurallar ve prosedürler bana güven verir.", category: "Düzenli ve Kuralcı Ortam" },
  { id: 5, text: "Yoğun ve hareketli bir iş temposu beni heyecanlandırır.", category: "Dinamik ve Hızlı Tempolu Ortam" },
  { id: 6, text: "Ekip içinde görev paylaşımı beni rahatlatır.", category: "Takım Çalışması" },
  { id: 7, text: "Yalnız ve sessiz ortamlarda daha iyi düşünürüm.", category: "Bireysel Çalışma" },
  { id: 8, text: "Kuralların sıkı olduğu yerlerde daha iyi organize olurum.", category: "Düzenli ve Kuralcı Ortam" },
  { id: 9, text: "Rutin olmayan, her gün değişen işler beni cezbeder.", category: "Dinamik ve Hızlı Tempolu Ortam" },
  { id: 10, text: "Yeni projeler ve fikirlerle uğraşmak bana ilham verir.", category: "Yaratıcı Ortam" },
];
const environmentDescriptions = {
    "Takım Çalışması": "Siz, ekip çalışmasına değer veren ve birlikte üretmekten keyif alan birisiniz. İnsanlarla iş birliği içinde olmak sizi motive eder. Fikir alışverişinde bulunmak, ortak hedeflere ulaşmak ve destekleyici bir ortamda çalışmak sizi daha verimli kılar. Eğitim, sağlık, proje ekipleri, müşteri ilişkileri gibi sosyal yönü güçlü alanlar size hitap edebilir.",
  
    "Bireysel Çalışma": "Bağımsız çalışmayı tercih ediyorsunuz. Kendi kararlarınızı verebildiğiniz, dikkat dağıtmayan sessiz ortamlarda daha iyi performans gösterirsiniz. Plan yapmayı, sorumluluğunuz altındaki işleri kendi yöntemlerinizle yürütmeyi seversiniz. Yazılım geliştirme, araştırma, analiz ve içerik üretimi gibi daha bireysel işler sizin için uygun olabilir.",
  
    "Yaratıcı Ortam": "Siz, yaratıcılığınızı ortaya koyabileceğiniz serbest ve esnek çalışma ortamlarında parlıyorsunuz. Rutin işlerden çok, farklı ve yenilikçi projelerle uğraşmak size ilham verir. Tasarım, sanat, reklamcılık, yenilikçi girişimler veya medya gibi alanlar sizi mutlu edebilir. Özgün düşüncelerinizle değer yaratmak en büyük motivasyon kaynağınız.",
  
    "Düzenli ve Kuralcı Ortam": "Siz yapılandırılmış, net kurallar ve prosedürlerle çalışan ortamlarda güven hissedersiniz. Belirsizlikten hoşlanmaz, planlı ve kontrollü iş akışlarını tercih edersiniz. Bürokrasiye, disipline ve organizasyona değer verirsiniz. Finans, hukuk, idari işler, kamu kurumları gibi yapıların sizin için uygun olma ihtimali yüksektir.",
  
    "Dinamik ve Hızlı Tempolu Ortam": "Hareketli, sürekli değişen ve enerjisi yüksek ortamlarda başarılı oluyorsunuz. Monoton işler yerine aksiyonun bol olduğu, zaman baskısı altında hızlı kararlar alınması gereken görevler sizi motive eder. Satış, etkinlik yönetimi, sağlık sektörü, lojistik, acil hizmetler gibi dinamik sektörlerde potansiyelinizi en iyi şekilde gösterebilirsiniz.",
  
    "Belirlenemedi": "Yeterli bilgiye ulaşılamadı. Lütfen testi tekrar çözerek daha net bir sonuç alın."
  };

const motivationalTips = [
  "Hangi ortamda çalışmaktan hoşlandığını bilmek başarıya giden ilk adımdır!",
  "Doğru iş ortamı seni daha üretken yapar.",
  "İdeal çalışma ortamını bul, potansiyelini ortaya çıkar.",
  "Her cevap seni doğru kariyere biraz daha yaklaştırıyor.",
  "Kendini en iyi hissettiğin ortam senin için en uygun mesleği belirler."
];

const EnvironmentTestPage = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = environmentQuestions[currentIndex];

  const handleAnswer = (answer) => {
    const updated = { ...answers, [currentQuestion.id]: answer };
    setAnswers(updated);

    if (currentIndex < environmentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(updated);
    }
  };

  const handleManualSubmit = () => {
    calculateResult(answers);
  };


  const calculateResult = async (answerMap) => {
    const scores = {};
    environmentQuestions.forEach((q) => {
      const ans = answerMap[q.id];
      const score = ans === 'evet' ? 2 : ans === 'fark etmez' ? 1 : 0;
      scores[q.category] = (scores[q.category] || 0) + score;
    });
  
    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const topCategory = top?.[0] || 'Belirlenemedi';
    const description = environmentDescriptions[topCategory];
  
    setResult({ category: topCategory, description });
  
    try {
      if (topCategory !== 'Belirlenemedi') {
        await submitEnvironmentResult(topCategory);
      }
    } catch (err) {
      console.error("Sonuç gönderilirken hata:", err);
    }
  };

  const progress = Math.round(((currentIndex + 1) / environmentQuestions.length) * 100);
  const tip = motivationalTips[currentIndex % motivationalTips.length];

  return (
    <div className="personality-test-container">
      <div className="test-wrapper">
        <h1>Çalışma Ortamı Testi</h1>

        <div className="other-tests-buttons">
          <button onClick={() => navigate("/personality-test/values")}>✨ Değerler Testi</button>
          <button onClick={() => navigate("/personality-test/motivation")}>🚀 Motivasyon Testi</button>
          <button onClick={() => navigate("/personality-test/holland")}>🔁 Holland Testi</button>
        </div>

        {/* Açıklama kutusu */}
        <p className="intro-text">
            Bu test, <strong>hangi çalışma ortamında daha verimli ve mutlu olabileceğini</strong> keşfetmen için hazırlandı.
            <br /><br />
            Cevapların; bireysel mi yoksa takım içinde mi daha iyi çalıştığını, kurallı bir yapı mı yoksa yaratıcı bir alan mı seni motive ettiğini anlamamıza yardımcı olacak.
            <br /><br />
            <em>Senin için en uygun iş ortamı, potansiyelini en iyi şekilde ortaya çıkarabileceğin yerdir.</em>
        </p>

        {!result && (
          <>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="side-tip">{tip}</p>

            <div className="question-card">
              <p><strong>{currentIndex + 1}.</strong> {currentQuestion.text}</p>
              <div className="button-group">
                <button onClick={() => handleAnswer("evet")}>Evet</button>
                <button onClick={() => handleAnswer("hayır")}>Hayır</button>
                <button onClick={() => handleAnswer("fark etmez")}>Fark Etmez</button>
              </div>

              <div className="navigation-buttons" style={{ marginTop: '20px' }}>
                <button disabled={currentIndex === 0} onClick={() => setCurrentIndex((prev) => prev - 1)}>
                  Önceki
                </button>
                <button disabled={currentIndex === environmentQuestions.length - 1} onClick={() => setCurrentIndex((prev) => prev + 1)}>
                  Sonraki
                </button>
              </div>

              <button className="submit-button" onClick={handleManualSubmit} style={{ marginTop: '40px' }}>
                Testi Bitir
              </button>
            </div>
          </>
        )}

        {result && (
        <div className="result-box">
            <h2>Test Sonucu</h2>
            <p><strong>En uygun çalışma ortamınız:</strong> {result.category}</p>
            <p>{result.description}</p>
        </div>
        )}

        <div className="result-buttons">
          <button className="retry-button" onClick={() => window.location.reload()}>
            Yeniden Testi Yap
          </button>
          <button className="more-tests-button" onClick={() => navigate("/personality-test")}>
            Diğer Testleri Gör
          </button>
          <button className="chat-button" onClick={() => navigate("/chatbot")}>
            Kariyer Asistanıyla Konuş
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentTestPage;