<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProfile extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',      // tambahkan ini
        'first_name',
        'last_name',
        'gender',
        'birth_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
