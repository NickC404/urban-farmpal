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
        Schema::create('plant_reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_plant_id')->constrained('user_plants')->onDelete('cascade');
            
            // Reminder details
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('reminder_type', [
                'watering', 'feeding', 'fertilizing', 'pruning', 'harvesting',
                'pest_check', 'transplanting', 'general', 'custom'
            ]);
            
            // Scheduling
            $table->datetime('due_date');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['pending', 'completed', 'snoozed', 'cancelled'])->default('pending');
            
            // Recurrence settings
            $table->boolean('is_recurring')->default(false);
            $table->enum('recurrence_type', ['daily', 'weekly', 'biweekly', 'monthly', 'custom'])->nullable();
            $table->integer('recurrence_interval')->nullable(); // for custom intervals
            $table->json('recurrence_data')->nullable(); // flexible storage for complex recurrence rules
            
            // Completion tracking
            $table->datetime('completed_at')->nullable();
            $table->text('completion_notes')->nullable();
            $table->datetime('snoozed_until')->nullable();
            
            // Auto-generation settings (for system-generated reminders)
            $table->boolean('is_auto_generated')->default(false);
            $table->string('auto_generation_rule')->nullable(); // e.g., "water_every_3_days", "harvest_at_maturity"
            
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_id', 'due_date']);
            $table->index(['user_plant_id', 'status']);
            $table->index(['due_date', 'status']);
            $table->index(['reminder_type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_reminders');
    }
};
