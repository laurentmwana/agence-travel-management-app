<?php

namespace Database\Seeders;

use App\Models\Itinerary;
use App\Models\Trip;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Itinerary::all() as $itinerary) {
            $randomMaxTrip = random_int(2, 3);

            Trip::factory($randomMaxTrip)->create([
                'itinerary_id' => $itinerary->id,
            ]);
        }
    }
}
