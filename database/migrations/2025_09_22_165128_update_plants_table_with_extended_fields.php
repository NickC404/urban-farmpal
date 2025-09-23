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
        Schema::table('plants', function (Blueprint $table) {
            // Add missing fields to existing plants table
            $table->string('scientific_name')->nullable()->after('name');
            $table->string('category')->nullable()->after('description'); // vegetables, herbs, fruits, flowers, etc.
            $table->string('plant_type')->nullable()->after('category'); // annual, perennial, biennial
            $table->integer('days_to_germination')->nullable()->after('plant_type');
            $table->integer('days_to_maturity')->nullable()->after('days_to_harvest');
            
            // Growing conditions
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced'])->default('beginner')->after('days_to_maturity');
            $table->enum('sun_requirement', ['full_sun', 'partial_sun', 'partial_shade', 'full_shade'])->default('full_sun')->after('difficulty_level');
            $table->string('water_requirement')->default('moderate')->after('sun_requirement'); // low, moderate, high
            $table->decimal('min_temperature_c', 4, 1)->nullable()->after('temperature_max'); // Celsius (rename existing)
            $table->decimal('max_temperature_c', 4, 1)->nullable()->after('min_temperature_c'); // Celsius (rename existing)
            $table->decimal('optimal_ph_min', 3, 1)->nullable()->after('max_temperature_c');
            $table->decimal('optimal_ph_max', 3, 1)->nullable()->after('optimal_ph_min');
            $table->integer('spacing_inches')->nullable()->after('optimal_ph_max'); // spacing between plants
            $table->integer('depth_inches')->nullable()->after('spacing_inches'); // planting depth
            
            // Growing methods compatibility
            $table->boolean('hydroponic_compatible')->default(true)->after('depth_inches');
            $table->boolean('soil_compatible')->default(true)->after('hydroponic_compatible');
            $table->boolean('aeroponic_compatible')->default(false)->after('soil_compatible');
            $table->boolean('aquaponic_compatible')->default(false)->after('aeroponic_compatible');
            
            // Environment compatibility
            $table->boolean('indoor_compatible')->default(true)->after('aquaponic_compatible');
            $table->boolean('outdoor_compatible')->default(true)->after('indoor_compatible');
            $table->boolean('greenhouse_compatible')->default(true)->after('outdoor_compatible');
            
            // Additional info
            $table->json('companion_plants')->nullable()->after('greenhouse_compatible'); // array of plant IDs
            $table->json('incompatible_plants')->nullable()->after('companion_plants'); // array of plant IDs
            $table->text('growing_tips')->nullable()->after('incompatible_plants');
            $table->text('harvesting_tips')->nullable()->after('growing_tips');
            $table->text('common_issues')->nullable()->after('harvesting_tips');
            $table->string('image_url')->nullable()->after('common_issues');
            
            // Nutritional and yield info
            $table->string('expected_yield')->nullable()->after('image_url');
            $table->json('nutritional_info')->nullable()->after('expected_yield');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plants', function (Blueprint $table) {
            $table->dropColumn([
                'scientific_name', 'category', 'plant_type', 'days_to_germination', 'days_to_maturity',
                'difficulty_level', 'sun_requirement', 'water_requirement', 'min_temperature_c', 
                'max_temperature_c', 'optimal_ph_min', 'optimal_ph_max', 'spacing_inches', 'depth_inches',
                'hydroponic_compatible', 'soil_compatible', 'aeroponic_compatible', 'aquaponic_compatible',
                'indoor_compatible', 'outdoor_compatible', 'greenhouse_compatible', 'companion_plants',
                'incompatible_plants', 'growing_tips', 'harvesting_tips', 'common_issues', 'image_url',
                'expected_yield', 'nutritional_info'
            ]);
        });
    }
};
