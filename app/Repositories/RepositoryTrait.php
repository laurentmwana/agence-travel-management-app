<?php

namespace App\Repositories;

trait RepositoryTrait
{
      public function findAll(array $columns = ['*'])
      {
            return $this->model::all($columns);
      }

      public function findById(string $id)
      {
            return $this->model::query()->find($id);
      }

      public function countBy(array $criteria = [])
      {
            return $this->model::query()
                  ->with($criteria)
                  ->count();
      }
}
