<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return view('welcome');
});

// AUTH ROUTES (Blade)
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/signup', [AuthController::class, 'showSignup'])->name('signup');

Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');

// 🔥 LOGOUT ROUTE - Pindahkan di luar middleware auth
Route::get('/logout', [AuthController::class, 'logout'])->name('logout.get');

Route::middleware(['auth'])->group(function () {

    // Route Profile
    Route::get('/profile', [ProfileController::class, 'showProfile'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');

});


// routes/web.php
Route::middleware(['auth'])->group(function () {
    // Route Produksi
    Route::get('/produksi', [MenuController::class, 'index'])->name('produksi.index');
    Route::post('/produksi/save', [MenuController::class, 'store'])->name('produksi.save');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/transaksi', [TransactionController::class, 'index'])->name('transaksi.index');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
});

// ================================
// 🔥 INERTIA REACT ROUTING BARU 🔥
// ================================

Route::get('/setting', function () {
    return Inertia::render('Setting'); 
});

Route::get('/riwayat', function () {
    return Inertia::render('Riwayat'); 
});