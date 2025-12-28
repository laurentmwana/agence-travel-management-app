<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'perfomed_at',
        'observation',
        'total_cost',
        'total_tax',
        'affretement_total',
        'total_fuel_price',
        'net_profit',
        'fuel_price',
        'fuel_quantity',
        'other_expenses',
        'itinerary_id',
        'duration_hours',
        'acmi',
        'total_expenses',
        'net_loss',
        'affretements',
        'number_of_passenger'
    ];

    protected $casts = [
        'other_expenses' => 'json',
        'affretements' => 'json',
        'perfomed_at' => 'datetime',
    ];

    public function itinerary()
    {
        return $this->belongsTo(Itinerary::class);
    }
}
