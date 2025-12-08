<?php
// app/Models/UserProfile.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ IMPORT INI

class UserProfile extends Model
{
    use HasFactory; // ✅ IMPORT HASFACTORY

// 
protected $fillable = [
    'user_id',
    'first_name',
    'last_name',
    'gender',
    'birth_date',
    'profile_picture', // <--- TAMBAHKAN INI
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}