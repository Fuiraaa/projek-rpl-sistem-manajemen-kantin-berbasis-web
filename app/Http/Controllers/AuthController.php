<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Storage;

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
        $user = User::where('name', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['login' => 'Username atau password salah'])->withInput();
        }

        // ✅ CLEAR SESSION DATA SEBELUM LOGIN
        $request->session()->flush();

        Auth::login($user);

        return redirect('/dashboard')->with('success', 'Login berhasil!');
    }

    public function logout(Request $request)
    {
        // ✅ CLEAR SESSION DATA SEBELUM LOGOUT
        $request->session()->flush();
        
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->header('X-Inertia')) {
            return redirect('/login');
        }

        return redirect('/login')->with('success', 'Anda telah berhasil logout.');
    }
}