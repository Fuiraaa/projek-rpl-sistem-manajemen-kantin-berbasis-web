<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserContact;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Storage;

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

    // 1. Validasi (tambahkan validasi photo)
    $request->validate([
        'first_name' => 'nullable|string|max:255',
        'last_name'  => 'nullable|string|max:255',
        'email'      => 'nullable|email|unique:users,email,' . $user->id,
        'gender'     => 'nullable|string|max:10',
        'birth_date' => 'nullable|date',
        'phone'      => 'nullable|string|max:20',
        'country'    => 'nullable|string|max:50',
        'address'    => 'nullable|string|max:255',
        'photo'      => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // <--- Validasi Foto
    ]);

    // 2. Update Email User
    if ($request->email && $request->email !== $user->email) {
        $user->email = $request->email;
        $user->save();
    }

    // 3. Persiapkan Data Profil
    $profileData = $request->only(['first_name', 'last_name', 'gender', 'birth_date']);

    // 4. Logika Upload Foto
    if ($request->hasFile('photo')) {
        // Hapus foto lama jika ada
        if ($user->profile && $user->profile->profile_picture) {
            Storage::disk('public')->delete($user->profile->profile_picture);
        }
        // Simpan foto baru
        $path = $request->file('photo')->store('profiles', 'public');
        $profileData['profile_picture'] = $path;
    }

    // 5. Simpan ke user_profiles
    $user->profile()->updateOrCreate(
        ['user_id' => $user->id],
        $profileData
    );

    // 6. Simpan ke user_contacts
    $user->contact()->updateOrCreate(
        ['user_id' => $user->id],
        $request->only(['phone', 'country', 'address'])
    );

    return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
}
}
