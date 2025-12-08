<?php
// app/Models/UserContact.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ IMPORT INI

class UserContact extends Model
{
    use HasFactory; // ✅ IMPORT HASFACTORY

    protected $fillable = [
        'user_id',
        'phone',
        'country',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}