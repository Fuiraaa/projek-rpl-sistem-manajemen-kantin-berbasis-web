<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluaran extends Model
{
    use HasFactory;

    protected $primaryKey = 'pengeluaran_id';
    
    protected $fillable = [
        'user_id',
        'deskripsi',
        'jumlah',
        'tanggal_pengeluaran',
    ];

    protected $casts = [
        'jumlah' => 'integer',
        'tanggal_pengeluaran' => 'date',
    ];
}