<?php

namespace App\UseCase\Itinerary;

use App\Repositories\ItineraryRepository;
use Illuminate\Support\Facades\DB;

class GetItineraryUseCase
{
    public function __construct(private ItineraryRepository $repository) {}

    public function findAll(array $columns = ['*'])
    {
        return DB::transaction(function () use ($columns) {
            return $this->repository->findAll($columns);
        });
    }

    public function findOrFail(string $id)
    {
        return DB::transaction(function () use ($id) {
            $itinerary =  $this->repository->findByid($id);

            if (!$itinerary) {
                abort(404);
            }

            return $itinerary;
        });
    }

    public function filters(array $filters, array $sortable, ?string $search = null)
    {
        return DB::transaction(function () use ($filters, $sortable, $search) {
            return $this->repository->findPaginated($filters, $sortable, $search);
        });
    }

     public function countBy(array $criteria = []): int
    {
        return DB::transaction(function () use ($criteria) {
            return $this->repository->countBy($criteria);
        });
    }
}
