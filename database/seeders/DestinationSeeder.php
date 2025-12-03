<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    private const DESTINATIONS = [
        'KINSHASA',
        'KWILU',
        'MATADI'
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::DESTINATIONS as $destination) {
            Destination::factory()->create([
                'name' => $destination
            ]);
        }
    }
}
