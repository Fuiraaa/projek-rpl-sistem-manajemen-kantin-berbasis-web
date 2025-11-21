<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class RiwayatController extends Controller
{
    public function showRiwayat() {
        return Inertia::render ('Riwayat');
    }
}
