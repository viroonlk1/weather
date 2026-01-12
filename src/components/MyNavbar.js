import React from 'react';

function MyNavbar() {
  return (
    <nav className="navbar navbar-dark bg-transparent border-bottom border-secondary px-4 py-3">
      <div className="container-fluid p-0">
        {/* Logo */}
        <span className="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <i className="bi bi-cloud-lightning-rain-fill text-info me-2"></i>
          Viroon <span className="text-muted fw-light ms-1">Weather</span>
        </span>

        {/* User Profile (ขวาสุด) */}
        <div className="d-flex align-items-center">
          <div className="text-end me-3 d-none d-md-block">
            <div className="fw-bold" style={{fontSize: '0.9rem'}}>Run Wirun</div>
            <div className="text-muted" style={{fontSize: '0.75rem'}}>Admin</div>
          </div>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Run" 
            alt="Profile" 
            className="rounded-circle border border-secondary"
            width="40" height="40"
          />
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;