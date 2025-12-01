<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class WriteFileUseCase
{
      public function __construct(
            private string $pathBase,
            private string $disk = 'local',
      ) {}

      public function get(float|int $default = 0.7): float
      {
            if (!Storage::disk($this->disk)->exists($this->pathBase)) {
                  $this->set($default);
            }
            return  (float)Storage::disk($this->disk)->get($this->pathBase);
      }

      public function set(float|int $value = 0.7)
      {
            Storage::disk($this->disk)->put($this->pathBase, $value);
      }
}
