import React from 'react';

function About() {
  return (
    <div className="dashboard-card text-center py-5">
      <div className="bg-primary rounded-circle d-inline-flex p-3 mb-3">
        <i className="bi bi-cloud-lightning-rain-fill fs-1 text-white"></i>
      </div>
      <h2 className="text-white">Viroon Weather App</h2>
      <p className="text-muted">Version 2.0 (React Router Edition)</p>
      <hr className="my-4 border-secondary" />
      <p>พัฒนาโดย: <strong>Viroon Langkaew</strong></p>
      <p className="small text-muted">ข้อมูลพยากรณ์อากาศจาก Open-Meteo API</p>
    </div>
  );
}

export default About;