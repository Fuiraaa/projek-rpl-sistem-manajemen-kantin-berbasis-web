import React from "react";
import { ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react"; 
import cash from "../../images/dcash.png";
import labakotor from "../../images/dlabakotor.png";

const StatsGrid = ({ stats, currentFilter }) => {
  
  // --- FUNGSI FORMATTER ---
  const formatRupiah = (angka) => {
    // 1. Paksa ubah ke Number dulu agar fungsi toLocaleString jalan
    const value = Number(angka) || 0; 
    
    // 2. Format ke Indonesia (automatis kasih titik)
    return "Rp " + value.toLocaleString('id-ID');
  };

  // Mapping data dari backend ke format tampilan
  const displayData = [
    { 
      title: "Total Pemasukan", 
      // Gunakan fungsi formatRupiah di sini
      value: formatRupiah(stats?.pemasukan), 
      icon: labakotor 
    },
    { 
      title: "Total Pengeluaran", 
      value: formatRupiah(stats?.pengeluaran), 
      icon: labakotor 
    },
    { 
      title: "Laba Bersih (Bulan Ini)", 
      value: formatRupiah(stats?.laba), 
      icon: cash 
    },
  ];

  const handleMonthChange = (e) => {
    // Reload halaman dengan parameter bulan baru
    router.get('/laporan', { 
        bulan: e.target.value,
        tahun: currentFilter.tahun 
    }, { preserveState: true, preserveScroll: true });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
      {displayData.map((item, index) => (
        <div key={index} className="relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex items-center w-full max-w-[420px]">
          <div className="flex-shrink-0 w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mr-4">
            <img src={item.icon} alt={item.title} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-medium text-pink-600">{item.title}</p>
              
              {/* Hanya tampilkan dropdown di kartu pertama */}
              {index === 0 && (
                <div className="relative w-[120px]">
                  <select 
                    className="appearance-none w-full bg-pink-50 border border-pink-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 shadow-sm"
                    value={currentFilter?.bulan || new Date().getMonth() + 1}
                    onChange={handleMonthChange}
                  >
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-pink-600 mt-1">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;