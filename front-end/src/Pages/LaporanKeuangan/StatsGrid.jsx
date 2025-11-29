import React from "react";
import { ChevronDown } from "lucide-react";

import cash from "../../assets/dcash.png";
import labakotor from "../../assets/dlabakotor.png";

const statsData = [
  { title: "Total Pemasukan", value: "Rp 54.186.186", icon: labakotor },
  { title: "Total Pengeluaran", value: "Rp 25.000.000", icon: labakotor },
  { title: "Laba", value: "29.186.186", icon: cash },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
      {statsData.map((stats, index) => (
        <div key={index}
          className="relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex items-center w-full max-w-[420px]">
          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mr-4">
            <img src={stats.icon} alt={stats.title} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-medium text-gray-400">{stats.title}</p>

              <div className="relative w-[120px]">
                <select className="w-full appearance-none border border-pink-300 bg-white rounded px-2 py-1 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
                  defaultValue="November">
                  <option disabled>Pilih Bulan</option>
                  <option>Januari</option>
                  <option>Februari</option>
                  <option>Maret</option>
                  <option>April</option>
                  <option>Mei</option>
                  <option>Juni</option>
                  <option>Juli</option>
                  <option>Agustus</option>
                  <option>September</option>
                  <option>Oktober</option>
                  <option>November</option>
                  <option>Desember</option>
                </select>

                <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <p className="text-2xl font-bold text-pink-600 mt-1">{stats.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
