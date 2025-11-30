<?php

namespace App\Services\UseCase\Itinerary;

use App\Models\Itinerary;
use Illuminate\Support\Facades\DB;

class DeleteItineraryUseCase
{
    public function handle(Itinerary $itinerary): Itinerary
    {
        return DB::transaction(function () use ($itinerary) {
            $itinerary->delete();

            return $itinerary;
        });
    }
}
