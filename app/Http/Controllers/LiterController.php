<?php

namespace App\Http\Controllers;

use App\Services\UseCase\Other\LiterUseCase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiterController extends Controller
{
    public function __construct(private LiterUseCase $writeLiter) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('liter/index', [
            'priceUnitLiter' => $this->writeLiter->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'price_unit_liter' => ['required', 'regex:/^\d+(\.\d+)?$/'],
        ]);

        $this->writeLiter->set($request->input('price_unit_liter', 0.7));

        return to_route('liter.index')->with('success', __('toast.updated.success'));
    }
}
