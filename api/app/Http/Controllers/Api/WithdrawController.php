<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class WithdrawController extends Controller
{
    public function out(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'pix_key' => ['required', 'string'],
            'pix_key_type' => ['required', 'in:CPF,CNPJ,EMAIL,PHONE,EVP,COPYPASTE'],
        ]);

        $user = $request->user();

        if ($user->balance < $data['amount']) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo insuficiente',
            ], 422);
        }

        return DB::transaction(function () use ($data, $user) {

            // cria transação
            $tx = Transaction::create([
                'external_id' => 'WD-' . now()->format('YmdHis') . '-' . rand(1000,9999),
                'amount' => $data['amount'],
                'user_id' => $user->id,
                'status' => 'pending',
                'method' => 'pix',
                'meta' => [
                    'pix_key' => $data['pix_key'],
                    'pix_key_type' => $data['pix_key_type'],
                ],
            ]);

            // debita saldo imediatamente
            $user->decrement('balance', $data['amount']);

            // chama PixionPay
            Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'X-Auth-Key' => config('services.pixionpay.auth_key'),
                'X-Secret-Key' => config('services.pixionpay.secret_key'),
            ])->post(
                rtrim(config('services.pixionpay.base_url'), '/') . '/withdraw/out',
                [
                    'amount' => number_format($data['amount'], 2, '.', ''),
                    'key' => $data['pix_key'],
                    'key_type' => $data['pix_key_type'],
                    'external_id' => $tx->external_id,
                    'details' => [
                        'name' => $user->name,
                        'document' => $user->cpf,
                    ],
                ]
            );

            return response()->json([
                'success' => true,
                'transaction_id' => $tx->id,
                'external_id' => $tx->external_id,
                'status' => 'pending',
            ], 201);
        });
    }
}
