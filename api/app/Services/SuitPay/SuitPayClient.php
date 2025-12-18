<?php

namespace App\Services\SuitPay;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class SuitPayClient
{
    public function requestQrCode(array $payload): array
    {
        $host = config('services.suitpay.host');
        $ci = config('services.suitpay.ci');
        $cs = config('services.suitpay.cs');

        $response = Http::timeout(30)
            ->acceptJson()
            ->asJson()
            ->withHeaders([
                'ci' => $ci,
                'cs' => $cs,
            ])
            ->post($host . '/api/v1/gateway/request-qrcode', $payload);

        try {
            $response->throw();
        } catch (RequestException $e) {
            // devolve detalhes do erro do gateway
            $body = $response->json();
            throw new \RuntimeException('SuitPay error: ' . json_encode($body ?: $response->body()));
        }

        return $response->json() ?? [];
    }
}
