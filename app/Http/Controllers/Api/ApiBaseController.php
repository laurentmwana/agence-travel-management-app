<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItineraryTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Destination\DestinationFetchResource;
use App\Http\Resources\Itinerary\ItineraryFetchResource;
use App\Services\UseCase\Destination\GetDestinationUseCase;
use App\Services\UseCase\Itinerary\GetItineraryUseCase;
use Illuminate\Http\Request;

class ApiBaseController extends Controller
{
      public function __construct(
            private GetDestinationUseCase $getDestination,
            private GetItineraryUseCase $getItinerary
      ) {}

      public function destinations()
      {
            return response()->json([
                  'data' =>  DestinationFetchResource::collection(
                        $this->getDestination->findAll(['id', 'name'])
                  )
            ]);
      }

      public function itinerariesTypes()
      {
            return response()->json([
                  'data' => ItineraryTypeEnum::toArray()
            ]);
      }

      public function itineraries(Request $request)
      {
            $isScheduled = $request->query->getBoolean('is_scheduled', true);

            return response()->json([
                  'data' => ItineraryFetchResource::collection(
                        $this->getItinerary->findBy(['is_scheduled' => $isScheduled])
                  )
            ]);
      }
}
