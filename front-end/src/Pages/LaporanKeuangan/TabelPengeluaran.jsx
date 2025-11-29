import React from 'react'

const TabelPengeluaran = () => {
  const menuItems = [
    { desc: "Biaya Sewa Tempat", tanggal: "31/10/2025", qty: "Rp. 5.000.000" },
    { desc: "Tagihan Air", tanggal: "31/10/2025", qty: "Rp. 8.000.000" },
    { desc: "Beras", tanggal: "26/10/2025", qty: "Rp. 120.000" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
      <div className="bg-white border border-pink-300 mb-8 p-4 rounded-lg shadow-md shadow-pink-200/50">
        <input type="date" defaultValue="" className="rounded px-2 py-1 w-full" />
      </div>

      <table className="w-full table-auto text-xs border-collapse">
        <thead className="sticky top-0 bg-pink-100">
          <tr>
            <th className="border px-2 py-1">Deskripsi</th>
            <th className="border px-2 py-1">Tanggal</th>
            <th className="border px-2 py-1">Jumlah Pengeluaran</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border px-2 py-1">{item.desc}</td>
              <td className="border px-2 py-1">{item.tanggal}</td>
              <td className="border px-2 py-1">{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Kembali
      </button>
    </div>
  )
}

export default TabelPengeluaran
