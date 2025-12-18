<?php

namespace App\Filament\Resources\FinancialOperationResource\Pages;

use App\Filament\Resources\FinancialOperationResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFinancialOperation extends CreateRecord
{
    protected static string $resource = FinancialOperationResource::class;
}
