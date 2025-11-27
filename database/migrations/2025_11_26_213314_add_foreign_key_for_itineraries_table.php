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
            $table->foreignId('start_destination_id')
                ->constrained('destinations')
                ->onDelete('cascade');
            $table->foreignId('end_destination_id')
                ->constrained('destinations')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('itineraries', function (Blueprint $table) {
            $table->dropForeign(['start_destination_id', 'end_destination_id']);
            $table->dropColumn(['start_destination_id', 'end_destination_id']);
        });
    }
};
