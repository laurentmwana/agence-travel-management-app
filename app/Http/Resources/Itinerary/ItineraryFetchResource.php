<?php

namespace App\Http\Resources\Itinerary;

use App\Http\Resources\Destination\DestinationItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItineraryFetchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->resource->id,
            'type' => $this->resource->type,
            'start' => new DestinationItemResource($this->resource->startDestination),
            'end' => new DestinationItemResource($this->resource->endDestination),
        ];
    }
}
