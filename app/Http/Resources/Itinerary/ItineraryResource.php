<?php

namespace App\Http\Resources\Itinerary;

use App\Http\Resources\Destination\DestinationItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItineraryResource extends JsonResource
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
            'note' => $this->resource->note,
            'type' => $this->resource->type,
            'is_scheduled' => $this->resource->is_scheduled,
            'distance_km' => $this->resource->distance_km,
            'start_at' => $this->resource->start_at,
            'start' => new DestinationItemResource($this->resource->startDestination),
            'end' => new DestinationItemResource($this->resource->endDestination),
            'created_at' => $this->resource->created_at,
        ];
    }
}
