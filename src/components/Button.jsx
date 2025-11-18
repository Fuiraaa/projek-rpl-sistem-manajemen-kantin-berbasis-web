import React from 'react';
import './Button.css';

// Menerima 'children' (teks di dalam tombol) dan 'type' (misal: 'submit')
const Button = ({ children, type = 'button', onClick }) => {
  return (
    <button 
      type={type} 
      className="auth-button" 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;