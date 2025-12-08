import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Import Gambar PNG
import cash from "../../images/dcash.png";
import labakotor from "../../images/dlabakotor.png"; 
import totaltransaksi from "../../images/dtotaltransaksi.png";
import sisamenu from "../../images/dsisamenu.png";

const StatsGrid = ({ stats }) => {
  const formatRupiah = (val) => "Rp " + (Number(val) || 0).toLocaleString('id-ID');

  const statsData = [
    { 
        title: "Pendapatan Hari Ini", 
        value: formatRupiah(stats?.pendapatan_hari_ini), 
        icon: cash, // Gunakan gambar PNG
        bg: "bg-pink-200",
        textColor: "text-pink-600"
    },
    { 
        title: "Laba Bersih Hari Ini", 
        value: formatRupiah(stats?.laba_kotor_hari_ini), 
        icon: labakotor, // Gunakan gambar PNG
        bg: "bg-pink-200",
        textColor: "text-pink-600"
    },
    { 
        title: "Total Transaksi Hari Ini", 
        value: `${stats?.total_transaksi || 0}x`, 
        icon: totaltransaksi, // Gunakan gambar PNG
        bg: "bg-pink-200",
        textColor: "text-pink-600"
    },
    { 
        title: "Sisa Menu Tersedia", 
        value: `${stats?.sisa_menu || 0} Porsi`, 
        icon: sisamenu, // Gunakan gambar PNG
        bg: "bg-pink-200",
        textColor: "text-pink-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map((item, index) => (
        <div key={index}
          className="relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group flex items-center border border-gray-100">

          <div className={`flex-shrink-0 w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
            {/* Render Icon Gambar PNG */}
            <img src={item.icon} alt={item.title} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-pink-500">{item.title}</p>
            <p className={`text-2xl font-bold mt-1 ${item.textColor}`}>{item.value}</p>
          </div>

          {/* Bagian Trend (Opsional, akan muncul jika data trend tersedia) */}
          {stats?.trend && (
            <div className="absolute top-4 right-4 flex items-center space-x-1 text-sm font-semibold">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600">+0%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;