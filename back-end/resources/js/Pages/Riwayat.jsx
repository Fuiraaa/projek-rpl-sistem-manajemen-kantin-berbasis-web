import React from "react";
import { usePage, router } from "@inertiajs/react";
import jsPDF from "jspdf";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import kalender from "../../images/riwayat.png";
import Layout from "../components/Layout";

export default function Riwayat() {
  const { riwayat = [], tanggalFilter } = usePage().props;
  const [showExport, setShowExport] = useState(null);

  // Export ke PDF langsung dari data
  const handleExportPDF = (transaksi, index) => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(12);
    doc.text(`Tanggal: ${transaksi.tanggal}`, 10, y); y += 8;
    doc.text(`Jam: ${transaksi.jam}`, 10, y); y += 8;

    transaksi.items.forEach((item) => {
      doc.text(`${item.menu?.nama ?? "Menu sudah dihapus"} - ${item.jumlah} x ${item.harga_satuan}`, 10, y);
      y += 8;
    });

    const total = transaksi.items.reduce((a, i) => a + i.jumlah * i.harga_satuan, 0);
    doc.text(`Total: Rp. ${total}`, 10, y + 4);

    doc.save(`transaksi-${index}.pdf`);
  };

  return (
    <Layout>
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
      <div className="flex items-center gap-2 mb-4 font-bold">
        <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
        <p>Tanggal</p>
      </div>

        <div className="bg-white border border-pink-300 mb-8 p-4 rounded-lg shadow-md shadow-pink-200/50">
          <input
            type="date"
            value={tanggalFilter ?? ""}
            onChange={(e) => router.get("/riwayat", { tanggal: e.target.value })}
            className="rounded px-2 py-1 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {riwayat.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">Belum ada riwayat transaksi</p>
          ) : (
            riwayat.map((transaksi, index) => {
              const total = transaksi.items.reduce((acc, item) => acc + item.jumlah * item.harga_satuan, 0);

              return (
                <div key={index} className="flex flex-col m-2 rounded-md text-base w-full sm:w-fit overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center bg-rose-300 w-full sm:w-72 lg:w-80 text-left font-semibold px-4 py-2 relative">
                    <div>
                      <p>{transaksi.tanggal}</p>
                      <p>{transaksi.jam}</p>
                    </div>

                    <div className="relative">
                      <button onClick={() => setShowExport(showExport === index ? null : index)}>
                        <FiMoreVertical size={24} />
                      </button>

                      {showExport === index && (
                        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            className="w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleExportPDF(transaksi, index)}
                          >
                            Export PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {transaksi.items.map((item, i) => (
                    <div key={i} className="bg-rose-100 px-4 py-2">
                      <p>{item.menu?.nama ?? "Menu sudah dihapus"}</p>
                      <div className="flex justify-between w-full mt-1">
                        <p>Jumlah: {item.jumlah}</p>
                        <p className="text-right">Rp. {item.jumlah * item.harga_satuan}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between w-full bg-rose-100 font-bold border-t-2 border-gray-400 px-4 py-2">
                    <p>Total</p>
                    <p>Rp. {total}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
