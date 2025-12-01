<?php

namespace App\Http\Resources\Trip;

use App\Http\Resources\Destination\DestinationItemResource;
use App\Http\Resources\Itinerary\ItineraryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripItemResource extends JsonResource
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
            'net_profit' => $this->resource->net_profit,
            'fuel_quantity' => $this->resource->fuel_quantity,
            'acmi' => $this->resource->acmi,
            'fuel_price' => $this->resource->fuel_price,
            'duration_hours' => $this->resource->duration_hours,
            'other_expenses' => $this->resource->other_expenses,
            'total_expenses' => $this->resource->total_expenses,
            'affretements' => $this->resource->affretements,
            'affretement_total' => $this->resource->affretement_total,
            'net_loss' => $this->resource->net_loss,
            'total_tax' => $this->resource->total_tax,
            'itinerary' => new ItineraryResource($this->resource->itinerary),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
