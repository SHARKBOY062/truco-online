<?php

namespace App\Services\Payments;

use App\Models\Transaction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreatePixDepositService
{
    public function create(array $data, int $userId): Transaction
    {
        $baseUrl   = rtrim(config('services.pixionpay.base_url'), '/');
        $authKey   = config('services.pixionpay.auth_key');
        $secretKey = config('services.pixionpay.secret_key');

        if (!$authKey || !$secretKey) {
            throw new \RuntimeException('PIXIONPAY_AUTH_KEY ou PIXIONPAY_SECRET_KEY não configurados');
        }

        /**
         * 🔑 external_id
         * - DEVE ser único
         * - DEVE ser salvo no banco
         * - É o elo com o webhook
         */
        $externalId = $data['external_id']
            ?? $data['reference']
            ?? 'PIX-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(6));

        /**
         * Payload exigido pela PixionPay
         */
        $payload = [
            'amount'      => number_format((float) $data['amount'], 2, '.', ''),
            'name'        => data_get($data, 'client.name'),
            'document'    => preg_replace('/\D+/', '', (string) data_get($data, 'client.document')),
            'external_id' => $externalId,
        ];

        // phone é opcional
        if (!empty($data['client']['phoneNumber'])) {
            $payload['phone'] = preg_replace('/\D+/', '', $data['client']['phoneNumber']);
        }

        // callback opcional
        if (!empty($data['callbackUrl'])) {
            $payload['callback_url'] = $data['callbackUrl'];
        }

        /**
         * 📡 Chamada à PixionPay
         */
        $response = Http::withHeaders([
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json',
                'X-Auth-Key'    => $authKey,
                'X-Secret-Key'  => $secretKey,
            ])
            ->timeout(30)
            ->post($baseUrl . '/transaction/pix', $payload);

        $json = $response->json();

        if (!$response->ok() || !is_array($json) || empty($json['success'])) {
            Log::error('PixionPay: erro ao criar PIX', [
                'http_status' => $response->status(),
                'response'    => $response->body(),
                'payload'     => $payload,
            ]);

            throw new \RuntimeException(
                $json['error'] ?? 'Falha ao criar PIX na PixionPay'
            );
        }

        /**
         * 🧾 Cria a Transaction LOCAL (PENDING)
         */
        return Transaction::create([
            'external_id' => $json['external_id'] ?? $externalId, // 🔥 FUNDAMENTAL
            'reference'   => $externalId,
            'user_id'     => $userId,
            'amount'      => (float) $payload['amount'],
            'status'      => 'pending',
            'method'      => 'pix',
            'e2e_id'      => null,
            'paid_at'     => null,
            'meta'        => [
                'provider' => 'pixionpay',

                // dados do provedor
                'provider_transaction_id' => $json['transaction_id'] ?? null,
                'txid'                    => $json['txid'] ?? null,
                'fee'                     => $json['fee'] ?? null,
                'qr_code_text'            => $json['qr_code_text'] ?? null,

                // auditoria / debug
                'pixionpay_request'  => $payload,
                'pixionpay_response' => $json,
            ],
        ]);
    }
}
