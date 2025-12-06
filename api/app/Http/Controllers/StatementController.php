<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FinancialOperation;

class StatementController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $ops = FinancialOperation::where('user_id', $user->id)->get();

        // ----------------------------
        // RESUMO
        // ----------------------------
        $deposits = $ops->where('type', 'deposit')->sum('amount');
        $withdraws = $ops->where('type', 'withdraw')->sum('amount');
        $bets = $ops->where('type', 'bet')->sum('amount');
        $wins = $ops->where('type', 'win')->sum('amount');
        $losses = $ops->where('type', 'loss')->sum('amount');

        // ----------------------------
        // ÚLTIMAS APOSTAS
        // ----------------------------
        $lastBets = $ops->where('type', 'bet')
            ->sortByDesc('created_at')
            ->take(10)
            ->values();

        // ----------------------------
        // GRÁFICO GANHOS x PERDAS
        // ----------------------------
        $monthly = [];

        foreach ($ops as $op) {
            $month = $op->created_at->format('M');

            if (!isset($monthly[$month])) {
                $monthly[$month] = [
                    'wins' => 0,
                    'losses' => 0,
                ];
            }

            if ($op->type === 'win') {
                $monthly[$month]['wins'] += $op->amount;
            }

            if ($op->type === 'loss') {
                $monthly[$month]['losses'] += $op->amount;
            }
        }

        return response()->json([
            'success' => true,

            'summary' => [
                'total_deposits' => $deposits,
                'total_withdraws' => $withdraws,
                'total_bets' => $bets,
                'total_wins' => $wins,
                'total_losses' => $losses,
                'games_played' => $ops->whereIn('type', ['bet', 'win', 'loss'])->count(),
            ],

            'monthly_performance' => $monthly,

            'volume_by_type' => [
                'Depositos' => $deposits,
                'Saques' => $withdraws,
                'Apostado' => $bets,
            ],

            'last_bets' => $lastBets,
        ]);
    }
}
