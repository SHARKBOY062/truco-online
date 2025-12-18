<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameMatch extends Model
{
    protected $fillable = [
        'user_id',
        'bet_amount',
        'bot_ran',
        'user_won',
        'rtp_used',
        'bot_data',
    ];

    protected $casts = [
        'bot_ran' => 'boolean',
        'user_won' => 'boolean',
        'bot_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
