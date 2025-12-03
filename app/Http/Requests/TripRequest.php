<?php

namespace App\Http\Requests;

use App\Dto\TripDto;
use App\Helpers\Hydrator;
use App\Rules\JsonArrayRule;
use Illuminate\Foundation\Http\FormRequest;

class TripRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $jsonRule = [
            'name' => 'required|string|min:0',
            'amount' => 'required|regex:/^\d+(\.\d+)?$/|min:0',
        ];

        return [
            'perfomed_at' => ['required',],
            'observation' => ['nullable', 'between:10,5000'],
            'fuel_quantity' => ['required', 'numeric', 'regex:/^\d+(\.\d+)?$/', 'min:1'],
            'duration_hours' => ['required', 'numeric', 'regex:/^\d+(\.\d+)?$/', 'min:1'],
            'other_expenses' => ['required', 'array', new JsonArrayRule($jsonRule)],
            'affretements' => ['required', 'array', new JsonArrayRule($jsonRule)],
            'itinerary_id' => ['required', 'exists:itineraries,id'],
        ];
    }

    public function toDto()
    {
        $dto = new TripDto();
        Hydrator::hydrate($this->validated(), $dto);

        return $dto;
    }
}
