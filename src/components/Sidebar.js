import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const menus = [
    { name: 'Now', path: '/', icon: 'bi-brightness-high-fill' },
    { name: 'Hourly', path: '/hourly', icon: 'bi-clock-history' },
    { name: 'Daily', path: '/daily', icon: 'bi-calendar-week' },
    { name: 'Settings', path: '/settings', icon: 'bi-gear-fill' },
    { name: 'About', path: '/about', icon: 'bi-info-circle-fill' },
  ];

  return (
    <div className="d-none d-md-flex flex-column p-3 border-end border-secondary" style={{width: '250px', background: 'rgba(0,0,0,0.2)'}}>
      <div className="mb-4 text-center text-white-50 small font-monospace">MENU</div>
      <ul className="nav nav-pills flex-column gap-2">
        {menus.map((menu, index) => (
          <li className="nav-item" key={index}>
            <NavLink 
              to={menu.path} 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center text-white ${isActive ? 'bg-primary shadow' : 'opacity-75'}`
              }
              style={{ borderRadius: '12px', transition: '0.2s' }}
            >
              <i className={`bi ${menu.icon} me-3 fs-5`}></i>
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;