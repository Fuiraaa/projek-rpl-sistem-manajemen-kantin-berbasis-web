import React from "react";
import { usePage } from "@inertiajs/react"; // Import usePage
import StatsGrid from "./StatsGrid1";
import ChartKeuangan from "./ChartKeuangan";
import FormKeuangan from "./FormKeuangan";
import TabelPengeluaran from "./TabelPengeluaran";
import Layout from "../components/Layout";

const Lapkeu = ({ tabel = false, dataPengeluaran }) => {
  // Ambil data props global dari Inertia (dikirim dari Controller)
  const { stats, chartData, filters } = usePage().props;

  // Jika halaman Tabel Pengeluaran
  if (tabel) {
    return <TabelPengeluaran data={dataPengeluaran} filterTanggal={filters?.tanggal} />;
  }

  // Dashboard Utama
  return (
    <Layout> 
      <div className="space-y-6">
        {/* Kirim data stats dan filters ke StatsGrid */}
        <StatsGrid stats={stats} currentFilter={filters} />
        
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Kirim data chart */}
          <div className="flex-1">
             <ChartKeuangan data={chartData} />
          </div>
          
          {/* Kirim data total tahunan ke form */}
          <div>
            <FormKeuangan totalTahunIni={stats?.total_laba_tahun || 0} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lapkeu;