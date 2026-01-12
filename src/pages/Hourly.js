import React from 'react';

function Hourly({ data }) {
  if (!data) return <div className="text-center text-muted mt-5">กรุณาค้นหาเมืองก่อนครับ</div>;

  const { hourly } = data;
  // ตัดมาแค่ 24 ชั่วโมงแรก
  const next24Hours = hourly.time.slice(0, 24);

  return (
    <div>
      <h3 className="text-white mb-4">พยากรณ์รายชั่วโมง (24 ชม.)</h3>
      <div className="d-flex overflow-auto gap-3 pb-3" style={{ scrollbarWidth: 'thin' }}>
        {next24Hours.map((time, i) => (
          <div key={i} className="dashboard-card text-center p-3" style={{ minWidth: '100px' }}>
            <div className="small text-muted mb-2">
              {new Date(time).getHours()}:00
            </div>
            <div className="h3 text-white mb-2">
              {Math.round(hourly.temperature_2m[i])}°
            </div>
            <div className="small text-info">
              💧 {hourly.relativehumidity_2m[i]}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hourly;