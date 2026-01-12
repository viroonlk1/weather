// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import MyNavbar from './components/MyNavbar';
import Sidebar from './components/Sidebar';

// Import หน้าใหม่ที่เราจะสร้าง
import Now from './pages/Now';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ฟังก์ชันดึงข้อมูล (ย้ายมาจาก Dashboard เดิม)
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    
    try {
      // 1. หาพิกัด
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error('❌ ไม่พบเมืองนี้');

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. ดึงข้อมูลครบเซ็ต (Current + Hourly + Daily)
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`;
      const res = await fetch(weatherUrl);
      const data = await res.json();

      // รวมข้อมูลไว้ใน Object เดียว
      setWeatherData({
        name,
        country,
        current: data.current_weather,
        hourly: data.hourly,
        daily: data.daily
      });

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <MyNavbar />
        
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar />
          
          <main className="flex-grow-1 p-4 overflow-auto">
            <div className="container-fluid" style={{ maxWidth: '1000px' }}>
              
              {/* Search Bar ส่วนกลาง (อยู่ทุกหน้า) */}
              <div className="input-group mb-4 dashboard-card p-2" style={{borderRadius: '50px'}}>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 text-white shadow-none" 
                  placeholder="พิมพ์ชื่อเมือง (Ex. Chiang Mai)..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                />
                <button className="btn btn-primary rounded-pill px-4" onClick={fetchWeather}>
                  {loading ? '...' : 'ค้นหา'}
                </button>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* Routing Area */}
              {/* ส่ง weatherData ไปให้ทุกหน้า */}
              <Routes>
                <Route path="/" element={<Now data={weatherData} />} />
                <Route path="/hourly" element={<Hourly data={weatherData} />} />
                <Route path="/daily" element={<Daily data={weatherData} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
              </Routes>

            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;