<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    protected $fillable = ['transaction_id', 'menu_id', 'jumlah', 'harga_satuan'];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
