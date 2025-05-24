// src/components/MotivationTestPage.js
import React, { useState } from 'react';
import './PersonalityTestPage.css';
import { useNavigate } from 'react-router-dom';
import { submitMotivationResult } from '../services/TestService';

const motivationQuestions = [
  { id: 1, text: "Zor hedeflere ulaşmak beni motive eder.", category: "Başarı Odaklılık" },
  { id: 2, text: "Bir işin anlamlı olması benim için önemlidir.", category: "Anlam ve Amaç" },
  { id: 3, text: "Kendi kararlarımı vermek beni güçlü hissettirir.", category: "Bağımsızlık ve Özgürlük" },
  { id: 4, text: "Topluma fayda sağlamak bana ilham verir.", category: "Toplumsal Katkı" },
  { id: 5, text: "Yeni bilgiler öğrenmek beni heyecanlandırır.", category: "Gelişim ve Öğrenme" },
  { id: 6, text: "Başarılarımı takdir eden bir ortamda çalışmak isterim.", category: "Taninma ve Takdir" },
  { id: 7, text: "Kendi işimi yönetmek beni motive eder.", category: "Bağımsızlık ve Özgürlük" },
  { id: 8, text: "Her gün yeni şeylerle karşılaşmak beni canlı tutar.", category: "Heyecan ve Yenilik" },
  { id: 9, text: "Bir ekip içinde çalışmak bana enerji verir.", category: "Ekip Çalışması" },
  { id: 10, text: "Düzenli bir çalışma ortamında daha verimli olurum.", category: "Güven ve Stabilite" }
];

const motivationDescriptions = {
    "Başarı Odaklılık": "Zorlu hedefler seni heyecanlandırıyor ve başarıya ulaşmak en büyük motivasyon kaynağın. Hedeflerini net belirleyebileceğin, performansın ölçülebileceği ve başarılarının ödüllendirildiği iş ortamları seni mutlu edebilir.",
    "Anlam ve Amaç": "Yaptığın işin bir anlam taşıması senin için çok önemli. Başkalarına katkı sağladığını hissettiğin ya da büyük bir amaca hizmet eden görevlerde daha çok tatmin oluyorsun.",
    "Bağımsızlık ve Özgürlük": "Kendi kararlarını alabilmek ve özgür bir şekilde çalışmak seni motive ediyor. Esnek çalışma saatleri, bireysel sorumluluklar ve girişimcilik senin için ideal olabilir.",
    "Toplumsal Katkı": "Toplumun gelişimine katkıda bulunmak seni derinden motive ediyor. Sosyal sorumluluk projeleri, STK’lar veya kamu hizmeti gibi alanlarda başarılı olabilirsin.",
    "Gelişim ve Öğrenme": "Yeni şeyler öğrenmekten ve kişisel gelişimden büyük keyif alıyorsun. Sürekli yenilenen ve öğrenmeye açık alanlarda kariyer yapmak senin için oldukça tatmin edici olabilir.",
    "Taninma ve Takdir": "Yaptığın işin fark edilmesi ve takdir edilmesi senin için çok değerli. Emeğinin karşılığını görebileceğin ve başarılarının öne çıktığı ortamlarda daha mutlu çalışırsın.",
    "Heyecan ve Yenilik": "Rutin seni sıkıyor; yenilik, değişim ve hareketlilik seni canlı tutuyor. Girişimcilik, medya, teknoloji veya dinamik sektörlerde çalışmak sana göre olabilir.",
    "Ekip Çalışması": "Birlikte üretmek, paylaşmak ve desteklemek senin için çok önemli. Takım ruhunun ön planda olduğu projelerde daha üretken ve mutlu oluyorsun.",
    "Güven ve Stabilite": "Belirsizlik seni yorar; düzenli, yapılandırılmış ve güvenli ortamlar seni rahatlatır. Planlı ve istikrarlı iş yerleri senin için idealdir."
  };
const motivationalTips = [
  "Gerçek motivasyon kaynağın seni ileri taşır.",
  "Hedeflerine ulaşmak için seni neyin tetiklediğini bilmek önemlidir.",
  "Kariyerinde tatmin için iç motivasyonunu tanı.",
  "Cevapların seni motive eden unsurları ortaya çıkarıyor.",
  "Motivasyonun, doğru iş ortamı ve meslek seçimi için ışık tutar."
];

const MotivationTestPage = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = motivationQuestions[currentIndex];

  const handleAnswer = (answer) => {
    const updated = { ...answers, [currentQuestion.id]: answer };
    setAnswers(updated);

    if (currentIndex < motivationQuestions.length - 1) {
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
    motivationQuestions.forEach((q) => {
      const ans = answerMap[q.id];
      const score = ans === 'evet' ? 2 : ans === 'fark etmez' ? 1 : 0;
      scores[q.category] = (scores[q.category] || 0) + score;
    });

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const topCategory = top?.[0] || 'Belirlenemedi';
    setResult(topCategory);

    try {
      if (topCategory !== 'Belirlenemedi') {
        await submitMotivationResult(topCategory);
      }
    } catch (err) {
      console.error("Sonuç gönderilirken hata:", err);
    }
  };

  const progress = Math.round(((currentIndex + 1) / motivationQuestions.length) * 100);
  const tip = motivationalTips[currentIndex % motivationalTips.length];

  return (
    <div className="personality-test-container">
      <div className="test-wrapper">
        <h1>Motivasyon Testi</h1>
        <div className="other-tests-buttons">
          <button onClick={() => navigate("/personality-test/values")}>✨ Değerler Testi</button>
          <button onClick={() => navigate("/personality-test/environment")}>🪨 Çalışma Ortamı Testi</button>
          <button onClick={() => navigate("/personality-test/holland")}>🔁 Holland Testi</button>
        </div>
          <p className="intro-text">
        Bu test, <strong>senin içsel motivasyon kaynaklarını</strong> keşfetmek için tasarlanmıştır.  
        Hangi tür işler seni heyecanlandırıyor? Ne tür hedefler seni harekete geçiriyor?  
        <br /><br />
        Cevapların, seni gerçekten neyin motive ettiğini ortaya çıkararak daha bilinçli kariyer kararları vermene yardımcı olacak.
        <br /><br />
        <em>Unutma, kalbinin attığı yerde başarı seni bekler.</em>
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
                <button disabled={currentIndex === 0} onClick={() => setCurrentIndex((prev) => prev - 1)}>Önceki</button>
                <button disabled={currentIndex === motivationQuestions.length - 1} onClick={() => setCurrentIndex((prev) => prev + 1)}>Sonraki</button>
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
            <p><strong>En baskın motivasyon kaynağınız:</strong> {result}</p><p>{motivationDescriptions[result]}</p>
          </div>
        )}

        <div className="result-buttons">
          <button className="retry-button" onClick={() => window.location.reload()}>Yeniden Testi Yap</button>
          <button className="more-tests-button" onClick={() => navigate("/personality-test")}>Diğer Testleri Gör</button>
          <button className="chat-button" onClick={() => navigate("/chatbot")}>Kariyer Asistanıyla Konuş</button>
        </div>
      </div>
    </div>
  );
};

export default MotivationTestPage;
