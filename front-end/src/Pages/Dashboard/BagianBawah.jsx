import React from 'react';
import centang from "../../assets/dcentang.png";
import warning from "../../assets/dwarning.png";

const menuItems = [
  { name: "Drink Beng-Beng", tanggal: "November, 11 2025", waktu: "15:02", qty: 2, price: 10000 },
  { name: "Sosis Telur", tanggal: "November, 11 2025", waktu: "14:57", qty: 1, price: 5000 },
  { name: "Pisang Cokelat", tanggal: "November, 11 2025", waktu: "14:57", qty: 2, price: 2000 },
  { name: "Mi Celor", tanggal: "November, 11 2025", waktu: "14:16", qty: 20, price: 15000 },
  { name: "Ayam Kecap", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Ayam Goreng", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Telur Balado", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Nasi Goreng", tanggal: "November, 11 2025", waktu: "13:42", qty: 1, price: 10000 },
];

const BagianBawah = () => {
  return (
    <div className="w-full flex mt-4 gap-4">

      <div className="bg-white w-2/3 h-[50vh] rounded-lg shadow-md flex flex-col p-4">
        <h2 className="font-bold text-pink-400 text-lg mb-2">Transaksi Terbaru</h2>
        <div className="overflow-y-auto flex-1 rounded">
          <table className="w-full table-auto text-xs border-collapse">
            <thead className="sticky top-0 bg-pink-100">
              <tr>
                <th className="border px-2 py-1">Menu</th>
                <th className="border px-2 py-1">Tanggal</th>
                <th className="border px-2 py-1">Waktu</th>
                <th className="border px-2 py-1">Jumlah</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.tanggal}</td>
                  <td className="border px-2 py-1">{item.waktu}</td>
                  <td className="border px-2 py-1">{item.qty}</td>
                  <td className="border px-2 py-1">
                    Rp. {(item.price * item.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white w-1/3 h-[50vh] rounded-lg shadow-md flex flex-col p-4">
        <h2 className="font-bold text-pink-400 text-lg mb-2">Stok Menu</h2>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {menuItems.map((item, index) => {
            const icon = item.qty <= 10 ? warning : centang;

            return (
              <div key={index} className="bg-pink-50 rounded-lg p-2 flex items-center gap-4">
                <img src={icon} alt="status" className="w-8 h-8" />
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="font-semibold text-sm">{item.qty} Stok</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default BagianBawah;
