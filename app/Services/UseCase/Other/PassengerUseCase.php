<?php

namespace App\Services\UseCase\Other;

use App\Services\WriteFileUseCase;

class PassengerUseCase extends WriteFileUseCase
{
      private const PATH_BASE = "number_of_passenger.txt";
      private const DISK = "local";

      public function __construct()
      {
            return parent::__construct(self::PATH_BASE, self::DISK);
      }
}
