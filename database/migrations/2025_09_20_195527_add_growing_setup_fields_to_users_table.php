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
        Schema::table('users', function (Blueprint $table) {
            // Growing method (hydroponic, soil, aeroponic, aquaponic)
            $table->enum('growing_method', ['hydroponic', 'soil', 'aeroponic', 'aquaponic'])->nullable();
            
            // Growing environment (indoor, outdoor, greenhouse, mixed)
            $table->enum('growing_environment', ['indoor', 'outdoor', 'greenhouse', 'mixed'])->nullable();
            
            // Space dimensions for better plant recommendations
            $table->integer('space_length')->nullable(); // in feet
            $table->integer('space_width')->nullable(); // in feet
            $table->integer('space_height')->nullable(); // in feet (for indoor/greenhouse)
            
            // Equipment and features
            $table->boolean('has_artificial_lighting')->default(false);
            $table->boolean('has_heating_system')->default(false);
            $table->boolean('has_cooling_system')->default(false);
            $table->boolean('has_irrigation_system')->default(false);
            $table->boolean('has_ph_monitoring')->default(false);
            $table->boolean('has_nutrient_monitoring')->default(false);
            $table->boolean('has_weather_station')->default(false);
            
            // Climate and location specifics
            $table->string('climate_zone')->nullable(); // USDA hardiness zone or similar
            $table->integer('average_temperature')->nullable(); // in Fahrenheit
            $table->integer('humidity_level')->nullable(); // percentage
            $table->integer('sunlight_hours')->nullable(); // hours per day
            
            // Growing setup completion status
            $table->boolean('growing_setup_completed')->default(false);
            $table->timestamp('growing_setup_completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'growing_method',
                'growing_environment',
                'space_length',
                'space_width',
                'space_height',
                'has_artificial_lighting',
                'has_heating_system',
                'has_cooling_system',
                'has_irrigation_system',
                'has_ph_monitoring',
                'has_nutrient_monitoring',
                'has_weather_station',
                'climate_zone',
                'average_temperature',
                'humidity_level',
                'sunlight_hours',
                'growing_setup_completed',
                'growing_setup_completed_at',
            ]);
        });
    }
};