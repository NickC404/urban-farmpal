<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const page = usePage();
const user = page.props.auth.user;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Conditional features based on user's growing setup
const availableFeatures = computed(() => {
    const features = {
        lightingManagement: user.growing_environment === 'indoor' || user.has_artificial_lighting,
        weatherIntegration: user.growing_environment === 'outdoor' || user.has_weather_station,
        hydroponicFeatures: user.growing_method === 'hydroponic' || user.growing_method === 'aeroponic',
        soilFeatures: user.growing_method === 'soil',
        aquaponicFeatures: user.growing_method === 'aquaponic',
        phMonitoring: user.has_ph_monitoring,
        nutrientMonitoring: user.has_nutrient_monitoring,
        irrigationSystem: user.has_irrigation_system,
        climateControl: user.has_heating_system || user.has_cooling_system,
    };
    return features;
});

// Plant recommendations based on user setup
const recommendedPlants = computed(() => {
    if (!user.growing_setup_completed) return [];
    
    const plants = [];
    
    // Indoor recommendations
    if (user.growing_environment === 'indoor' || user.growing_environment === 'mixed') {
        plants.push(
            { name: 'Lettuce', icon: '🥬', reason: 'Perfect for indoor growing with artificial lighting' },
            { name: 'Basil', icon: '🌿', reason: 'Thrives in controlled indoor environments' },
            { name: 'Spinach', icon: '🥬', reason: 'Great for small spaces and indoor cultivation' }
        );
    }
    
    // Hydroponic recommendations
    if (user.growing_method === 'hydroponic' || user.growing_method === 'aeroponic') {
        plants.push(
            { name: 'Kale', icon: '🥬', reason: 'Excellent for hydroponic systems' },
            { name: 'Strawberries', icon: '🍓', reason: 'High yield in hydroponic setups' }
        );
    }
    
    // Outdoor recommendations
    if (user.growing_environment === 'outdoor' || user.growing_environment === 'mixed') {
        plants.push(
            { name: 'Tomatoes', icon: '🍅', reason: 'Great for outdoor gardens with good sunlight' },
            { name: 'Peppers', icon: '🌶️', reason: 'Perfect for warm outdoor climates' }
        );
    }
    
    // Space-based recommendations
    const userSpace = (user.space_length || 0) * (user.space_width || 0);
    if (userSpace < 20) {
        plants.push(
            { name: 'Microgreens', icon: '🌱', reason: 'Ideal for small spaces' },
            { name: 'Herbs', icon: '🌿', reason: 'Compact and space-efficient' }
        );
    }
    
    return plants.slice(0, 6); // Limit to 6 recommendations
});

// Mock data for the dashboard
const stats = ref([
    {
        title: 'Active Gardens',
        value: '12',
        change: '+2 this month',
        icon: '🌱',
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
        title: 'Harvest This Week',
        value: '8.5 lbs',
        change: '+15% from last week',
        icon: '🥬',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
        title: 'Water Usage',
        value: '45 gal',
        change: '-10% more efficient',
        icon: '💧',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
]);

const recentActivities = ref([
    {
        id: 1,
        type: 'harvest',
        message: 'Harvested 2 lbs of lettuce from Garden A',
        time: '2 hours ago',
        icon: '🥬',
    },
    {
        id: 2,
        type: 'planting',
        message: 'Planted new tomato seeds in Garden B',
        time: '1 day ago',
        icon: '🍅',
    },
    {
        id: 3,
        type: 'watering',
        message: 'Automated watering system activated',
        time: '2 days ago',
        icon: '💧',
    },
    {
        id: 4,
        type: 'maintenance',
        message: 'Soil pH levels checked and adjusted',
        time: '3 days ago',
        icon: '🔬',
    },
]);

const upcomingTasks = ref([
    {
        id: 1,
        task: 'Harvest ripe tomatoes',
        garden: 'Garden A',
        due: 'Today',
        priority: 'high',
    },
    {
        id: 2,
        task: 'Check soil moisture',
        garden: 'Garden B',
        due: 'Tomorrow',
        priority: 'medium',
    },
    {
        id: 3,
        task: 'Plant new herbs',
        garden: 'Garden C',
        due: 'This weekend',
        priority: 'low',
    },
]);
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
            <!-- Welcome Section -->
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome to Urban FarmPal
                </h1>
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                    Monitor and manage your urban farming operations
                </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid gap-6 md:grid-cols-3">
                <div
                    v-for="stat in stats"
                    :key="stat.title"
                    class="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border"
                    :class="stat.bgColor"
                >
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {{ stat.title }}
                            </p>
                            <p class="text-3xl font-bold" :class="stat.color">
                                {{ stat.value }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-500">
                                {{ stat.change }}
                            </p>
                        </div>
                        <div class="text-4xl">{{ stat.icon }}</div>
                    </div>
                </div>
            </div>

            <!-- Plant Recommendations -->
            <div v-if="user.growing_setup_completed" class="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Recommended Plants for Your Setup
                </h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div 
                        v-for="plant in recommendedPlants" 
                        :key="plant.name"
                        class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">{{ plant.icon }}</div>
                            <div>
                                <h3 class="font-medium text-gray-900 dark:text-white">{{ plant.name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ plant.reason }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                        View All Recommendations →
                    </button>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Recent Activities -->
                <div class="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Recent Activities
                    </h2>
                    <div class="space-y-4">
                        <div
                            v-for="activity in recentActivities"
                            :key="activity.id"
                            class="flex items-start gap-3"
                        >
                            <div class="text-2xl">{{ activity.icon }}</div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-900 dark:text-white">
                                    {{ activity.message }}
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-500">
                                    {{ activity.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Tasks -->
                <div class="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Upcoming Tasks
                    </h2>
                    <div class="space-y-4">
                        <div
                            v-for="task in upcomingTasks"
                            :key="task.id"
                            class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                        >
                            <div class="flex-1">
                                <p class="font-medium text-gray-900 dark:text-white">
                                    {{ task.task }}
                                </p>
                                <p class="text-sm text-gray-500 dark:text-gray-500">
                                    {{ task.garden }} • Due {{ task.due }}
                                </p>
                            </div>
                            <span
                                class="rounded-full px-2 py-1 text-xs font-medium"
                                :class="{
                                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': task.priority === 'high',
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': task.priority === 'medium',
                                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': task.priority === 'low',
                                }"
                            >
                                {{ task.priority }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                </h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <button class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <div class="text-3xl">🌱</div>
                        <span class="text-sm font-medium">Add Garden</span>
                    </button>
                    
                    <!-- Conditional features based on growing setup -->
                    <button 
                        v-if="availableFeatures.lightingManagement"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">💡</div>
                        <span class="text-sm font-medium">Lighting Control</span>
                    </button>
                    
                    <button 
                        v-if="availableFeatures.weatherIntegration"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">🌤️</div>
                        <span class="text-sm font-medium">Weather Data</span>
                    </button>
                    
                    <button 
                        v-if="availableFeatures.phMonitoring"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">🧪</div>
                        <span class="text-sm font-medium">pH Monitor</span>
                    </button>
                    
                    <button 
                        v-if="availableFeatures.nutrientMonitoring"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">📊</div>
                        <span class="text-sm font-medium">Nutrients</span>
                    </button>
                    
                    <button 
                        v-if="availableFeatures.irrigationSystem"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">💧</div>
                        <span class="text-sm font-medium">Irrigation</span>
                    </button>
                    
                    <button 
                        v-if="availableFeatures.climateControl"
                        class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <div class="text-3xl">🌡️</div>
                        <span class="text-sm font-medium">Climate</span>
                    </button>
                    
                    <button class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <div class="text-3xl">📝</div>
                        <span class="text-sm font-medium">Log Activity</span>
                    </button>
                    
                    <button class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <div class="text-3xl">⚙️</div>
                        <span class="text-sm font-medium">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
