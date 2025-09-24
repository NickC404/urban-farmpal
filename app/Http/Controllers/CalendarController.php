<?php

namespace App\Http\Controllers;

use App\Models\PlantActivity;
use App\Models\PlantReminder;
use App\Models\UserPlant;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Calendar/Index');
    }

    public function getEvents(Request $request): JsonResponse
    {
        $request->validate([
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        $user = Auth::user();
        $startDate = Carbon::parse($request->start);
        $endDate = Carbon::parse($request->end);

        $events = collect();

        // Get planting events
        $plantings = UserPlant::with(['plant'])
            ->where('user_id', $user->id)
            ->whereBetween('planting_date', [$startDate, $endDate])
            ->get()
            ->map(function ($userPlant) {
                return [
                    'id' => 'planting-' . $userPlant->id,
                    'type' => 'planting',
                    'title' => 'Planted: ' . $userPlant->display_name,
                    'start' => $userPlant->planting_date->format('Y-m-d'),
                    'allDay' => true,
                    'backgroundColor' => '#22c55e',
                    'borderColor' => '#16a34a',
                    'data' => [
                        'userPlantId' => $userPlant->id,
                        'plantName' => $userPlant->display_name,
                        'variety' => $userPlant->variety,
                        'location' => $userPlant->location,
                        'growingMethod' => $userPlant->growing_method,
                        'notes' => $userPlant->notes,
                    ],
                ];
            });

        // Get harvest events
        $harvests = UserPlant::with(['plant'])
            ->where('user_id', $user->id)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('estimated_harvest_date', [$startDate, $endDate])
                      ->orWhereBetween('expected_harvest_date', [$startDate, $endDate])
                      ->orWhereBetween('actual_harvest_date', [$startDate, $endDate]);
            })
            ->get()
            ->flatMap(function ($userPlant) {
                $harvestEvents = [];
                
                // Estimated harvest date
                if ($userPlant->estimated_harvest_date) {
                    $harvestEvents[] = [
                        'id' => 'harvest-estimated-' . $userPlant->id,
                        'type' => 'harvest_estimated',
                        'title' => 'Est. Harvest: ' . $userPlant->display_name,
                        'start' => $userPlant->estimated_harvest_date->format('Y-m-d'),
                        'allDay' => true,
                        'backgroundColor' => '#f59e0b',
                        'borderColor' => '#d97706',
                        'data' => [
                            'userPlantId' => $userPlant->id,
                            'plantName' => $userPlant->display_name,
                            'harvestType' => 'estimated',
                        ],
                    ];
                }

                // Expected harvest date
                if ($userPlant->expected_harvest_date && $userPlant->expected_harvest_date != $userPlant->estimated_harvest_date) {
                    $harvestEvents[] = [
                        'id' => 'harvest-expected-' . $userPlant->id,
                        'type' => 'harvest_expected',
                        'title' => 'Expected Harvest: ' . $userPlant->display_name,
                        'start' => $userPlant->expected_harvest_date->format('Y-m-d'),
                        'allDay' => true,
                        'backgroundColor' => '#eab308',
                        'borderColor' => '#ca8a04',
                        'data' => [
                            'userPlantId' => $userPlant->id,
                            'plantName' => $userPlant->display_name,
                            'harvestType' => 'expected',
                        ],
                    ];
                }

                // Actual harvest date
                if ($userPlant->actual_harvest_date) {
                    $harvestEvents[] = [
                        'id' => 'harvest-actual-' . $userPlant->id,
                        'type' => 'harvest_actual',
                        'title' => 'Harvested: ' . $userPlant->display_name,
                        'start' => $userPlant->actual_harvest_date->format('Y-m-d'),
                        'allDay' => true,
                        'backgroundColor' => '#059669',
                        'borderColor' => '#047857',
                        'data' => [
                            'userPlantId' => $userPlant->id,
                            'plantName' => $userPlant->display_name,
                            'harvestType' => 'actual',
                            'actualYield' => $userPlant->actual_yield,
                        ],
                    ];
                }

                return $harvestEvents;
            });

        // Get reminder events
        $reminders = PlantReminder::with(['userPlant.plant'])
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->whereBetween('due_date', [$startDate, $endDate])
            ->get()
            ->map(function ($reminder) {
                return [
                    'id' => 'reminder-' . $reminder->id,
                    'type' => 'reminder',
                    'title' => $reminder->title,
                    'start' => $reminder->due_date->format('Y-m-d H:i:s'),
                    'allDay' => false,
                    'backgroundColor' => $this->getReminderColor($reminder->priority),
                    'borderColor' => $this->getReminderBorderColor($reminder->priority),
                    'data' => [
                        'reminderId' => $reminder->id,
                        'userPlantId' => $reminder->user_plant_id,
                        'plantName' => $reminder->userPlant?->display_name,
                        'description' => $reminder->description,
                        'reminderType' => $reminder->reminder_type,
                        'priority' => $reminder->priority,
                        'isRecurring' => $reminder->is_recurring,
                        'isOverdue' => $reminder->is_overdue,
                        'isDueToday' => $reminder->is_due_today,
                        'isDueSoon' => $reminder->is_due_soon,
                    ],
                ];
            });

        // Get activity events (past activities)
        $activities = PlantActivity::with(['userPlant.plant'])
            ->where('user_id', $user->id)
            ->whereBetween('activity_date', [$startDate, $endDate])
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => 'activity-' . $activity->id,
                    'type' => 'activity',
                    'title' => ucfirst($activity->activity_type) . ': ' . $activity->userPlant?->display_name,
                    'start' => $activity->activity_date->format('Y-m-d H:i:s'),
                    'allDay' => false,
                    'backgroundColor' => $this->getActivityColor($activity->activity_type),
                    'borderColor' => $this->getActivityBorderColor($activity->activity_type),
                    'data' => [
                        'activityId' => $activity->id,
                        'userPlantId' => $activity->user_plant_id,
                        'plantName' => $activity->userPlant?->display_name,
                        'activityType' => $activity->activity_type,
                        'description' => $activity->description,
                        'notes' => $activity->notes,
                        'isMilestone' => $activity->is_milestone,
                    ],
                ];
            });

        // Merge all events
        $events = $events->merge($plantings)
                         ->merge($harvests)
                         ->merge($reminders)
                         ->merge($activities);

        return response()->json($events->values());
    }

    public function createPlannedPlanting(Request $request): JsonResponse
    {
        $request->validate([
            'plant_id' => 'required|exists:plants,id',
            'planting_date' => 'required|date',
            'custom_name' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'growing_method' => 'nullable|string|max:255',
            'growing_environment' => 'nullable|string|max:255',
            'quantity_planted' => 'nullable|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $user = Auth::user();
        $plantingDate = Carbon::parse($request->planting_date);

        // Get the plant to calculate harvest dates
        $plant = \App\Models\Plant::findOrFail($request->plant_id);
        
        $userPlant = UserPlant::create([
            'user_id' => $user->id,
            'plant_id' => $request->plant_id,
            'custom_name' => $request->custom_name,
            'variety' => $request->variety,
            'planting_date' => $plantingDate,
            'estimated_harvest_date' => $plant->days_to_harvest ? 
                $plantingDate->copy()->addDays($plant->days_to_harvest) : null,
            'expected_harvest_date' => $plant->days_to_harvest ? 
                $plantingDate->copy()->addDays($plant->days_to_harvest) : null,
            'quantity_planted' => $request->quantity_planted ?? 1,
            'location' => $request->location,
            'growing_method' => $request->growing_method ?? 'soil',
            'growing_environment' => $request->growing_environment ?? 'indoor',
            'current_growth_stage' => 'seed',
            'status' => 'planned',
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'Planned planting created successfully',
            'userPlant' => $userPlant->load('plant'),
        ]);
    }

    public function updateReminder(Request $request, PlantReminder $reminder): JsonResponse
    {
        // Ensure the user owns this reminder
        if ($reminder->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'sometimes|in:pending,completed,cancelled,snoozed',
            'completion_notes' => 'nullable|string',
            'snooze_hours' => 'nullable|integer|min:1|max:168', // max 1 week
        ]);

        if ($request->status === 'completed') {
            $reminder->markCompleted($request->completion_notes);
        } elseif ($request->status === 'snoozed') {
            $reminder->snooze($request->snooze_hours ?? 24);
        } else {
            $reminder->update($request->only(['status']));
        }

        return response()->json([
            'message' => 'Reminder updated successfully',
            'reminder' => $reminder->fresh(),
        ]);
    }

    private function getReminderColor(string $priority): string
    {
        return match($priority) {
            'high' => '#dc2626',
            'medium' => '#f59e0b',
            'low' => '#3b82f6',
            default => '#6b7280',
        };
    }

    private function getReminderBorderColor(string $priority): string
    {
        return match($priority) {
            'high' => '#b91c1c',
            'medium' => '#d97706',
            'low' => '#2563eb',
            default => '#4b5563',
        };
    }

    private function getActivityColor(string $activityType): string
    {
        return match($activityType) {
            'watering' => '#06b6d4',
            'feeding' => '#8b5cf6',
            'harvesting' => '#059669',
            'pruning' => '#f97316',
            'transplanting' => '#84cc16',
            'pest_control' => '#ef4444',
            default => '#6b7280',
        };
    }

    private function getActivityBorderColor(string $activityType): string
    {
        return match($activityType) {
            'watering' => '#0891b2',
            'feeding' => '#7c3aed',
            'harvesting' => '#047857',
            'pruning' => '#ea580c',
            'transplanting' => '#65a30d',
            'pest_control' => '#dc2626',
            default => '#4b5563',
        };
    }
}
