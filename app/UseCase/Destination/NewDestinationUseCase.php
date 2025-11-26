<?php

namespace App\UseCase\Destination;

use App\Dto\DestinationDto;
use App\Models\Destination;
use Illuminate\Support\Facades\DB;

class NewDestinationUseCase
{
    public function handle(DestinationDto $dto): Destination
    {
        return DB::transaction(function () use ($dto) {
            return Destination::create([
                'name' => $dto->getName(),
            ]);
        });
    }
}
