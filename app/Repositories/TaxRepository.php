<?php

namespace App\Repositories;

use App\Models\Tax;
use App\Services\Eloquent\EloquentFilterData;

class TaxRepository
{
    use RepositoryTrait;

    protected string $model = Tax::class;

    public function __construct(private EloquentFilterData $filter) {}

    public function findPaginated(?string $search = null)
    {
        $builder =  Tax::query()->orderByDesc('updated_at');

        if ($search) {
            $builder->where('name', 'like', "%{$search}%");
        }
        return $builder->paginate();
    }
}
