<?php

use App\Enums\ItineraryTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('itineraries', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ItineraryTypeEnum::toArray())->default(ItineraryTypeEnum::PLANE->value);
            $table->bigInteger('distance_km');
            $table->decimal('price_per_person', 10, 2);
            $table->decimal('price_per_seat', 10, 2);
            $table->integer('available_seats');
            $table->date('start_at');
            $table->boolean('is_scheduled')->default(false);
            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('itineraries');
    }
};
