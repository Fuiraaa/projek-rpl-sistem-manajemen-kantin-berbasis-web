<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserContact;
use App\Models\UserProfile;

class ProfileController extends Controller
{

    public function showProfile()
    {
        $user = Auth::user();

        if (!$user) {
        return redirect()->route('login');
        }

        // Ambil data profile dan contact dari relasi
        $profile = $user->profile;   // dari tabel user_profiles
        $contact = $user->contact;   // dari tabel user_contacts

        return Inertia::render('Profile', [
            'user' => $user,
            'profile' => $profile,
            'contact' => $contact,
        ]);
    }

    public function updateProfile(Request $request)
    {
    $user = Auth::user();

    // Validasi semua field
    $request->validate([
        'first_name' => 'nullable|string|max:255',
        'last_name' => 'nullable|string|max:255',
        'email' => 'nullable|email|unique:users,email,' . $user->id,
        'gender' => 'nullable|string|max:10',
        'birth_date' => 'nullable|date',
        'phone' => 'nullable|string|max:20',
        'country' => 'nullable|string|max:50',
        'address' => 'nullable|string|max:255',
    ]);

    // Update email di tabel users
    if ($request->email) {
        $user->email = $request->email;
        $user->save();
    }

    // Update atau buat record di tabel user_profiles
    $user->profile()->updateOrCreate(
        ['user_id' => $user->id],
        $request->only(['first_name', 'last_name', 'gender', 'birth_date'])
    );

    // Update atau buat record di tabel user_contacts
    $user->contact()->updateOrCreate(
        ['user_id' => $user->id],
        $request->only(['phone', 'country', 'address'])
    );

    return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}
