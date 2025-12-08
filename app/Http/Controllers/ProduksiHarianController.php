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
        $menus = Menu::where('user_id', auth()->id())->get();

        $allProduksi = ProduksiHarian::with(['produksiDetail.menu'])
            ->where('user_id', auth()->id())
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

        try {
            DB::transaction(function () use ($request) {
                // 1. Cari atau Buat Header Produksi Harian
                // Kita pakai firstOrCreate agar lebih rapi
                $produksiHarian = ProduksiHarian::firstOrCreate(
                    [
                        'tanggal_produksi' => $request->tanggal_produksi,
                        'user_id' => auth()->id()
                    ],
                    // Jika baru dibuat, timestamps akan otomatis terisi
                );

                // --- PERBAIKAN UTAMA DI SINI ---
                // JANGAN MENGHAPUS SEMUA DATA DETAIL (delete() DIHAPUS)
                // Kita akan loop items dan melakukan UPDATE cerdas

                foreach ($request->items as $item) {
                    $menu = Menu::find($item['menu_id']);

                    // Cek apakah item ini sudah ada di DB sebelumnya?
                    $existingDetail = ProduksiDetail::where('produksi_harian_id', $produksiHarian->produksi_harian_id)
                        ->where('menu_id', $item['menu_id'])
                        ->first();

                    if ($existingDetail) {
                        // === LOGIKA UPDATE (Jaga Data Penjualan) ===
                        
                        // 1. Hitung berapa yang sudah laku (Terjual = Porsi Lama - Sisa Lama)
                        $sudahTerjual = $existingDetail->jumlah_porsi - $existingDetail->jumlah_tersisa;
                        
                        // 2. Hitung Sisa Baru (Sisa Baru = Input Baru - Sudah Terjual)
                        $sisaBaru = $item['jumlah_porsi'] - $sudahTerjual;

                        // Validasi: Jangan sampai stok baru lebih kecil dari yang sudah laku
                        if ($sisaBaru < 0) {
                            throw new \Exception("Gagal update: Menu '{$menu->nama}' sudah terjual {$sudahTerjual} porsi. Anda tidak bisa menurunkan stok menjadi {$item['jumlah_porsi']}.");
                        }

                        // 3. Update Data
                        $existingDetail->update([
                            'jumlah_porsi'   => $item['jumlah_porsi'],
                            'jumlah_tersisa' => $sisaBaru, // Pakai hasil hitungan
                            'nama_menu'      => $menu->nama, // Update nama jaga-jaga kalau master berubah
                            'harga'          => $menu->harga,
                            'gambar'         => $menu->gambar,
                        ]);

                    } else {
                        // === LOGIKA BARU (Item belum pernah ada) ===
                        // Karena belum ada penjualan, Sisa = Jumlah Porsi
                        ProduksiDetail::create([
                            'produksi_harian_id' => $produksiHarian->produksi_harian_id,
                            'menu_id'        => $item['menu_id'],
                            'nama_menu'      => $menu->nama,
                            'harga'          => $menu->harga,
                            'jumlah_porsi'   => $item['jumlah_porsi'],
                            'jumlah_tersisa' => $item['jumlah_porsi'], // Masih utuh
                            'gambar'         => $menu->gambar,
                        ]);
                    }
                }
            });

            return back()->with('success', 'Produksi harian berhasil disimpan');

        } catch (\Exception $e) {
            // Tangkap error jika validasi sisa stok gagal
            return back()->withErrors(['msg' => $e->getMessage()]);
        }
    }
}