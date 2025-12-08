<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        
        // Filter Bulan & Tahun (Default: Bulan ini, Tahun ini)
        $bulan = $request->input('bulan', Carbon::now()->month);
        $tahun = $request->input('tahun', Carbon::now()->year);

        // --- FITUR 4, 5, 6: STATISTIK CARD (Filter Bulan) ---
        
        // 1. Total Pemasukan Bulan Ini (Otomatis dari tabel Transaksi)
        $pemasukanBulanIni = Transaksi::where('user_id', $userId)
            ->whereMonth('tanggal_transaksi', $bulan)
            ->whereYear('tanggal_transaksi', $tahun)
            ->sum('total_harga');

        // 2. Total Pengeluaran Bulan Ini (Dari tabel Pengeluaran)
        $pengeluaranBulanIni = Pengeluaran::where('user_id', $userId)
            ->whereMonth('tanggal_pengeluaran', $bulan)
            ->whereYear('tanggal_pengeluaran', $tahun)
            ->sum('jumlah');

        // 3. Laba Bersih Bulan Ini
        $labaBulanIni = $pemasukanBulanIni - $pengeluaranBulanIni;


        // --- FITUR 3: TOTAL PEMASUKAN TAHUN INI (NET PROFIT YTD) ---
        $pemasukanTahun = Transaksi::where('user_id', $userId)
            ->whereYear('tanggal_transaksi', $tahun)
            ->sum('total_harga');
            
        $pengeluaranTahun = Pengeluaran::where('user_id', $userId)
            ->whereYear('tanggal_pengeluaran', $tahun)
            ->sum('jumlah');
            
        $totalLabaTahunIni = $pemasukanTahun - $pengeluaranTahun;


        // --- FITUR 7: GRAFIK KEUANGAN (Per Bulan) ---
        $chartData = [];
        for ($i = 1; $i <= 12; $i++) {
            // Hitung pemasukan per bulan loop
            $income = Transaksi::where('user_id', $userId)
                ->whereYear('tanggal_transaksi', $tahun)
                ->whereMonth('tanggal_transaksi', $i)
                ->sum('total_harga');

            // Hitung pengeluaran per bulan loop
            $expense = Pengeluaran::where('user_id', $userId)
                ->whereYear('tanggal_pengeluaran', $tahun)
                ->whereMonth('tanggal_pengeluaran', $i)
                ->sum('jumlah');
            
            // Konversi angka bulan ke nama singkatan (Jan, Feb, dll)
            $namaBulan = Carbon::create()->month($i)->translatedFormat('M');

            $chartData[] = [
                'name' => $namaBulan,
                'pemasukan' => (int) $income,
                'pengeluaran' => (int) $expense
            ];
        }

        return Inertia::render('Lapkeu', [
            'stats' => [
                'pemasukan' => $pemasukanBulanIni,
                'pengeluaran' => $pengeluaranBulanIni,
                'laba' => $labaBulanIni,
                'total_laba_tahun' => $totalLabaTahunIni,
            ],
            'filters' => [
                'bulan' => (int)$bulan,
                'tahun' => (int)$tahun,
            ],
            'chartData' => $chartData
        ]);
    }

    // --- FITUR 2: SIMPAN PENGELUARAN ---
    public function storePengeluaran(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            // Default tanggal hari ini jika user tidak pilih tanggal
            'tanggal_pengeluaran' => 'nullable|date', 
        ]);

        Pengeluaran::create([
            'user_id' => Auth::id(),
            'deskripsi' => $request->deskripsi,
            'jumlah' => $request->jumlah,
            'tanggal_pengeluaran' => $request->tanggal_pengeluaran ?? Carbon::now(),
        ]);

        return redirect()->back()->with('success', 'Pengeluaran berhasil disimpan!');
    }
    
    // --- HALAMAN TABEL DETAIL PENGELUARAN ---
    public function tabelPengeluaran(Request $request)
    {
        $query = Pengeluaran::where('user_id', Auth::id());

        // Filter tanggal jika ada
        if ($request->has('tanggal') && $request->tanggal != '') {
            $query->whereDate('tanggal_pengeluaran', $request->tanggal);
        }

        $pengeluaran = $query->orderBy('tanggal_pengeluaran', 'desc')->get();

        return Inertia::render('Lapkeu', [
            'tabel' => true, // Flag untuk render komponen tabel
            'dataPengeluaran' => $pengeluaran,
            'filters' => ['tanggal' => $request->tanggal]
        ]);
    }
}