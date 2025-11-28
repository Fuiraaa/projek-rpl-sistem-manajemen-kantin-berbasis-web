<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\ProduksiHarianController;
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
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

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
    // ==========================
Route::get('/transaksi', [TransaksiController::class, 'index'])->name('transaksi.index');
Route::post('/transaksi', [TransaksiController::class, 'store'])->name('transaksi.store');
Route::post('/transaksi/get-produksi-by-date', [TransaksiController::class, 'getProduksiByDate'])->name('transaksi.get-produksi-by-date');


    // ==========================
    // INERTIA PAGES
    // ==========================
    Route::get('/setting', fn() => Inertia::render('Setting'))->name('setting');
    Route::get('/riwayat', fn() => Inertia::render('Riwayat'))->name('riwayat');
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
});
