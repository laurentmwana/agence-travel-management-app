<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function itineraries()
    {
        return $this->hasMany(Itinerary::class);
    }
}
