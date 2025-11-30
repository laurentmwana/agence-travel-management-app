<?php

namespace App\Services\UseCase\Tax;

use App\Dto\TaxDto;
use App\Models\Tax;
use Illuminate\Support\Facades\DB;

class UpdateTaxUseCase
{
    public function handle(TaxDto $dto, Tax $tax): Tax
    {
        return DB::transaction(function () use ($dto, $tax) {
            $tax->update([
                'name' => $dto->getName(),
                'amount' => $dto->getAmount(),
                'description' => $dto->getDescription(),
            ]);

            return $tax;
        });
    }
}
