<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduksiHarian extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produksi_harian';
    protected $primaryKey = 'produksi_harian_id';

    protected $fillable = [
        'user_id',
        'tanggal_produksi',
    ];

    // Pastikan tanggal diparse otomatis jadi Carbon instance
    protected $casts = [
        'tanggal_produksi' => 'date:Y-m-d',
        'created_at'        => 'datetime',
        'updated_at'        => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // ProduksiHarian -> Banyak Detail
    public function produksiDetail()
    {
        return $this->hasMany(ProduksiDetail::class, 'produksi_harian_id', 'produksi_harian_id');
    }
}
