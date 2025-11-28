<?php

namespace App\Http\Requests;

use App\Dto\ItineraryDto;
use App\Enums\ItineraryTypeEnum;
use App\Helpers\Hydrator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ItineraryRequest extends FormRequest
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
            'note' => ['nullable', 'between:10,5000'],
            'type' => ['required', Rule::in(ItineraryTypeEnum::toArray())],
            'is_scheduled' => ['required', 'boolean'],
            'available_seats' => ['required'],
            'price_per_person' => ['required'],
            'price_per_seat' => ['required'],
            'distance_km' => ['required'],
            'start_destination_id' => ['required', 'exists:destinations,id'],
            'end_destination_id' =>  ['required', 'exists:destinations,id'],
        ];
    }

    public function toDto()
    {
        $dto = new ItineraryDto();
        Hydrator::hydrate($this->validated(), $dto);

        return $dto;
    }
}
