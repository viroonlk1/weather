// src/pages/Settings.js
import React from 'react';

function Settings({ currentUnit, setUnit, currentTheme, setTheme }) {
  
  return (
    <div className="dashboard-card animate-fade-in">
      <h3 className="mb-4"><i className="bi bi-sliders me-2"></i>การตั้งค่า</h3>
      
      {/* 1. ตั้งค่าหน่วยอุณหภูมิ */}
      <div className="mb-4 border-bottom border-secondary pb-4">
        <label className="form-label text-muted mb-3">หน่วยอุณหภูมิ</label>
        <div className="d-flex gap-3">
          <button 
            className={`btn ${currentUnit === 'C' ? 'btn-light' : 'btn-outline-secondary text-white'}`}
            onClick={() => setUnit('C')}
            style={{minWidth: '100px'}}
          >
            Celsius (°C)
          </button>
          <button 
            className={`btn ${currentUnit === 'F' ? 'btn-light' : 'btn-outline-secondary text-white'}`}
            onClick={() => setUnit('F')}
            style={{minWidth: '100px'}}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      {/* 2. ตั้งค่าธีมสี */}
      <div className="mb-3">
        <label className="form-label text-muted mb-3">ธีมแอพพลิเคชัน</label>
        <div className="row g-3">
          
          {/* Theme Midnight */}
          <div className="col-md-4">
            <div 
              className={`p-3 rounded border pointer ${currentTheme === 'theme-midnight' ? 'border-primary ring' : 'border-secondary'}`}
              style={{cursor: 'pointer', background: '#0f172a'}}
              onClick={() => setTheme('theme-midnight')}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded-circle" style={{width: 20, height: 20, background: '#38bdf8'}}></div>
                <span className="text-white">Midnight Blue</span>
              </div>
              <small className="text-muted">ค่าเริ่มต้น สบายตา</small>
            </div>
          </div>

          {/* Theme Sunset */}
          <div className="col-md-4">
            <div 
              className={`p-3 rounded border pointer ${currentTheme === 'theme-sunset' ? 'border-warning ring' : 'border-secondary'}`}
              style={{cursor: 'pointer', background: '#2a1b1b'}}
              onClick={() => setTheme('theme-sunset')}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded-circle" style={{width: 20, height: 20, background: '#fb923c'}}></div>
                <span className="text-white">Sunset Orange</span>
              </div>
              <small className="text-muted">โทนอุ่น ร้อนแรง</small>
            </div>
          </div>

          {/* Theme Forest */}
          <div className="col-md-4">
            <div 
              className={`p-3 rounded border pointer ${currentTheme === 'theme-forest' ? 'border-success ring' : 'border-secondary'}`}
              style={{cursor: 'pointer', background: '#102820'}}
              onClick={() => setTheme('theme-forest')}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded-circle" style={{width: 20, height: 20, background: '#4ade80'}}></div>
                <span className="text-white">Deep Forest</span>
              </div>
              <small className="text-muted">โทนเขียว ธรรมชาติ</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;