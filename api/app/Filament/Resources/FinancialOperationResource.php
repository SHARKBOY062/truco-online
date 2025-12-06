<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FinancialOperationResource\Pages;
use App\Models\FinancialOperation;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\SelectColumn;

class FinancialOperationResource extends Resource
{
    protected static ?string $model = FinancialOperation::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-path';
    protected static ?string $navigationLabel = 'Transações';
    protected static ?string $modelLabel = 'Transação';
    protected static ?string $pluralLabel = 'Transações';
    protected static ?string $navigationGroup = 'Gerenciamento';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Usuário')
                    ->searchable()
                    ->options(User::pluck('name', 'id'))
                    ->required(),

                Select::make('type')
                    ->label('Tipo')
                    ->options([
                        'deposit' => 'Depósito',
                        'withdraw' => 'Saque',
                        'bet' => 'Aposta',
                        'win' => 'Ganho',
                        'loss' => 'Perda',
                    ])
                    ->required(),

                TextInput::make('amount')
                    ->label('Valor')
                    ->numeric()
                    ->required(),

                Textarea::make('description')
                    ->label('Descrição')
                    ->rows(3),

                TextInput::make('game_mode')
                    ->label('Modo de Jogo')
                    ->placeholder('Ex: Truco Paulista'),
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
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('type')
                    ->label('Tipo')
                    ->badge()
                    ->colors([
                        'success' => ['deposit', 'win'],
                        'danger'  => ['withdraw', 'loss'],
                        'warning' => ['bet'],
                    ])
                    ->sortable(),

                Tables\Columns\TextColumn::make('amount')
                    ->label('Valor')
                    ->money('BRL')
                    ->sortable(),

                Tables\Columns\TextColumn::make('game_mode')
                    ->label('Modo de Jogo')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Data')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])

            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipo')
                    ->options([
                        'deposit' => 'Depósito',
                        'withdraw' => 'Saque',
                        'bet' => 'Aposta',
                        'win' => 'Ganho',
                        'loss' => 'Perda',
                    ]),
            ])

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
            'index'  => Pages\ListFinancialOperations::route('/'),
            'create' => Pages\CreateFinancialOperation::route('/create'),
            'edit'   => Pages\EditFinancialOperation::route('/{record}/edit'),
        ];
    }
}
