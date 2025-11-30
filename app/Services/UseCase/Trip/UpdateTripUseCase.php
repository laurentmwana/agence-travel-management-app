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
                'revenue' => $dto->getRevenue(),
                'fuel_cost' => $dto->getFuelCost(),
                'other_expenses' => $dto->getOtherExpenses(),
                'itinerary_id' => $dto->getItineraryId(),
                ...$calculates
            ]);

            return $trip;
        });
    }
}
