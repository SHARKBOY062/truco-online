<?php

namespace App\Jobs;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ProcessPixionPayWebhookInJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public array $payload) {}

    public function handle(): void
    {
        if (($this->payload['status'] ?? null) !== 'PAID') {
            return;
        }

        DB::transaction(function () {
            $tx = Transaction::where('external_id', $this->payload['external_id'] ?? null)
                ->lockForUpdate()
                ->first();

            if (!$tx || $tx->status === 'paid') {
                return; // idempotência
            }

            $tx->update([
                'status'   => 'paid',
                'paid_at'  => Carbon::now(),
                'e2e_id'   => $this->payload['e2e'] ?? null,
            ]);

            $tx->user()->increment('balance', $tx->amount);
        });
    }
}
