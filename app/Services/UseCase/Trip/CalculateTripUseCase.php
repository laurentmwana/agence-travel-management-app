<?php

namespace App\Services\UseCase\Trip;

use App\Dto\TripDto;

class CalculateTripUseCase
{
      public function handle(TripDto $dto)
      {
            $totalCost = $dto->getFuelCost() + $dto->getOtherExpenses();
            $netProfit = $dto->getRevenue() - $totalCost;

            return ['net_profit' => $netProfit, 'total_cost' => $totalCost];
      }
}
