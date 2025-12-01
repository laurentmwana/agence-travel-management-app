<?php

namespace App\Services\UseCase\Tax;

use App\Repositories\TaxRepository;
use Illuminate\Support\Facades\DB;

class GetTaxUseCase
{
    public function __construct(private TaxRepository $repository) {}

    public function findOrFail(string $id)
    {
        $destination =  $this->repository->findByid($id);

        if (!$destination) {
            abort(404);
        }

        return $destination;
    }

    public function sumAmount()
    {
        return $this->repository->sum('amount');
    }

    public function findPaginated(?string $search = null)
    {
        return $this->repository->findPaginated($search);
    }
}
