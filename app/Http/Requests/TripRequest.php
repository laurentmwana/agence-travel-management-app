<?php

namespace App\Http\Requests;

use App\Dto\TripDto;
use App\Helpers\Hydrator;
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
        return [
            'perfomed_at' => ['required'],
            'observation' => ['nullable', 'between:10,5000'],
            'revenue' => ['required'],
            'fuel_cost' => ['required'],
            'other_expenses' => ['required'],
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
