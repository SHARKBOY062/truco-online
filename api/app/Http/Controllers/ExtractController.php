<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Carbon\Carbon;

class ExtractController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $txs = Transaction::where('user_id', $user->id)->get();

        // ================================
        // 🚫 SEM DADOS
        // ================================
        if ($txs->isEmpty()) {
            return response()->json([
                'stats'     => null,
                'chart'     => [],
                'volume'    => [],
                'last_ops'  => [],
            ]);
        }

        // ================================
        // 📊 RESUMO PRINCIPAL
        // ================================
        $stats = [
            'deposits'  => $txs->where('status', 'paid')->where('amount', '>', 0)->sum('amount'),
            'withdraws' => $txs->where('status', 'paid')->where('amount', '<', 0)->sum('amount') * -1,
            'total'     => $user->balance,
        ];

        // ================================
        // 📈 GRÁFICO MENSAL (últimos 6 meses)
        // ================================
        $chart = collect();

        for ($i = 5; $i >= 0; $i--) {
            $start = Carbon::now()->subMonths($i)->startOfMonth();
            $end   = Carbon::now()->subMonths($i)->endOfMonth();

            $deposits = $txs->where('status', 'paid')
                ->where('amount', '>', 0)
                ->whereBetween('created_at', [$start, $end])
                ->sum('amount');

            $withdraws = $txs->where('status', 'paid')
                ->where('amount', '<', 0)
                ->whereBetween('created_at', [$start, $end])
                ->sum('amount') * -1;

            $chart->push([
                'name'      => $start->format('M'),
                'deposits'  => (float) $deposits,
                'withdraws' => (float) $withdraws,
            ]);
        }

        // ================================
        // 📊 VOLUME (barras)
        // ================================
        $volume = [
            ['name' => 'Depósitos', 'value' => (float) $stats['deposits']],
            ['name' => 'Saques',    'value' => (float) $stats['withdraws']],
        ];

        // ================================
        // 🧾 ÚLTIMAS OPERAÇÕES
        // ================================
        $lastOps = $txs->sortByDesc('created_at')
            ->take(10)
            ->map(function ($tx) {
                return [
                    'id'        => $tx->id,
                    'external'  => $tx->external_id,
                    'type'      => $tx->amount > 0 ? 'deposit' : 'withdraw',
                    'amount'    => abs((float) $tx->amount),
                    'status'    => $tx->status,
                    'method'    => $tx->method,
                    'date'      => $tx->created_at->format('d/m/Y H:i'),
                ];
            })
            ->values();

        return response()->json([
            'stats'    => $stats,
            'chart'    => $chart,
            'volume'   => $volume,
            'last_ops' => $lastOps,
        ]);
    }
}
