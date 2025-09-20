<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileSetupController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Profile setup routes
Route::get('profile-setup', [ProfileSetupController::class, 'show'])->middleware(['auth'])->name('profile-setup.show');
Route::post('profile-setup', [ProfileSetupController::class, 'update'])->middleware(['auth'])->name('profile-setup.update');

// Profile viewing routes
Route::get('profile', [ProfileController::class, 'show'])->middleware(['auth'])->name('profile.show');
Route::get('profile/{user}', [ProfileController::class, 'show'])->middleware(['auth'])->name('profile.show.user');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
