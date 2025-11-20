import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Untuk link 'Daftar'
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import './Login.css'; // CSS khusus untuk halaman login
import BackgroundDecoration from '../components/BackgroundDecoration';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  const response = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  console.log(data);
};


  return (
  <div className="min-h-screen w-full bg-pink-50 relative flex items-center justify-center overflow-hidden">
    <BackgroundDecoration />
    <div className="relative z-10 px-4">
    <AuthLayout subtitle="Log in untuk Melanjutkan">
      <form onSubmit={handleLogin}>
        <InputField
          label="Username"
          type="text"
          placeholder="Masukkan username anda"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Masukkan password anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Baris untuk 'Ingat saya' dan 'Lupa sandi' */}
        <div className="login-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ingat saya</label>
          </div>
          <Link to="/lupa-sandi" className="forgot-password">
            Lupa sandi?
          </Link>
        </div>

        {/* Tombol Login */}
        <Button type="submit">
          Masuk
        </Button>
      </form>

      {/* Link ke halaman Register */}
      <div className="signup-link">
        Belum punya akun? <Link to="/register">Daftar</Link>
      </div>
    </AuthLayout>
    </div>
    </div>
  );
};

export default Login;