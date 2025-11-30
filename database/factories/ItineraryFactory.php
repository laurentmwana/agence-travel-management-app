<?php

namespace Database\Factories;

use App\Enums\ItineraryTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Itinerary>
 */
class ItineraryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'distance_km' => fake()->randomNumber() * 3,
            'is_scheduled' => fake()->randomElement([true, false]),
            'type' => fake()->randomElement(ItineraryTypeEnum::toArray()),
        ];
    }
}
