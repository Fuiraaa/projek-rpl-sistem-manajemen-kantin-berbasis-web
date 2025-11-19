<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', [AuthController::class, 'showLogin']) -> name('login');
Route::get('signup', [AuthController::class, 'showSignup']) -> name('signup');

Route::get('/dashboard', function() {
    return view('dashboard');
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
