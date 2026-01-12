import React from 'react';

function Daily({ data }) {
  if (!data) return <div className="text-center text-muted mt-5">กรุณาค้นหาเมืองก่อนครับ</div>;

  const { daily } = data;

  return (
    <div>
      <h3 className="text-white mb-4">พยากรณ์ 7 วันล่วงหน้า</h3>
      <div className="row g-3">
        {daily.time.map((time, i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <div className="text-accent fw-bold">
                  {new Date(time).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric' })}
                </div>
                <small className="text-muted">High / Low</small>
              </div>
              <div className="text-end">
                <span className="h3 text-white me-2">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="h5 text-muted">{Math.round(daily.temperature_2m_min[i])}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Daily;