<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('itineraries', function (Blueprint $table) {
            $table->dropColumn('price_per_person');
            $table->dropColumn('price_per_seat');
            $table->dropColumn('available_seats');
            $table->dropColumn('note');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('itineraries', function (Blueprint $table) {
            $table->decimal('price_per_person', 10, 2);
            $table->decimal('price_per_seat', 10, 2);
            $table->integer('available_seats');
            $table->integer('note');
        });
    }
};
