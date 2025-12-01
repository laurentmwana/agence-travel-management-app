<?php

namespace App\Services\UseCase\Other;

use App\Services\WriteFileUseCase;

class LiterUseCase extends WriteFileUseCase
{
      private const PATH_BASE = "price_unit_liter.txt";
      private const DISK = "local";

      public function __construct()
      {
            return parent::__construct(self::PATH_BASE, self::DISK);
      }
}
