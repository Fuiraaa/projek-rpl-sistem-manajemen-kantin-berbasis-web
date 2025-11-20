import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon
import './InputField.css'; // Kita akan buat file CSS ini

const InputField = ({ label, type = 'text', placeholder, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Cek apakah tipe input adalah password
  const isPassword = type === 'password';

  // Fungsi untuk toggle ikon mata
  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Tentukan tipe input yang akan di-render
  // Jika tipe aslinya 'password', gunakan state. Jika tidak, gunakan tipe aslinya.
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className="input-field-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-control"
          required // Tambahkan validasi dasar HTML
        />
        {/* Tampilkan ikon mata HANYA jika tipenya adalah password */}
        {isPassword && (
          <span onClick={toggleVisibility} className="input-icon">
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;