<?php

namespace App\Http\Controllers;

use App\Models\UserPlant;
use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class UserPlantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = $user->userPlants()->with(['plant', 'activities', 'reminders']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by growing method
        if ($request->filled('growing_method')) {
            $query->where('growing_method', $request->growing_method);
        }

        // Filter by growing environment
        if ($request->filled('growing_environment')) {
            $query->where('growing_environment', $request->growing_environment);
        }

        // Search by plant name or custom name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('custom_name', 'like', "%{$search}%")
                  ->orWhereHas('plant', function ($plantQuery) use ($search) {
                      $plantQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'planting_date');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        if (in_array($sortBy, ['planting_date', 'status', 'custom_name', 'expected_harvest_date'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $userPlants = $query->paginate($request->get('per_page', 15));

        return response()->json($userPlants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'plant_id' => 'required|exists:plants,id',
            'custom_name' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'planting_date' => 'required|date',
            'quantity_planted' => 'integer|min:1',
            'location' => 'nullable|string|max:255',
            'growing_method' => 'nullable|in:hydroponic,soil,aeroponic,aquaponic',
            'growing_environment' => 'nullable|in:indoor,outdoor,greenhouse,mixed',
            'container_type' => 'nullable|string|max:255',
            'growing_medium' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        // Calculate expected harvest date based on plant's days_to_harvest
        $plant = Plant::find($validated['plant_id']);
        $expectedHarvestDate = null;
        if ($plant->days_to_harvest) {
            $expectedHarvestDate = Carbon::parse($validated['planting_date'])
                ->addDays($plant->days_to_harvest);
        }

        $userPlant = $user->userPlants()->create([
            ...$validated,
            'expected_harvest_date' => $expectedHarvestDate,
            'status' => 'planning',
        ]);

        $userPlant->load(['plant', 'activities', 'reminders']);

        // Return Inertia response - redirect back to my-garden page with success message
        return redirect()->route('garden.index')->with('success', 'Plant added to your garden successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, UserPlant $userPlant): JsonResponse
    {
        // Ensure the user owns this plant
        if ($userPlant->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userPlant->load(['plant', 'activities.user', 'reminders']);

        return response()->json($userPlant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPlant $userPlant): JsonResponse
    {
        // Ensure the user owns this plant
        if ($userPlant->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'custom_name' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'planting_date' => 'sometimes|required|date',
            'quantity_planted' => 'integer|min:1',
            'location' => 'nullable|string|max:255',
            'growing_method' => 'nullable|in:hydroponic,soil,aeroponic,aquaponic',
            'growing_environment' => 'nullable|in:indoor,outdoor,greenhouse,mixed',
            'container_type' => 'nullable|string|max:255',
            'growing_medium' => 'nullable|string|max:255',
            'status' => 'in:planning,germinating,growing,flowering,fruiting,harvesting,completed,failed',
            'notes' => 'nullable|string',
            'actual_harvest_date' => 'nullable|date',
            'actual_yield' => 'nullable|string|max:255',
            'success_rating' => 'nullable|integer|min:1|max:5',
            'lessons_learned' => 'nullable|string',
        ]);

        // Recalculate expected harvest date if planting date changed
        if (isset($validated['planting_date']) && $userPlant->plant->days_to_harvest) {
            $validated['expected_harvest_date'] = Carbon::parse($validated['planting_date'])
                ->addDays($userPlant->plant->days_to_harvest);
        }

        $userPlant->update($validated);
        $userPlant->load(['plant', 'activities', 'reminders']);

        return response()->json($userPlant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, UserPlant $userPlant): JsonResponse
    {
        // Ensure the user owns this plant
        if ($userPlant->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'deletion_reason' => 'nullable|string',
        ]);

        if (isset($validated['deletion_reason'])) {
            $userPlant->update(['deletion_reason' => $validated['deletion_reason']]);
        }

        $userPlant->delete();

        return response()->json(['message' => 'Plant removed successfully']);
    }

    /**
     * Get dashboard summary for user's plants
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = [
            'total_plants' => $user->userPlants()->count(),
            'active_plants' => $user->userPlants()->whereNotIn('status', ['completed', 'failed'])->count(),
            'ready_to_harvest' => $user->userPlants()
                ->where('status', 'harvesting')
                ->orWhere(function ($q) {
                    $q->whereNotNull('expected_harvest_date')
                      ->where('expected_harvest_date', '<=', now());
                })
                ->count(),
            'overdue_reminders' => $user->plantReminders()
                ->where('status', 'pending')
                ->where('due_date', '<', now())
                ->count(),
        ];

        // Recent activities
        $recentActivities = $user->plantActivities()
            ->with(['userPlant.plant'])
            ->latest('activity_date')
            ->limit(5)
            ->get();

        // Upcoming reminders
        $upcomingReminders = $user->plantReminders()
            ->with(['userPlant.plant'])
            ->where('status', 'pending')
            ->where('due_date', '>=', now())
            ->orderBy('due_date')
            ->limit(5)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_activities' => $recentActivities,
            'upcoming_reminders' => $upcomingReminders,
        ]);
    }
}
