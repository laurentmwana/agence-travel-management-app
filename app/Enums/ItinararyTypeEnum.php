<?php

namespace App\Enums;

enum ItinararyTypeEnum: string
{
      use \App\Traits\EnumerateTrait;

      case PLANE = 'plane';
      case BOAT = 'boat';
      case TRAIN = 'train';
      case BUS = 'bus';
      case CAR = 'car';
}
