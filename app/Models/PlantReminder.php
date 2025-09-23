<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlantReminder extends Model
{
    protected $fillable = [
        'user_id',
        'user_plant_id',
        'title',
        'description',
        'reminder_type',
        'due_date',
        'priority',
        'status',
        'is_recurring',
        'recurrence_type',
        'recurrence_interval',
        'recurrence_data',
        'completed_at',
        'completion_notes',
        'snoozed_until',
        'is_auto_generated',
        'auto_generation_rule',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'completed_at' => 'datetime',
            'snoozed_until' => 'datetime',
            'recurrence_data' => 'array',
            'is_recurring' => 'boolean',
            'is_auto_generated' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function userPlant(): BelongsTo
    {
        return $this->belongsTo(UserPlant::class);
    }

    public function getIsOverdueAttribute(): bool
    {
        return $this->status === 'pending' && $this->due_date->isPast();
    }

    public function getIsDueTodayAttribute(): bool
    {
        return $this->status === 'pending' && $this->due_date->isToday();
    }

    public function getIsDueSoonAttribute(): bool
    {
        return $this->status === 'pending' && 
               $this->due_date->isFuture() && 
               $this->due_date->diffInDays(now()) <= 2;
    }

    public function markCompleted(string $notes = null): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
            'completion_notes' => $notes,
        ]);

        if ($this->is_recurring) {
            $this->createNextRecurrence();
        }
    }

    public function snooze(int $hours = 24): void
    {
        $this->update([
            'status' => 'snoozed',
            'snoozed_until' => now()->addHours($hours),
        ]);
    }

    private function createNextRecurrence(): void
    {
        if (!$this->is_recurring) {
            return;
        }

        $nextDueDate = match($this->recurrence_type) {
            'daily' => $this->due_date->addDay(),
            'weekly' => $this->due_date->addWeek(),
            'biweekly' => $this->due_date->addWeeks(2),
            'monthly' => $this->due_date->addMonth(),
            'custom' => $this->due_date->addDays($this->recurrence_interval ?? 1),
            default => $this->due_date->addDay(),
        };

        static::create([
            'user_id' => $this->user_id,
            'user_plant_id' => $this->user_plant_id,
            'title' => $this->title,
            'description' => $this->description,
            'reminder_type' => $this->reminder_type,
            'due_date' => $nextDueDate,
            'priority' => $this->priority,
            'is_recurring' => true,
            'recurrence_type' => $this->recurrence_type,
            'recurrence_interval' => $this->recurrence_interval,
            'recurrence_data' => $this->recurrence_data,
            'is_auto_generated' => $this->is_auto_generated,
            'auto_generation_rule' => $this->auto_generation_rule,
        ]);
    }
}
