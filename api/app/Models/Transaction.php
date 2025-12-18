<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'external_id',
        'reference',
        'amount',
        'user_id',
        'status',
        'method',
        'e2e_id',
        'paid_at',
        'meta',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'meta' => 'array', // <- ESSENCIAL (json vira array no PHP)
    ];

    protected static function booted(): void
    {
        static::creating(function (self $tx) {
            $tx->status = $tx->status ?: 'pending';
            $tx->method = $tx->method ?: 'pix';
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
