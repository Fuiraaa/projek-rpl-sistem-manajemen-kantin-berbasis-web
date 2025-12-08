<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    protected $table = 'transaksis';
    protected $primaryKey = 'transaksi_id';
    protected $fillable = [
        'user_id',
        'produksi_harian_id',
        'tanggal_transaksi',
        'waktu_transaksi',
        'total_porsi',
        'total_harga'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function produksiHarian()
    {
        return $this->belongsTo(ProduksiHarian::class, 'produksi_harian_id');
    }

    public function detail()
    {
        return $this->hasMany(TransaksiDetail::class, 'transaksi_id');
    }
}
