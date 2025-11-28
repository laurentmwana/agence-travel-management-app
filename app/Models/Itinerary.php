<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'type',
        'is_scheduled',
        'available_seats',
        'price_per_seat',
        'price_per_person',
        'distance_km',
        'start_destination_id',
        'end_destination_id'
    ];

    public function startDestination()
    {
        return $this->belongsTo(Destination::class, 'start_destination_id');
    }

    public function endDestination()
    {
        return $this->belongsTo(Destination::class, 'end_destination_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
