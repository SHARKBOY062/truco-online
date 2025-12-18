<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PixionPayClient
{
    private function http()
    {
        return Http::baseUrl(config('services.pixionpay.base_url'))
            ->timeout(15)
            ->withHeaders([
                'X-Auth-Key'   => config('services.pixionpay.auth_key'),
                'X-Secret-Key' => config('services.pixionpay.secret_key'),
                'Content-Type' => 'application/json',
            ]);
    }

    public function createPixTransaction(array $data): array
    {
        // POST /api/transaction/pix
        return $this->http()->post('/api/transaction/pix', $data)->json();
    }

    public function getStatusByExternalId(string $externalId): array
    {
        // GET /api/v1/transaction/status/external/{external_id}
        return $this->http()->get("/api/v1/transaction/status/external/{$externalId}")->json();
    }

    public function createWithdraw(array $data): array
    {
        // POST /api/withdraw/out
        return $this->http()->post('/api/withdraw/out', $data)->json();
    }

    public function balanceAvailable(): array
    {
        // GET /api/v1/balance/available
        return $this->http()->get('/api/v1/balance/available')->json();
    }
}
