<?php

namespace App\Services\Eloquent;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;

class EloquentFilterData
{
      private const ORDER_FROM_REQUEST_DIR = ['asc', 'desc'];

      public function orderFromRequest(Builder $builder, array $data, array $sortable = [])
      {
            if (empty($sortable ?? [])) {
                  return $builder;
            }

            if (!($data['sort'] ?? null) || (isset($data['dir']) && !in_array($data['dir'], self::ORDER_FROM_REQUEST_DIR))) {
                  $builder->orderByDesc('created_at');
                  return $builder;
            }

            $builder->orderBy($data['sort'], $data['dir'] ?? 'desc');

            return $builder;
      }

}
