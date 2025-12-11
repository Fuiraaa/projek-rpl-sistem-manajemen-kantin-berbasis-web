<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\ProduksiHarianController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingController;
use Inertia\Inertia;

// ==========================
// Public Routes
// ==========================
Route::get('/', function () {
    return view('welcome');
});

// AUTH (BLADE)
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/signup', [AuthController::class, 'showSignup'])->name('signup');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');


// ==========================
// Protected Routes (Require Login)
// ==========================
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // ==========================
    // PROFILE
    // ==========================
    Route::get('/profile', [ProfileController::class, 'showProfile'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');

    // ==========================
    // MENU
    // ==========================
    Route::post('/menus', [MenuController::class, 'store'])->name('menus.store');

    // ==========================
    // PRODUKSI HARIAN
    // ==========================
    Route::get('/produksi', [ProduksiHarianController::class, 'index'])->name('produksi.index');
    Route::post('/produksi', [ProduksiHarianController::class, 'store'])->name('produksi.store');

    // ==========================
    // TRANSAKSI
    Route::get('/transaksi', [TransaksiController::class, 'index'])->name('transaksi.index');
    Route::post('/transaksi', [TransaksiController::class, 'store'])->name('transaksi.store');
    Route::post('/transaksi/get-produksi-by-date', [TransaksiController::class, 'getProduksiByDate'])->name('transaksi.get-produksi-by-date');
    
    // RIWAYAT
    // ==========================
    Route::get('/riwayat', [RiwayatController::class, 'riwayat'])->name('riwayat');
    
    // Laporan Keuangan
    // ==========================
    Route::middleware(['auth'])->group(function () {
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::post('/laporan/pengeluaran', [LaporanController::class, 'storePengeluaran'])->name('laporan.store');
    Route::get('/laporan/tabel', [LaporanController::class, 'tabelPengeluaran'])->name('laporan.tabel');
    }); 

    // DASHBOARD
    // ==========================
    Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
    
    // Setting
    // ==========================
   Route::middleware(['auth'])->group(function () {
    // ... route lainnya ...

    // --- SETTINGS ---
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    
    // UPDATE tetap POST karena mengirim data form
    Route::post('/settings/update', [SettingController::class, 'update'])->name('settings.update');
    
    // UBAH JADI GET (agar bisa didownload via browser/window.location)
    Route::get('/settings/backup', [SettingController::class, 'backup'])->name('settings.backup');
    Route::get('/settings/report', [SettingController::class, 'downloadReport'])->name('settings.report');
    });
    Route::get('/setting', fn() => Inertia::render('Setting'))->name('setting');

    // ==========================
    // Protected Routes (Require Login)
    // ==========================
    // Tambahkan 'prevent-back-history' di sini 👇
    Route::middleware(['auth', 'prevent-back-history'])->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        
        // ... route lainnya (Profile, Menu, Laporan, dll) ...

});
});
