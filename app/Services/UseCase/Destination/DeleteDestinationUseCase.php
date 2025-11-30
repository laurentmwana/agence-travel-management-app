<?php

namespace App\Services\UseCase\Destination;

use App\Models\Destination;
use Illuminate\Support\Facades\DB;

class DeleteDestinationUseCase
{
    public function handle(Destination $destination): Destination
    {
        return DB::transaction(function () use ($destination) {
            $destination->delete();

            return $destination;
        });
    }
}
