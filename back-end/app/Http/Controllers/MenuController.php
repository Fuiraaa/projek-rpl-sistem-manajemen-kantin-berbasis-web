<?php
// app/Http/Controllers/MenuController.php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['nama', 'harga']);
        $data['user_id'] = auth()->id();

        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $imageName = time().'_'.$image->getClientOriginalName();
            $image->move(public_path('images/menus'), $imageName);
            $data['gambar'] = 'images/menus/'.$imageName;
        } else {
            $data['gambar'] = null;
        }

        $menu = Menu::create($data);

        return back()->with('success', 'Menu berhasil ditambahkan');
    }

    // ✅ TAMBAH METHOD INDEX UNTUK FILTER DATA
    public function index()
    {
        $menus = Menu::where('user_id', auth()->id())->get();
        return $menus;
    }
}