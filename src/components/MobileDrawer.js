// src/components/MobileDrawer.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function MobileDrawer() {
  // เมนูเหมือน Sidebar เป๊ะ
  const menus = [
    { name: 'Now', path: '/', icon: 'bi-brightness-high-fill' },
    { name: 'Hourly', path: '/hourly', icon: 'bi-clock-history' },
    { name: 'Daily', path: '/daily', icon: 'bi-calendar-week' },
    { name: 'Settings', path: '/settings', icon: 'bi-gear-fill' },
    { name: 'About', path: '/about', icon: 'bi-info-circle-fill' },
  ];

  return (
    // ✅ โครงสร้าง Offcanvas (Drawer)
    <div 
      className="offcanvas offcanvas-start theme-midnight" 
      tabIndex="-1" 
      id="mobileDrawer" 
      aria-labelledby="mobileDrawerLabel"
      style={{background: '#0f172a', color: 'white'}}
    >
      <div className="offcanvas-header border-bottom border-secondary">
        <h5 className="offcanvas-title fw-bold" id="mobileDrawerLabel">
          <i className="bi bi-cloud-lightning-rain-fill text-info me-2"></i>
          Jamjan Weather
        </h5>
        <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      
      <div className="offcanvas-body">
        <ul className="nav nav-pills flex-column gap-2">
          {menus.map((menu, index) => (
            <li className="nav-item" key={index}>
              <NavLink 
                to={menu.path} 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center text-white ${isActive ? 'bg-primary shadow' : 'opacity-75'}`
                }
                style={{ borderRadius: '12px', transition: '0.2s', padding: '12px' }}
                // ✅ เพิ่มอันนี้เพื่อให้พอกดเมนูแล้ว Drawer ปิดเอง (เฉพาะตอนใช้ data-bs)
                // แต่ใน React บางทีต้องใช้ useRef, แต่อันนี้ work around ง่ายๆ
              >
                <i className={`bi ${menu.icon} me-3 fs-5`}></i>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-5 p-3 rounded bg-dark border border-secondary text-center">
          <small className="text-muted">© 2026 Jamjan Dev</small>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;