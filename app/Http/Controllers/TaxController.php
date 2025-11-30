<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaxRequest;
use App\Http\Resources\TaxResource;
use App\Services\UseCase\Tax\DeleteTaxUseCase;
use App\Services\UseCase\Tax\GetTaxUseCase;
use App\Services\UseCase\Tax\NewTaxUseCase;
use App\Services\UseCase\Tax\UpdateTaxUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaxController extends Controller
{

    public function __construct(private GetTaxUseCase $getTax) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string'],
        ]);

        $taxs = $this->getTax->findPaginated($request->get('search'));

        return Inertia::render('tax/index', [
            'taxes' => TaxResource::collection($taxs)
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(TaxRequest $request, NewTaxUseCase $usecase)
    {
        $usecase->handle($request->toDto());

        return to_route('tax.index')->with('success', __('toast.created.success'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaxUseCase $usecase, TaxRequest $request, string $id)
    {
        $tax = $this->getTax->findOrFail($id);

        $usecase->handle($request->toDto(), $tax);

        return to_route('tax.index')->with('success', __('toast.updated.success'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteTaxUseCase $usecase, Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $tax = $this->getTax->findOrFail($id);

        $usecase->handle($tax);

        return to_route('tax.index')->with('success', __('toast.deleted.success'));
    }
}
