import React from 'react';

function Settings() {
  return (
    <div className="dashboard-card">
      <h3 className="text-white mb-4">⚙️ การตั้งค่า</h3>
      
      <div className="mb-3 d-flex justify-content-between align-items-center border-bottom border-secondary pb-3">
        <span>หน่วยอุณหภูมิ</span>
        <div className="btn-group">
          <button className="btn btn-sm btn-primary">°C</button>
          <button className="btn btn-sm btn-outline-secondary text-white">°F</button>
        </div>
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <span>Dark Mode</span>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
}

export default Settings;