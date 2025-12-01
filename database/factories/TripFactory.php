<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    private const PRICE_UNIT_LITER = 0.7;
    private const ACMI_PER_HOURS = 2100.0;
    private const TOTAL_TAX = 158.52;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        // net_profit = acmi - fuel_cost - total_tax
        // total_cost = acmi + fuel_cost + total_tax + other_expenses_total + affretement_total

        $durationHours = fake()->numberBetween(1, 24);
        $acmi = $durationHours * self::ACMI_PER_HOURS;
        ['total_expenses' => $totalExpense, 'other_expenses' => $otherExpenses] = $this->generateOtherExpenses();
        ['affretement_total' => $affretementTotal, 'affretements' => $affretements] = $this->generateAffretements();
        $fuelQuantity = fake()->randomFloat(2, 10, 100);
        $fuelPrice = self::PRICE_UNIT_LITER * $fuelQuantity;
        $totalCost = $acmi + $fuelPrice + self::TOTAL_TAX + $totalExpense + $affretementTotal;
        $netProfit = $affretementTotal - $acmi - $fuelPrice - self::TOTAL_TAX;

        return [
            'perfomed_at' => fake()->dateTime(),
            'duration_hours' => $durationHours,
            'acmi' => $acmi,
            'total_expenses' => $totalExpense,
            'affretement_total' => $affretementTotal,
            'affretements' => $affretements,
            'observation' => fake()->text(),
            'total_cost' => $totalCost,
            'net_profit' => $netProfit,
            'net_loss' => $netProfit < 0 ? $netProfit : 0,
            'fuel_quantity' => $fuelQuantity,
            'fuel_price' => $fuelPrice,
            'other_expenses' => $otherExpenses,
            'total_tax' => self::TOTAL_TAX,
        ];
    }

    private function generateOtherExpenses(): array
    {
        $expenses = [];
        $numExpenses = fake()->numberBetween(1, 4);
        $totalOtherExpenses = 0;

        for ($i = 0; $i < $numExpenses; $i++) {
            $amount = fake()->randomFloat(2, 10, 500);
            $expenses[] = [
                'name' => fake()->name(),
                'amount' => $amount,
            ];
            $totalOtherExpenses += $amount;
        }

        return ['other_expenses' => $expenses, 'total_expenses' => $totalOtherExpenses];
    }

    private function generateAffretements(): array
    {
        $affretements = [];
        $numAffretement = fake()->numberBetween(1, 4);
        $totalAffretements = 0;

        for ($i = 0; $i < $numAffretement; $i++) {
            $amount = fake()->randomFloat(2, 40000, 100000);
            $affretements[] = [
                'name' => fake()->name(),
                'amount' => $amount,
            ];
            $totalAffretements += $amount;
        }

        return ['affretements' => $affretements, 'affretement_total' => $totalAffretements];
    }
}
