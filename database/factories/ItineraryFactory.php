<?php

namespace Database\Factories;

use App\Enums\ItinararyTypeEnum;
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
            'distance_km' => fake()->randomNumber() * 100,
            'price_per_person' => fake()->randomNumber() * 10,
            'price_per_seat' => 10,
            'available_seats' => fake()->randomDigitNotZero(),
            'is_scheduled' => fake()->randomElement([true, false]),
            'notes' => fake()->text(),
            'start_at' => fake()->dateTime(),
            'type' => fake()->randomElement(ItinararyTypeEnum::toArray()),
        ];
    }
}
