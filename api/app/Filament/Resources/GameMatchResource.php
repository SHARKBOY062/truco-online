<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GameMatchResource\Pages;
use App\Models\GameMatch;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\JsonEditor;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GameMatchResource extends Resource
{
    protected static ?string $model = GameMatch::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $navigationLabel = 'Configurações Games';
    protected static ?string $modelLabel = 'Configuração Game';
    protected static ?string $pluralLabel = 'Configurações Games';
    protected static ?string $navigationGroup = 'Gerenciamento';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Usuário')
                    ->options(User::pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                TextInput::make('bet_amount')
                    ->label('Valor Apostado')
                    ->numeric()
                    ->required(),

                Toggle::make('bot_ran')
                    ->label('Bot correu no truco?'),

                Toggle::make('user_won')
                    ->label('Usuário venceu?')
                    ->nullable(),

                TextInput::make('rtp_used')
                    ->label('RTP usado')
                    ->numeric()
                    ->required(),

                JsonEditor::make('bot_data')
                    ->label('Dados extras do bot')
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')
                    ->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Usuário')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('bet_amount')
                    ->label('Aposta')
                    ->money('BRL')
                    ->sortable(),

                Tables\Columns\IconColumn::make('bot_ran')
                    ->label('Bot correu?')
                    ->boolean(),

                Tables\Columns\IconColumn::make('user_won')
                    ->label('Usuário venceu?')
                    ->boolean(),

                Tables\Columns\TextColumn::make('rtp_used')
                    ->label('RTP usado')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Data')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])

            ->filters([])

            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])

            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListGameMatches::route('/'),
            'create' => Pages\CreateGameMatch::route('/create'),
            'edit'   => Pages\EditGameMatch::route('/{record}/edit'),
        ];
    }
}
