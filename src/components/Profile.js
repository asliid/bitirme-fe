import React, { useEffect, useState } from "react";
import { getUserProfile, submitProfile,getRecommendedCourses } from "../services/UserService";
import './Profile.css';
import axios from '../core/axiosInstance'; // Axios instance
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [education, setEducation] = useState('');
  const [interest, setInterest] = useState('');
  const [inspire, setInspire] = useState('');
  const [apiError, setApiError] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [educationSelected, setEducationSelected] = useState(false);
  const [interestInput, setInterestInput] = useState('');
  const [inspireInput, setInspireInput] = useState('');
  const [interestList, setInterestList] = useState([]);
  const [inspireList, setInspireList] = useState([]);
  const [groupedCourses, setGroupedCourses] = useState({});
  const [kategoriListesi, setKategoriListesi] = useState([]);
  const [seciliKategori, setSeciliKategori] = useState('');
  const [gosterilenKurslar, setGosterilenKurslar] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUserProfile(userData);
        setEducation(userData.education || '');
        setInterest(userData.interest || '');
        setInspire(userData.inspire || '');
        setInterestList((userData.interest || '').split(',').map(item => item.trim()).filter(Boolean));
        setInspireList((userData.inspire || '').split(',').map(item => item.trim()).filter(Boolean));
  
        const courseData = await getRecommendedCourses();
        setRecommendedCourses(courseData);
        setGroupedCourses(courseData); 
        const kategoriler = Object.keys(courseData);
        setKategoriListesi(kategoriler);
      } catch (error) {
        console.error("Veri alınırken hata:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleKategoriSec = (kategori) => {
    setSeciliKategori(kategori);
  
    const kurslar = recommendedCourses[kategori] || [];
    const rastgeleKurslar = kurslar.sort(() => 0.5 - Math.random()).slice(0, 3);
    setGosterilenKurslar(rastgeleKurslar);
  };
  const handleKursYenile = () => {
    handleKategoriSec(seciliKategori); // tekrar aynı kategoriyle 3 yeni kurs al
  };
  const personalityLabels = {
    "REALISTIC": "Gerçekçi",
    "INVESTIGATIVE": "Araştırmacı",
    "ARTISTIC": "Sanatsal",
    "SOCIAL": "Sosyal",
    "ENTERPRISING": "Girişimci",
    "CONVENTIONAL": "Geleneksel"
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
    setEducationSelected(true);
  };

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      const trimmed = interestInput.trim();
      let current = interestList || [];

      if (!current.includes(trimmed)) {
        const updatedList = [...current, trimmed];
        setInterestList(updatedList);
        setInterest(updatedList.join(', '));
      }

      setInterestInput('');
    }
  };

  const handleAddInspiration = () => {
    if (inspireInput.trim()) {
      const trimmed = inspireInput.trim();
      let current = inspireList || [];

      if (!current.includes(trimmed)) {
        const updatedList = [...current, trimmed];
        setInspireList(updatedList);
        setInspire(updatedList.join(', '));
      }

      setInspireInput('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      education,
      interest,
      inspire
    };

    try {
      await submitProfile(userDetails);
      alert('Profile updated successfully');
    } catch (error) {
      setApiError('Profile update failed');
      console.error(error);
    }
  };

  return (
<div className="register-container">
  <h1>Profil Bilgileriniz</h1>

  {/* Left Box */}
  <div className="left-box">
    <div className="input-container">
      <label className="input-label">Kullanıcı Adı:</label>
      <p>{userProfile.username}</p>
    </div>
    <div className="input-container">
      <label className="input-label">Ad:</label>
      <p>{userProfile.name}</p>
    </div>
    <div className="input-container">
      <label className="input-label">Soyad:</label>
      <p>{userProfile.surname}</p>
    </div>
  </div>

  {/* Middle Box */}
  <div className="middle-box">
    <div className="input-container">
      <label className="input-label">Kişilik Tipi:</label>
      <p>{personalityLabels[userProfile.userPersonality?.toUpperCase()] || userProfile.userPersonality}</p>
    </div>
    <div className="input-container">
      <label className="input-label">Eğitim:</label>
      {education ? (
        <p className="selected-education">{education}</p>
      ) : (
        <select className="select-field" onChange={handleEducationChange}>
          <option value="">Seçiniz</option>
          <option value="ILKOKUL">İlkokul</option>
          <option value="ORTAOKUL">Ortaokul</option>
          <option value="LISE">Lise</option>
          <option value="LİSANS">Lisans</option>
          <option value="YUKSEKLISANS">Yüksek Lisans</option>
          <option value="DOKTORA">Doktora</option>
        </select>
      )}
    </div>
  </div>

  {/* İlgi Alanları */}
  <div className="interest-wrapper">
    <h4>İlgi Alanları</h4>
    <div className="input-container">
      <input className="input-field" type="text" placeholder="Yeni ilgi alanı ekle" value={interestInput} onChange={(e) => setInterestInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()} />
      <button className="register-button" onClick={handleAddInterest}>Ekle</button>
    </div>
    {interestList.length > 0 && (
      <div className="interest-container">
        {interestList.map((item, index) => (
          <div key={index} className="interest-box">
            <p>{item}</p>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* İlham Aldığınız Kişiler */}
  <div className="inspire-wrapper">
    <h4>İlham Aldığınız Kişiler</h4>
    <div className="input-container">
      <input className="input-field" type="text" placeholder="Yeni kişi ekle" value={inspireInput} onChange={(e) => setInspireInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddInspiration()} />
      <button className="register-button" onClick={handleAddInspiration}>Ekle</button>
    </div>
    {inspireList.length > 0 && (
      <div className="inspire-container">
        {inspireList.map((item, index) => (
          <div key={index} className="inspire-box">
            <p>{item}</p>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Profil Güncelleme */}
  <div className="profile-update-container">
    <button className="profile-update-button" onClick={handleSubmit}>Profil Güncelle</button>
    {apiError && <p className="error">{apiError}</p>}
  </div>

  {/* Kurs Önerileri */}
  <div className="course-suggestions">
  <h2>Sana Özel Seçtiğimiz Kurslar</h2>
  <p className="aciklama-metin">
  Yaptığın testler sonucunda senin kişilik tipin ve diğer özelliklerine göre aşağıdaki kategorilerdeki kursları sana uygun bulduk. İlgini çekenleri keşfetmeye başlayabilirsin!
</p>
{/* Kategori Butonları */}
<div className="kategori-buton-grubu">
  {kategoriListesi.map((kategori, index) => (
    <button
      key={index}
      className={`kategori-buton ${seciliKategori === kategori ? 'aktif' : ''}`}
      onClick={() => handleKategoriSec(kategori)}
    >
      {kategori}
    </button>
  ))}
</div>

  {/* Rastgele 3 kurs kartı */}
  {gosterilenKurslar.length > 0 && (
    <>
      <div className="kurslar-grid">
        {gosterilenKurslar.map((kurs) => (
          <div key={kurs.id} className="kurs-karti">
            <h4>{kurs.title}</h4>
            <a href={kurs.url} target="_blank" rel="noreferrer">Kursa Git</a>
          </div>
        ))}
      </div>
      <button className="yenile-button" onClick={handleKursYenile}>Kursları Yenile</button>
    </>
  )}
</div>
</div>
  );
};

export default Profile;