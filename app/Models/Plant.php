<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plant extends Model
{
    protected $fillable = [
        'name',
        'scientific_name',
        'variety',
        'description',
        'category',
        'plant_type',
        'days_to_germination',
        'days_to_harvest',
        'days_to_maturity',
        'space_required',
        'light_hours',
        'temperature_min',
        'temperature_max',
        'growing_environment',
        'growing_method',
        'planting_seasons',
        'growing_stages',
        'difficulty_level',
        'sun_requirement',
        'water_requirement',
        'min_temperature_c',
        'max_temperature_c',
        'optimal_ph_min',
        'optimal_ph_max',
        'spacing_inches',
        'depth_inches',
        'hydroponic_compatible',
        'soil_compatible',
        'aeroponic_compatible',
        'aquaponic_compatible',
        'indoor_compatible',
        'outdoor_compatible',
        'greenhouse_compatible',
        'companion_plants',
        'incompatible_plants',
        'growing_tips',
        'harvesting_tips',
        'common_issues',
        'image_url',
        'expected_yield',
        'nutritional_info',
    ];

    protected function casts(): array
    {
        return [
            'planting_seasons' => 'array',
            'growing_stages' => 'array',
            'companion_plants' => 'array',
            'incompatible_plants' => 'array',
            'nutritional_info' => 'array',
            'hydroponic_compatible' => 'boolean',
            'soil_compatible' => 'boolean',
            'aeroponic_compatible' => 'boolean',
            'aquaponic_compatible' => 'boolean',
            'indoor_compatible' => 'boolean',
            'outdoor_compatible' => 'boolean',
            'greenhouse_compatible' => 'boolean',
        ];
    }

    public function userPlants(): HasMany
    {
        return $this->hasMany(UserPlant::class);
    }

    public function isCompatibleWith(string $method, string $environment): bool
    {
        $methodCompatible = match($method) {
            'hydroponic' => $this->hydroponic_compatible,
            'soil' => $this->soil_compatible,
            'aeroponic' => $this->aeroponic_compatible,
            'aquaponic' => $this->aquaponic_compatible,
            default => true,
        };

        $environmentCompatible = match($environment) {
            'indoor' => $this->indoor_compatible,
            'outdoor' => $this->outdoor_compatible,
            'greenhouse' => $this->greenhouse_compatible,
            default => true,
        };

        return $methodCompatible && $environmentCompatible;
    }
}
