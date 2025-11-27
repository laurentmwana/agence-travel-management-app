<?php

use App\Enums\ItinararyTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('itineraries', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ItinararyTypeEnum::toArray())->default(ItinararyTypeEnum::PLANE->value);
            $table->integer('distance_km')->nullable();
            $table->decimal('price_per_person', 10, 2);
            $table->decimal('price_per_seat', 10, 2);
            $table->integer('available_seats')->nullable();
            $table->date('start_at');
            $table->boolean('is_scheduled')->default(false);
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('itineraries');
    }
};
