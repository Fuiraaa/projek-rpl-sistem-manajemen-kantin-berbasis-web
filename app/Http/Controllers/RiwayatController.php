<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RiwayatController extends Controller
{

    public function riwayat(Request $request)
    {
        $tanggal = $request->tanggal;

        $query = Transaksi::with('detail')
            ->where('user_id', auth()->id());

        if ($tanggal) {
            $query->whereDate('tanggal_transaksi', $tanggal);
        }

        return Inertia::render('Riwayat', [
            'riwayat' => $query->orderBy('tanggal_transaksi', 'desc')
                            ->orderBy('waktu_transaksi', 'desc')
                            ->get(),
            'tanggalFilter' => $tanggal
    ]);
    }

}