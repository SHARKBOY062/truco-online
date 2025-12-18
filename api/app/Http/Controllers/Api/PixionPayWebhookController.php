<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PixionPayWebhookController extends Controller
{
    private function authorizeWebhook(Request $request): void
    {
        if ($request->header('X-Webhook-Token') !== config('services.pixionpay.webhook_token')) {
            abort(401);
        }
    }

    /**
     * PIX IN (DEPÓSITO)
     */
    public function handleIn(Request $request)
    {
        $this->authorizeWebhook($request);

        $payload = $request->all();

        DB::transaction(function () use ($payload) {

            $tx = Transaction::where('external_id', $payload['external_id'])
                ->lockForUpdate()
                ->first();

            if (!$tx || $tx->status !== 'pending') {
                return;
            }

            if ($payload['status'] === 'PAID') {
                $tx->update([
                    'status'  => 'paid',
                    'paid_at'=> now(),
                    'e2e_id' => $payload['e2e'] ?? null,
                ]);

                // CREDITA SALDO
                $tx->user()->increment('balance', $tx->amount);
            }
        });

        return response()->json(['ok' => true]);
    }

    /**
     * PIX OUT (SAQUE)
     */
    public function handleOut(Request $request)
    {
        $this->authorizeWebhook($request);

        $payload = $request->all();

        DB::transaction(function () use ($payload) {

            $tx = Transaction::where('external_id', $payload['external_id'])
                ->lockForUpdate()
                ->first();

            if (!$tx || $tx->status !== 'pending') {
                return;
            }

            if ($payload['status'] === 'PAID') {
                $tx->update([
                    'status'  => 'paid',
                    'paid_at'=> now(),
                    'e2e_id' => $payload['e2e'] ?? null,
                ]);
            }

            if ($payload['status'] === 'FAILED') {
                $tx->update(['status' => 'failed']);
                $tx->user()->increment('balance', $tx->amount);
            }
        });

        return response()->json(['ok' => true]);
    }
}
