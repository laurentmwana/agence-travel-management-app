<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\App;
use Illuminate\View\Component;

class Translations extends Component
{

    /**
     * Create a new component instance.
     */
    public function __construct() {}

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.translations', [
            'translations' => $this->getTranslations(),
        ]);
    }

    /**
     * @return array
     */
    private function getTranslations(): array
    {
        $locale = App::getLocale();

        $file = base_path("lang/$locale.json");
        $default = base_path("lang/fr.json");

        $pathname = file_exists($file) ? $file : $default;

        return json_decode(file_get_contents($pathname), true);
    }
}
