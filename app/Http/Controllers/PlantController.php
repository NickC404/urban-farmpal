<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Plant::query();

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filter by difficulty level
        if ($request->filled('difficulty')) {
            $query->where('difficulty_level', $request->difficulty);
        }

        // Filter by growing method compatibility
        if ($request->filled('growing_method')) {
            $method = $request->growing_method;
            $query->where("{$method}_compatible", true);
        }

        // Filter by growing environment compatibility
        if ($request->filled('growing_environment')) {
            $environment = $request->growing_environment;
            $query->where("{$environment}_compatible", true);
        }

        // Search by name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('scientific_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'name');
        $sortDirection = $request->get('sort_direction', 'asc');
        
        if (in_array($sortBy, ['name', 'difficulty_level', 'days_to_harvest', 'category'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $plants = $query->paginate($request->get('per_page', 15));

        return response()->json($plants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'scientific_name' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'plant_type' => 'nullable|string|max:255',
            'days_to_germination' => 'nullable|integer|min:0',
            'days_to_harvest' => 'nullable|integer|min:0',
            'days_to_maturity' => 'nullable|integer|min:0',
            'difficulty_level' => 'in:beginner,intermediate,advanced',
            'sun_requirement' => 'in:full_sun,partial_sun,partial_shade,full_shade',
            'water_requirement' => 'string|max:255',
            'growing_tips' => 'nullable|string',
            'harvesting_tips' => 'nullable|string',
            'common_issues' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        $plant = Plant::create($validated);

        return response()->json($plant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plant $plant): JsonResponse
    {
        return response()->json($plant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plant $plant): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'scientific_name' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|max:255',
            'plant_type' => 'nullable|string|max:255',
            'days_to_germination' => 'nullable|integer|min:0',
            'days_to_harvest' => 'nullable|integer|min:0',
            'days_to_maturity' => 'nullable|integer|min:0',
            'difficulty_level' => 'in:beginner,intermediate,advanced',
            'sun_requirement' => 'in:full_sun,partial_sun,partial_shade,full_shade',
            'water_requirement' => 'string|max:255',
            'growing_tips' => 'nullable|string',
            'harvesting_tips' => 'nullable|string',
            'common_issues' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        $plant->update($validated);

        return response()->json($plant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plant $plant): JsonResponse
    {
        $plant->delete();

        return response()->json(['message' => 'Plant deleted successfully']);
    }

    /**
     * Get plants compatible with user's growing setup
     */
    public function compatible(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $query = Plant::query();

        // Filter by user's growing method
        if ($user->growing_method) {
            $query->where("{$user->growing_method}_compatible", true);
        }

        // Filter by user's growing environment
        if ($user->growing_environment) {
            $query->where("{$user->growing_environment}_compatible", true);
        }

        // Filter by difficulty level based on user's experience
        if ($user->experience_level === 'beginner') {
            $query->whereIn('difficulty_level', ['beginner', 'intermediate']);
        } elseif ($user->experience_level === 'intermediate') {
            $query->whereIn('difficulty_level', ['beginner', 'intermediate', 'advanced']);
        }

        $plants = $query->orderBy('difficulty_level')
                       ->orderBy('name')
                       ->paginate($request->get('per_page', 15));

        return response()->json($plants);
    }
}
