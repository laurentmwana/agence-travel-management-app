<?php

namespace App\Services\UseCase\Trip;

use App\Dto\TripDto;
use App\Services\UseCase\Other\AcmiUseCase;
use App\Services\UseCase\Other\LiterUseCase;
use App\Services\UseCase\Tax\GetTaxUseCase;

class CalculateTripUseCase
{
      private const ACMI_PER_HOURS = 2100;

      public function __construct(
            private LiterUseCase $liter,
            private AcmiUseCase $acmi,
            private GetTaxUseCase $tax
      ) {}

      public function handle(TripDto $dto)
      {
            // calculate acmi
            $acmi = $dto->getDurationHours() * self::ACMI_PER_HOURS;
            // calculate other expenses
            $affretementTotal = $this->calculateSumAmount($dto->getAffretements());
            $otherExpensesTotal = $this->calculateSumAmount($dto->getOtherExpenses());
            $fuelPrice = $dto->getFuelQuantity() * $this->liter->get();
            $totalTax = $this->tax->sumAmount();

            $netProfit = $affretementTotal - $acmi - $fuelPrice - $totalTax;
            $totalCost = $acmi + $fuelPrice + $totalTax + $otherExpensesTotal + $affretementTotal;

            return [
                  'acmi' => $acmi,
                  'affretement_total' => $affretementTotal,
                  'total_expenses' => $otherExpensesTotal,
                  'fuel_price' => $fuelPrice,
                  'total_cost' => $totalCost,
                  'net_profit' => $netProfit,
                  'net_loss' => $netProfit < 0 ? $netProfit : 0,
            ];
      }


      private function calculateSumAmount(array $items): float|int
      {
            $total = 0;

            foreach ($items as $item) {
                  $total += $item['amount'];
            }
            return $total;
      }
}
