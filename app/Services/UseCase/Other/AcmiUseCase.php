<?php

namespace App\Services\UseCase\Other;

use App\Services\WriteFileUseCase;

class AcmiUseCase extends WriteFileUseCase
{
      private const PATH_BASE = "price_acmi.txt";
      private const DISK = "local";

      public function __construct()
      {
            return parent::__construct(self::PATH_BASE, self::DISK);
      }
}
