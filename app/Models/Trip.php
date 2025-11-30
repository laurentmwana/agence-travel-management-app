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
        'revenue',
        'net_profit',
        'fuel_cost',
        'fuel_quantity',
        'other_expenses',
        'itinerary_id',
    ];

    public function itinerary()
    {
        return $this->belongsTo(Itinerary::class);
    }
}
