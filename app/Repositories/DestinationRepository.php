<?php

namespace App\Repositories;

use App\Models\Destination;
use App\Services\Eloquent\EloquentFilterData;

class DestinationRepository
{
    public function __construct(private EloquentFilterData $filter) {}

    public function findPaginated(array $filters, ?string $search = null)
    {
        $builder =  Destination::query()->orderByDesc('updated_at');

        if ($search) {
            $builder->where('name', 'like', "%{$search}%");
        }

        return $this->filter->orderFromRequest($builder, $filters, ['name', 'id'])->paginate();
    }

    public function findById(string $id)
    {
        return Destination::query()->find($id);
    }
}
