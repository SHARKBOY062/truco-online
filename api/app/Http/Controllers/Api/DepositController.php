<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Payments\CreatePixDepositService;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function pix(Request $request, CreatePixDepositService $service)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],

            // compat: você pode mandar client.* (como já estava)
            'client.name' => ['required', 'string', 'max:255'],
            'client.document' => ['required', 'string', 'max:30'],
            'client.phoneNumber' => ['nullable', 'string', 'max:30'],

            // opcionais
            'external_id' => ['nullable', 'string', 'max:255'],
            'reference' => ['nullable', 'string', 'max:255'],
            'callbackUrl' => ['nullable', 'url'],
        ]);

        $userId = $request->user()?->id ?? 1;

        $tx = $service->create($data, $userId);

        return response()->json([
            'success' => true,
            'id' => $tx->id,
            'status' => $tx->status,
            'method' => $tx->method,
            'amount' => (string) $tx->amount,
            'external_id' => $tx->external_id,
            'reference' => $tx->reference,
            'pix' => [
                'txid' => $tx->meta['txid'] ?? null,
                'provider_transaction_id' => $tx->meta['provider_transaction_id'] ?? null,
                'fee' => $tx->meta['fee'] ?? null,
                'qr_code_text' => $tx->meta['qr_code_text'] ?? null,
            ],
        ], 201);
    }
}
