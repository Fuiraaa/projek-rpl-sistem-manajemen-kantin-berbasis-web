import React, { useContext, useState, useEffect, useRef } from "react";
import { SidebarContext } from "./Sidebar";
import { Link, router } from "@inertiajs/react"; // Import router untuk navigasi manual

import SearchIcon from "../../images/search.png";
import UserIcon from "../../images/user.png";
import BellIcon from "../../images/bell.png";

export default function Navbar({ user }) {
  const { expanded } = useContext(SidebarContext);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Ref untuk mendeteksi klik di luar search box
  const searchRef = useRef(null);

  // --- 1. DATA MAPPING PENCARIAN ---
  // Kita daftarkan semua halaman dan keyword terkait sesuai request Anda
  const searchMap = [
    {
      title: "Dashboard",
      url: "/dashboard",
      keywords: ["dashboard", "pendapatan hari ini", "laba bersih hari ini", "total transaksi", "sisa menu", "menu terlaris", "stok menu"]
    },
    {
      title: "Produksi Harian",
      url: "/produksi",
      keywords: ["produksi harian", "menu produksi", "ringkasan produksi", "tambah stok", "kurangi stok", "tambah menu"]
    },
    {
      title: "Transaksi Kasir",
      url: "/transaksi",
      keywords: ["transaksi", "daftar menu", "kasir", "jual"]
    },
    {
      title: "Riwayat Transaksi",
      url: "/riwayat",
      keywords: ["riwayat transaksi", "history", "simpan pdf", "simpan png", "bukti"]
    },
    {
      title: "Laporan Keuangan",
      url: "/laporan",
      keywords: ["laporan keuangan", "total pemasukan", "total pengeluaran", "laba bersih bulan", "grafik keuangan", "laba bersih tahun"]
    },
    {
      title: "Tabel Pengeluaran",
      url: "/laporan/tabel",
      keywords: ["tabel pengeluaran", "data pengeluaran", "list pengeluaran"]
    },
    {
      title: "Pengaturan (Setting)",
      url: "/settings",
      keywords: ["setting", "pengaturan", "preferensi umum", "back up data", "download laporan", "restore"]
    },
    {
      title: "Profil Pengguna",
      url: "/profile",
      keywords: ["profile", "profil", "ganti profile", "akun", "informasi kontak"]
    },
  ];

  // --- 2. LOGIKA PENCARIAN ---
  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.length > 0) {
      // Filter searchMap berdasarkan keyword atau title
      const filtered = searchMap.filter((item) => {
        const lowerValue = value.toLowerCase();
        // Cek apakah judul mengandung keyword
        const matchTitle = item.title.toLowerCase().includes(lowerValue);
        // Cek apakah salah satu keyword dalam array mengandung input user
        const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(lowerValue));
        
        return matchTitle || matchKeywords;
      });
      
      setResults(filtered);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  // --- 3. NAVIGASI SAAT KLIK HASIL ---
  const handleNavigate = (url) => {
    router.get(url); // Pindah halaman via Inertia
    setKeyword("");   // Reset input
    setShowDropdown(false); // Tutup dropdown
  };

  // --- 4. TUTUP DROPDOWN SAAT KLIK DI LUAR ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);


  // --- LOGIKA GAMBAR & NAMA USER (TETAP SAMA) ---
  const profilePicPath = user?.profile?.profile_picture;
  const userImage = profilePicPath 
    ? `/storage/${profilePicPath}` 
    : UserIcon;
  const userName = user?.profile?.first_name || user?.name || "User";


  return (
    <div className="bg-pink-100 flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-pink-700">Kantin Agus</h1>

      {/* Container Search dengan Ref */}
      <div className="flex-1 max-w-xs mx-6 relative" ref={searchRef}>
        
        {/* INPUT SEARCH */}
        <input 
            type="search" 
            placeholder="Cari sesuatu..."
            value={keyword}
            onChange={handleSearch}
            onFocus={() => keyword.length > 0 && setShowDropdown(true)}
            className="w-full py-2 pl-4 pr-10 bg-white rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition duration-200 text-black text-sm"
        />
        <img src={SearchIcon} alt="Search Icon" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"/>

        {/* DROPDOWN HASIL PENCARIAN */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-xl border border-pink-100 overflow-hidden z-50">
            <ul>
              {results.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(item.url)}
                    className="w-full text-left px-4 py-3 hover:bg-pink-50 transition-colors flex flex-col border-b border-gray-50 last:border-0"
                  >
                    <span className="text-pink-600 font-bold text-sm">{item.title}</span>
                    <span className="text-gray-400 text-xs truncate">
                      Fitur: {item.keywords.join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PESAN JIKA TIDAK DITEMUKAN */}
        {showDropdown && keyword.length > 0 && results.length === 0 && (
           <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border border-pink-100 p-4 text-center text-gray-500 text-sm z-50">
              Tidak ada fitur ditemukan.
           </div>
        )}
      </div>

      {/* USER PROFILE */}
      <Link href="/profile">
        <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-lg shadow-md border border-pink-100 hover:shadow-lg transition duration-200">
          <img 
              src={userImage} 
              alt="User Icon" 
              className="w-8 h-8 rounded-full border border-pink-300 object-cover"
          />
          <div className="text-sm text-gray-700 leading-tight">
            <p className="font-semibold">{userName}</p>
            <p className="text-gray-500 text-xs">Penjualan Kantin Agus</p>
          </div>
          <img src={BellIcon} alt="Notifikasi" className="w-5 h-5 opacity-70 ml-2"/>
        </div>
      </Link>

    </div>
  );
}