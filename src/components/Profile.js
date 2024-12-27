import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Hata mesajını metin olarak al
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError(error.message);
    }
  };
  
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>Error: {error}</p>}
      {profileData ? (
        <div>
          {/* Render profile data here */}
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
