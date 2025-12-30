<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $defaultDate = $request->query->get('date');
        $tag = $request->query->get('tag', null);

        return Inertia::render('report/index', [
            'tag' => $tag,
            'defaultDate' => $defaultDate,
        ]);
    }

    public function store()
    {
        
    }
}
