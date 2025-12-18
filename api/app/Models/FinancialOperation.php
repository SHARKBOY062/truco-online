<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialOperation extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'description',
        'game_mode',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
