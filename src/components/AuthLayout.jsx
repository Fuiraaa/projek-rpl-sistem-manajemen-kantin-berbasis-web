import React from 'react';
import './AuthLayout.css';
import logo from '../assets/logo.png'; 

// Tambahkan 'subtitle' di sini
const AuthLayout = ({ children, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <div className="auth-header">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h1 className="auth-title">Welcome!</h1>
          {/* Tambahkan baris ini untuk subtitle */}
          <p className="auth-subtitle">{subtitle}</p>
        </div>

        <div className="auth-body">
          {children} 
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;