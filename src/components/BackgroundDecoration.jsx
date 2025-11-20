import React from 'react';

// PENTING: Sesuaikan path (lokasi) ini dengan tempat kamu menyimpan gambar
// Contoh: Jika gambar ada di folder src/assets/
import imgBungaKiri from '../assets/element-bunga.png'; 
import imgBungaKanan from '../assets/element-bunga.png';
import imgGelombang from '../assets/element-bawah.png'; 
// (Kamu bisa tambah import untuk bintang/hiasan kecil lainnya)

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. BUNGA KIRI */}
      {/* 'top-1/3' biar agak turun, '-left-10' biar sebagian gambar keluar layar */}
      <img 
        src={imgBungaKiri} 
        alt="Dekorasi Kiri"
        className="absolute top-1/3 -left-10 w-40 opacity-80 blur-[2px]" 
      />

      {/* 2. BUNGA KANAN */}
      {/* 'right-0' biar nempel kanan, 'w-56' ukurannya lebih besar */}
      <img 
        src={imgBungaKanan} 
        alt="Dekorasi Kanan"
        className="absolute top-1/4 right-0 w-56 opacity-60 blur-sm" 
      />

      {/* 3. GELOMBANG BAWAH */}
      {/* 'bottom-0' nempel bawah, 'w-full' lebar penuh */}
      <img 
        src={imgGelombang} 
        alt="Background Bawah"
        className="absolute bottom-0 left-0 w-full opacity-90" 
      />

    </div>
  );
};

export default BackgroundDecoration;