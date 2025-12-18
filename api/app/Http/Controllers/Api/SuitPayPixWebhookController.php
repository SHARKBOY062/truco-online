<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SuitPayPixWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        // tente localizar por idTransaction (external_id) ou requestNumber (reference)
        $externalId = $payload['idTransaction'] ?? $payload['transactionId'] ?? null;
        $requestNumber = $payload['requestNumber'] ?? null;

        $tx = null;

        if ($externalId) {
            $tx = Transaction::where('external_id', $externalId)->first();
        }

        if (! $tx && $requestNumber) {
            $tx = Transaction::where('reference', $requestNumber)->first();
        }

        if (! $tx) {
            return response()->json(['ok' => false, 'message' => 'transaction not found'], 404);
        }

        // guarda payload
        $meta = $tx->meta ?? [];
        $meta['webhook_last'] = $payload;
        $tx->meta = $meta;

        // heurísticas (AJUSTAR quando tiver o payload oficial)
        $status = $payload['status'] ?? null;
        $paid = $payload['paid'] ?? null;

        if ($status) {
            // você pode mapear "PAID" / "CONFIRMED" etc.
            $normalized = strtolower((string) $status);

            if (in_array($normalized, ['paid', 'approved', 'confirmed', 'success'])) {
                $tx->status = 'paid';
                $tx->paid_at = $tx->paid_at ?: Carbon::now();
            } elseif (in_array($normalized, ['failed', 'refused'])) {
                $tx->status = 'failed';
            } elseif (in_array($normalized, ['canceled', 'cancelled'])) {
                $tx->status = 'canceled';
            }
        }

        if ($paid === true) {
            $tx->status = 'paid';
            $tx->paid_at = $tx->paid_at ?: Carbon::now();
        }

        // E2E (se vier)
        $tx->e2e_id = $payload['e2eId'] ?? $payload['e2e_id'] ?? $tx->e2e_id;

        $tx->save();

        return response()->json(['ok' => true]);
    }
}
