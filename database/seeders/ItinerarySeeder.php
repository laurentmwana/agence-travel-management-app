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
        $itineraries = [];



        foreach (Destination::all() as $start) {
            $ends = $this->getDestinationEnds($start->id);
            foreach ($ends as $end) {
                $key = "$start->id-$end->id|$end->id-$start->id";
                if (!isset($itineraries[$key])) {
                    Itinerary::factory()->create([
                        'start_destination_id' => $start->id,
                        'end_destination_id' => $end->id,
                    ]);

                    $itineraries[$key] = true;
                }
            }
        }
    }

    private function getDestinationEnds(string $startId)
    {
        return Destination::query()
            ->where('id', '!=', $startId)
            ->get();
    }
}
