import axiosInstance from '../core/axiosInstance';
import {jwtDecode}from 'jwt-decode';

// Soruları API'den al
export const fetchQuestions = async () => {
  try {
    const response = await axiosInstance.get('/personality/questions');
    return response.data; // Soruları döndür
  } catch (error) {
    console.error('Sorular alınırken hata oluştu:', error);
    throw error;
  }
};


export const submitTest = async (userAnswers) => {
  const token = localStorage.getItem('token');

if (token) {
  try {
    const data = jwtDecode(token); // Token'ı decode ediyoruz
    console.log(data); // Decode edilmiş data'yı kontrol edin
    const username = data.sub; // Token'dan kullanıcı adı alıyoruz
    console.log('Username:', username);
    
    // Testi gönder
    const response = await axiosInstance.post(`/personality/submit/${username}`, userAnswers);
    return response.data; // Test sonucunu döndür
  } catch (error) {
    console.error('Token decode edilirken hata oluştu:', error);
    throw error;
  }
} else {
  console.error('Token bulunamadı');
  throw new Error('Token bulunamadı');
}
};

export const testResult = async () => {
  const token = localStorage.getItem('token');

if (token) {
  try {
    const data = jwtDecode(token); // Token'ı decode ediyoruz
    console.log(data); // Decode edilmiş data'yı kontrol edin
    const username = data.sub; // Token'dan kullanıcı adı alıyoruz
    console.log('Username:', username);
    
    // Testi gönder
    const response = await axiosInstance.get(`/personality/${username}`);
    return response.data;
  } catch (error) {
    console.error('Token decode edilirken hata oluştu:', error);
    throw error;
  }
} else {
  console.error('Token bulunamadı');
  throw new Error('Token bulunamadı');
}
};

export const submitValueResult = async (dominantValue) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const data = jwtDecode(token);
      const username = data.sub;

      const response = await axiosInstance.post(
        `/personality/submit-dominant-value/${username}`,
        dominantValue,
        {
          headers: { 'Content-Type': 'text/plain' }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Sonuç gönderilirken hata:', error);
      throw error;
    }
  } else {
    console.error('Token bulunamadı');
    throw new Error('Token bulunamadı');
  }
};

export const submitEnvironmentResult = async (dominantEnvironment) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const data = jwtDecode(token);
      const username = data.sub;

      const response = await axiosInstance.post(
        `/personality/submit-dominant-environment/${username}`,
        dominantEnvironment,
        {
          headers: { 'Content-Type': 'text/plain' }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Çalışma ortamı sonucu gönderilirken hata:', error);
      throw error;
    }
  } else {
    console.error('Token bulunamadı');
    throw new Error('Token bulunamadı');
  }
};

export const submitMotivationResult = async (dominantMotivation) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const data = jwtDecode(token);
      const username = data.sub;

      const response = await axiosInstance.post(
        `/personality/submit-dominant-motivation/${username}`,
        dominantMotivation,
        {
          headers: { 'Content-Type': 'text/plain' }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Motivasyon sonucu gönderilirken hata:', error);
      throw error;
    }
  } else {
    console.error('Token bulunamadı');
    throw new Error('Token bulunamadı');
  }
};