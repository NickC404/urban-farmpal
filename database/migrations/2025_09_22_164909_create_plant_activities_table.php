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
        Schema::create('plant_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_plant_id')->constrained('user_plants')->onDelete('cascade');
            
            // Activity details
            $table->enum('activity_type', [
                'watering', 'feeding', 'fertilizing', 'pruning', 'transplanting',
                'harvesting', 'pest_control', 'disease_treatment', 'observation',
                'germination', 'flowering', 'fruiting', 'other'
            ]);
            $table->datetime('activity_date');
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            
            // Activity-specific data
            $table->json('activity_data')->nullable(); // flexible storage for activity-specific info
            // Examples:
            // watering: {"amount": "2L", "method": "drip"}
            // feeding: {"fertilizer_type": "NPK", "amount": "10ml", "dilution": "1:100"}
            // harvesting: {"quantity": "500g", "quality": "excellent"}
            // pest_control: {"pest_type": "aphids", "treatment": "neem oil", "severity": "mild"}
            
            // Measurements and observations
            $table->decimal('plant_height_cm', 5, 2)->nullable();
            $table->decimal('plant_width_cm', 5, 2)->nullable();
            $table->integer('leaf_count')->nullable();
            $table->integer('fruit_count')->nullable();
            $table->enum('plant_health', ['excellent', 'good', 'fair', 'poor', 'critical'])->nullable();
            
            // Environmental conditions at time of activity
            $table->decimal('temperature_c', 4, 1)->nullable();
            $table->decimal('humidity_percent', 4, 1)->nullable();
            $table->decimal('ph_level', 3, 1)->nullable();
            
            // Documentation
            $table->json('photos')->nullable(); // array of photo URLs/paths
            $table->boolean('is_milestone')->default(false); // mark important events
            
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_plant_id', 'activity_date']);
            $table->index(['user_id', 'activity_type']);
            $table->index(['activity_date', 'activity_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_activities');
    }
};
