import React from 'react';
import centang from "../../assets/dcentang.png";
import warning from "../../assets/dwarning.png";

const menuItems = [
  { name: "Drink Beng-Beng", tanggal: "November, 11 2025", waktu: "15:02", qty: 20, price: 10000 },
  { name: "Sosis Telur", tanggal: "November, 11 2025", waktu: "14:57", qty: 18, price: 5000 },
  { name: "Pisang Cokelat", tanggal: "November, 11 2025", waktu: "14:57", qty: 30, price: 2000 },
  { name: "Mi Celor", tanggal: "November, 11 2025", waktu: "14:16", qty: 20, price: 15000 },
  { name: "Ayam Kecap", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Ayam Goreng", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Telur Balado", tanggal: "November, 11 2025", waktu: "13:44", qty: 1, price: 12000 },
  { name: "Nasi Goreng", tanggal: "November, 11 2025", waktu: "13:42", qty: 1, price: 10000 },
];

const BagianBawah = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row mt-4 gap-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] flex-1">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="font-bold text-pink-700 ">🕒 Transaksi Terbaru</h3>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">Realtime</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-sm border border-black text-left table-auto">
            <thead className="text-xs border border-black text-black uppercase sticky top-0">
              <tr>
                <th className="px-2 py-2">Menu</th>
                <th className="px-2 py-2">Tanggal</th>
                <th className="px-2 py-2">Waktu</th>
                <th className="px-2 py-2">Jumlah</th>
                <th className="px-2 py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {menuItems.map((item, idx) => (
                <tr key={idx} className="border-b border-black hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-2">{item.name}</td>
                  <td className="px-2 py-2">{item.tanggal}</td>
                  <td className="px-2 py-2">{item.waktu}</td>
                  <td className="px-2 py-2">{item.qty}</td>
                  <td className="px-2 py-2">Rp {String(item.qty * item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] w-full lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="font-bold text-pink-700">📦 Stok Menu</h3>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">Realtime</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-black text-bold uppercase bg-gray-50 sticky top-0">
              <tr>
                <th className="px-2 py-2 rounded-tl-lg">Menu</th>
                <th className="px-2 py-2 text-right rounded-tr-lg">Stok</th>
              </tr>
            </thead>

            <tbody>
              {menuItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-pink-50 transition-colors">
                  <td className="px-2 py-3 font-medium text-gray-700">{item.name}</td>
                  <td className="px-2 py-3 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      item.qty < 10 ? 'bg-red-100 text-red-600 border border-red-200' :
                      item.qty < 20 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-green-100 text-green-600 border border-green-200'
                    }`}>
                      {item.qty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default BagianBawah;
