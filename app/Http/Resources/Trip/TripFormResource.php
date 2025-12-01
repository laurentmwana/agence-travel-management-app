<?php

namespace App\Http\Resources\Trip;

use App\Http\Resources\Itinerary\ItineraryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripFormResource extends JsonResource
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
            'perfomed_at' => $this->resource->perfomed_at->format('Y-m-d H:i'),
            'observation' => $this->resource->observation,
            'duration_hours' => $this->resource->duration_hours,
            'fuel_quantity' => $this->resource->fuel_quantity,
            'duration_hours' => $this->resource->duration_hours,
            'other_expenses' => $this->resource->other_expenses,
            'affretements' => $this->resource->affretements,
            'itinerary' => new ItineraryResource($this->resource->itinerary),
        ];
    }
}
