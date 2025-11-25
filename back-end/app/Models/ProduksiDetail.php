<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduksiDetail extends Model
{
    use HasFactory;

    protected $table = 'produksi_detail';
    protected $primaryKey = 'produksi_detail_id';

    protected $fillable = [
        'produksi_harian_id',
        'menu_id',
        'nama_menu',
        'harga',
        'jumlah_porsi',
        'jumlah_tersisa',
        'gambar',
    ];

    protected $casts = [
        'harga'          => 'integer',
        'jumlah_porsi'   => 'integer',
        'jumlah_tersisa' => 'integer',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function produksiHarian()
    {
        return $this->belongsTo(
            ProduksiHarian::class,
            'produksi_harian_id',
            'produksi_harian_id'
        );
    }

    public function menu()
    {
        return $this->belongsTo(
            Menu::class,
            'menu_id',
            'menu_id'
        );
    }
}
