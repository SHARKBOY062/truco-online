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

class ProcessPixionPayWebhookOutJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public array $payload) {}

    public function handle(): void
    {
        DB::transaction(function () {

            $tx = Transaction::where('external_id', $this->payload['external_id'] ?? null)
                ->lockForUpdate()
                ->first();

            if (!$tx || $tx->status !== 'pending') {
                return;
            }

            // SAQUE PAGO
            if (($this->payload['status'] ?? null) === 'PAID') {
                $tx->update([
                    'status'  => 'paid',
                    'paid_at' => Carbon::now(),
                    'e2e_id'  => $this->payload['e2e'] ?? null,
                ]);
            }

            // SAQUE FALHOU → ESTORNO
            if (($this->payload['status'] ?? null) === 'FAILED') {
                $tx->update(['status' => 'failed']);
                $tx->user()->increment('balance', $tx->amount);
            }
        });
    }
}
