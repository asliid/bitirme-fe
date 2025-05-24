import React from "react";
import { useNavigate } from "react-router-dom";

const TestSelectionPage = () => {
  const navigate = useNavigate();

  const tests = [
    {
      title: "Holland Kişilik Testi",
      description: "İlgi alanlarına göre kariyer önerileri sunar.",
      path: "/personality-test/holland",
    },
    {
      title: "Değerler Testi",
      description: "Hayatta en çok değer verdiğiniz şeyleri keşfedin.",
      path: "/personality-test/values",
    },
    {
      title: "Çalışma Ortamı Testi",
      description: "Sizin için en uygun çalışma ortamını belirleyin.",
      path: "/personality-test/environment",
    },
    {
      title: "Motivasyon Testi",
      description: "Sizi en çok neyin motive ettiğini öğrenin.",
      path: "/personality-test/motivation",
    },
  ];

  return (
    <div className="test-selection-container">
      <h1>Hangi testi çözmek istersin?</h1>
      <div className="test-card-list">
        {tests.map((test, index) => (
          <div
            key={index}
            className="test-card"
            onClick={() => navigate(test.path)}
          >
            <h2>{test.title}</h2>
            <p>{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSelectionPage;