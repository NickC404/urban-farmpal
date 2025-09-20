<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'bio',
        'profile_photo_path',
        'location',
        'experience_level',
        'growing_space_type',
        'growing_space_size',
        'interests',
        'profile_setup_completed',
        'profile_setup_completed_at',
        // Growing setup fields
        'growing_method',
        'growing_environment',
        'space_length',
        'space_width',
        'space_height',
        'has_artificial_lighting',
        'has_heating_system',
        'has_cooling_system',
        'has_irrigation_system',
        'has_ph_monitoring',
        'has_nutrient_monitoring',
        'has_weather_station',
        'climate_zone',
        'average_temperature',
        'humidity_level',
        'sunlight_hours',
        'growing_setup_completed',
        'growing_setup_completed_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'interests' => 'array',
            'profile_setup_completed_at' => 'datetime',
            'growing_setup_completed_at' => 'datetime',
            // Boolean casts for equipment flags
            'has_artificial_lighting' => 'boolean',
            'has_heating_system' => 'boolean',
            'has_cooling_system' => 'boolean',
            'has_irrigation_system' => 'boolean',
            'has_ph_monitoring' => 'boolean',
            'has_nutrient_monitoring' => 'boolean',
            'has_weather_station' => 'boolean',
        ];
    }
}
