<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FinancialOperation;
use Carbon\Carbon;

class ExtractController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Todas operações do usuário
        $ops = FinancialOperation::where('user_id', $user->id)->get();

        // Se não tiver absolutamente NADA, mostra tela "Nenhum dado encontrado"
        if ($ops->count() === 0) {
            return response()->json([
                'stats'      => null,
                'chart'      => [],
                'volume'     => [],
                'last_bets'  => [],
            ]);
        }

        // ================================
        // 📌 RESUMO PRINCIPAL
        // ================================
        $stats = [
            'deposits'    => $ops->where('type', 'deposit')->sum('amount'),
            'withdraws'   => $ops->where('type', 'withdraw')->sum('amount'),
            'bets'        => $ops->where('type', 'bet')->sum('amount'),
            'wins'        => $ops->where('type', 'win')->sum('amount'),
            'losses'      => $ops->where('type', 'loss')->sum('amount'),
            'gamesPlayed' => $ops->whereIn('type', ['bet', 'win', 'loss'])->count(),
        ];

        // ================================
        // 📌 GRÁFICO MENSAL
        // ================================
        $months = collect([]);
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i)->format('M');

            $wins = $ops->where('type', 'win')
                ->whereBetween('created_at', [
                    now()->subMonths($i)->startOfMonth(),
                    now()->subMonths($i)->endOfMonth()
                ])
                ->sum('amount');

            $loss = $ops->where('type', 'loss')
                ->whereBetween('created_at', [
                    now()->subMonths($i)->startOfMonth(),
                    now()->subMonths($i)->endOfMonth()
                ])
                ->sum('amount');

            $months->push([
                'name'   => $month,
                'wins'   => $wins,
                'losses' => $loss,
            ]);
        }

        // ================================
        // 📌 VOLUME POR TIPO (gráfico barras)
        // ================================
        $volume = [
            ['name' => 'Depósitos', 'value' => $stats['deposits']],
            ['name' => 'Saques', 'value' => $stats['withdraws']],
            ['name' => 'Apostado', 'value' => $stats['bets']],
        ];

        // ================================
        // 📌 ÚLTIMAS APOSTAS
        // ================================
        $last_bets = $ops
            ->whereIn('type', ['bet', 'win', 'loss'])
            ->sortByDesc('created_at')
            ->take(10)
            ->map(function ($op) {
                return [
                    'id'     => $op->id,
                    'game'   => $op->game_mode ?? 'Truco',
                    'amount' => $op->amount,
                    'result' =>
                        $op->type === 'bet'  ? 'pending' :
                        ($op->type === 'win' ? 'won' : 'lost'),
                    'date'   => $op->created_at->format('d/m H:i'),
                ];
            })
            ->values();

        return response()->json([
            'stats'      => $stats,
            'chart'      => $months,
            'volume'     => $volume,
            'last_bets'  => $last_bets,
        ]);
    }
}
