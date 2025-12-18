<?php

namespace App\Filament\Resources\FinancialOperationResource\Pages;

use App\Filament\Resources\FinancialOperationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFinancialOperations extends ListRecords
{
    protected static string $resource = FinancialOperationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
