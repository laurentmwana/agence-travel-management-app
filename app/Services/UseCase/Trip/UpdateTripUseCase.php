<?php

namespace App\Services\UseCase\Trip;

use App\Dto\TripDto;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

class UpdateTripUseCase
{
    public function __construct(private CalculateTripUseCase $calculate) {}

    public function handle(TripDto $dto, Trip $trip): Trip
    {
        return DB::transaction(function () use ($dto, $trip) {
            $calculates = $this->calculate->handle($dto);

            $trip->update([
                'perfomed_at' => $dto->getPerfomedAt(),
                'observation' => $dto->getObservation(),
                'duration_hours' => $dto->getDurationHours(),
                'affretements' => $dto->getAffretements(),
                'other_expenses' => $dto->getOtherExpenses(),
                'fuel_quantity' => $dto->getFuelQuantity(),
                'itinerary_id' => $dto->getItineraryId(),
                'total_price_passenger' => $dto->getNumberOfPassenger(),
                ...$calculates
            ]);

            return $trip;
        });
    }
}
