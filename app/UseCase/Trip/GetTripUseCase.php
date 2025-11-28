<?php

namespace App\UseCase\Trip;

use App\Repositories\TripRepository;
use Illuminate\Support\Facades\DB;

class GetTripUseCase
{
    public function __construct(private TripRepository $repository) {}

    public function findOrFail(string $id)
    {
        return DB::transaction(function () use ($id) {
            $trip =  $this->repository->findByid($id);

            if (!$trip) {
                abort(404);
            }

            return $trip;
        });
    }

    public function filters(array $filters, array $sortable, ?string $search = null)
    {
        return DB::transaction(function () use ($filters, $sortable, $search) {
            return $this->repository->findPaginated($filters, $sortable, $search);
        });
    }
}
