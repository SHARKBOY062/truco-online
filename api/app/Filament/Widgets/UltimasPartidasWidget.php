<?php

namespace App\Filament\Widgets;

use App\Models\GameMatch;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class UltimasPartidasWidget extends TableWidget
{
    protected static ?string $heading = 'Últimas Partidas';

    // 🔥 OBRIGATÓRIO NO FILAMENT V3
    protected function getTableQuery(): Builder
    {
        return GameMatch::query()
            ->where('user_id', auth()->id())
            ->latest()
            ->limit(10);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('id')
                ->label('#')
                ->sortable(),

            Tables\Columns\TextColumn::make('game_mode')
                ->label('Jogo')
                ->default('Truco'),

            Tables\Columns\TextColumn::make('bet_amount')
                ->label('Aposta')
                ->money('BRL'),

            Tables\Columns\BadgeColumn::make('user_won')
                ->label('Resultado')
                ->formatStateUsing(fn($state) => $state ? 'Ganhou' : 'Perdeu')
                ->colors([
                    'success' => fn($state) => $state === true,
                    'danger'  => fn($state) => $state === false,
                ]),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Data')
                ->dateTime('d/m H:i')
                ->sortable(),
        ];
    }
}
