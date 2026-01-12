import React from 'react';

function Now({ data }) {
  if (!data) return <div className="text-center text-muted mt-5">กรุณาค้นหาเมืองก่อนครับ</div>;

  const { current, name, country } = data;

  return (
    <div className="dashboard-card text-center py-5 animate-fade-in">
      <h1 className="display-1 fw-bold text-white mb-0">{current.temperature}°</h1>
      <h2 className="text-accent mb-3">{name}, {country}</h2>
      
      <div className="d-flex justify-content-center gap-5 mt-4">
        <div>
          <i className="bi bi-wind fs-1 d-block mb-2"></i>
          <span className="h5">{current.windspeed} km/h</span>
          <div className="small text-muted">Wind Speed</div>
        </div>
        <div>
          <i className="bi bi-compass fs-1 d-block mb-2"></i>
          <span className="h5">{current.winddirection}°</span>
          <div className="small text-muted">Direction</div>
        </div>
      </div>
    </div>
  );
}

export default Now;