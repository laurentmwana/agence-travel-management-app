<?php

namespace App\Http\Controllers;

use App\UseCase\Destination\GetDestinationUseCase;
use App\UseCase\Itinerary\GetItineraryUseCase;
use App\UseCase\Trip\GetTripUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController extends Controller
{
      public function __construct(
            private GetDestinationUseCase $getDestination,
            private GetTripUseCase $getTrip,
            private GetItineraryUseCase $getItineray,
      ) {}

      public function index(Request $request)
      {
            $years = $this->getLastYears();
            $defaultYear = $request->query->get('year', now()->year);

            $request->validate(['year' => ['nullable', Rule::in($years)]]);

            return Inertia::render('dashboard/index', [
                  'counters' => [
                        'destination' => $this->getDestination->countBy(),
                        'itinerary' => $this->getTrip->countBy(),
                        'trip' => $this->getItineray->countBy(),
                  ],
                  'stats' => $this->getTrip->findStatByYear($defaultYear),
                  'defaultYear' => $defaultYear,
                  'years' => $years,
            ]);
      }

      public function trip(Request $request)
      {
            return Inertia::render('dashboard/trip');
      }

      public function itinerary(Request $request)
      {
            return Inertia::render('dashboard/itinerary');
      }

      public function destination(Request $request)
      {
            return Inertia::render('dashboard/destination');
      }

      private function getLastYears()
      {
            $start = now()->year;
            $years = [];
            for ($i = 0; $i < 5; $i++) {
                  $years[] = $start - $i;
            }
            return $years;
      }
}
