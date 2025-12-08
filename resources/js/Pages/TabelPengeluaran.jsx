import React from "react";
import { Link, router } from "@inertiajs/react";
import Layout from "../components/Layout";

// Terima props 'data' dan 'filterTanggal' dari parent
const TabelPengeluaran = ({ data = [], filterTanggal }) => {

  // --- LOGIKA (TETAP SAMA) ---
  
  // Fungsi untuk handle ganti tanggal
  const handleFilterChange = (e) => {
    router.get('/laporan/tabel', 
      { tanggal: e.target.value }, 
      { preserveState: true, replace: true }
    );
  };

  // Helper untuk format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Helper untuk format Tanggal
  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    const date = new Date(tgl);
    return date.toLocaleDateString("id-ID", {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  // --- TAMPILAN UI ---
  return (
    <Layout>
      {/* WRAPPER BARU: Mengatur agar Card dan Tombol tersusun ke bawah */}
      <div className="flex flex-col gap-4 w-full h-full">
        
          {/* [CARD UTAMA] */}
          {/* Link 'Kembali' SUDAH DIHAPUS dari dalam sini */}
          <div className="bg-white p-6 rounded-lg shadow-md relative w-full flex-1">
            
            {/* Input Date Section (TETAP SAMA) */}
            <div className="bg-white border border-pink-300 mb-8 p-4 rounded-lg shadow-md shadow-pink-200/50">
              <input 
                type="date" 
                value={filterTanggal || ''} 
                onChange={handleFilterChange}
                className="rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-pink-400" 
              />
            </div>

            {/* Tabel (TETAP SAMA) */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-xs border-collapse">
                <thead className="sticky top-0 bg-pink-100">
                    <tr>
                    <th className="border px-2 py-1 text-left">Deskripsi</th>
                    <th className="border px-2 py-1 text-left">Tanggal</th>
                    <th className="border px-2 py-1 text-left">Jumlah Pengeluaran</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.pengeluaran_id || index} className="even:bg-gray-50 hover:bg-pink-50/50">
                            {/* Kolom Deskripsi */}
                            <td className="border px-2 py-1">{item.deskripsi}</td>
                            
                            {/* Kolom Tanggal */}
                            <td className="border px-2 py-1">
                                {formatTanggal(item.tanggal_pengeluaran)}
                            </td>
                            
                            {/* Kolom Jumlah */}
                            <td className="border px-2 py-1 font-medium">
                                {formatRupiah(item.jumlah)}
                            </td>
                            </tr>
                        ))
                    ) : (
                        /* Tampilan jika data kosong */
                        <tr>
                            <td colSpan="3" className="border px-2 py-4 text-center text-gray-400 italic">
                                Tidak ada data.
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
          </div>

          {/* [TOMBOL KEMBALI] */}
          {/* Sekarang berada DI LUAR Card, di bawah, sebelah kiri */}
          <div className="flex justify-start">
            <Link 
                href="/laporan"
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-xs inline-block shadow-sm"
            >
                Kembali
            </Link>
          </div>

      </div>
    </Layout>
  );
};


export default TabelPengeluaran;