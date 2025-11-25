<?php
// app/Http/Controllers/ProduksiHarianController.php

namespace App\Http\Controllers;

use App\Models\ProduksiHarian;
use App\Models\ProduksiDetail;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProduksiHarianController extends Controller
{
    public function index()
    {
        // ✅ HANYA AMBIL DATA USER YANG LOGIN
        $menus = Menu::where('user_id', auth()->id())->get();

        $allProduksi = ProduksiHarian::with(['produksiDetail.menu'])
            ->where('user_id', auth()->id()) // ✅ FILTER BY USER
            ->orderBy('tanggal_produksi', 'desc')
            ->get();

        return Inertia::render('ProduksiHarian', [
            'menus' => $menus,
            'allProduksi' => $allProduksi
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal_produksi' => 'required|date',
            'items' => 'required|array',
            'items.*.menu_id' => 'required|exists:menus,menu_id',
            'items.*.jumlah_porsi' => 'required|integer|min:0',
        ]);

        return DB::transaction(function () use ($request) {
            // ✅ PASTIKAN HANYA CEK PRODUKSI USER SENDIRI
            $existingProduksi = ProduksiHarian::where('tanggal_produksi', $request->tanggal_produksi)
                ->where('user_id', auth()->id())
                ->first();

            if ($existingProduksi) {
                $produksiHarian = $existingProduksi;
                ProduksiDetail::where('produksi_harian_id', $produksiHarian->produksi_harian_id)->delete();
            } else {
                $produksiHarian = ProduksiHarian::create([
                    'user_id' => auth()->id(),
                    'tanggal_produksi' => $request->tanggal_produksi,
                ]);
            }

            foreach ($request->items as $item) {
                $menu = Menu::find($item['menu_id']);

                ProduksiDetail::create([
                    'produksi_harian_id' => $produksiHarian->produksi_harian_id,
                    'menu_id' => $item['menu_id'],
                    'nama_menu' => $menu->nama,
                    'harga' => $menu->harga,
                    'jumlah_porsi' => $item['jumlah_porsi'],
                    'jumlah_tersisa' => $item['jumlah_porsi'],
                    'gambar' => $menu->gambar,
                ]);
            }

            return back()->with('success', 'Produksi harian berhasil disimpan');
        });
    }
}