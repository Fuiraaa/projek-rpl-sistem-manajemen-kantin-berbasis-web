<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiDetail extends Model
{
    use HasFactory;

    protected $primaryKey = 'transaksi_detail_id';
    protected $table = 'transaksi_detail';

    protected $fillable = [
        'transaksi_id',
        'produksi_detail_id',
        'nama_menu',
        'harga_satuan',
        'jumlah',
        'subtotal'
    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }

    public function produksiDetail()
    {
        return $this->belongsTo(ProduksiDetail::class, 'produksi_detail_id');
    }
}
