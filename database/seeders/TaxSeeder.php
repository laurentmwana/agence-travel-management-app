<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    private const TAXES = [
        [
            'name' => 'route',
            'amount' => 38.40,
        ],
        [
            'name' => 'stationnement',
            'amount' => 20.12,
        ],
        [
            'name' => 'attérrisage',
            'amount' => 40,
        ],
        [
            'name' => 'formulaire',
            'amount' => 60,
        ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::TAXES as $tax) {
            Tax::factory()->create($tax);
        }
    }
}
