import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import cash from "../../assets/dcash.png";
import labakotor from "../../assets/dlabakotor.png"; 
import totaltransaksi from "../../assets/dtotaltransaksi.png";
import sisamenu from "../../assets/dsisamenu.png";

const statsData = [
  { title: "Pendapatan Hari Ini", value: "Rp 2.500.000", trend: "up", change: "+12.05%", icon: cash },
  { title: "Laba Kotor", value: "Rp 1.230.000", trend: "up", change: "+15.02%", icon: labakotor },
  { title: "Total Transaksi", value: "50", icon: totaltransaksi },
  { title: "Sisa Menu Tersedia", value: "30", icon: sisamenu },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map((stats, index) => (
        <div key={index}
          className="relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group flex items-center">

          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
            <img src={stats.icon} alt={stats.title} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-pink-500">{stats.title}</p>
            <p className="text-2xl font-bold text-pink-600">{stats.value}</p>
          </div>

          {stats.trend && stats.change && (
            <div className="absolute top-4 right-4 flex items-center space-x-1 text-sm font-semibold">
              {stats.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`${stats.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                {stats.change}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
