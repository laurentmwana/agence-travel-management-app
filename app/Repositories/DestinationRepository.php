<?php

namespace App\Repositories;

use App\Models\Destination;
use App\Services\Eloquent\EloquentFilterData;

class DestinationRepository
{
    use RepositoryTrait;

    protected string $model = Destination::class;

    public function __construct(private EloquentFilterData $filter) {}

    public function findPaginated(array $filters, ?string $search = null)
    {
        $builder =  Destination::query()->orderByDesc('updated_at');

        if ($search) {
            $builder->where('name', 'like', "%{$search}%");
        }

        return $this->filter->orderFromRequest($builder, $filters, ['name', 'id'])->paginate();
    }

    public function findByYearAndMonth(string $year, string $month)
    {
        return Destination::query()
            ->where('created_at', 'like', "%$year-$month%")
            ->paginate();
    }
}
