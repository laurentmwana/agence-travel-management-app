<?php

namespace App\Http\Resources\Itinerary;

use App\Http\Resources\Destination\DestinationItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItineraryItemResource extends JsonResource
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
            'available_seats' => $this->resource->available_seats,
            'price_per_person' => $this->resource->price_per_person,
            'price_per_seat' => $this->resource->price_per_seat,
            'distance_km' => $this->resource->distance_km,
            'start_at' => $this->resource->start_at,
            'start' => new DestinationItemResource($this->resource->startDestination),
            'end' => new DestinationItemResource($this->resource->endDestination),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
