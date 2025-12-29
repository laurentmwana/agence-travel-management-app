<?php

namespace App\Helpers;

use Illuminate\Support\Facades\App;

class YearMonth
{
    public static function getYearBetween(int $min = 1900, int|string $max = 'now')
    {
        $end = $max === 'now' && is_string($max) ? now()->year : $max;
        $years = [];
        for ($i = $min; $i < $end; $i++) {
            $years[] = $i;
        }
        return $years;
    }

    public static function getLastYears(int $max = 5)
    {
        $start = now()->year;
        $years = [];
        for ($i = 0; $i < $max; $i++) {
            $years[] = $start - $i;
        }
        return $years;
    }

    public static function getLastMonths(int $max = 12)
    {
        $locale = App::getLocale();
        $months = [];
        $date = now();

        for ($i = 1; $i <= $max; $i++) {
            $d = $date->copy()->month($i);
            $months[] = [
                'value' => $d->format('m'),
                'label' => $d->locale($locale)->translatedFormat('F'),
            ];
        }

        return $months;
    }
}
