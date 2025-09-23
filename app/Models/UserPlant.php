<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserPlant extends Model
{
    use SoftDeletes;

    protected $table = 'user_plants';

    protected $fillable = [
        'user_id',
        'plant_id',
        'custom_name',
        'variety',
        'planting_date',
        'estimated_harvest_date',
        'expected_harvest_date',
        'actual_harvest_date',
        'quantity_planted',
        'location',
        'growing_method',
        'growing_environment',
        'container_type',
        'growing_medium',
        'current_growth_stage',
        'status',
        'current_stage_days',
        'notes',
        'actual_yield',
        'success_rating',
        'lessons_learned',
        'photos',
        'deletion_reason',
    ];

    protected function casts(): array
    {
        return [
            'planting_date' => 'date',
            'estimated_harvest_date' => 'date',
            'expected_harvest_date' => 'date',
            'actual_harvest_date' => 'date',
            'photos' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plant(): BelongsTo
    {
        return $this->belongsTo(Plant::class);
    }

    public function activities(): HasMany
    {
        return $this->hasMany(PlantActivity::class);
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(PlantReminder::class);
    }

    public function getDaysPlantedAttribute(): int
    {
        return $this->planting_date->diffInDays(now());
    }

    public function getDaysToHarvestAttribute(): ?int
    {
        if (!$this->expected_harvest_date) {
            return null;
        }
        return now()->diffInDays($this->expected_harvest_date, false);
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->custom_name ?: $this->plant->name . ($this->variety ? " ({$this->variety})" : '');
    }
}
