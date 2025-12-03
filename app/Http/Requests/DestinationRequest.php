<?php

namespace App\Http\Requests;

use App\Dto\DestinationDto;
use App\Models\Destination;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;

class DestinationRequest extends FormRequest
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
        return [
            'name' => [
                'required',
                'between:2,20',
                (new Unique(Destination::class))->ignore($id)
            ]
        ];
    }

    public function toDto(): DestinationDto
    {
        $dto =  new DestinationDto();
        $dto->setName($this->validated('name'));
        return $dto;
    }
}
