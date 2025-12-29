<?php

namespace App\Http\Controllers;

use App\Helpers\YearMonth;
use App\Http\Resources\Destination\DestinationItemResource;
use App\Http\Resources\Itinerary\ItineraryItemResource;
use App\Http\Resources\Trip\TripItemResource;
use App\Services\UseCase\Destination\GetDestinationUseCase;
use App\Services\UseCase\Itinerary\GetItineraryUseCase;
use App\Services\UseCase\Trip\GetTripUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController extends Controller
{
      private const ITINERARY_SORTABLE_FIELD = ['type', 'is_scheduled', 'price_per_seat', 'distance_km'];
      private const TRIP_SORTABLE_FIELD = ['type', 'is_scheduled', 'price_per_seat', 'distance_km'];

      public function __construct(
            private GetDestinationUseCase $getDestination,
            private GetTripUseCase $getTrip,
            private GetItineraryUseCase $getItineray,
      ) {}

      public function index(Request $request)
      {
            $years = YearMonth::getLastYears();
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
            $years = YearMonth::getLastYears();
            $defaultYear = $request->query->get('year', now()->year);
            $defaultMonth = $request->query->get('month', now()->month);
            $defaultItinerary = $request->query->get('itinerary');
            $months = YearMonth::getLastMonths();
            $criteria = [];

            $request->validate([
                  'year' => ['nullable', Rule::in($years)],
                  'month' => ['nullable', Rule::in(array_column($months, 'value'))],
                  'sort' => ['nullable', Rule::in(self::TRIP_SORTABLE_FIELD)],
                  'search' => ['nullable', 'string'],
            ]);

            if ($defaultItinerary) {
                  $criteria['itinerary_id'] = $defaultItinerary;
            }

            $trips = $this->getTrip->finByYearAndMonthAndFilter(
                  $defaultYear,
                  $defaultMonth,
                  sortable: self::TRIP_SORTABLE_FIELD,
                  search: $request->input('search'),
                  filters: $request->only(['sort', 'dir']),
                  criteria: $criteria,
            );

            $sumRevenueAndTotalCost = $this->getTrip->sumRevenueAndTotalCost(
                  $defaultYear,
                  $defaultMonth,
                  search: $request->input('search'),
                  criteria: $criteria,
            );

            return Inertia::render('dashboard/trip', [
                  'years' => $years,
                  'defaultYear' => $defaultYear,
                  'defaultMonth' => $defaultMonth,
                  'defaultItinerary' => $defaultItinerary,
                  'months' => $months,
                  'trips' => TripItemResource::collection($trips),
                  'sumRevenueAndTotalCost' => $sumRevenueAndTotalCost,
            ]);
      }

      public function itinerary(Request $request)
      {
            $years = YearMonth::getLastYears();
            $defaultYear = $request->query->get('year', now()->year);
            $defaultMonth = $request->query->get('month', now()->month);
            $defaultType = $request->query->get('type');
            $months = YearMonth::getLastMonths();
            $criteria = [];

            $request->validate([
                  'year' => ['nullable', Rule::in($years)],
                  'month' => ['nullable', Rule::in(array_column($months, 'value'))],
                  'sort' => ['nullable', Rule::in(self::ITINERARY_SORTABLE_FIELD)],
                  'search' => ['nullable', 'string'],
            ]);

            if ($defaultType) {
                  $criteria['type'] = $defaultType;
            }

            $itineraries = $this->getItineray->finByYearAndMonthAndFilter(
                  $defaultYear,
                  $defaultMonth,
                  sortable: self::ITINERARY_SORTABLE_FIELD,
                  search: $request->input('search'),
                  filters: $request->only(['sort', 'dir']),
                  criteria: $criteria,
            );

            return Inertia::render('dashboard/itinerary', [
                  'years' => $years,
                  'defaultYear' => $defaultYear,
                  'defaultMonth' => $defaultMonth,
                  'defaultType' => $defaultType,
                  'months' => $months,
                  'itineraries' => ItineraryItemResource::collection($itineraries),
            ]);
      }

      public function destination(Request $request)
      {
            $years = YearMonth::getLastYears();
            $months = YearMonth::getLastMonths();
            $defaultYear = $request->query->get('year', now()->year);
            $defaultMonth = $request->query->get('month', now()->month);

            $request->validate([
                  'year' => ['nullable', Rule::in($years)],
                  'month' => ['nullable', Rule::in(array_column($months, 'value'))],
            ]);

            $destinations = $this->getDestination->findByYearAndMonth($defaultYear, $defaultMonth);

            return Inertia::render('dashboard/destination', [
                  'years' => $years,
                  'defaultYear' => $defaultYear,
                  'defaultMonth' => $defaultMonth,
                  'months' => $months,
                  'destinations' => DestinationItemResource::collection($destinations),
            ]);
      }
}
