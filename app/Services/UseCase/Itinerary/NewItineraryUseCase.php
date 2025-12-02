<?php

namespace App\Services\UseCase\Itinerary;

use App\Dto\ItineraryDto;
use App\Models\Itinerary;
use Illuminate\Support\Facades\DB;

class NewItineraryUseCase
{
    public function handle(ItineraryDto $dto): Itinerary
    {
        return DB::transaction(function () use ($dto) {
            return Itinerary::create([
                'type' => $dto->getType()->value,
                'is_scheduled' => $dto->getIsScheduled(),
                'distance_km' => $dto->getDistanceKm(),
                'start_destination_id' => $dto->getStartDestinationId(),
                'end_destination_id' => $dto->getEndDestinationId(),
            ]);
        });
    }
}
