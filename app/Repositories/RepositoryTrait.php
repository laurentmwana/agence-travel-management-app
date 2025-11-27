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
}
