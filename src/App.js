// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import MyNavbar from './components/MyNavbar';
import Sidebar from './components/Sidebar';
import Now from './pages/Now';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  // State ทั้งหมด
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State ใหม่สำหรับการตั้งค่า
  const [unit, setUnit] = useState('C'); // 'C' หรือ 'F'
  const [theme, setTheme] = useState('theme-midnight'); // ธีมเริ่มต้น

  // ฟังก์ชันดึงข้อมูล (แบบเต็ม)
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    
    try {
      // 1. หาพิกัด
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results) {
        throw new Error('❌ ไม่พบเมืองนี้ กรุณาลองใหม่');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. ดึงข้อมูลพยากรณ์
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`;
      const res = await fetch(weatherUrl);
      const data = await res.json();

      // 3. บันทึกข้อมูล
      setWeatherData({
        name,
        country,
        current: data.current_weather,
        hourly: data.hourly,
        daily: data.daily
      });

    } catch (err) {
      console.error(err);
      setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      {/* ใช้ Class Theme ครอบทั้งแอพ */}
      <div className={`d-flex flex-column vh-100 ${theme}`}>
        <MyNavbar />
        
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar />
          
          <main className="flex-grow-1 p-4 overflow-auto" style={{backgroundColor: 'var(--bg-dark)', transition: '0.3s'}}>
            <div className="container-fluid" style={{ maxWidth: '1000px' }}>
              
              {/* ช่องค้นหา */}
              <div className="input-group mb-4 dashboard-card p-2" style={{borderRadius: '50px', background: 'var(--bg-card)'}}>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 text-white shadow-none" 
                  placeholder="ค้นหาเมือง (เช่น Bangkok)..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                />
                <button 
                  className="btn rounded-pill px-4 text-white" 
                  onClick={fetchWeather} 
                  disabled={loading}
                  style={{background: 'var(--accent)', border: 'none'}}
                >
                  {loading ? '...' : 'ค้นหา'}
                </button>
              </div>

              {/* แสดง Error ถ้ามี */}
              {error && <div className="alert alert-danger mb-4">{error}</div>}

              {/* Routing Area */}
              <Routes>
                {/* ส่ง unit ไปให้หน้าแสดงผลแปลงค่า */}
                <Route path="/" element={<Now data={weatherData} unit={unit} />} />
                <Route path="/hourly" element={<Hourly data={weatherData} unit={unit} />} />
                <Route path="/daily" element={<Daily data={weatherData} unit={unit} />} />
                
                {/* ส่ง props ไปให้หน้า Settings ปรับค่า */}
                <Route path="/settings" element={
                  <Settings 
                    currentUnit={unit} 
                    setUnit={setUnit} 
                    currentTheme={theme} 
                    setTheme={setTheme} 
                  />
                } />
                
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