<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $fuelCost = fake()->randomFloat(2,  2000, 8000);
        $otherExpenses = fake()->randomFloat(2,  2000, 8000);
        $revenue = fake()->randomFloat(2,  2000, 8000);

        $totalCost = $fuelCost + $otherExpenses;
        $netProfit = $revenue - $totalCost;

        return [
            'perfomed_at' => fake()->dateTime(),
            'observation' => fake()->text(),
            'total_cost' => $totalCost,
            'revenue' => $revenue,
            'net_profit' => $netProfit,
            'fuel_cost' => $fuelCost,
            'other_expenses' => $otherExpenses,
        ];
    }
}
