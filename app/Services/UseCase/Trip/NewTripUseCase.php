<?php

namespace App\Services\UseCase\Trip;

use App\Dto\TripDto;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

class NewTripUseCase
{
    public function __construct(private CalculateTripUseCase $calculate) {}

    public function handle(TripDto $dto): Trip
    {
        return DB::transaction(function () use ($dto) {
            $calculates = $this->calculate->handle($dto);
            return Trip::create([
                'perfomed_at' => $dto->getPerfomedAt(),
                'observation' => $dto->getObservation(),
                'duration_hours' => $dto->getDurationHours(),
                'affretements' => $dto->getAffretements(),
                'other_expenses' => $dto->getOtherExpenses(),
                'itinerary_id' => $dto->getItineraryId(),
                'fuel_quantity' => $dto->getFuelQuantity(),
                ...$calculates
            ]);
        });
    }
}
