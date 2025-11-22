<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;

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

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'showProfile'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');
    Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');
});

// ================================
// 🔥 INERTIA REACT ROUTING BARU 🔥
// ================================
Route::get('/riwayat', function () {
    return Inertia::render('Riwayat'); // <= file React di resources/js/Pages/Riwayat.jsx
});

Route::get('/setting', function () {
    return Inertia::render('Setting'); 
});

Route::get('/produksi', function () {
    return Inertia::render('ProduksiHarian'); 
});