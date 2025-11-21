import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Layout from "../components/Layout";
import kalender from "../../images/riwayat.png";

export default function Riwayat() {
  const [showExport, setShowExport] = useState(null); 
  const riwayatData = [
    {
      tanggal: "Selasa, 11 November 2025",
      jam: "15:02",
      items: [{ nama: "Ayam Bakar", jumlah: 2, harga: 12000 }],
    },
    {
      tanggal: "Selasa, 11 November 2025",
      jam: "15:02",
      items: [
        { nama: "Sosis Telur", jumlah: 1, harga: 15000 },
        { nama: "Pisang Cokelat", jumlah: 2, harga: 1000 },
      ],
    },
    {
      tanggal: "Selasa, 11 November 2025",
      jam: "15:02",
      items: [{ nama: "Mi Celor", jumlah: 3, harga: 15000 }],
    },
    {
      tanggal: "Selasa, 11 November 2025",
      jam: "15:02",
      items: [
        { nama: "Ayam Kecap", jumlah: 1, harga: 12000 },
        { nama: "Ayam Goreng", jumlah: 2, harga: 24000 },
        { nama: "Telur Balado", jumlah: 2, harga: 12000 },
      ],
    },
    {
      tanggal: "Selasa, 11 November 2025",
      jam: "15:02",
      items: [{ nama: "Nasi Goreng", jumlah: 1, harga: 10000 }],
    },
  ];

  return (
    <Layout>
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
      <div className="flex items-center gap-2 mb-4 font-bold">
        <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
        <p>Tanggal</p>
      </div>

      <div className="bg-white border border-pink-300 mb-8 p-4 rounded-lg shadow-md shadow-pink-200/50">
        <input type="date" defaultValue="" className="rounded px-2 py-1 w-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {riwayatData.map((transaksi, index) => {
          const total = transaksi.items.reduce(
            (acc, item) => acc + item.jumlah * item.harga,
            0
          );

          return (
            <div key={index} className="flex flex-col m-2 rounded-md text-base w-full sm:w-fit overflow-hidden shadow-sm">
              <div className="flex justify-between items-center bg-rose-300 w-full sm:w-72 lg:w-80 text-left font-semibold px-4 py-2 relative">
                <div>
                  <p>{transaksi.tanggal}</p>
                  <p>{transaksi.jam}</p>
                </div>

                <div className="relative">
                  <button onClick={() =>
                      setShowExport(showExport === index ? null : index)
                    }>
                    <FiMoreVertical size={24} />
                  </button>

                  {showExport === index && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                      <select className="w-full px-2 py-1 text-sm text-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-pink-200"
                        defaultValue="">
                        <option value="" disabled>
                          Export
                        </option>
                        <option value="PNG">Export PNG</option>
                        <option value="PDF">Export PDF</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {transaksi.items.map((item, i) => (
                <div key={i} className="bg-rose-100 px-4 py-2">
                  <p>{item.nama}</p>
                  <div className="flex justify-between w-full mt-1">
                    <p>Jumlah: {item.jumlah}</p>
                    <p className="text-right">Rp. {item.jumlah * item.harga}</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between w-full bg-rose-100 font-bold border-t-2 border-gray-400 px-4 py-2">
                <p>Total</p>
                <p>Rp. {total}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Layout>
  );
}
