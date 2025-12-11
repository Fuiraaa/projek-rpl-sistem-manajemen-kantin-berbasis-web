import React from "react";
import { Link } from "react-router-dom";

export default function FormKeuangan() {
  return (
    <div className="w-[350px] flex flex-col gap-6">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h3 className="font-semibold text-sm text-[#b44d7a] mb-3"> Masukan Detail Pengeluaran </h3>

        <input type="text" placeholder="Deskripsi..."
          className="w-full border border-pink-200 rounded-xl px-3 py-2 mb-3 focus:outline-pink-400 shadow-[0_4px_10px_rgba(255,182,193,0.45)]"/>

        <input type="number" placeholder="Rp"
          className="w-full border border-pink-200 rounded-xl px-3 py-2 focus:outline-pink-400 shadow-[0_4px_10px_rgba(255,182,193,0.45)]"/>

        <p className="text-sm text-gray-500 mt-4">Tanggal (Opsional)</p>

        <input type="date"
        className="w-full border border-pink-200 rounded-xl px-3 py-2 focus:outline-pink-400 shadow-[0_4px_10px_rgba(255,182,193,0.45)]"/>

        <button className="mt-3 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-xl w-full">
          Simpan Pengeluaran
        </button>

        <Link to="TabelPengeluaran" className="block mt-4 text-pink-600 underline text-sm text-center hover:text-pink-800">
          Lihat Tabel Pengeluaran Bulanan
        </Link>
      </div>

      <div className="bg-pink-200 rounded-2xl shadow-md p-6 text-center">
        <h3 className="font-semibold text-lg text-[#b44d7a]"> Total Pemasukan Tahun Ini </h3>
        <p className="text-2xl font-bold text-pink-600 mt-2"> Rp. 300.000.000 </p>
      </div>
    </div>
  );
}
