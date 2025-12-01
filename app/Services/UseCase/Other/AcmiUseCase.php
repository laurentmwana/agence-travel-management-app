<?php

namespace App\Services\UseCase\Other;

use App\Services\WriteFileUseCase;
use Illuminate\Support\Facades\Storage;

class AcmiUseCase extends WriteFileUseCase
{
      private const PATH_BASE = "price_unit_.txt";
      private const DISK = "local";

      public function __construct()
      {
            return parent::__construct(self::PATH_BASE, self::DISK);
      }
}
