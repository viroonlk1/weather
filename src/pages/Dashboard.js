// src/pages/Dashboard.js
import React, { useState } from 'react';

function Dashboard() {
  // --- ก๊อป STATE และ LOGIC เดิมมาวางตรงนี้ ---
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions
  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'; 
    if (code >= 1 && code <= 3) return '⛅'; 
    if (code >= 45 && code <= 48) return '🌫️'; 
    if (code >= 51 && code <= 67) return '🌧️'; 
    if (code >= 71 && code <= 77) return '🌨️'; 
    if (code >= 80 && code <= 82) return '⛈️'; 
    if (code >= 95) return '⚡'; 
    return '🌡️';
  };
  
  const formatDate = (dateStr) => {
     const date = new Date(dateStr);
     return date.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric' });
  };

  const fetchWeather = async () => {
    if (!city) return;
    setIsLoading(true);
    setError('');
    
    try {
      // 1. หาพิกัด
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results) throw new Error('❌ ไม่พบเมืองนี้');

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. ดึงข้อมูลอากาศ
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherDataResult = await weatherResponse.json();

      setWeatherData({
        name: name,
        country: country,
        temp: Math.round(weatherDataResult.current_weather.temperature),
        wind: weatherDataResult.current_weather.windspeed,
        weatherCode: weatherDataResult.current_weather.weathercode,
      });

      const daily = weatherDataResult.daily;
      const forecastList = daily.time.map((time, index) => ({
        date: time,
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        minTemp: Math.round(daily.temperature_2m_min[index]),
        code: daily.weathercode[index]
      }));
      setDailyForecast(forecastList);

    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1200px' }}>
      {/* Header & Search */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h2 className="fw-bold mb-0 text-white">Dashboard</h2>
          <p className="text-muted">ยินดีต้อนรับครับ, วันนี้อากาศเป็นอย่างไรบ้าง?</p>
        </div>
        <div className="col-md-5">
          <div className="input-group dashboard-card p-2 d-flex align-items-center" style={{borderRadius: '50px', background: '#1e293b'}}>
            <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
            <input 
              type="text" 
              className="form-control border-0 shadow-none" 
              style={{ background: 'transparent', color: 'white' }}
              placeholder="ค้นหาเมือง (เช่น Chonburi)..." 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <button className="btn btn-primary rounded-pill px-4" onClick={fetchWeather} disabled={isLoading}>
              {isLoading ? '...' : 'ค้นหา'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {weatherData ? (
        <div className="animate-fade-in">
            {/* Weather Highlight */}
            <div className="row mb-4">
              <div className="col-md-8 mb-3 mb-md-0">
                <div className="dashboard-card d-flex align-items-center justify-content-between text-white" 
                      style={{background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                  <div>
                    <h1 className="display-3 fw-bold mb-0">{weatherData.temp}°</h1>
                    <h4 className="fw-normal mt-2">{weatherData.name}, {weatherData.country}</h4>
                    <p className="opacity-75">สภาพอากาศวันนี้</p>
                  </div>
                  <div style={{fontSize: '6rem', lineHeight: 1}}>{getWeatherIcon(weatherData.weatherCode)}</div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="row h-100 g-3">
                  <div className="col-6">
                    <div className="dashboard-card text-center d-flex flex-column justify-content-center align-items-center">
                      <div className="icon-box"><i className="bi bi-wind"></i></div>
                      <h5 className="fw-bold mb-0 text-white">{weatherData.wind}</h5>
                      <small className="text-muted">ลม (km/h)</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="dashboard-card text-center d-flex flex-column justify-content-center align-items-center">
                      <div className="icon-box"><i className="bi bi-droplet-fill"></i></div>
                      <h5 className="fw-bold mb-0 text-white">-</h5>
                      <small className="text-muted">ความชื้น</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <h5 className="fw-bold mb-3 text-white">พยากรณ์ 7 วันล่วงหน้า</h5>
            <div className="row g-3">
              {dailyForecast.map((day, index) => (
                <div className="col-6 col-md-4 col-lg-2" key={index}>
                  <div className="dashboard-card text-center py-3">
                    <p className="mb-1 text-muted small">{index === 0 ? 'วันนี้' : formatDate(day.date)}</p>
                    <div className="fs-2 my-2">{getWeatherIcon(day.code)}</div>
                    <div className="d-flex justify-content-center gap-2 fw-bold">
                      <span className="text-white">{day.maxTemp}°</span>
                      <span className="text-muted">{day.minTemp}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      ) : (
        <div className="text-center py-5 mt-5">
          <i className="bi bi-cloud-slash display-1 mb-3 d-block text-muted" style={{ opacity: 0.5 }}></i>
          <h4 className="text-white">ยังไม่ได้เลือกเมือง</h4>
          <p className="text-muted">พิมพ์ชื่อเมืองด้านบนเพื่อดูพยากรณ์อากาศ</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;