<?php

namespace App\Repositories;

use App\Models\Trip;
use App\Services\Eloquent\EloquentFilterData;

class TripRepository
{
      use RepositoryTrait;

      protected string $model = Trip::class;

      public function __construct(private EloquentFilterData $filter) {}

      public function findPaginated(array $filters, array $sortable, ?string $search = null)
      {
            $builder =  Trip::query()->orderByDesc('updated_at');

            if ($search) {
                  $builder->where(function ($query) use ($search) {
                        $query->where('total_cost', 'like', "%{$search}%");
                        $query->orWhere('revenue', 'like', "%{$search}%");
                        $query->orWhere('other_expenses', 'like', "%{$search}%");
                        $query->orWhere('fuel_cost', 'like', "%{$search}%");
                  });
            }

            return $this->filter->orderFromRequest($builder, $filters, $sortable)->paginate();
      }

      public function findStatByYear(string $year, array $stats)
      {
            $trips = Trip::query()->where('created_at', 'like', "%$year%")->get();

            foreach ($trips as $trip) {
                  $keyIndex = $trip->created_at->format('Y-m');
                  if (isset($stats[$keyIndex])) {
                        $stats[$keyIndex]['net_profit'] += $trip->net_profit;
                        $stats[$keyIndex]['total_cost'] += $trip->total_cost;
                  }
            }
            return $stats;
      }

      public function sumRevenueAndTotalCost(string $year, string $month, ?string $search = null, array $criteria = [], array $sortable = [])
      {
            $builder =  Trip::query()
                  ->where($criteria)
                  ->where('created_at', 'like', "%$year-$month%")
                  ->selectRaw('SUM(net_profit) as total_net_profit, SUM(total_cost) as total_cost');

            if ($search) {
                  $builder->where(function ($query) use ($search, $sortable) {
                        foreach ($sortable as $field) {
                              $query->orWhere($field, 'like', "%{$search}%");
                        }
                  });
            }

            return [
                  'netProfit' => $builder->value('total_net_profit') ?? 0,
                  'totalCost'    => $builder->value('total_cost') ?? 0,
            ];
      }
}
