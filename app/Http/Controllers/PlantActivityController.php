<?php

namespace App\Http\Controllers;

use App\Models\PlantActivity;
use App\Models\UserPlant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlantActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = $user->plantActivities()->with(['userPlant.plant']);

        // Filter by user plant
        if ($request->filled('user_plant_id')) {
            $query->where('user_plant_id', $request->user_plant_id);
        }

        // Filter by activity type
        if ($request->filled('activity_type')) {
            $query->where('activity_type', $request->activity_type);
        }

        // Filter by date range
        if ($request->filled('from_date')) {
            $query->where('activity_date', '>=', $request->from_date);
        }
        if ($request->filled('to_date')) {
            $query->where('activity_date', '<=', $request->to_date);
        }

        // Sort by date (newest first)
        $query->orderBy('activity_date', 'desc');

        $activities = $query->paginate($request->get('per_page', 15));

        return response()->json($activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'user_plant_id' => 'required|exists:user_plants,id',
            'activity_type' => 'required|in:watering,feeding,fertilizing,pruning,transplanting,harvesting,pest_control,disease_treatment,observation,germination,flowering,fruiting,other',
            'activity_date' => 'required|date',
            'description' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'activity_data' => 'nullable|array',
            'plant_height_cm' => 'nullable|numeric|min:0',
            'plant_width_cm' => 'nullable|numeric|min:0',
            'leaf_count' => 'nullable|integer|min:0',
            'fruit_count' => 'nullable|integer|min:0',
            'plant_health' => 'nullable|in:excellent,good,fair,poor,critical',
            'temperature_c' => 'nullable|numeric',
            'humidity_percent' => 'nullable|numeric|min:0|max:100',
            'ph_level' => 'nullable|numeric|min:0|max:14',
            'photos' => 'nullable|array',
            'is_milestone' => 'boolean',
        ]);

        // Verify the user owns the plant
        $userPlant = UserPlant::where('id', $validated['user_plant_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $activity = $user->plantActivities()->create([
            ...$validated,
            'user_id' => $user->id,
        ]);

        $activity->load(['userPlant.plant']);

        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PlantActivity $plantActivity): JsonResponse
    {
        // Ensure the user owns this activity
        if ($plantActivity->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $plantActivity->load(['userPlant.plant']);

        return response()->json($plantActivity);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PlantActivity $plantActivity): JsonResponse
    {
        // Ensure the user owns this activity
        if ($plantActivity->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'activity_type' => 'sometimes|required|in:watering,feeding,fertilizing,pruning,transplanting,harvesting,pest_control,disease_treatment,observation,germination,flowering,fruiting,other',
            'activity_date' => 'sometimes|required|date',
            'description' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'activity_data' => 'nullable|array',
            'plant_height_cm' => 'nullable|numeric|min:0',
            'plant_width_cm' => 'nullable|numeric|min:0',
            'leaf_count' => 'nullable|integer|min:0',
            'fruit_count' => 'nullable|integer|min:0',
            'plant_health' => 'nullable|in:excellent,good,fair,poor,critical',
            'temperature_c' => 'nullable|numeric',
            'humidity_percent' => 'nullable|numeric|min:0|max:100',
            'ph_level' => 'nullable|numeric|min:0|max:14',
            'photos' => 'nullable|array',
            'is_milestone' => 'boolean',
        ]);

        $plantActivity->update($validated);
        $plantActivity->load(['userPlant.plant']);

        return response()->json($plantActivity);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PlantActivity $plantActivity): JsonResponse
    {
        // Ensure the user owns this activity
        if ($plantActivity->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $plantActivity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }
}
