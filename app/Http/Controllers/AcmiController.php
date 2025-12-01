<?php

namespace App\Http\Controllers;

use App\Services\UseCase\Other\AcmiUseCase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcmiController extends Controller
{
    public function __construct(private AcmiUseCase $acmi) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('acmi/index', [
            'priceAcmi' => $this->acmi->get(2100)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'price_acmi' => ['required', 'regex:/^\d+(\.\d+)?$/'],
        ]);

        $this->acmi->set($request->input('price_acmi', 2100));

        return to_route('acmi.index')->with('success', __('toast.updated.success'));
    }
}
