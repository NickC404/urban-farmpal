<?php

use App\Http\Controllers\PlantController;
use App\Http\Controllers\UserPlantController;
use App\Http\Controllers\PlantActivityController;
use App\Http\Controllers\PlantReminderController;
use Illuminate\Support\Facades\Route;

// Plant database routes
Route::middleware(['auth'])->group(function () {
    // Plant database (read-only for most users)
    Route::get('plants', [PlantController::class, 'index'])->name('plants.index');
    Route::get('plants/compatible', [PlantController::class, 'compatible'])->name('plants.compatible');
    Route::get('plants/{plant}', [PlantController::class, 'show'])->name('plants.show');
    
    // Admin only routes for plant management (remove middleware for now)
    Route::post('plants', [PlantController::class, 'store'])->name('plants.store');
    Route::put('plants/{plant}', [PlantController::class, 'update'])->name('plants.update');
    Route::delete('plants/{plant}', [PlantController::class, 'destroy'])->name('plants.destroy');

    // User's planted crops
    Route::get('my-plants', [UserPlantController::class, 'index'])->name('user-plants.index');
    Route::get('my-plants/dashboard', [UserPlantController::class, 'dashboard'])->name('user-plants.dashboard');
    Route::post('my-plants', [UserPlantController::class, 'store'])->name('user-plants.store');
    Route::get('my-plants/{userPlant}', [UserPlantController::class, 'show'])->name('user-plants.show');
    Route::put('my-plants/{userPlant}', [UserPlantController::class, 'update'])->name('user-plants.update');
    Route::delete('my-plants/{userPlant}', [UserPlantController::class, 'destroy'])->name('user-plants.destroy');

    // Plant activities
    Route::get('plant-activities', [PlantActivityController::class, 'index'])->name('plant-activities.index');
    Route::post('plant-activities', [PlantActivityController::class, 'store'])->name('plant-activities.store');
    Route::get('plant-activities/{plantActivity}', [PlantActivityController::class, 'show'])->name('plant-activities.show');
    Route::put('plant-activities/{plantActivity}', [PlantActivityController::class, 'update'])->name('plant-activities.update');
    Route::delete('plant-activities/{plantActivity}', [PlantActivityController::class, 'destroy'])->name('plant-activities.destroy');

    // Plant reminders
    Route::get('plant-reminders', [PlantReminderController::class, 'index'])->name('plant-reminders.index');
    Route::get('plant-reminders/upcoming', [PlantReminderController::class, 'upcoming'])->name('plant-reminders.upcoming');
    Route::post('plant-reminders', [PlantReminderController::class, 'store'])->name('plant-reminders.store');
    Route::get('plant-reminders/{plantReminder}', [PlantReminderController::class, 'show'])->name('plant-reminders.show');
    Route::put('plant-reminders/{plantReminder}', [PlantReminderController::class, 'update'])->name('plant-reminders.update');
    Route::delete('plant-reminders/{plantReminder}', [PlantReminderController::class, 'destroy'])->name('plant-reminders.destroy');
    Route::post('plant-reminders/{plantReminder}/complete', [PlantReminderController::class, 'complete'])->name('plant-reminders.complete');
    Route::post('plant-reminders/{plantReminder}/snooze', [PlantReminderController::class, 'snooze'])->name('plant-reminders.snooze');
});
