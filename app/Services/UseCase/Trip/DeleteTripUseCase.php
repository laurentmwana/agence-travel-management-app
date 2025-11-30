<?php

namespace App\Services\UseCase\Trip;

use App\Models\Trip;
use Illuminate\Support\Facades\DB;

class DeleteTripUseCase
{
    public function handle(Trip $trip): Trip
    {
        return DB::transaction(function () use ($trip) {
            $trip->delete();
            return $trip;
        });
    }
}
