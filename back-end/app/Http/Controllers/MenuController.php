<?php
// app/Http/Controllers/MenuController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Menu;
use Illuminate\Support\Facades\Auth; // 🔑 IMPORT AUTH

class MenuController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // 🔥 Hanya ambil menu milik user yang sedang login
        $menus = $user->menus()->get();

        return Inertia::render('ProduksiHarian', [
            'initialMenus' => $menus->map(function($menu) {
                return [
                    'id' => $menu->id,
                    'nama' => $menu->nama,
                    'harga' => $menu->harga,
                    'quantity' => $menu->quantity,
                    'gambar' => $menu->gambar
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        // Debug incoming data
        \Log::info('Data received from frontend:', $request->all());
        
        $user = Auth::user(); // 🔑 DAPATKAN USER YANG LOGIN
        
        $validated = $request->validate([
            'menus' => 'required|array',
            'menus.*.id' => 'nullable',
            'menus.*.name' => 'required|string|max:255',
            'menus.*.price' => 'required|integer|min:0',
            'menus.*.qty' => 'required|integer|min:0',
            'menus.*.img' => 'nullable|string',
        ]);

        try {
            foreach ($validated['menus'] as $item) {
                // Handle base64 image jika ada gambar baru
                $gambar = $item['img'];
                if (isset($item['img']) && strpos($item['img'], 'data:image') === 0) {
                    $gambar = $this->saveBase64Image($item['img']);
                }

                // 🔥 PASTIKAN menu hanya bisa diupdate/dibuat untuk user yang login
                Menu::updateOrCreate(
                    [
                        'id' => $item['id'] ?? null,
                        'user_id' => $user->id // 🔑 Hanya update jika user_id sesuai
                    ],
                    [
                        'user_id' => $user->id, // 🔑 SELALU set user_id
                        'nama' => $item['name'],
                        'harga' => $item['price'],
                        'quantity' => $item['qty'],
                        'gambar' => $gambar,
                    ]
                );
            }

            return back()->with('success', 'Data produksi harian berhasil disimpan!');
            
        } catch (\Exception $e) {
            \Log::error('Error saving menu: ' . $e->getMessage());
            
            return back()->withErrors([
                'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
            ]);
        }
    }

    private function saveBase64Image($base64Image)
    {
        $imageName = 'menu_' . time() . '_' . uniqid() . '.png';
        $path = public_path('storage/menus/' . $imageName);
        
        // Buat directory jika belum ada
        if (!file_exists(public_path('storage/menus'))) {
            mkdir(public_path('storage/menus'), 0755, true);
        }
        
        if (preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
            $data = substr($base64Image, strpos($base64Image, ',') + 1);
            $data = base64_decode($data);
            
            if (file_put_contents($path, $data)) {
                return 'storage/menus/' . $imageName;
            }
        }
        
        return null;
    }
}