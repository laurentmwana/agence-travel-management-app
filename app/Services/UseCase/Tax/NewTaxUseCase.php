<?php

namespace App\Services\UseCase\Tax;

use App\Dto\TaxDto;
use App\Models\Tax;
use Illuminate\Support\Facades\DB;

class NewTaxUseCase
{
    public function handle(TaxDto $dto): Tax
    {
        return DB::transaction(function () use ($dto) {
            return Tax::create([
                'name' => $dto->getName(),
                'amount' => $dto->getAmount(),
                'description' => $dto->getDescription(),
            ]);
        });
    }
}
