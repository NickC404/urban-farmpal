<?php

namespace App\Http\Controllers;

use App\Models\PlantReminder;
use App\Models\UserPlant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlantReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = $user->plantReminders()->with(['userPlant.plant']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by reminder type
        if ($request->filled('reminder_type')) {
            $query->where('reminder_type', $request->reminder_type);
        }

        // Filter by user plant
        if ($request->filled('user_plant_id')) {
            $query->where('user_plant_id', $request->user_plant_id);
        }

        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Sort by due date
        $query->orderBy('due_date', 'asc');

        $reminders = $query->paginate($request->get('per_page', 15));

        return response()->json($reminders);
    }

    /**
     * Get upcoming reminders
     */
    public function upcoming(Request $request): JsonResponse
    {
        $user = $request->user();
        $days = $request->get('days', 7); // Default to next 7 days

        $reminders = $user->plantReminders()
            ->with(['userPlant.plant'])
            ->where('status', 'pending')
            ->where('due_date', '<=', now()->addDays($days))
            ->orderBy('due_date', 'asc')
            ->get();

        return response()->json($reminders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'user_plant_id' => 'required|exists:user_plants,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reminder_type' => 'required|in:watering,feeding,fertilizing,pruning,harvesting,pest_check,transplanting,general,custom',
            'due_date' => 'required|date|after:now',
            'priority' => 'in:low,medium,high,urgent',
            'is_recurring' => 'boolean',
            'recurrence_type' => 'nullable|in:daily,weekly,biweekly,monthly,custom',
            'recurrence_interval' => 'nullable|integer|min:1',
            'recurrence_data' => 'nullable|array',
        ]);

        // Verify the user owns the plant
        $userPlant = UserPlant::where('id', $validated['user_plant_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $reminder = $user->plantReminders()->create([
            ...$validated,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $reminder->load(['userPlant.plant']);

        return response()->json($reminder, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PlantReminder $plantReminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($plantReminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $plantReminder->load(['userPlant.plant']);

        return response()->json($plantReminder);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PlantReminder $plantReminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($plantReminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'reminder_type' => 'sometimes|required|in:watering,feeding,fertilizing,pruning,harvesting,pest_check,transplanting,general,custom',
            'due_date' => 'sometimes|required|date',
            'priority' => 'in:low,medium,high,urgent',
            'status' => 'in:pending,completed,snoozed,cancelled',
            'is_recurring' => 'boolean',
            'recurrence_type' => 'nullable|in:daily,weekly,biweekly,monthly,custom',
            'recurrence_interval' => 'nullable|integer|min:1',
            'recurrence_data' => 'nullable|array',
        ]);

        $plantReminder->update($validated);
        $plantReminder->load(['userPlant.plant']);

        return response()->json($plantReminder);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PlantReminder $plantReminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($plantReminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $plantReminder->delete();

        return response()->json(['message' => 'Reminder deleted successfully']);
    }

    /**
     * Mark a reminder as completed
     */
    public function complete(Request $request, PlantReminder $plantReminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($plantReminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'completion_notes' => 'nullable|string',
        ]);

        $plantReminder->markCompleted($validated['completion_notes'] ?? null);
        $plantReminder->load(['userPlant.plant']);

        return response()->json($plantReminder);
    }

    /**
     * Snooze a reminder
     */
    public function snooze(Request $request, PlantReminder $plantReminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($plantReminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'hours' => 'integer|min:1|max:168', // Max 1 week
        ]);

        $plantReminder->snooze($validated['hours'] ?? 24);
        $plantReminder->load(['userPlant.plant']);

        return response()->json($plantReminder);
    }
}
