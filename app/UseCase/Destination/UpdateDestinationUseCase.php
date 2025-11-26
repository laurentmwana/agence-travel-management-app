<?php

namespace App\UseCase\Destination;

use App\Dto\DestinationDto;
use App\Models\Destination;
use Illuminate\Support\Facades\DB;

class UpdateDestinationUseCase
{
    public function handle(DestinationDto $dto, Destination $destination): Destination
    {
        return DB::transaction(function () use ($dto, $destination) {
            $destination->update([
                'name' => $dto->getName(),
            ]);

            return $destination;
        });
    }
}
