<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlantActivity extends Model
{
    protected $fillable = [
        'user_id',
        'user_plant_id',
        'activity_type',
        'activity_date',
        'description',
        'notes',
        'activity_data',
        'plant_height_cm',
        'plant_width_cm',
        'leaf_count',
        'fruit_count',
        'plant_health',
        'temperature_c',
        'humidity_percent',
        'ph_level',
        'photos',
        'is_milestone',
    ];

    protected function casts(): array
    {
        return [
            'activity_date' => 'datetime',
            'activity_data' => 'array',
            'photos' => 'array',
            'is_milestone' => 'boolean',
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

    public function getFormattedActivityDataAttribute(): array
    {
        $data = $this->activity_data ?? [];
        
        return match($this->activity_type) {
            'watering' => [
                'amount' => $data['amount'] ?? null,
                'method' => $data['method'] ?? null,
            ],
            'feeding' => [
                'fertilizer_type' => $data['fertilizer_type'] ?? null,
                'amount' => $data['amount'] ?? null,
                'dilution' => $data['dilution'] ?? null,
            ],
            'harvesting' => [
                'quantity' => $data['quantity'] ?? null,
                'quality' => $data['quality'] ?? null,
            ],
            'pest_control' => [
                'pest_type' => $data['pest_type'] ?? null,
                'treatment' => $data['treatment'] ?? null,
                'severity' => $data['severity'] ?? null,
            ],
            default => $data,
        };
    }
}
