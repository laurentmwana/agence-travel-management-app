<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItineraryTypeEnum;
use App\Http\Controllers\Controller;
use App\UseCase\Destination\GetDestinationUseCase;

class ApiBaseController extends Controller
{
      public function __construct(private GetDestinationUseCase $getDestination) {}

      public function destinations()
      {
            return response()->json([
                  'data' => $this->getDestination->findAll(['id', 'name'])
            ]);
      }

      public function itinerariesTypes()
      {
            return response()->json([
                  'data' => ItineraryTypeEnum::toArray()
            ]);
      }
}
