import React, { useState, useEffect } from "react";
import { ChevronDown, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { usePage, router } from "@inertiajs/react";
import Layout from "../components/Layout";

export default function SettingsContent() {
  // --- LOGIKA BACKEND & STATE ---
  const { settings = {}, last_backup = "-", flash = {} } = usePage().props;

  // State untuk form
  const [selectedDate, setSelectedDate] = useState(settings.tanggal_sistem || new Date().toISOString().split('T')[0]);
  const [fontSize, setFontSize] = useState(settings.ukuran_font || "14");
  const [restoreFile, setRestoreFile] = useState("");

  // Loading states
  const [processingSave, setProcessingSave] = useState(false);
  const [processingBackup, setProcessingBackup] = useState(false);
  const [processingDownload, setProcessingDownload] = useState(false); // [Baru] State untuk tombol download laporan

  // Effect: Terapkan Font Size ke Root HTML
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "12") root.style.fontSize = "13px";
    else if (fontSize === "16") root.style.fontSize = "17px";
    else root.style.fontSize = "15px";
    localStorage.setItem('app_font_size', fontSize);
  }, [fontSize]);

  // Handler: Simpan Pengaturan (Tanggal & Font)
  const handleSave = () => {
    setProcessingSave(true);
    router.post('/settings/update', {
      tanggal_sistem: selectedDate,
      ukuran_font: fontSize
    }, {
      onFinish: () => setProcessingSave(false),
      preserveScroll: true
    });
  };

  // Handler: Reset Form
  const handleCancel = () => {
    setSelectedDate(settings.tanggal_sistem || new Date().toISOString().split('T')[0]);
    setFontSize(settings.ukuran_font || "14");
    router.reload();
  };

  // Handler: Backup Data
  const handleBackup = () => {
    if(confirm("Apakah Anda yakin ingin melakukan backup data?")) {
        setProcessingBackup(true);
        window.location.href = '/settings/backup'; // Trigger download
        setTimeout(() => setProcessingBackup(false), 3000);
    }
  };

  // Handler: Download Laporan Keuangan (Excel)
  const handleDownloadReport = () => {
    setProcessingDownload(true);
    // Mengarahkan browser ke route download laporan (Excel)
    window.location.href = '/settings/report'; 
    
    // Matikan loading setelah 3 detik (karena download tidak memberikan callback selesai)
    setTimeout(() => setProcessingDownload(false), 3000);
  };

  return (
    <Layout>
      {/* Flash Message Overlay */}
      {flash.success && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <CheckCircle size={16} /> {flash.success}
        </div>
      )}

      {/* CONTAINER UTAMA: 
         - 'items-stretch': Memastikan tinggi kolom kiri & kanan sama.
      */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 w-full max-w-6xl mx-auto p-6">

        {/* --- BAGIAN KIRI: PREFERENSI UMUM (Lebar Mengisi Sisa Ruang) --- */}
        <div className="flex flex-col gap-6 bg-white px-8 py-6 rounded-lg shadow-md border border-pink-100 w-full">
          <h1 className="text-pink-600 font-bold text-xl mb-2">Preferensi Umum</h1>
          <div className="flex flex-col gap-6 mt-12">

            {/* Input Tanggal */}
            <div className="flex items-center gap-4 relative">
              <label htmlFor="date" className="font-semibold w-32 text-gray-700"> Tanggal </label>
              <input 
                id="date" 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-pink-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
              />
            </div>

            {/* Input Ukuran Font */}
            <div className="flex items-center gap-4 relative">
              <label htmlFor="font-size" className="font-semibold w-32 text-gray-700"> Ukuran Font </label>

              <div className="relative w-full">
                <select 
                    id="font-size" 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full appearance-none border border-pink-300 bg-white rounded px-2 py-1.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
                >
                  <option value="" disabled>Pilih ukuran font</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                </select>

                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
              </div>
            </div>
          </div>

          {/* Tombol Action (Pindah ke bawah agar mengisi ruang jika card tinggi) */}
          <div className="flex gap-3 mt-auto pt-6">
            <button 
                onClick={handleSave}
                disabled={processingSave}
                className="text-pink-600 font-semibold px-4 py-2 rounded hover:bg-pink-50 border border-transparent hover:border-pink-200 transition flex items-center gap-2 disabled:opacity-50"
            >
              {processingSave && <Loader2 className="animate-spin" size={14} />}
              Perbarui
            </button>
            
            <button 
                onClick={handleCancel}
                className="text-pink-600 font-semibold px-4 py-2 rounded hover:bg-pink-50 transition"
            >
              Batalkan
            </button>
          </div>
        </div>

        {/* --- BAGIAN KANAN: DUA CARD (Backup & Download) --- */}
        {/* 'flex flex-col': Susun ke bawah */}
        {/* 'md:w-80': Lebar tetap pada layar besar */}
        <div className="flex flex-col gap-6 md:w-80 shrink-0">
          
          {/* Card Backup */}
          {/* TAMBAHKAN 'flex-1': Agar memanjang mengisi 50% ruang vertikal */}
          {/* TAMBAHKAN 'justify-center': Agar isi card berada di tengah vertikal */}
          <div className="flex-1 flex flex-col justify-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-pink-100 text-sm">
            <h1 className="text-pink-600 font-bold text-lg">Back Up</h1>
            <button 
                onClick={handleBackup}
                disabled={processingBackup}
                className="w-full bg-pink-100 text-pink-600 font-bold rounded-lg px-4 py-2 hover:bg-pink-200 transition flex justify-center gap-2 items-center disabled:opacity-50"
            >
                {processingBackup ? 'Mengunduh...' : 'Backup'}
            </button>

            <p className="text-gray-400 text-xs">
              Terakhir diperbarui tanggal<br />
              <span className="font-medium text-gray-600">{last_backup}</span>
            </p>
          </div>

          {/* Card Download Data */}
          {/* TAMBAHKAN 'flex-1': Agar memanjang mengisi 50% sisa ruang vertikal */}
          {/* TAMBAHKAN 'justify-center': Agar isi card berada di tengah vertikal */}
          <div className="flex-1 flex flex-col justify-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-pink-100 text-sm">
            <h1 className="text-pink-600 font-bold text-lg">Download Data</h1>
            <button 
                onClick={handleDownloadReport} 
                disabled={processingDownload} 
                className="w-full bg-pink-100 text-pink-600 font-bold rounded-lg px-4 py-2 hover:bg-pink-200 transition flex justify-center gap-2 items-center disabled:opacity-50"
            >
                {processingDownload ? 'Mengunduh...' : 'Download'}
            </button>

            <p className="text-gray-400 text-xs">
              Terakhir diperbarui tanggal<br />
              <span className="font-medium text-gray-600">{last_backup}</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}