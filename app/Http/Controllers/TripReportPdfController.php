<?php

namespace App\Http\Controllers;

use App\Services\UseCase\Trip\GetTripUseCase;
use App\Services\UseCase\Trip\TripItemPdfUseCase;

class TripReportPdfController extends Controller
{
    public function __construct(private GetTripUseCase $getTrip) {}

    public function item(string $tripId, TripItemPdfUseCase $usecase)
    {
        $trip = $this->getTrip->findOrFail($tripId);

        return $usecase->handle($trip);
    }
}
