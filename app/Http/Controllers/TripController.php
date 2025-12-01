<?php

namespace App\Http\Controllers;

use App\Http\Requests\TripRequest;
use App\Http\Resources\Trip\TripFormResource;
use App\Http\Resources\Trip\TripItemResource;
use App\Http\Resources\Trip\TripResource;
use App\Services\UseCase\Trip\DeleteTripUseCase;
use App\Services\UseCase\Trip\GetTripUseCase;
use App\Services\UseCase\Trip\NewTripUseCase;
use App\Services\UseCase\Trip\UpdateTripUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TripController extends Controller
{

    private const SORTABLE_FIELD = [
        'perfomed_at',
        'total_cost',
        'net_profit',
        'fuel_price',
        'other_expenses',
    ];

    public function __construct(private GetTripUseCase $getTrip) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->validate([
            'sort' => ['nullable', Rule::in(self::SORTABLE_FIELD)],
            'search' => ['nullable', 'string'],
        ]);

        $trips = $this->getTrip->filters($filters, self::SORTABLE_FIELD, $filters['search'] ?? null);

        return Inertia::render('trip/index', [
            'trips' => TripResource::collection($trips)
        ]);
    }

    public function create()
    {
        return Inertia::render('trip/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TripRequest $request, NewTripUseCase $usecase)
    {
        $usecase->handle($request->toDto());

        return to_route('trip.index')->with('success', __('toast.created.success'));
    }

    public function show(string $id)
    {
        $trip = $this->getTrip->findOrFail($id);

        return Inertia::render('trip/show', [
            'trip' => new TripItemResource($trip),
        ]);
    }

    public function edit(string $id)
    {
        $trip = $this->getTrip->findOrFail($id);

        return Inertia::render('trip/edit', [
            'trip' => new TripFormResource($trip),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripUseCase $usecase, TripRequest $request, string $id)
    {
        $trip = $this->getTrip->findOrFail($id);

        $usecase->handle($request->toDto(), $trip);

        return to_route('trip.index')->with('success', __('toast.updated.success'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteTripUseCase $usecase, Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $trip = $this->getTrip->findOrFail($id);

        $usecase->handle($trip);

        return to_route('trip.index')->with('success', __('toast.deleted.success'));
    }
}
