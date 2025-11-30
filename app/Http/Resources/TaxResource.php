<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaxResource extends JsonResource
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
                  'name' => $this->resource->name,
                  'amount' => $this->resource->amount,
                  'description' => $this->resource->description,
                  'created_at' => $this->resource->created_at,
                  'updated_at' => $this->resource->updated_at,
            ];
      }
}
