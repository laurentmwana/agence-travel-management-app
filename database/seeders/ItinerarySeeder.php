<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Itinerary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItinerarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Destination::all() as $start) {
            foreach (Destination::query()->where('id', '!=', $start->id)->get() as $end) {
                if ($start->id !== $end->id) {
                    Itinerary::factory(2)->create([
                        'start_destination_id' => $start->id,
                        'end_destination_id' => $end->id,
                    ]);
                }
            }
        }
    }
}
