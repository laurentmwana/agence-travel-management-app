<?php

namespace App\Http\Resources\Trip;

use App\Http\Resources\Itinerary\ItineraryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
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
            'total_cost' => $this->resource->total_cost,
            'duration_hours' => $this->resource->duration_hours,
            'net_loss' => $this->resource->net_loss,
            'net_profit' => $this->resource->net_profit,
            'fuel_quantity' => $this->resource->fuel_quantity,
            'total_expenses' => $this->resource->other_expenses,
            'fuel_price' => $this->resource->fuel_price,
            'number_of_passenger' => $this->resource->number_of_passenger,
            'total_price_passenger' => $this->resource->total_price_passenger,
            'total_tax' => $this->resource->total_tax,
            'acmi' => $this->resource->acmi,
            'itinerary' => new ItineraryResource($this->resource->itinerary),
            'created_at' => $this->resource->created_at,
        ];
    }
}
