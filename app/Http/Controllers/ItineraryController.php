<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItineraryRequest;
use App\Http\Resources\Itinerary\ItineraryFormResource;
use App\Http\Resources\Itinerary\ItineraryItemResource;
use App\Http\Resources\Itinerary\ItineraryResource;
use App\Services\UseCase\Itinerary\DeleteItineraryUseCase;
use App\Services\UseCase\Itinerary\GetItineraryUseCase;
use App\Services\UseCase\Itinerary\NewItineraryUseCase;
use App\Services\UseCase\Itinerary\UpdateItineraryUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ItineraryController extends Controller
{
    private const SORTABLE_FIELD = ['type', 'is_scheduled', 'distance_km'];

    public function __construct(private GetItineraryUseCase $getItinerary) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->validate([
            'sort' => ['nullable', Rule::in(self::SORTABLE_FIELD)],
            'search' => ['nullable', 'string'],
        ]);

        $itineraries = $this->getItinerary->filters($filters, self::SORTABLE_FIELD, $filters['search'] ?? null);

        return Inertia::render('itinerary/index', [
            'itineraries' => ItineraryResource::collection($itineraries)
        ]);
    }

    public function create()
    {
        return Inertia::render('itinerary/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItineraryRequest $request, NewItineraryUseCase $usecase)
    {
        $usecase->handle($request->toDto());

        return to_route('itinerary.index')->with('success', __('toast.created.success'));
    }

    public function show(string $id)
    {
        $itinerary = $this->getItinerary->findOrFail($id);

        return Inertia::render('itinerary/show', [
            'itinerary' => new ItineraryItemResource($itinerary),
        ]);
    }

    public function edit(string $id)
    {
        $itinerary = $this->getItinerary->findOrFail($id);

        return Inertia::render('itinerary/edit', [
            'itinerary' => new ItineraryFormResource($itinerary),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItineraryUseCase $usecase, ItineraryRequest $request, string $id)
    {
        $itinerary = $this->getItinerary->findOrFail($id);

        $usecase->handle($request->toDto(), $itinerary);

        return to_route('itinerary.index')->with('success', __('toast.updated.success'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteItineraryUseCase $usecase, Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $itinerary = $this->getItinerary->findOrFail($id);

        $usecase->handle($itinerary);

        return to_route('itinerary.index')->with('success', __('toast.deleted.success'));
    }
}
