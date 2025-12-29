<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    private const TAXES = [
        [
            'name' => 'Route',
            'amount' => 38.24,
        ],
        [
            'name' => 'Stationnement',
            'amount' => 124,
        ],
        [
            'name' => 'Attérrissage',
            'amount' => 20.48
        ],
        [
            'name' => 'Formulaire',
            'amount' => 60,
        ],

        [
            'name' => 'Agent de Sécurité',
            'amount' => 20,
        ],

        [
            'name' => 'Transport Agent',
            'amount' => 25,
        ],

        [
            'name' => 'Carburant Voiture',
            'amount' => 20,
        ],

        [
            'name' => 'Cathering',
            'amount' => 100,
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
