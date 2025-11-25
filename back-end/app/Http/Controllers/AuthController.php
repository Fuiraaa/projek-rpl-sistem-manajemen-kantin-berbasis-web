<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin() {
        return view('login');
    }

    public function showSignup() {
        return view('signup');
    }

    public function register(Request $request)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
    ], [
        'email.unique' => 'Email sudah digunakan!',
        'password.confirmed' => 'Password tidak sesuai!',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return redirect()->route('login')->with('success', 'Registrasi berhasil! Silakan login.');
    }

    public function login(Request $request)
    {
        $user = User::where('name', $request->username)->first(); // pakai 'name' sebagai username

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['login' => 'Username atau password salah'])->withInput();
        }

            // Login user secara resmi
            Auth::login($user);

        // Login sukses, redirect ke dashboard (contoh)
        return redirect('/profile')->with('success', 'Login berhasil!');
    }

        public function logout(Request $request)
    {
        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Untuk request Inertia/React
        if ($request->header('X-Inertia')) {
            return redirect('/login');
        }

        return redirect('/login')->with('success', 'Anda telah berhasil logout.');
    }
}


