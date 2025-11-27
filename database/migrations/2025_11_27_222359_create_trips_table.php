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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->dateTime('perfomed_at');
            $table->text('observation')->nullable();
            $table->float('total_cost')->default(0);
            $table->float('revenue')->default(0);
            $table->float('net_profit')->default(0);
            $table->float('fuel_cost')->default(0);
            $table->float('other_expenses')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
