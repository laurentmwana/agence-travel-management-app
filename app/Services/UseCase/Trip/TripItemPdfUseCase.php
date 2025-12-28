<?php

namespace App\Services\UseCase\Trip;

use App\Models\Trip;
use App\Http\Resources\Trip\TripResource;
use Barryvdh\DomPDF\Facade\Pdf;

class TripItemPdfUseCase
{
    public function handle(Trip $trip)
    {

        $trip->load(['itinerary', 'itinerary.startDestination', 'itinerary.endDestination']);

        $pdf = Pdf::loadView('report.trip-item', ['trip' => $trip->toArray()]);

        return  $pdf->download('trip-report.pdf');
    }
}
