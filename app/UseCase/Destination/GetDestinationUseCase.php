<?php

namespace App\UseCase\Destination;

use App\Repositories\DestinationRepository;
use Illuminate\Support\Facades\DB;

class GetDestinationUseCase
{
    public function __construct(private DestinationRepository $repository) {}

    public function findOrFail(string $id)
    {
        $destination =  $this->repository->findByid($id);

        if (!$destination) {
            abort(404);
        }

        return $destination;
    }

    public function findAll(array $columns = ['*'])
    {
        return $this->repository->findAll($columns);
    }

    public function filters(array $filters, ?string $search = null)
    {
        return $this->repository->findPaginated($filters, $search);
    }

    public function findByYearAndMonth(string $year, string $month)
    {
        return $this->repository->findByYearAndMonth($year, $month);
    }

    public function countBy(array $criteria = []): int
    {
        return $this->repository->countBy($criteria);
    }
}
