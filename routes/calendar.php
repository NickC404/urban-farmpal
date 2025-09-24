<?php

use App\Http\Controllers\CalendarController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Calendar page
    Route::get('calendar', [CalendarController::class, 'index'])->name('calendar.index');
    
    // Calendar API endpoints
    Route::get('api/calendar/events', [CalendarController::class, 'getEvents'])->name('calendar.events');
    Route::post('api/calendar/planned-planting', [CalendarController::class, 'createPlannedPlanting'])->name('calendar.planned-planting');
    Route::patch('api/calendar/reminders/{reminder}', [CalendarController::class, 'updateReminder'])->name('calendar.update-reminder');
});
