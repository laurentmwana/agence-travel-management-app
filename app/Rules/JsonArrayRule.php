<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class JsonArrayRule implements ValidationRule
{
    public function __construct(
        protected array $itemRules = [], // ex: ['name' => 'required|string']
    ) {}

    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            return;
        }

        foreach ($value as $index => $item) {

            if (!is_array($item)) {
                $fail("Each item of {$attribute} must be an array.", null);
                return;
            }

            foreach ($this->itemRules as $column => $rules) {

                $validator = validator(
                    [$column => $item[$column] ?? null],
                    [$column => $rules]
                );

                if ($validator->fails()) {
                    $fail("Invalid value in {$attribute}.{$index}.{$column}.", null);
                    return;
                }
            }
        }
    }
}
