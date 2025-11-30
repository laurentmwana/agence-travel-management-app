<?php

namespace App\Services\UseCase\Tax;

use App\Models\Tax;
use Illuminate\Support\Facades\DB;

class DeleteTaxUseCase
{
    public function handle(Tax $tax): Tax
    {
        return DB::transaction(function () use ($tax) {
            $tax->delete();

            return $tax;
        });
    }
}
