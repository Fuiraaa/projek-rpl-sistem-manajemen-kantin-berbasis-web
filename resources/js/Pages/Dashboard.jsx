import React from "react";
import { usePage } from "@inertiajs/react";
import StatsGrid from "./StatsGrid";
import DashboardCharts from "./Chart"; // Perhatikan nama import ini sesuaikan dengan export default di Chart.jsx
import BagianBawah from "./BagianBawah";
import Layout from "../components/Layout";

const Dashboard = () => {
  // 1. Ambil data dari Backend (Inertia)
  const { stats, chartData, topMenu, recentTransactions, stokMenu, filters, weeklyFilterDate, dailyFilterDate } = usePage().props;

  

  return (
    <Layout>
      <div className="space-y-6 ">
        {/* Header (Opsional, sesuaikan dengan desain lama jika ada header) */}
        
        {/* 2. Kirim data stats ke StatsGrid */}
        <StatsGrid stats={stats} />
        
        {/* 3. Kirim data chart dan filter tanggal ke Chart */}
        <DashboardCharts 
          data={chartData} 
            // Ambil filterDate dari 'filters.date' ATAU langsung props 'weeklyFilterDate'/'dailyFilterDate' jika sudah dipisah
            filterDate={filters?.date || ''} 
            weeklyFilterDate={weeklyFilterDate}
            dailyFilterDate={dailyFilterDate}
            topMenu={topMenu}  
        />
        
        {/* 4. Kirim data tabel ke BagianBawah */}
        <BagianBawah 
          topMenu={topMenu} 
          recentTransactions={recentTransactions} 
          stokMenu={stokMenu} 
        />
      </div>
    </Layout>
  );
};

export default Dashboard;