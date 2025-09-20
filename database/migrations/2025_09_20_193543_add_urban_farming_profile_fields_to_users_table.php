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
            $table->string('location')->nullable();
            $table->enum('experience_level', ['beginner', 'intermediate', 'advanced'])->nullable();
            $table->string('growing_space_type')->nullable(); // balcony, rooftop, indoor, outdoor, community_garden
            $table->integer('growing_space_size')->nullable(); // in square feet
            $table->json('interests')->nullable(); // array of interests like ['vegetables', 'herbs', 'fruits']
            $table->boolean('profile_setup_completed')->default(false);
            $table->timestamp('profile_setup_completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'location',
                'experience_level',
                'growing_space_type',
                'growing_space_size',
                'interests',
                'profile_setup_completed',
                'profile_setup_completed_at',
            ]);
        });
    }
};
