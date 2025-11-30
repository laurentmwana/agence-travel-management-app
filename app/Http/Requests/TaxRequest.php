<?php

namespace App\Http\Requests;

use App\Dto\TaxDto;
use App\Helpers\Hydrator;
use Illuminate\Foundation\Http\FormRequest;

class TaxRequest extends FormRequest
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
            'name' => ['required', 'between:2,50'],
            'amount' => ['required'],
            'description' => ['nullable', 'between:10,1000'],
        ];
    }

    public function toDto()
    {
        $dto = new TaxDto();
        Hydrator::hydrate($this->validated(), $dto);

        return $dto;
    }
}
