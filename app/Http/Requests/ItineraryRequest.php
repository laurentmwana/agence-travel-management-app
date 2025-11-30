<?php

namespace App\Http\Requests;

use App\Dto\ItineraryDto;
use App\Enums\ItineraryTypeEnum;
use App\Helpers\Hydrator;
use App\Rules\UniqueDestinationRule;
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
        $id = $this->input('id');
        $startDestination = $this->input('start_destination_id');

        return [
            'note' => ['nullable', 'between:10,5000'],
            'type' => ['required', Rule::in(ItineraryTypeEnum::toArray())],
            'is_scheduled' => ['required', 'boolean'],
            'distance_km' => ['required', 'regex:/^\d+(\.\d+)?$/', 'min:1'],
            'start_destination_id' => ['required', 'exists:destinations,id'],
            'end_destination_id' =>  ['required', 'exists:destinations,id', new UniqueDestinationRule($id, $startDestination)],
        ];
    }

    public function toDto()
    {
        $dto = new ItineraryDto();
        Hydrator::hydrate($this->validated(), $dto);

        return $dto;
    }
}
