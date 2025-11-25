<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'menus';
    protected $primaryKey = 'menu_id';

    protected $fillable = [
        'user_id',
        'nama',
        'harga',
        'gambar',
        'quantity'
    ];

    protected $casts = [
        'harga'     => 'integer',   // lebih aman untuk frontend & arithmetic
        'quantity'  => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id',
            'id'
        );
    }

    public function produksiDetail()
    {
        return $this->hasMany(
            ProduksiDetail::class,
            'menu_id',
            'menu_id'
        );
    }
}
