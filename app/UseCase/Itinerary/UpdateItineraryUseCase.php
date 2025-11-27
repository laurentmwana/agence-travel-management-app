<?php

namespace App\UseCase\Itinerary;

use App\Dto\ItineraryDto;
use App\Models\Itinerary;
use Illuminate\Support\Facades\DB;

class UpdateItineraryUseCase
{
    public function handle(ItineraryDto $dto, Itinerary $itinerary): Itinerary
    {
        return DB::transaction(function () use ($dto, $itinerary) {
            $itinerary->update([
           'note' => $dto->getNote(),
                'type' => $dto->getType()->value,
                'is_scheduled' => $dto->getIsScheduled(),
                'available_seats' => $dto->getAvailableSeats(),
                'price_per_seat' => $dto->getPricePerSeat(),
                'price_per_person' => $dto->getPricePerPerson(),
                'distance_km' => $dto->getDistanceKm(),
                'start_at' => $dto->getStartAt(),
                'start_destination_id' => $dto->getStartDestinationId(),
                'end_destination_id' => $dto->getEndDestinationId(),
            ]);

            return $itinerary;
        });
    }
}
