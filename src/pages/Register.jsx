import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import './Register.css';
import BackgroundDecoration from '../components/BackgroundDecoration';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' // <--- TAMBAHKAN INI (Wajib untuk Laravel)
        },
        // Pastikan nama field di sini sesuai dengan validasi di Controller Laravel
        body: JSON.stringify({ 
            username, // Cek catatan di bawah soal 'username' vs 'name'
            email, 
            password,
            password_confirmation: confirmPassword // Laravel biasanya butuh ini untuk validasi 'confirmed'
        }),
      });

      const data = await response.json(); // Ambil pesan error dari backend

      if (response.ok) {
        navigate("/register-success");
      } else {
        // Tampilkan error spesifik dari Laravel (misal: "Email has already been taken")
        console.log("Error data:", data); 
        alert(data.message || "Gagal register");
      }

    } catch (error) {
      console.error("Terjadi kesalahan network:", error);
      alert("Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 relative flex items-center justify-center overflow-hidden">
      <BackgroundDecoration />
        <div className="relative z-10 px-4">
          <AuthLayout subtitle="Log in untuk Melanjutkan">
            <form onSubmit={handleRegister}>
              <InputField
                label="Username"
                type="text"
                placeholder="Masukkan username anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               />
              <InputField
                label="Email"
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
              label="Password"
              type="password"
              placeholder="Masukkan password baru anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
              label="Ulangi Password"
              type="password"
              placeholder="Masukkan ulang password baru anda"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="terms-check">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">Setuju dengan Terms & Conditions</label>
              </div>

              <Button type="submit">
                Register
             </Button>
         </form>

      <div className="login-link mt-6">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </div>
    </AuthLayout>
    </div>
    </div>
  );
};

export default Register;
