<?php

namespace App\Filament\Resources\FinancialOperationResource\Pages;

use App\Filament\Resources\FinancialOperationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFinancialOperation extends EditRecord
{
    protected static string $resource = FinancialOperationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
