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

      public function finByYearAndMonthAndFilter(string $year, string $month, ?string $search = null, array $criteria = [], array $filters = [], array $sortable = [])
      {
            $builder =  $this->model::query()
                  ->where($criteria)
                  ->where('created_at', 'like', "%$year-$month%");

            if ($search) {
                  $builder->where(function ($query) use ($search, $sortable) {
                        foreach ($sortable as $field) {
                              $query->orWhere($field, 'like', "%{$search}%");
                        }
                  });
            }

            return $this->filter->orderFromRequest($builder, $filters, $sortable)->paginate();
      }

      public function sum(string $column)
      {
            return $this->model::query()->sum($column);
      }
}
