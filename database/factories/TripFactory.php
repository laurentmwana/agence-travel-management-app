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

        $fuelCost = fake()->randomFloat(2);
        $otherExpenses = fake()->randomFloat(2);
        $revenue = fake()->randomFloat(2);

        $totalCost = $fuelCost + $otherExpenses;
        $netProfit = $revenue - $totalCost;

        $fuelQuantity = fake()->randomFloat(3);

        return [
            'perfomed_at' => fake()->dateTime(),
            'observation' => fake()->text(),
            'total_cost' => $totalCost,
            'revenue' => $revenue,
            'net_profit' => $netProfit,
            'fuel_quantity' => $fuelQuantity,
            'fuel_cost' => $fuelCost,
            'other_expenses' => $otherExpenses,
        ];
    }
}
