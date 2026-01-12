// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';     // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min';   // Bootstrap JS (จำเป็นสำหรับ Drawer/Offcanvas)
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import './App.css';

// Import Components
import MyNavbar from './components/MyNavbar';
import Sidebar from './components/Sidebar';
import MobileDrawer from './components/MobileDrawer'; // ลิ้นชักมือถือ

// Import Pages
import Now from './pages/Now';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  // --- STATE เก็บข้อมูล ---
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // --- STATE การตั้งค่า ---
  const [unit, setUnit] = useState('C'); // 'C' หรือ 'F'
  const [theme, setTheme] = useState('theme-midnight'); // ธีมเริ่มต้น

  // --- FUNCTION ดึงข้อมูล API ---
  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      // 1. หาพิกัด (Latitude/Longitude) จากชื่อเมือง
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results) {
        throw new Error('❌ ไม่พบเมืองนี้ กรุณาลองชื่อภาษาอังกฤษ (เช่น Chanthaburi)');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. ดึงข้อมูลพยากรณ์อากาศ (Current + Hourly + Daily)
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto`;
      const res = await fetch(weatherUrl);
      const data = await res.json();

      // 3. บันทึกข้อมูลลง State
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
      {/* Wrapper หลัก: ใส่ Class Theme เพื่อคุมสีทั้งแอพ */}
      <div className={`d-flex flex-column vh-100 ${theme}`}>
        
        {/* 1. Navbar บนสุด (มีปุ่ม Hamburger สำหรับมือถือ) */}
        <MyNavbar />
        
        {/* 2. Drawer (ซ่อนอยู่ จะโผล่มาเมื่อกดปุ่มใน Navbar บนมือถือ) */}
        <MobileDrawer />

        <div className="d-flex flex-grow-1 overflow-hidden">
          
          {/* 3. Sidebar (โชว์ตลอดเวลาบน Desktop) */}
          <Sidebar />
          
          {/* 4. พื้นที่เนื้อหาหลัก (Scroll ได้) */}
          <main 
            className="flex-grow-1 p-4 overflow-auto" 
            style={{backgroundColor: 'var(--bg-dark)', transition: 'background-color 0.3s'}}
          >
            <div className="container-fluid" style={{ maxWidth: '1000px' }}>
              
              {/* --- ช่องค้นหา (Search Bar) --- */}
              <div className="input-group mb-4 dashboard-card p-2" style={{borderRadius: '50px', background: 'var(--bg-card)'}}>
                <span className="input-group-text bg-transparent border-0 text-muted ps-3">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 text-white shadow-none" 
                  placeholder="ค้นหาเมือง (เช่น Bangkok, Chanthaburi)..." 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                />
                <button 
                  className="btn rounded-pill px-4 text-white fw-bold" 
                  onClick={fetchWeather} 
                  disabled={loading}
                  style={{background: 'var(--accent)', border: 'none', transition: '0.3s'}}
                >
                  {loading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Loading</span>
                  ) : (
                    'ค้นหา'
                  )}
                </button>
              </div>

              {/* --- แสดง Error --- */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* --- Routing Area (เปลี่ยนหน้าตรงนี้) --- */}
              <Routes>
                {/* หน้า Now: ส่งข้อมูลอากาศ + หน่วยวัด ไปแปลงค่า */}
                <Route path="/" element={<Now data={weatherData} unit={unit} />} />
                
                {/* หน้า Hourly */}
                <Route path="/hourly" element={<Hourly data={weatherData} unit={unit} />} />
                
                {/* หน้า Daily */}
                <Route path="/daily" element={<Daily data={weatherData} unit={unit} />} />
                
                {/* หน้า Settings: ส่งฟังก์ชันไปให้ปรับค่าได้ */}
                <Route path="/settings" element={
                  <Settings 
                    currentUnit={unit} 
                    setUnit={setUnit} 
                    currentTheme={theme} 
                    setTheme={setTheme} 
                  />
                } />
                
                {/* หน้า About */}
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