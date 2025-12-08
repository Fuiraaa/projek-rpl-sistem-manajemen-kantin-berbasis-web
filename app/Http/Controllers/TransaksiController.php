<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\TransaksiDetail;
use App\Models\ProduksiHarian;
use App\Models\ProduksiDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TransaksiController extends Controller
{
    public function index()
    {
        
    $produksiHarian = ProduksiHarian::with(['produksiDetail.menu'])
        ->where('user_id', auth()->id())
        ->orderBy('tanggal_produksi', 'desc')
        ->take(30) // Opsional: Batasi 30 hari terakhir agar tidak terlalu berat
        ->get();

    // Data transaksi history
    $transaksi = Transaksi::with('detail')
        ->where('user_id', auth()->id())
        ->latest()
        ->get();

    return inertia('Transaksi', [
        'produksi_harian' => $produksiHarian,
        'transaksi' => $transaksi,
    ]);

    }

    public function getProduksiByDate(Request $request)
    {
        $request->validate([
            'tanggal_produksi' => 'required|date'
        ]);

        $produksiDetail = ProduksiDetail::with(['menu', 'produksiHarian'])
            ->whereHas('produksiHarian', function($query) use ($request) {
                $query->where('tanggal_produksi', $request->tanggal_produksi);
            })
            ->where('jumlah_tersisa', '>', 0) // Hanya yang masih ada stok
            ->get();

        return response()->json([
            'produksi_detail' => $produksiDetail
        ]);
    }

    public function store(Request $request)
    {
        Log::info('🎯 === TRANSAKSI STORE DIPANGGIL ===');
        Log::info('Request Data:', $request->all());
        Log::info('Request Headers:', [
            'X-Selected-Date' => $request->header('X-Selected-Date')
        ]);

        $validated = $request->validate([
            'produksi_harian_id'   => 'required|exists:produksi_harian,produksi_harian_id',
            'tanggal_transaksi'    => 'required|date',
            'items'                => 'required|array|min:1',
            'items.*.produksi_detail_id' => 'required|exists:produksi_detail,produksi_detail_id',
            'items.*.nama_menu'    => 'required|string',
            'items.*.harga_satuan' => 'required|numeric|min:0',
            'items.*.jumlah'       => 'required|integer|min:1'
        ]);

        Log::info('Validated Data:', $validated);

        try {
            DB::beginTransaction();

            // ✅ GUNAKAN TANGGAL DARI HEADER ATAU REQUEST
            $tanggalTransaksi = $this->getTransactionDate($request, $validated['tanggal_transaksi']);
            
            Log::info('Final transaction date:', ['tanggal_transaksi' => $tanggalTransaksi]);

            // Hitung total
            $totalPorsi = array_sum(array_column($validated['items'], 'jumlah'));
            $totalHarga = array_sum(
                array_map(fn($i) => $i['jumlah'] * $i['harga_satuan'], $validated['items'])
            );

            Log::info('Calculated Totals:', ['porsi' => $totalPorsi, 'harga' => $totalHarga]);

            // Simpan transaksi
            $transaksi = Transaksi::create([
                'user_id'            => Auth::id(),
                'produksi_harian_id' => $validated['produksi_harian_id'],
                'tanggal_transaksi'  => $tanggalTransaksi, 
                'waktu_transaksi'    => now()->timezone('Asia/Jakarta')->format('H:i:s'), // ✅ Waktu dengan timezone
                'total_porsi'        => $totalPorsi,
                'total_harga'        => $totalHarga,
            ]);

            Log::info('Transaksi Created:', $transaksi->toArray());

            // Simpan detail transaksi dan update stok
            foreach ($validated['items'] as $item) {
                $transaksiDetail = TransaksiDetail::create([
                    'transaksi_id'         => $transaksi->transaksi_id,
                    'produksi_detail_id'   => $item['produksi_detail_id'],
                    'nama_menu'            => $item['nama_menu'],
                    'harga_satuan'         => $item['harga_satuan'],
                    'jumlah'               => $item['jumlah'],
                    'subtotal'             => $item['jumlah'] * $item['harga_satuan'],
                ]);

                // Update stok tersisa di produksi_detail
                $produksiDetail = ProduksiDetail::find($item['produksi_detail_id']);
                if ($produksiDetail) {
                    // Validasi stok cukup
                    if ($produksiDetail->jumlah_tersisa < $item['jumlah']) {
                        throw new \Exception("Stok tidak cukup untuk menu: {$item['nama_menu']}. Stok tersisa: {$produksiDetail->jumlah_tersisa}");
                    }

                    $oldStock = $produksiDetail->jumlah_tersisa;
                    $produksiDetail->decrement('jumlah_tersisa', $item['jumlah']);
                    $produksiDetail->refresh();
                    
                    Log::info('Stock Updated:', [
                        'produksi_detail_id' => $item['produksi_detail_id'],
                        'old_stock' => $oldStock,
                        'qty_sold' => $item['jumlah'],
                        'new_stock' => $produksiDetail->jumlah_tersisa
                    ]);
                } else {
                    Log::error('Produksi Detail not found:', ['id' => $item['produksi_detail_id']]);
                    throw new \Exception("Data produksi detail tidak ditemukan");
                }
            }

            DB::commit();

            Log::info('✅ Transaction completed - Tanggal: ' . $transaksi->tanggal_transaksi);

            // ✅ RETURN JSON RESPONSE (TIDAK REDIRECT)
            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil disimpan!',
                'transaksi_id' => $transaksi->transaksi_id,
                'tanggal_transaksi' => $transaksi->tanggal_transaksi, // Kirim kembali untuk konfirmasi
                'data' => [
                    'total_porsi' => $totalPorsi,
                    'total_harga' => $totalHarga,
                    'items_count' => count($validated['items'])
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('❌ Transaction failed: ' . $e->getMessage());

            // ✅ RETURN JSON ERROR (TIDAK REDIRECT)
            return response()->json([
                'success' => false,
                'message' => 'Transaksi gagal: ' . $e->getMessage()
            ], 500);
        }
    }

     /**
     * ✅ FUNGSI UNTUK MENDAPATKAN TANGGAL TRANSAKSI
     */
    private function getTransactionDate(Request $request, $defaultDate)
    {
        // Priority 1: Gunakan tanggal dari header X-Selected-Date
        if ($selectedDate = $request->header('X-Selected-Date')) {
            Log::info('Using date from X-Selected-Date header:', ['date' => $selectedDate]);
            return $selectedDate;
        }

        // Priority 2: Gunakan tanggal dari request body
        Log::info('Using date from request body:', ['date' => $defaultDate]);
        return $defaultDate;
    }
}

