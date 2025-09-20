<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileSetupController extends Controller
{
    /**
     * Show the profile setup wizard.
     */
    public function show()
    {
        $user = Auth::user();
        
        // If profile is already completed, redirect to dashboard
        if ($user->profile_setup_completed) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('ProfileSetup/Index', [
            'user' => $user,
        ]);
    }

    /**
     * Update the user's profile setup.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'location' => ['required', 'string', 'max:255'],
            'experience_level' => ['required', Rule::in(['beginner', 'intermediate', 'advanced'])],
            'growing_space_type' => ['required', Rule::in(['balcony', 'rooftop', 'indoor', 'outdoor', 'community_garden'])],
            'growing_space_size' => ['required', 'integer', 'min:1', 'max:10000'],
            'interests' => ['required', 'array', 'min:1'],
            'interests.*' => ['string', Rule::in(['vegetables', 'herbs', 'fruits', 'flowers', 'microgreens', 'mushrooms', 'aquaponics', 'hydroponics'])],
            // Growing setup fields
            'growing_method' => ['required', Rule::in(['hydroponic', 'soil', 'aeroponic', 'aquaponic'])],
            'growing_environment' => ['required', Rule::in(['indoor', 'outdoor', 'greenhouse', 'mixed'])],
            'space_length' => ['required', 'integer', 'min:1', 'max:1000'],
            'space_width' => ['required', 'integer', 'min:1', 'max:1000'],
            'space_height' => ['nullable', 'integer', 'min:1', 'max:50'],
            'has_artificial_lighting' => ['boolean'],
            'has_heating_system' => ['boolean'],
            'has_cooling_system' => ['boolean'],
            'has_irrigation_system' => ['boolean'],
            'has_ph_monitoring' => ['boolean'],
            'has_nutrient_monitoring' => ['boolean'],
            'has_weather_station' => ['boolean'],
            'climate_zone' => ['nullable', 'string', 'max:10'],
            'average_temperature' => ['nullable', 'integer', 'min:-50', 'max:150'],
            'humidity_level' => ['nullable', 'integer', 'min:0', 'max:100'],
            'sunlight_hours' => ['nullable', 'integer', 'min:0', 'max:24'],
        ]);

        $user->update([
            ...$validated,
            'profile_setup_completed' => true,
            'profile_setup_completed_at' => now(),
            'growing_setup_completed' => true,
            'growing_setup_completed_at' => now(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Profile setup completed successfully!');
    }
}
