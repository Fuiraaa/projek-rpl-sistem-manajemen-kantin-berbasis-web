import React from 'react';
import centang from "../../images/dcentang.png";
import warning from "../../images/dwarning.png";

const BagianBawah = ({ topMenu, recentTransactions, stokMenu }) => {
  const formatRupiah = (num) => "Rp " + Number(num).toLocaleString('id-ID');
  const formatTanggal = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
  }

  return (
    // UBAH 1: Gunakan flex-col untuk mobile, dan lg:flex-row untuk desktop
    <div className="w-full flex flex-col lg:flex-row mt-4 gap-6">

      {/* C. TRANSAKSI TERBARU */}
      {/* UBAH 2: Tambahkan 'flex-1' agar memanjang mengisi ruang kosong */}
      {/* UBAH 3: Perbaiki typo h-400px] menjadi h-[400px] */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] flex-1">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h3 className="font-bold text-pink-700 ">🕒 Transaksi Terbaru</h3>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">Realtime</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="space-y-3">
                {recentTransactions && recentTransactions.length > 0 ? recentTransactions.map((trx, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-pink-500 bg-pink-50 px-1 rounded">#{trx.transaksi_id}</span>
                                <span className="text-xs text-gray-400">• {formatTanggal(trx.created_at)}</span>
                            </div>
                            <p className="text-sm font-bold text-gray-700 mt-1">{formatRupiah(trx.total_harga)}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 px-2 py-1 rounded-full font-medium">Selesai</span>
                        </div>
                    </div>
                )) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 italic"><p>Belum ada transaksi hari ini.</p></div>
                )}
            </div>
        </div>
      </div>


      {/* B. STOK MENU (URUT DARI SEDIKIT) */}
      {/* UBAH 4: Berikan lebar fixed (lg:w-[400px]) agar tampilannya rapi seperti sidebar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] w-full lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h3 className="font-bold text-pink-700">📦 Stok Menu</h3>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full animate-pulse">Realtime</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-2 py-2 rounded-tl-lg">Menu</th>
                        <th className="px-2 py-2 text-right rounded-tr-lg">Stok</th>
                    </tr>
                </thead>
                <tbody>
                    {stokMenu && stokMenu.length > 0 ? stokMenu.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-pink-50 transition-colors">
                            <td className="px-2 py-3 font-medium text-gray-700">{item.nama_menu}</td>
                            <td className="px-2 py-3 text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                    item.stok < 10 ? 'bg-red-100 text-red-600 border border-red-200' : 
                                    item.stok < 20 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                                    'bg-green-100 text-green-600 border border-green-200'
                                }`}>
                                    {item.stok}
                                </span>
                            </td>
                        </tr>
                    )) : (
                         <tr><td colSpan="2" className="text-center py-10 text-gray-400 italic">Belum ada produksi hari ini.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default BagianBawah;