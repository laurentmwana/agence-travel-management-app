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

    public function findStatByYear(string $year)
    {
        $stats = [];

        for ($month = 1; $month <= 12; $month++) {
            $date = sprintf('%04d-%02d', $year, $month);
            $stats[$date] = [
                'date'       => $date,
                'net_profit' => 0,
                'total_cost' => 0,
            ];
        }

        return DB::transaction(function () use ($stats) {
            return array_values($this->repository->findStatByYear($stats));
        });
    }

    public function countBy(array $criteria = []): int
    {
        return DB::transaction(function () use ($criteria) {
            return $this->repository->countBy($criteria);
        });
    }
}
