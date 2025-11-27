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
        return [
            'perfomed_at' => fake()->dateTime(),
            'observation' => fake()->text(),
            'total_cost' => fake()->randomFloat(min: 2000, max: 8000),
            'revenue' => fake()->randomFloat(min: 2000, max: 8000),
            'net_profit' => fake()->randomFloat(min: 2000, max: 8000),
            'fuel_cost' => fake()->randomFloat(min: 2000, max: 8000),
            'other_expenses' => fake()->randomFloat(min: 2000, max: 8000),
        ];
    }
}
