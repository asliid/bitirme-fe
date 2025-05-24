import React, { useState } from 'react';
import './PersonalityTestPage.css';
import { submitValueResult } from '../services/TestService';
import { useNavigate } from 'react-router-dom';
const valuesQuestions = [
  { id: 1, text: "Topluma faydalı işler yapmak benim için önemlidir.", category: "Toplum Odaklılık" },
  { id: 2, text: "İşimde başarı kazanmak ve yükselmek benim için önceliklidir.", category: "Başarı" },
  { id: 3, text: "Bağımsız çalışabilmek ve kendi kararlarımı alabilmek benim için değerlidir.", category: "Bağımsızlık" },
  { id: 4, text: "Ailemle ve sevdiklerimle vakit geçirebileceğim bir iş benim için önemlidir.", category: "Aile Dengesi" },
  { id: 5, text: "Yeni şeyler öğrenmek ve kendimi geliştirmek en büyük motivasyon kaynağımdır.", category: "Gelişim" },
  { id: 6, text: "Maddi kazanç, iş tercihimi etkileyen en önemli faktördür.", category: "Maddi Odak" },
  { id: 7, text: "Toplumun yararına olacak bir projede gönüllü çalışmak beni tatmin eder.", category: "Sosyal Sorumluluk" },
  { id: 8, text: "Karar verirken geleneklerime ve kültürel değerlere önem veririm.", category: "Gelenek" },
  { id: 9, text: "Kendimi sürekli geliştirmek, yeni şeyler öğrenmek benim için çok önemlidir.", category: "Kişisel Gelişim" },
  { id: 10, text: "Hayatımda düzen ve kontrol olmazsa huzursuz hissederim.", category: "Düzen" }
];
const motivationalTips = [
  "İçsel değerlerinizi keşfetmek kariyer seçiminde çok önemlidir!",
  "Bu test sana neyin seni gerçekten motive ettiğini gösterecek!",
  "Her cevap seni kendine biraz daha yaklaştırıyor. Devam et!",
  "Gerçek değerlerini bilmek, doğru yolda ilerlemeni sağlar.",
  "Kariyerinde tatmin için önce neye değer verdiğini anlamalısın."
];
const valueDescriptions = {
    "Toplum Odaklılık": "Topluma katkı sağlamak senin için sadece bir seçenek değil, bir amaç. Yardım etmek, başkalarının hayatını iyileştirmek ve sosyal fayda sağlamak seni motive eder. Sosyal hizmetler, sivil toplum kuruluşları, kamu yararına çalışan kurumlar ve eğitim gibi alanlar senin bu değerini besleyebilir.",
  
    "Başarı": "Senin için ilerlemek, başarmak ve hedeflerine ulaşmak en büyük motivasyon kaynağı. Rekabetten çekinmez, yüksek standartlar belirlersin. Kariyerinde zirveye çıkmak için gereken azme sahipsin. Liderlik, yönetim, girişimcilik gibi alanlar senin potansiyelini ortaya koyabilir.",
  
    "Bağımsızlık": "Sen özgürlüğüne düşkünsün. Kendi kararlarını almak, kendi hızınla çalışmak senin için çok kıymetli. Sınırların belirlendiğinde değil, kendi çerçeveni çizdiğinde daha üretken oluyorsun. Freelance işler, bireysel projeler veya bağımsız karar alma fırsatı sunan pozisyonlar senin için ideal olabilir.",
  
    "Aile Dengesi": "Senin için iş hayatı, özel hayatla uyumlu olduğunda anlam kazanıyor. Sevdiklerine vakit ayırmak, duygusal bağlılıklarını ihmal etmeden üretmek istiyorsun. Esnek çalışma saatleri, uzaktan çalışma imkanları veya aile dostu kurum kültürü olan yerler bu dengeyi sağlamakta sana yardımcı olabilir.",
  
    "Gelişim": "Sen sürekli öğrenmek ve kendini yenilemek isteyen birisin. Bilgiye olan açlığın ve öğrenme tutkusu seni ileri taşıyor. Eğitim programlarına açık, mentorluk destekli, gelişim fırsatları sunan iş ortamlarında kendini daha mutlu hissedersin. Akademi, teknoloji, Ar-Ge gibi alanlar senin ilgini çekebilir.",
  
    "Maddi Odak": "Senin için finansal güvence ve kazanç, meslek seçiminde önemli bir rol oynuyor. Yeteneklerini maddi anlamda karşılık bulabileceğin alanlarda değerlendirmek istiyorsun. Performansa dayalı kazanç sistemleri, girişimcilik, satış veya yüksek maaş potansiyeli olan pozisyonlar senin için çekici olabilir.",
  
    "Sosyal Sorumluluk": "Toplumun iyiliğine katkıda bulunmak senin için bir yaşam tarzı. Yardımlaşma, çevresel duyarlılık ve etik değerler senin önceliklerin arasında. Sosyal sorumluluk projelerinde aktif olmak, sürdürülebilirlik, çevre ve insan hakları gibi konularda çalışmak seni tatmin edebilir.",
  
    "Gelenek": "Senin için kültürel kökler, geleneksel değerler ve manevi bağlar çok kıymetli. Kararlarını alırken geçmişten gelen normlara ve toplum değerlerine önem veriyorsun. Kültürel mirasa sahip çıkan, geleneksel yaklaşımları koruyan kurumlar veya aile temelli yapılar senin için anlamlı olabilir.",
  
    "Kişisel Gelişim": "Kendini tanıma, sınırlarını zorlama ve zihinsel olarak büyüme senin için büyük bir değer. Kendi potansiyelini keşfetmek ve sürekli daha iyisini aramak seni motive eder. Koçluk, kişisel gelişim, psikoloji ya da eğitim gibi insanın kendini dönüştürdüğü alanlar tam sana göre olabilir.",
  
    "Düzen": "Senin için planlı olmak, sistemli bir ortamda çalışmak çok önemli. Belirsizlikten hoşlanmazsın ve net bir yapı seni güvende hissettirir. Prosedürlerin net olduğu, süreçlerin açık şekilde tanımlandığı iş ortamlarında potansiyelini rahatça gösterebilirsin. Bürokratik yapılar, veri yönetimi, muhasebe gibi düzenli çalışma gerektiren alanlar seni destekleyebilir."
  };

  const ValuesTestPage = () => {
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [result, setResult] = useState(null);
  
    const currentQuestion = valuesQuestions[currentIndex];
  
    const handleAnswer = async (answer) => {
      const updated = { ...answers, [currentQuestion.id]: answer };
      setAnswers(updated);
  
      if (currentIndex < valuesQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        calculateResult(updated);
      }
    };
  
    const handleManualSubmit = () => {
      calculateResult(answers);
    };
    const navigate = useNavigate();

  
    const calculateResult = async (answerMap) => {
      const scores = {};
      valuesQuestions.forEach((q) => {
        const ans = answerMap[q.id];
        const score = ans === 'evet' ? 2 : ans === 'fark etmez' ? 1 : 0;
        scores[q.category] = (scores[q.category] || 0) + score;
      });
  
      const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      const topCategory = top?.[0] || 'Belirlenemedi';
      setResult({ topCategory, description: valueDescriptions[topCategory] || "Açıklama bulunamadı." });
  
      try {
        if (topCategory !== 'Belirlenemedi') {
          await submitValueResult(topCategory);
        }
      } catch (err) {
        console.error("Sonuç gönderilirken hata:", err);
      }
    };
  
    const progress = Math.round(((currentIndex + 1) / valuesQuestions.length) * 100);
    const tip = motivationalTips[currentIndex % motivationalTips.length];
  
    return (
      <div className="personality-test-container">
        <div className="test-wrapper"> {/* EKLENDİ */}
        <h1>Değerler Testi</h1>
        <div className="other-tests-buttons">
        <button onClick={() => navigate("/personality-test/environment")}> Çalışma Ortamı Testi</button>
        <button onClick={() => navigate("/personality-test/motivation")}>🚀 Motivasyon Testi</button>
        <button onClick={() => navigate("/personality-test/holland")}>🔁 Holland Testi</button>
        </div>
        <p className="intro-text">
            Bu test, <strong>kişisel değerlerini</strong> keşfetmene yardımcı olur. İş hayatında seni neyin gerçekten motive ettiğini anlamak, mutlu ve tatmin edici bir kariyerin temelidir.  
            Topluma katkı sağlamak mı, finansal güvence mi, yoksa yaratıcılığını ifade etmek mi?  
            Cevapların, seni sen yapan değerlere ışık tutacak.  
            <br /><br />
            <em>Unutma, doğru mesleği bulmak; sadece yetenek değil, değerlerle de başlar.</em>
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
              <button className="submit-button" onClick={handleManualSubmit} style={{ marginTop: '40px' }}>
                Testi Bitir
              </button>
            </div>
          </>
        )}
  
        {result && (
          <div className="result-box">
            <h2>Test Sonucu</h2>
            <p><strong>En baskın değeriniz:</strong> {result.topCategory}</p>
            <p>{result.description}</p>
          </div>
        )}
            <div className="result-buttons">
            <button className="retry-button" onClick={() => window.location.reload()}>
                Yeniden Testi Yap
            </button>
            <button
                className="more-tests-button"
                onClick={() => window.location.href = "/personality-test"}
            >
                Diğer Testleri Gör
            </button>
            <button
                className="chat-button"
                onClick={() => window.location.href = "/chatbot"}
            >
                Kariyer Asistanıyla Konuş
            </button>
            </div>
            </div> {/* test-wrapper sonu */}

      </div>
    );
  };
  
  export default ValuesTestPage;