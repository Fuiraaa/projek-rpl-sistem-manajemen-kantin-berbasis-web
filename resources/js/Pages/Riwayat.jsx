import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import Layout from "../components/Layout";
// Menggunakan Lucide icons (Calendar & MoreVertical) menggantikan gambar png/react-icons
// agar konsisten dengan library backend, namun penempatannya disesuaikan design lama.
import { Calendar, MoreVertical, FileText, Image as ImageIcon } from "lucide-react";

export default function Riwayat() {
  // --- BAGIAN BACKEND & LOGIC (Dari RiwayatNew.txt) ---
  const { riwayat = [], tanggalFilter } = usePage().props;
  const [showExport, setShowExport] = useState(null);

  // 1. Logic Export PDF
  const handleExportPDF = (transaksi, index) => {
    const doc = new jsPDF();
    let y = 20;

    // Header PDF
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Struk Pembelian", 105, y, { align: "center" });
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 8;

    // Info Transaksi
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Tanggal : ${transaksi.tanggal_transaksi}`, 10, y); y += 7;
    doc.text(`Waktu   : ${transaksi.waktu_transaksi}`, 10, y); y += 10;

    // Detail Items
    doc.setFont("helvetica", "bold");
    doc.text("Detail Pesanan:", 10, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    transaksi.detail.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.nama_menu}`, 10, y);
      y += 6;
      doc.text(`   ${item.jumlah} x Rp ${item.harga_satuan.toLocaleString("id-ID")}`, 10, y);
      y += 6;
      doc.text(`   Subtotal: Rp ${item.subtotal.toLocaleString("id-ID")}`, 10, y);
      y += 10;
    });

    // Footer PDF
    doc.setLineWidth(0.3);
    doc.line(10, y, 200, y);
    y += 10;
    const total = transaksi.detail.reduce((acc, d) => acc + d.subtotal, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Total Pembayaran: Rp ${total.toLocaleString("id-ID")}`, 10, y);
    
    y += 20;
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text("Terima kasih telah berbelanja!", 105, y, { align: "center" });

    doc.save(`transaksi-${index}.pdf`);
    setShowExport(null);
  };

  // 2. Logic Export PNG
  const handleExportPNG = async (index) => {
    try {
      const element = document.getElementById(`transaksi-${index}`);
      if (!element) return;

      // Membuat elemen visual sementara untuk screenshot yang bersih
      const exportElement = document.createElement('div');
      exportElement.style.width = '350px';
      exportElement.style.background = 'white';
      exportElement.style.fontFamily = 'Arial, sans-serif';
      exportElement.style.padding = '20px';
      
      const transaksi = riwayat[index];
      const total = transaksi.detail.reduce((acc, d) => acc + d.subtotal, 0);
      const borderStyle = '1px dashed #e5e7eb';

      exportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #db2777; font-size: 20px;">STRUK PEMBELIAN</h2>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">${transaksi.tanggal_transaksi} • ${transaksi.waktu_transaksi}</p>
        </div>
        <div style="border-top: ${borderStyle}; margin-bottom: 15px;"></div>
      `;

      const itemsContainer = document.createElement('div');
      transaksi.detail.forEach((item) => {
        itemsContainer.innerHTML += `
          <div style="margin-bottom: 10px; font-size: 14px;">
             <div style="font-weight: bold; margin-bottom: 2px;">${item.nama_menu}</div>
             <div style="display: flex; justify-content: space-between; color: #444;">
                <span>${item.jumlah} x Rp ${item.harga_satuan.toLocaleString('id-ID')}</span>
                <span>Rp ${item.subtotal.toLocaleString('id-ID')}</span>
            </div>
          </div>
        `;
      });
      exportElement.appendChild(itemsContainer);

      const totalDiv = document.createElement('div');
      totalDiv.innerHTML = `
        <div style="border-top: ${borderStyle}; margin-top: 15px; padding-top: 15px;">
             <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px;">
                <span>Total Bayar</span>
                <span>Rp ${total.toLocaleString('id-ID')}</span>
             </div>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px; font-style: italic;">
            Terima kasih atas kunjungan Anda
        </div>
      `;
      exportElement.appendChild(totalDiv);

      document.body.appendChild(exportElement);
      exportElement.style.position = 'fixed';
      exportElement.style.left = '-9999px';
      exportElement.style.top = '0';

      const canvas = await html2canvas(exportElement, { backgroundColor: '#ffffff', scale: 2 });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `struk-${transaksi.tanggal_transaksi}-${index + 1}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      document.body.removeChild(exportElement);
      setShowExport(null);
    } catch (error) {
      console.error('Export PNG gagal:', error);
      alert('Gagal mengunduh gambar.');
    }
  };

  // --- BAGIAN FRONTEND & UI (Dari RiwayatOld.txt) ---
  return (  
    <Layout>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative min-h-screen">
            
            {/* Header: Tanggal */}
            <div className="flex items-center gap-2 mb-4 font-bold text-gray-700">
                {/* Menggunakan Icon Lucide menggantikan image kalender.png agar file self-contained */}
                <Calendar className="w-4 h-4 relative top-[1px] text-gray-600" />
                <p>Tanggal</p>
            </div>

            {/* Input Filter Date: Style dari RiwayatOld */}
            <div className="bg-white border border-pink-300 mb-8 p-4 rounded-lg shadow-md shadow-pink-200/50">
                <input 
                    type="date" 
                    value={tanggalFilter ?? ""}
                    onChange={(e) => router.get("/riwayat", { tanggal: e.target.value }, { preserveState: true })}
                    className="rounded px-2 py-1 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200" 
                />
            </div>

            {/* Grid Kartu Riwayat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {riwayat.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-400">
                        Tidak ada riwayat transaksi pada tanggal ini.
                    </div>
                ) : (
                    riwayat.map((transaksi, index) => {
                        // Hitung Total (Backend Logic)
                        const total = transaksi.detail.reduce((acc, d) => acc + d.subtotal, 0);

                        return (
                            <div 
                                key={index} 
                                id={`transaksi-${index}`} // ID Penting untuk Export PNG
                                className="flex flex-col m-2 rounded-md text-base w-full sm:w-72 lg:w-80 overflow-visible shadow-sm relative group"
                            >
                                {/* Header Kartu: Rose-300 */}
                                <div className="flex justify-between items-center bg-rose-300 w-full text-left font-semibold px-4 py-2 rounded-t-md relative">
                                    <div className="text-gray-800">
                                        <p className="text-sm">{transaksi.tanggal_transaksi}</p>
                                        <p className="text-xs mt-0.5 opacity-80">{transaksi.waktu_transaksi}</p>
                                    </div>

                                    {/* Dropdown Menu */}
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowExport(showExport === index ? null : index);
                                            }}
                                            className="p-1 hover:bg-rose-400/30 rounded-full transition"
                                        >
                                            <MoreVertical size={24} className="text-gray-700" />
                                        </button>

                                        {/* Dropdown Content */}
                                        {showExport === index && (
                                            <>
                                                {/* Klik luar untuk tutup */}
                                                <div className="fixed inset-0 z-10" onClick={() => setShowExport(null)}></div>
                                                
                                                {/* Menu Box */}
                                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-20 overflow-hidden">
                                                    <div className="px-3 py-2 text-xs font-bold text-gray-400 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
                                                        Export
                                                    </div>
                                                    <button 
                                                        onClick={() => handleExportPNG(index)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2"
                                                    >
                                                        <ImageIcon size={14} /> PNG
                                                    </button>
                                                    <button 
                                                        onClick={() => handleExportPDF(transaksi, index)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2"
                                                    >
                                                        <FileText size={14} /> PDF
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Body Kartu: List Items (Rose-100) */}
                                <div className="bg-rose-100 flex-1">
                                    {transaksi.detail.map((item, i) => (
                                        <div key={i} className="px-4 py-2 border-b border-rose-200/50 last:border-0">
                                            <p className="font-medium text-gray-800">{item.nama_menu}</p>
                                            <div className="flex justify-between w-full mt-1 text-sm text-gray-600">
                                                <p>Jumlah: {item.jumlah}</p>
                                                <p className="text-right font-medium">Rp. {(item.harga_satuan * item.jumlah).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Kartu: Total (Rose-100 + Border Abu Tebal) */}
                                <div className="flex justify-between w-full bg-rose-100 font-bold border-t-2 border-gray-400 px-4 py-3 rounded-b-md text-gray-800">
                                    <p>Total</p>
                                    <p>Rp. {total.toLocaleString('id-ID')}</p>
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