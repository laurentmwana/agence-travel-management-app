<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestinationRequest;
use App\Http\Resources\Destination\DestinationResource;
use App\UseCase\Destination\DeleteDestinationUseCase;
use App\UseCase\Destination\GetDestinationUseCase;
use App\UseCase\Destination\NewDestinationUseCase;
use App\UseCase\Destination\UpdateDestinationUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DestinationController extends Controller
{

    public function __construct(private GetDestinationUseCase $getDestination) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->validate([
            'sort' => ['nullable', Rule::in(['name', 'id'])],
            'search' => ['nullable', 'string'],
        ]);

        $destinations = $this->getDestination->filters($filters, $filters['search'] ?? null);

        return Inertia::render('destination/index', [
            'destinations' => DestinationResource::collection($destinations)
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(DestinationRequest $request, NewDestinationUseCase $usecase)
    {
        $usecase->handle($request->toDto());

        return to_route('destination.index')->with('success', __('toast.created.success'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDestinationUseCase $usecase, DestinationRequest $request, string $id)
    {
        $destination = $this->getDestination->findOrFail($id);

        $usecase->handle($request->toDto(), $destination);

        return to_route('destination.index')->with('success', __('toast.updated.success'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteDestinationUseCase $usecase, Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $destination = $this->getDestination->findOrFail($id);

        $usecase->handle($destination);

        return to_route('destination.index')->with('success', __('toast.deleted.success'));
    }
}
