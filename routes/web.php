<?php

use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile viewing routes
Route::get('profile', [ProfileController::class, 'show'])->middleware(['auth'])->name('profile.show');
Route::get('profile/{user}', [ProfileController::class, 'show'])->middleware(['auth'])->name('profile.show.user');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
