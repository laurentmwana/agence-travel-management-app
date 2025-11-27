<?php

namespace App\UseCase\Destination;

use App\Repositories\DestinationRepository;
use Illuminate\Support\Facades\DB;

class GetDestinationUseCase
{
    public function __construct(private DestinationRepository $repository) {}

    public function findOrFail(string $id)
    {
        return DB::transaction(function () use ($id) {
            $destination =  $this->repository->findByid($id);

            if (!$destination) {
                abort(404);
            }

            return $destination;
        });
    }

    public function findAll(array $columns = ['*'])
    {
        return DB::transaction(function () use ($columns) {
            return $this->repository->findAll($columns);
        });
    }

    public function filters(array $filters, ?string $search = null)
    {
        return DB::transaction(function () use ($filters, $search) {
            return $this->repository->findPaginated($filters, $search);
        });
    }
}
