import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/UserService"; // Servisi import ediyoruz
import './Profile.css'; // CSS dosyasını import ediyoruz

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Profil verisini almak için getUserProfile fonksiyonunu çağırıyoruz
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data); // Gelen veriyi state'e kaydediyoruz
      } catch (error) {
        setError("Profil bilgileri alınırken bir hata oluştu.");
        console.error(error);
      } finally {
        setLoading(false); // Yükleniyor durumunu false yapıyoruz
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profil Bilgileriniz</h1>
      {userProfile ? (
        <div className="profile-info">
          <p><strong>Kullanıcı Adı:</strong> {userProfile.username}</p>
          <p><strong>Ad:</strong> {userProfile.name}</p>
          <p><strong>Soyadı:</strong> {userProfile.surname}</p>
          <p><strong>Kişilik Tipi:</strong> {userProfile.userPersonality}</p>
        </div>
      ) : (
        <p>Profil bilgisi bulunamadı.</p>
      )}
    </div>
  );
};

export default Profile;