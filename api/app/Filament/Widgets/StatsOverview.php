<?php

namespace App\Filament\Widgets;

use App\Models\FinancialOperation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $user = auth()->user();

        // Buscar todas operações do usuário autenticado
        $ops = FinancialOperation::where('user_id', $user->id)->get();

        // Caso não tenha movimentações
        if ($ops->count() === 0) {
            return [
                Stat::make('Depósitos', 'R$ 0,00')
                    ->description('Total depositado')
                    ->color('success'),

                Stat::make('Saques', 'R$ 0,00')
                    ->description('Total sacado')
                    ->color('danger'),

                Stat::make('Apostado', 'R$ 0,00')
                    ->description('Total em apostas')
                    ->color('warning'),

                Stat::make('Ganhos', 'R$ 0,00')
                    ->description('Total ganho')
                    ->color('success'),

                Stat::make('Perdas', 'R$ 0,00')
                    ->description('Total perdido')
                    ->color('danger'),

                Stat::make('Jogos', '0')
                    ->description('Partidas realizadas')
                    ->color('primary'),
            ];
        }

        // Resumo baseado no seu ExtractController
        $stats = [
            'deposits'    => $ops->where('type', 'deposit')->sum('amount'),
            'withdraws'   => $ops->where('type', 'withdraw')->sum('amount'),
            'bets'        => $ops->where('type', 'bet')->sum('amount'),
            'wins'        => $ops->where('type', 'win')->sum('amount'),
            'losses'      => $ops->where('type', 'loss')->sum('amount'),
            'gamesPlayed' => $ops->whereIn('type', ['bet', 'win', 'loss'])->count(),
        ];

        return [
            Stat::make('Depósitos', 'R$ ' . number_format($stats['deposits'], 2, ',', '.'))
                ->description('Total depositado')
                ->color('success'),

            Stat::make('Saques', 'R$ ' . number_format($stats['withdraws'], 2, ',', '.'))
                ->description('Total sacado')
                ->color('danger'),

            Stat::make('Apostado', 'R$ ' . number_format($stats['bets'], 2, ',', '.'))
                ->description('Total em apostas')
                ->color('warning'),

            Stat::make('Ganhos', 'R$ ' . number_format($stats['wins'], 2, ',', '.'))
                ->description('Total ganho')
                ->color('success'),

            Stat::make('Perdas', 'R$ ' . number_format($stats['losses'], 2, ',', '.'))
                ->description('Total perdido')
                ->color('danger'),

            Stat::make('Jogos', $stats['gamesPlayed'])
                ->description('Partidas realizadas')
                ->color('primary'),
        ];
    }
}
