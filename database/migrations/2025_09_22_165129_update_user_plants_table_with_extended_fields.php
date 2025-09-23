<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_plants', function (Blueprint $table) {
            // Rename and add fields to match our requirements
            $table->renameColumn('nickname', 'custom_name');
            $table->date('expected_harvest_date')->nullable()->after('estimated_harvest_date');
            $table->date('actual_harvest_date')->nullable()->after('expected_harvest_date');
            $table->integer('quantity_planted')->default(1)->after('actual_harvest_date');
            $table->string('location')->nullable()->after('quantity_planted'); // garden bed, container, etc.
            
            // Growing conditions used
            $table->enum('growing_method', ['hydroponic', 'soil', 'aeroponic', 'aquaponic'])->nullable()->after('location');
            $table->enum('growing_environment', ['indoor', 'outdoor', 'greenhouse', 'mixed'])->nullable()->after('growing_method');
            $table->string('container_type')->nullable()->after('growing_environment'); // pot, raised bed, ground, etc.
            $table->string('growing_medium')->nullable()->after('container_type'); // soil type, hydroponic solution, etc.
            
            // Update status enum to include more stages
            $table->enum('status_new', ['planning', 'germinating', 'growing', 'flowering', 'fruiting', 'harvesting', 'completed', 'failed'])->default('planning')->after('growing_medium');
            $table->integer('current_stage_days')->default(0)->after('status_new'); // days in current stage
            
            // Performance tracking
            $table->string('actual_yield')->nullable()->after('current_stage_days');
            $table->integer('success_rating')->nullable()->after('actual_yield'); // 1-5 rating
            $table->text('lessons_learned')->nullable()->after('success_rating');
            
            // Photos and documentation
            $table->json('photos')->nullable()->after('lessons_learned'); // array of photo URLs/paths
            
            // Indexes for better performance
            $table->index(['user_id', 'status_new']);
            $table->index(['user_id', 'planting_date']);
        });
        
        // Copy data from old status to new status
        DB::statement("UPDATE user_plants SET status_new = CASE 
            WHEN status = 'active' THEN 'growing'
            ELSE 'planning'
        END");
        
        // Drop old status column and rename new one
        Schema::table('user_plants', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->renameColumn('status_new', 'status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_plants', function (Blueprint $table) {
            // Reverse the changes
            $table->renameColumn('custom_name', 'nickname');
            $table->dropColumn([
                'expected_harvest_date', 'actual_harvest_date', 'quantity_planted', 'location',
                'growing_method', 'growing_environment', 'container_type', 'growing_medium',
                'current_stage_days', 'actual_yield', 'success_rating', 'lessons_learned', 'photos'
            ]);
            $table->dropIndex(['user_id', 'status']);
            $table->dropIndex(['user_id', 'planting_date']);
            
            // Restore original status field
            $table->string('status')->default('active')->after('notes');
        });
    }
};
