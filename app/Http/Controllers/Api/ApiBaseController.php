<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItineraryTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Destination\DestinationFetchResource;
use App\Http\Resources\Itinerary\ItineraryFetchResource;
use App\UseCase\Destination\GetDestinationUseCase;
use App\UseCase\Itinerary\GetItineraryUseCase;

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

      public function itineraries()
      {
            return response()->json([
                  'data' => ItineraryFetchResource::collection($this->getItinerary->findAll())
            ]);
      }
}
