<?php
// app/Models/Menu.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ IMPORT INI

class Menu extends Model
{
    use HasFactory; // ✅ PASTIKAN IMPORT HASFACTORY

protected $fillable = [
    'user_id',
    'nama', 
    'harga',
    'gambar',
    'quantity',
    'is_active' // 🔥 TAMBAHKAN INI
];

    // 🔥 RELASI: Menu dimiliki oleh User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}