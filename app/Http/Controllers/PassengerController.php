<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UseCase\Other\PassengerUseCase;
use Inertia\Inertia;

class PassengerController extends Controller
{

    public function __construct(private PassengerUseCase $passenger) {}

    public function index()
    {
        return Inertia::render('passenger/index', [
            'priceUnitPassenger' => $this->passenger->get()
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'price_unit_passenger' => 'required|integer|min:1',
        ]);

        $this->passenger->set($request->input('price_unit_passenger', 1));

        return to_route('number-passenger.index')->with('success', __('toast.updated.success'));
    }
}
