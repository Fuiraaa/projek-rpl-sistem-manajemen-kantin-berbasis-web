<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Pengeluaran;
use App\Models\ProduksiDetail;
use App\Models\ProduksiHarian;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $today = Carbon::today();

        // --- FILTER CHART (Mingguan & Harian) ---
        // Ambil tanggal filter masing-masing (fallback ke hari ini jika kosong)
        $weeklyDate = $request->input('date_weekly', $today->toDateString());
        $dailyDate = $request->input('date_daily', $today->toDateString());
        
        // Gunakan $weeklyDate untuk Chart Pendapatan Mingguan
        $startOfWeek = Carbon::parse($weeklyDate)->startOfWeek(Carbon::MONDAY);
        $endOfWeek = Carbon::parse($weeklyDate)->endOfWeek(Carbon::FRIDAY);

        // ==========================================
        // 1. STATS CARD (HARI INI)
        // ==========================================
        
        $pendapatanHariIni = Transaksi::where('user_id', $userId)
            ->whereDate('tanggal_transaksi', $today)
            ->sum('total_harga');

        $pengeluaranHariIni = Pengeluaran::where('user_id', $userId)
            ->whereDate('tanggal_pengeluaran', $today)
            ->sum('jumlah');

        $labaKotorHariIni = $pendapatanHariIni - $pengeluaranHariIni;

        $totalTransaksiHariIni = Transaksi::where('user_id', $userId)
            ->whereDate('tanggal_transaksi', $today)
            ->count();

        // CARI DATA PRODUKSI HARI INI
        $produksiHariIni = ProduksiHarian::where('user_id', $userId)
            ->whereDate('tanggal_produksi', $today)
            ->first();

        $produksiHariIniId = $produksiHariIni ? $produksiHariIni->produksi_harian_id : null;

        // Hitung Total Sisa Menu
        $sisaMenu = 0;
        if ($produksiHariIniId) {
            // Sesuai migrasi Anda: kolom 'jumlah_tersisa'
            $sisaMenu = ProduksiDetail::where('produksi_harian_id', $produksiHariIniId)
                ->sum('jumlah_tersisa'); 
        }

        // ==========================================
        // 2. GRAFIK PENDAPATAN MINGGUAN
        // ==========================================
        $weeklyChart = [];
        $period = \Carbon\CarbonPeriod::create($startOfWeek, $endOfWeek);

        foreach ($period as $date) {
            $revenue = Transaksi::where('user_id', $userId)
                ->whereDate('tanggal_transaksi', $date)
                ->sum('total_harga');

            $weeklyChart[] = [
                'name' => $date->translatedFormat('l'),
                'date' => $date->format('Y-m-d'),
                'keuntungan' => (int) $revenue
            ];
        }

        // ==========================================
        // 3. MENU TERLARIS (TOP 5) - FIXED JOIN
        // ==========================================
        $menuTerlaris = DB::table('transaksi_detail')
            // Join ke Transaksi untuk filter User & Tanggal
            ->join('transaksis', 'transaksi_detail.transaksi_id', '=', 'transaksis.transaksi_id')
            
            // JEMBATAN PENTING: Join ke produksi_detail dulu
            ->join('produksi_detail', 'transaksi_detail.produksi_detail_id', '=', 'produksi_detail.produksi_detail_id')
            
            // BARU BISA: Join ke menus (lewat produksi_detail)
            ->join('menus', 'produksi_detail.menu_id', '=', 'menus.menu_id')
            
            ->where('transaksis.user_id', $userId)
            // PERUBAHAN UTAMA: Filter berdasarkan TANGGAL SPESIFIK ($dailyDate)
            ->whereDate('transaksis.tanggal_transaksi', $dailyDate)
            
            // Sesuai migrasi Anda: kolom 'jumlah' di tabel transaksi_detail
            ->select('menus.nama', DB::raw('SUM(transaksi_detail.jumlah) as total_terjual'))
            
            ->groupBy('menus.menu_id', 'menus.nama')
            ->orderByDesc('total_terjual')
            ->limit(5)
            ->get();

        // ==========================================
        // 4. TRANSAKSI TERBARU (LIMIT 10)
        // ==========================================
        $transaksiTerbaru = Transaksi::where('user_id', $userId)
            ->latest('created_at')
            ->limit(10)
            ->get();

        // ==========================================
        // 5. STOK MENU (REALTIME HARI INI)
        // ==========================================
        $stokMenu = [];
        if ($produksiHariIniId) {
            $stokMenu = DB::table('produksi_detail')
                ->join('menus', 'produksi_detail.menu_id', '=', 'menus.menu_id')
                ->where('produksi_detail.produksi_harian_id', $produksiHariIniId)
                
                // Sesuai migrasi Anda: kolom 'jumlah_tersisa'
                ->select('menus.nama as nama_menu', 'produksi_detail.jumlah_tersisa as stok')
                
                ->orderBy('stok', 'asc')
                ->get();
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'pendapatan_hari_ini' => $pendapatanHariIni,
                'laba_kotor_hari_ini' => $labaKotorHariIni,
                'total_transaksi' => $totalTransaksiHariIni,
                'sisa_menu' => (int) $sisaMenu,
            ],
            'chartData' => $weeklyChart,
            'topMenu' => $menuTerlaris,
            'recentTransactions' => $transaksiTerbaru,
            'stokMenu' => $stokMenu,
            
            // Perbaikan: Hapus 'filters' => ['date' => $filterDate] karena variabel $filterDate sudah tidak ada
            // Kita kirim balik tanggal spesifik untuk masing-masing chart
            'filters' => [
                'weekly' => $weeklyDate,
                'daily' => $dailyDate,
            ],
            'weeklyFilterDate' => $weeklyDate, 
            'dailyFilterDate' => $dailyDate,
        ]);
    }
}