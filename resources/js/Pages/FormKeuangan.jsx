import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function FormKeuangan({ totalTahunIni }) {
  // Setup form submission Inertia
  const { data, setData, post, processing, reset } = useForm({
    deskripsi: '',
    jumlah: '',
    tanggal_pengeluaran: '' // Opsional, backend akan pakai NOW() jika kosong
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/laporan/pengeluaran', {
      onSuccess: () => reset(), // Reset form setelah sukses
    });
  };

  return (
    <div className="w-full lg:w-[350px] flex flex-col gap-6">
      
      {/* FORM INPUT PENGELUARAN */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h3 className="font-semibold text-sm text-[#b44d7a] mb-3"> 
          Masukan Detail Pengeluaran 
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Deskripsi */}
          <input 
            type="text" 
            placeholder="Deskripsi (ex: Listrik, Beras)"
            value={data.deskripsi}
            onChange={e => setData('deskripsi', e.target.value)}
            className="w-full border border-pink-200 rounded-xl px-3 py-2 mb-3 focus:outline-pink-400 shadow-sm"
            required
          />

          {/* Jumlah Uang */}
          <input 
            type="number" 
            placeholder="Rp Jumlah"
            value={data.jumlah}
            onChange={e => setData('jumlah', e.target.value)}
            className="w-full border border-pink-200 rounded-xl px-3 py-2 mb-3 focus:outline-pink-400 shadow-sm"
            required
          />

          {/* Tanggal (Opsional) */}
          <label className="text-xs text-gray-400 ml-1">Tanggal (Opsional)</label>
          <input 
            type="date"
            value={data.tanggal_pengeluaran}
            onChange={e => setData('tanggal_pengeluaran', e.target.value)}
            className="w-full border border-pink-200 rounded-xl px-3 py-2 focus:outline-pink-400 shadow-sm text-gray-600"
          />

          <button 
            type="submit" 
            disabled={processing}
            className="mt-3 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-xl w-full font-medium transition-colors"
          >
            {processing ? 'Menyimpan...' : 'Simpan Pengeluaran'}
          </button>
        </form>

        <Link   
          href="/laporan/tabel"
          className="block mt-4 text-pink-600 underline text-sm text-center hover:text-pink-800"
        >
          Lihat Tabel Pengeluaran Bulanan
        </Link>
      </div>

      {/* CARD TOTAL TAHUNAN (Otomatis dari DB) */}
      <div className="bg-pink-200 rounded-2xl shadow-md p-6 text-center">
        <h3 className="font-semibold text-lg text-[#b44d7a]"> 
          Total Laba Bersih Tahun Ini 
        </h3>
        <p className="text-2xl font-bold text-pink-600 mt-2"> 
          Rp {totalTahunIni?.toLocaleString('id-ID')} 
        </p>
      </div>
    </div>
  );
}