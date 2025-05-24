import React, { useEffect, useState } from "react";
import axios from "axios";
import './CategoryCourses.css'; // Stil dosyası
import { getAllCategories, getCoursesByCategory } from "../services/UserService";


const CategoryCourses = () => {
  const [kategoriler, setKategoriler] = useState([]);
  const [seciliKategori, setSeciliKategori] = useState(null);
  const [kurslar, setKurslar] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then(setKategoriler)
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (seciliKategori) {
      getCoursesByCategory(seciliKategori)
        .then(setKurslar)
        .catch(err => console.error(err));
    }
  }, [seciliKategori]);


  return (
    <div className="category-courses-container">
      <h2>Kategorilere Göre Kurslar</h2>

      <div className="kategori-secici">
        <label htmlFor="kategori">Kategori Seçin:</label>
        <select
          id="kategori"
          value={seciliKategori}
          onChange={(e) => setSeciliKategori(e.target.value)}
        >
          <option value="">-- Kategori Seçin --</option>
          {kategoriler.map((kategori, index) => (
            <option key={index} value={kategori}>{kategori}</option>
          ))}
        </select>
      </div>

      {kurslar.length > 0 && (
        <div className="kurslar-listesi">
          {kurslar.map((kurs, index) => (
            <div key={index} className="kurs-karti">
              <h4>{kurs.title}</h4>
              <p>{kurs.kategori}</p>
              <a href={kurs.url} target="_blank" rel="noopener noreferrer">
                Kursa Git
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCourses;