// src/components/MyNavbar.js
import React from 'react';

function MyNavbar() {
  return (
    <nav className="navbar navbar-dark bg-transparent border-bottom border-secondary px-3 py-3">
      <div className="container-fluid p-0 d-flex align-items-center">
        
        {/* ✅ 1. เพิ่มปุ่ม Hamburger (โชว์เฉพาะมือถือ) */}
        <button 
          className="btn btn-outline-secondary d-md-none me-3 border-0 text-white" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#mobileDrawer" 
          aria-controls="mobileDrawer"
        >
          <i className="bi bi-list fs-3"></i>
        </button>

        {/* Logo */}
        <span className="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <i className="bi bi-cloud-lightning-rain-fill text-info me-2"></i>
          Jamjan <span className="text-muted fw-light ms-1">Weather</span>
        </span>

        {/* User Profile */}
        <div className="d-flex align-items-center ms-auto">
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