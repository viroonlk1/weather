// src/pages/Now.js
import React from 'react';

// 1. รับ unit เข้ามา
function Now({ data, unit }) {
  if (!data) return <div className="text-center text-muted mt-5">กรุณาค้นหาเมืองก่อนครับ</div>;

  const { current, name, country } = data;

  // 2. ฟังก์ชันแปลงอุณหภูมิ
  const convertTemp = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="dashboard-card text-center py-5 animate-fade-in" 
         style={{background: 'var(--gradient)'}}> {/* ใช้สี Gradient ตามธีม */}
      
      {/* 3. เรียกใช้ฟังก์ชันแปลงค่า และแสดงหน่วย */}
      <h1 className="display-1 fw-bold text-white mb-0">
        {convertTemp(current.temperature)}°{unit}
      </h1>
      
      <h2 className="text-white opacity-75">{name}, {country}</h2>
      
      {/* ... ส่วนอื่นๆ เหมือนเดิม ... */}
      <div className="d-flex justify-content-center gap-5 mt-4 text-white">
          {/* ... */}
      </div>
    </div>
  );
}

export default Now;