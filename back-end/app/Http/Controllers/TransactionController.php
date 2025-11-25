<?php
// app/Http/Controllers/TransactionController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Menu;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Ambil menu aktif milik user yang login
        $menus = $user->menus()
                    ->where('quantity', '>', 0)
                    ->where('is_active', true)
                    ->get();

        return Inertia::render('Transaksi', [
            'menuItems' => $menus->map(function($menu) {
                return [
                    'id' => $menu->id,
                    'name' => $menu->nama,
                    'price' => $menu->harga,
                    'img' => $menu->gambar ? asset($menu->gambar) : asset('images/default-menu.png'),
                    'stock' => $menu->quantity
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.name' => 'required|string'
        ]);

        try {
            // Generate transaction code
            $transactionCode = 'TRX-' . date('Ymd') . '-' . str_pad(Transaction::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT);

            // Calculate totals
            $totalAmount = 0;
            $totalItems = 0;
            
            foreach ($request->items as $item) {
                $totalAmount += $item['price'] * $item['quantity'];
                $totalItems += $item['quantity'];
            }

            // Create transaction
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'transaction_code' => $transactionCode,
                'total_amount' => $totalAmount,
                'total_items' => $totalItems,
                'status' => 'completed'
            ]);

            // Create transaction items and update menu stock
            foreach ($request->items as $item) {
                $menu = Menu::where('id', $item['id'])
                          ->where('user_id', $user->id)
                          ->firstOrFail();

                // Check stock availability
                if ($menu->quantity < $item['quantity']) {
                    throw new \Exception("Stok {$menu->nama} tidak mencukupi. Stok tersedia: {$menu->quantity}");
                }

                // Create transaction item
                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'menu_id' => $menu->id,
                    'menu_name' => $menu->nama,
                    'menu_price' => $menu->harga,
                    'quantity' => $item['quantity'],
                    'subtotal' => $menu->harga * $item['quantity']
                ]);

                // Update menu stock
                $menu->decrement('quantity', $item['quantity']);
            }

            return back()->with('success', 'Transaksi berhasil dibuat! Kode: ' . $transactionCode);

        } catch (\Exception $e) {
            \Log::error('Transaction error: ' . $e->getMessage());
            return back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}