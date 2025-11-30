<?php

namespace App\Services\UseCase\Liter;

use Illuminate\Support\Facades\Storage;

class WriteFileLiterUseCase
{
      private const PATH_BASE = "price_unit_liter.txt";
      private const DISK = "local";

      public function get()
      {
            if (!Storage::disk(self::DISK)->exists(self::PATH_BASE)) {
                  $this->set();
            }
            return  (float)Storage::disk(self::DISK)->get(self::PATH_BASE);
      }

      public function set(float|int $value = 0.7)
      {
            Storage::disk(self::DISK)->put(self::PATH_BASE, $value);
      }
}
