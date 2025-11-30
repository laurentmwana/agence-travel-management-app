<?php

use App\Http\Controllers\Api\ApiBaseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ItineraryController;
use App\Http\Controllers\LiterController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// JSON REPONSE 
Route::prefix('json-response')->name('json.')->group(function () {
    Route::get('destinations', [ApiBaseController::class, 'destinations'])->name('destination.index');
    Route::get('itineraries-types', [ApiBaseController::class, 'itinerariesTypes'])->name('itinerary.type');
    Route::get('itineraries', [ApiBaseController::class, 'itineraries'])->name('itinerary.index');
});
// END JSON REPONSE

Route::middleware(['auth', 'verified'])->group(function () {
    // DASHBOARD ROUTE
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/trip', [DashboardController::class, 'trip'])->name('dashboard.trip');
    Route::get('dashboard/itinerary', [DashboardController::class, 'itinerary'])->name('dashboard.itinerary');
    Route::get('dashboard/destination', [DashboardController::class, 'destination'])->name('dashboard.destination');
    // DASHBOARD ROUTE

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

    // TRIP ROUTE
    Route::resource('trip', TripController::class)
        ->parameter('trip', 'id');
    // END TRIP ROUTE

    // TAX ROUTE
    Route::get('tax', [TaxController::class, 'index'])->name('tax.index');
    Route::post('tax/store', [TaxController::class, 'store'])->name('tax.store');
    Route::put('tax/{id}/update', [TaxController::class, 'update'])->name('tax.update');
    Route::delete('tax/{id}/destroy', [TaxController::class, 'destroy'])->name('tax.destroy');
    // END TAX ROUTE 


       // LITER ROUTE
    Route::get('price-unit-liter', [LiterController::class, 'index'])->name('liter.index');
    Route::post('price-unit-liter/store', [LiterController::class, 'store'])->name('liter.store');
    // END LITER ROUTE 

});

require __DIR__ . '/settings.php';
