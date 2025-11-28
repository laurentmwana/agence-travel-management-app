<?php

namespace App\Repositories;

use App\Models\Trip;
use App\Services\Eloquent\EloquentFilterData;

class TripRepository
{
      use RepositoryTrait;

      protected string $model = Trip::class;

      public function __construct(private EloquentFilterData $filter) {}

      public function findPaginated(array $filters, array $sortable, ?string $search = null)
      {
            $builder =  Trip::query()->orderByDesc('updated_at');

            if ($search) {
                  $builder->where(function ($query) use ($search) {
                        $query->where('total_cost', 'like', "%{$search}%");
                        $query->orWhere('revenue', 'like', "%{$search}%");
                        $query->orWhere('other_expenses', 'like', "%{$search}%");
                        $query->orWhere('fuel_cost', 'like', "%{$search}%");
                  });
            }

            return $this->filter->orderFromRequest($builder, $filters, $sortable)->paginate();
      }
}
