<?php

namespace App\Repositories;

use App\Models\Itinerary;
use App\Services\Eloquent\EloquentFilterData;

class ItineraryRepository
{
      use RepositoryTrait;

      protected string $model = Itinerary::class;

      public function __construct(private EloquentFilterData $filter) {}

      public function findPaginated(array $filters, array $sortable, ?string $search = null)
      {
            $builder =  Itinerary::query()->orderByDesc('updated_at');

            if ($search) {
                  $builder->where(function ($query) use ($search) {
                        $query->where('type', 'like', "%{$search}%");
                        $query->orWhere('distance_km', 'like', "%{$search}%");
                        $query->orWhere('price_per_seat', 'like', "%{$search}%");
                        $query->orWhere('is_scheduled', 'like', "%{$search}%");
                  });
            }

            return $this->filter->orderFromRequest($builder, $filters, $sortable)->paginate();
      }
}
