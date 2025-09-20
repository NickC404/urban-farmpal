<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GrowingSetupController extends Controller
{
    /**
     * Show the growing setup management page.
     */
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('Settings/GrowingSetup', [
            'user' => $user,
        ]);
    }

    /**
     * Update the user's growing setup.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
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

        $user->update($validated);

        return back()->with('success', 'Growing setup updated successfully!');
    }

    /**
     * Get plant recommendations based on user's setup.
     */
    public function getPlantRecommendations()
    {
        $user = Auth::user();
        
        // This would integrate with a plant database in a real application
        $recommendations = $this->generatePlantRecommendations($user);
        
        return response()->json($recommendations);
    }

    /**
     * Generate plant recommendations based on user setup.
     */
    private function generatePlantRecommendations(User $user)
    {
        $recommendations = [];
        
        // Basic plant database (in a real app, this would be from a database)
        $plants = [
            // Indoor plants
            'indoor' => [
                ['name' => 'Lettuce', 'space_required' => 1, 'light_hours' => 6, 'temperature_min' => 60, 'temperature_max' => 75],
                ['name' => 'Spinach', 'space_required' => 1, 'light_hours' => 6, 'temperature_min' => 60, 'temperature_max' => 70],
                ['name' => 'Basil', 'space_required' => 1, 'light_hours' => 8, 'temperature_min' => 70, 'temperature_max' => 80],
                ['name' => 'Tomatoes', 'space_required' => 4, 'light_hours' => 8, 'temperature_min' => 70, 'temperature_max' => 85],
            ],
            // Outdoor plants
            'outdoor' => [
                ['name' => 'Carrots', 'space_required' => 2, 'light_hours' => 6, 'temperature_min' => 50, 'temperature_max' => 80],
                ['name' => 'Peppers', 'space_required' => 3, 'light_hours' => 8, 'temperature_min' => 70, 'temperature_max' => 85],
                ['name' => 'Cucumbers', 'space_required' => 4, 'light_hours' => 8, 'temperature_min' => 70, 'temperature_max' => 85],
            ],
            // Hydroponic plants
            'hydroponic' => [
                ['name' => 'Lettuce', 'space_required' => 1, 'light_hours' => 6, 'temperature_min' => 60, 'temperature_max' => 75],
                ['name' => 'Kale', 'space_required' => 2, 'light_hours' => 6, 'temperature_min' => 60, 'temperature_max' => 70],
                ['name' => 'Strawberries', 'space_required' => 2, 'light_hours' => 8, 'temperature_min' => 65, 'temperature_max' => 75],
            ],
        ];

        $userSpace = $user->space_length * $user->space_width;
        $userEnvironment = $user->growing_environment;
        $userMethod = $user->growing_method;
        $userLightHours = $user->sunlight_hours;
        $userTemp = $user->average_temperature;

        // Filter plants based on user's setup
        $candidatePlants = [];
        
        if ($userEnvironment === 'indoor' || $userEnvironment === 'mixed') {
            $candidatePlants = array_merge($candidatePlants, $plants['indoor']);
        }
        
        if ($userEnvironment === 'outdoor' || $userEnvironment === 'mixed') {
            $candidatePlants = array_merge($candidatePlants, $plants['outdoor']);
        }
        
        if ($userMethod === 'hydroponic') {
            $candidatePlants = array_merge($candidatePlants, $plants['hydroponic']);
        }

        // Filter by space requirements
        $filteredPlants = array_filter($candidatePlants, function($plant) use ($userSpace) {
            return $plant['space_required'] <= $userSpace;
        });

        // Filter by light requirements if specified
        if ($userLightHours) {
            $filteredPlants = array_filter($filteredPlants, function($plant) use ($userLightHours) {
                return $plant['light_hours'] <= $userLightHours;
            });
        }

        // Filter by temperature if specified
        if ($userTemp) {
            $filteredPlants = array_filter($filteredPlants, function($plant) use ($userTemp) {
                return $userTemp >= $plant['temperature_min'] && $userTemp <= $plant['temperature_max'];
            });
        }

        return array_values($filteredPlants);
    }
}