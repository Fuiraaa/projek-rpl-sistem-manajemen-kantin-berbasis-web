<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RiwayatController extends Controller
{

    public function riwayat(Request $request)
    {
        $tanggal = $request->tanggal;

        $query = Transaction::with(['items.menu'])
            ->where('user_id', auth()->id());

        // Jika user memilih tanggal di input
        if ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
        }

        $data = $query->orderBy('tanggal', 'desc')
        ->orderBy('jam', 'desc')
        ->get();

        // dd($tanggal, $query->toSql(), $query->getBindings());

        return Inertia::render('Riwayat', [
            'riwayat' => $data,
            'tanggalFilter' => $tanggal
        ]);
    }
}
