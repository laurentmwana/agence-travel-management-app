<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    private const DESTINATIONS = [
        'KINSHASA',
        'BAS-UELE',
        'EQUATEUR',
        'HAUT-KATANGA',
        'HAUT-LOMAMI',
        'HAUT-UELE',
        'ITURI',
        'KASAI',
        'KASAI-CENTRAL',
        'KASAI-ORIENTAL',
        'KWANGO',
        'KWILU',
        'LOMAMI',
        'LUALABA',
        'MAI-NDOMBE',
        'MANIEMA',
        'MONGALA',
        'NORD-KIVU',
        'NORD-UBANGI',
        'SANKURU',
        'SUD-KIVU',
        'SUD-UBANGI',
        'TANGANYIKA',
        'TSHOPO',
        'TSHUAPA'
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
