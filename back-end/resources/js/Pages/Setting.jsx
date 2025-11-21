import React from "react";
import { ChevronDown } from "lucide-react";

export default function SettingsContent() {
  return (
    <div className="flex flex-row justify-between gap-6 w-full max-w-6xl mx-auto p-6">

      <div className="flex flex-col gap-6 bg-white px-8 py-6 rounded-lg shadow-md border border-pink-100 w-full">
        <h1 className="text-pink-600 font-bold text-xl mb-2">Preferensi Umum</h1>
        <div className="flex flex-col gap-6 mt-12">

          <div className="flex items-center gap-4 relative">
            <label htmlFor="date" className="font-semibold w-32 text-gray-700"> Tanggal </label>
            <input id="date" type="date" className="w-full border border-pink-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"/>
          </div>

          <div className="flex items-center gap-4 relative">
            <label htmlFor="font-size" className="font-semibold w-32 text-gray-700"> Ukuran Font </label>

            <div className="relative w-full">
              <select id="font-size" className="w-full appearance-none border border-pink-300 bg-white rounded px-2 py-1.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400" defaultValue="">
                <option value="" disabled>Pilih ukuran font</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
              </select>

              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="text-pink-600 font-semibold px-4 py-2 rounded hover:bg-pink-50 border border-transparent hover:border-pink-200 transition">
            Perbarui
          </button>
          <button className="text-pink-600 font-semibold underline px-4 py-2 rounded hover:bg-pink-50 transition">
            Batalkan
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:w-72">
        <div className="flex flex-col gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-pink-100 text-sm">
          <h1 className="text-pink-600 font-bold text-lg">Back Up</h1>
          <button className="w-full bg-pink-100 text-pink-600 font-bold rounded-lg px-4 py-2 hover:bg-pink-200 transition">Backup</button>

          <p className="text-gray-400 text-xs">
            Terakhir diperbarui tanggal<br />
            <span className="font-medium text-gray-600">06-11-2025, 18:00 WIB</span>
          </p>
        </div>

       <div className="flex flex-col gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-pink-100 text-sm">
  <h1 className="text-pink-600 font-bold text-lg">Restore Data</h1>

  <select className="w-full border font-bold border-pink-300 rounded px-2 py-1.5 text-sm text-gray-700 bg-white cursor-pointer focus:ring-2 focus:ring-pink-200 focus:border-pink-400">
    <option value="" disabled selected>Pilih File Backup</option>
    <option>Data Penjualan & Stok</option>
    <option>Laporan Keuangan</option>
  </select>

  <div className="h-10"></div>
</div>
      </div>
    </div>
  );
}
