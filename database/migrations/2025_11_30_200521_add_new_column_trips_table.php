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
        Schema::table('trips', function (Blueprint $table) {
            $table->dropColumn('revenue');
            $table->dropColumn('fuel_cost');
            $table->json('other_expenses')->change();
            $table->json('affretements');
            $table->integer('duration_hours');
            $table->float('acmi')->default(0);
            $table->float('total_expenses')->default(0);
            $table->float('net_loss')->default(0);
            $table->float('total_tax')->default(0);
            $table->float('fuel_price')->default(0);
            $table->float('affretement_total')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->float('revenue')->default(0);
            $table->dropColumn('other_expenses');
            $table->dropColumn('duration_hours');
            $table->dropColumn('total_tax');
            $table->dropColumn('affretement_total');
            $table->dropColumn('fuel_price');
            $table->dropColumn('acmi');
            $table->dropColumn('total_expenses');
            $table->dropColumn('net_loss');
            $table->float('fuel_cost')->default(0);
        });
    }
};
