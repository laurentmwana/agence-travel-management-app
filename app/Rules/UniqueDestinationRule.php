<?php

namespace App\Rules;

use App\Models\Itinerary;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueDestinationRule implements ValidationRule
{
    public function __construct(
        private ?string $itineraryId,
        private ?string $startDestinationId
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value) || null === $value) {
            return;
        }

        if (null === $this->startDestinationId && null === $this->itineraryId) {
            return;
        }

        if ($this->startDestinationId === $value) {
            $fail("cet itinéraire n'est pas valide", null);
        }

        $builder = Itinerary::query()
            ->where(function ($query) use ($value) {
                $query->where('start_destination_id', $this->startDestinationId);
                $query->where('end_destination_id', $value);
            });


        $itinerary = $this->itineraryId !== null
            ? $builder->where('id', '!=', $this->itineraryId)->first()
            : $builder->first();

        if ($itinerary instanceof Itinerary) {
            $fail("cet itinéraire existe déjà", null);
        }
    }
}
