<?php

use App\Http\Controllers\Api\ApiBaseController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ItineraryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// JSON REPONSE 
Route::prefix('json-reponse')->name('json.')->group(function () {
    Route::get('destinations', [ApiBaseController::class, 'destinations'])->name('destination.index');
    Route::get('itineraries-types', [ApiBaseController::class, 'itinerariesTypes'])->name('itinerary.type');
});
// END JSON REPONSE

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // DESTINATION ROUTE
    Route::get('destination', [DestinationController::class, 'index'])->name('destination.index');
    Route::post('destination/store', [DestinationController::class, 'store'])->name('destination.store');
    Route::put('destination/{id}/update', [DestinationController::class, 'update'])->name('destination.update');
    Route::delete('destination/{id}/destroy', [DestinationController::class, 'destroy'])->name('destination.destroy');
    // END DESTINATION ROUTE 
    // ITINERARY ROUTE
    Route::resource('itinerary', ItineraryController::class)
        ->parameter('itinerary', 'id');
    // END ITINERARY ROUTE

});

require __DIR__ . '/settings.php';
