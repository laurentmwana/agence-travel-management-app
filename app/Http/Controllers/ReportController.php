<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\YearMonth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $years = YearMonth::getYearBetween();
        $months = YearMonth::getLastMonths();
        $defaultYear = $request->query->get('year', now()->year);
        $defaultDate = $request->query->get('date', now());
        $tag = $request->query->get('year', null);
        $defaultMonth = $request->query->get('month', now()->month);

        $request->validate([
            'year' => ['nullable', Rule::in($years)],
            'month' => ['nullable', Rule::in(array_column($months, 'value'))],
        ]);

        return Inertia::render('report/index', [
            'years' => $years,
            'tag' => $tag,
            'defaultDate' => $defaultDate,
            'defaultYear' => $defaultYear,
            'defaultMonth' => $defaultMonth,
            'months' => $months,
        ]);
    }
}
