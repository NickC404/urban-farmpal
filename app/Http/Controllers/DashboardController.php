<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        // If user is not authenticated, show welcome page
        if (!$user) {
            return Inertia::render('Welcome');
        }
        
        // If user hasn't completed profile setup, redirect to setup
        if (!$user->profile_setup_completed) {
            return redirect()->route('profile-setup.show');
        }

        return Inertia::render('Dashboard');
    }
}
