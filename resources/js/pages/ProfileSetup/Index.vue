<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { update } from '@/routes/profile-setup';

interface User {
    id: number;
    name: string;
    email: string;
    location?: string;
    experience_level?: string;
    growing_space_type?: string;
    growing_space_size?: number;
    interests?: string[];
}

interface Props {
    user: User;
}

const props = defineProps<Props>();

const currentStep = ref(1);
const totalSteps = 7; // Extended to include growing setup steps

const form = useForm({
    location: props.user.location || '',
    experience_level: props.user.experience_level || '',
    growing_space_type: props.user.growing_space_type || '',
    growing_space_size: props.user.growing_space_size || '',
    interests: props.user.interests || [],
    // Growing setup fields
    growing_method: props.user.growing_method || '',
    growing_environment: props.user.growing_environment || '',
    space_length: props.user.space_length || '',
    space_width: props.user.space_width || '',
    space_height: props.user.space_height || '',
    has_artificial_lighting: props.user.has_artificial_lighting || false,
    has_heating_system: props.user.has_heating_system || false,
    has_cooling_system: props.user.has_cooling_system || false,
    has_irrigation_system: props.user.has_irrigation_system || false,
    has_ph_monitoring: props.user.has_ph_monitoring || false,
    has_nutrient_monitoring: props.user.has_nutrient_monitoring || false,
    has_weather_station: props.user.has_weather_station || false,
    climate_zone: props.user.climate_zone || '',
    average_temperature: props.user.average_temperature || '',
    humidity_level: props.user.humidity_level || '',
    sunlight_hours: props.user.sunlight_hours || '',
});

const experienceLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to urban farming' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience with growing' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced grower' },
];

const growingSpaceTypes = [
    { value: 'balcony', label: 'Balcony', icon: '🏢' },
    { value: 'rooftop', label: 'Rooftop', icon: '🏗️' },
    { value: 'indoor', label: 'Indoor', icon: '🏠' },
    { value: 'outdoor', label: 'Outdoor Garden', icon: '🌳' },
    { value: 'community_garden', label: 'Community Garden', icon: '👥' },
];

const interestOptions = [
    { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
    { value: 'herbs', label: 'Herbs', icon: '🌿' },
    { value: 'fruits', label: 'Fruits', icon: '🍓' },
    { value: 'flowers', label: 'Flowers', icon: '🌸' },
    { value: 'microgreens', label: 'Microgreens', icon: '🌱' },
    { value: 'mushrooms', label: 'Mushrooms', icon: '🍄' },
    { value: 'aquaponics', label: 'Aquaponics', icon: '🐟' },
    { value: 'hydroponics', label: 'Hydroponics', icon: '💧' },
];

const growingMethods = [
    { value: 'soil', label: 'Soil Growing', description: 'Traditional soil-based growing', icon: '🌱' },
    { value: 'hydroponic', label: 'Hydroponic', description: 'Growing in nutrient-rich water', icon: '💧' },
    { value: 'aeroponic', label: 'Aeroponic', description: 'Growing with misted nutrients', icon: '🌫️' },
    { value: 'aquaponic', label: 'Aquaponic', description: 'Combining fish and plants', icon: '🐟' },
];

const growingEnvironments = [
    { value: 'indoor', label: 'Indoor', description: 'Controlled indoor environment', icon: '🏠' },
    { value: 'outdoor', label: 'Outdoor', description: 'Natural outdoor conditions', icon: '🌳' },
    { value: 'greenhouse', label: 'Greenhouse', description: 'Protected greenhouse space', icon: '🏗️' },
    { value: 'mixed', label: 'Mixed', description: 'Combination of indoor and outdoor', icon: '🔄' },
];

const equipmentOptions = [
    { value: 'has_artificial_lighting', label: 'Artificial Lighting', description: 'LED or grow lights', icon: '💡' },
    { value: 'has_heating_system', label: 'Heating System', description: 'Temperature control', icon: '🔥' },
    { value: 'has_cooling_system', label: 'Cooling System', description: 'Air conditioning or fans', icon: '❄️' },
    { value: 'has_irrigation_system', label: 'Irrigation System', description: 'Automated watering', icon: '💧' },
    { value: 'has_ph_monitoring', label: 'pH Monitoring', description: 'pH level tracking', icon: '🧪' },
    { value: 'has_nutrient_monitoring', label: 'Nutrient Monitoring', description: 'Nutrient level tracking', icon: '📊' },
    { value: 'has_weather_station', label: 'Weather Station', description: 'Environmental monitoring', icon: '🌡️' },
];

const nextStep = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const toggleInterest = (interest: string, checked: boolean) => {
    if (checked) {
        if (!form.interests.includes(interest)) {
            form.interests.push(interest);
        }
    } else {
        const index = form.interests.indexOf(interest);
        if (index > -1) {
            form.interests.splice(index, 1);
        }
    }
};

const submit = () => {
    form.post(update.url(), {
        onSuccess: () => {
            // Redirect will be handled by the controller
        },
    });
};

const canProceed = computed(() => {
    switch (currentStep.value) {
        case 1:
            return form.location.trim() !== '';
        case 2:
            return form.experience_level !== '';
        case 3:
            return form.growing_space_type !== '' && form.growing_space_size > 0;
        case 4:
            return form.interests.length > 0;
        case 5:
            return form.growing_method !== '' && form.growing_environment !== '';
        case 6:
            return form.space_length > 0 && form.space_width > 0;
        case 7:
            return true; // Equipment selection is optional
        default:
            return false;
    }
});

const getStepTitle = (step: number) => {
    switch (step) {
        case 1:
            return 'Welcome to Urban FarmPal!';
        case 2:
            return 'Tell us about your experience';
        case 3:
            return 'Describe your growing space';
        case 4:
            return 'What interests you?';
        case 5:
            return 'Growing Method & Environment';
        case 6:
            return 'Space Dimensions';
        case 7:
            return 'Equipment & Features';
        default:
            return '';
    }
};

const getStepDescription = (step: number) => {
    switch (step) {
        case 1:
            return 'Let\'s set up your profile to personalize your urban farming experience.';
        case 2:
            return 'Help us understand your current level of experience with urban farming.';
        case 3:
            return 'Tell us about the space where you plan to grow your plants.';
        case 4:
            return 'Select the types of plants and growing methods that interest you.';
        case 5:
            return 'Choose your preferred growing method and environment.';
        case 6:
            return 'Specify the exact dimensions of your growing space.';
        case 7:
            return 'Select any equipment or monitoring systems you have.';
        default:
            return '';
    }
};
</script>

<template>
    <Head title="Profile Setup" />

    <AppLayout>
        <div class="mx-auto max-w-2xl px-4 py-8">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Step {{ currentStep }} of {{ totalSteps }}</span>
                    <span>{{ Math.round((currentStep / totalSteps) * 100) }}% Complete</span>
                </div>
                <div class="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        class="h-2 rounded-full bg-green-600 transition-all duration-300"
                        :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                    ></div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="rounded-xl border border-sidebar-border/70 bg-white p-8 dark:border-sidebar-border dark:bg-gray-800">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ getStepTitle(currentStep) }}
                    </h1>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">
                        {{ getStepDescription(currentStep) }}
                    </p>
                </div>

                <!-- Step 1: Location -->
                <div v-if="currentStep === 1" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="location">Where are you located?</Label>
                        <Input
                            id="location"
                            v-model="form.location"
                            type="text"
                            placeholder="e.g., New York, NY or San Francisco Bay Area"
                            required
                        />
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This helps us provide location-specific growing advice and connect you with local resources.
                        </p>
                    </div>
                </div>

                <!-- Step 2: Experience Level -->
                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="space-y-4">
                        <div
                            v-for="level in experienceLevels"
                            :key="level.value"
                            class="flex items-start space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                            @click="form.experience_level = level.value"
                        >
                            <input
                                type="radio"
                                :id="level.value"
                                :value="level.value"
                                v-model="form.experience_level"
                                class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <div class="flex-1">
                                <Label :for="level.value" class="text-base font-medium cursor-pointer">
                                    {{ level.label }}
                                </Label>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ level.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Growing Space -->
                <div v-if="currentStep === 3" class="space-y-6">
                    <div class="grid gap-4">
                        <Label>What type of growing space do you have?</Label>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div
                                v-for="space in growingSpaceTypes"
                                :key="space.value"
                                class="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                                @click="form.growing_space_type = space.value"
                            >
                                <input
                                    type="radio"
                                    :id="space.value"
                                    :value="space.value"
                                    v-model="form.growing_space_type"
                                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <div class="flex items-center space-x-2">
                                    <span class="text-2xl">{{ space.icon }}</span>
                                    <Label :for="space.value" class="text-sm font-medium cursor-pointer">
                                        {{ space.label }}
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <Label for="growing_space_size">How much space do you have? (in square feet)</Label>
                        <Input
                            id="growing_space_size"
                            v-model="form.growing_space_size"
                            type="number"
                            min="1"
                            max="10000"
                            placeholder="e.g., 50"
                            required
                        />
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This helps us recommend appropriate plants and growing methods for your space.
                        </p>
                    </div>
                </div>

                <!-- Step 4: Interests -->
                <div v-if="currentStep === 4" class="space-y-6">
                    <div class="grid gap-4">
                        <Label>What interests you most? (Select all that apply)</Label>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div
                                v-for="interest in interestOptions"
                                :key="interest.value"
                                class="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                                @click="toggleInterest(interest.value, !form.interests.includes(interest.value))"
                            >
                                <Checkbox
                                    :id="interest.value"
                                    :checked="form.interests.includes(interest.value)"
                                    @update:checked="(checked) => toggleInterest(interest.value, checked)"
                                />
                                <div class="flex items-center space-x-2">
                                    <span class="text-2xl">{{ interest.icon }}</span>
                                    <Label :for="interest.value" class="text-sm font-medium cursor-pointer">
                                        {{ interest.label }}
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 5: Growing Method & Environment -->
                <div v-if="currentStep === 5" class="space-y-6">
                    <div class="grid gap-6">
                        <div class="grid gap-4">
                            <Label>What growing method do you prefer?</Label>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div
                                    v-for="method in growingMethods"
                                    :key="method.value"
                                    class="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                                    @click="form.growing_method = method.value"
                                >
                                    <input
                                        type="radio"
                                        :id="method.value"
                                        :value="method.value"
                                        v-model="form.growing_method"
                                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                    />
                                    <div class="flex items-center space-x-2">
                                        <span class="text-2xl">{{ method.icon }}</span>
                                        <div>
                                            <Label :for="method.value" class="text-sm font-medium cursor-pointer">
                                                {{ method.label }}
                                            </Label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                {{ method.description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-4">
                            <Label>What environment will you be growing in?</Label>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div
                                    v-for="env in growingEnvironments"
                                    :key="env.value"
                                    class="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                                    @click="form.growing_environment = env.value"
                                >
                                    <input
                                        type="radio"
                                        :id="env.value"
                                        :value="env.value"
                                        v-model="form.growing_environment"
                                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                    />
                                    <div class="flex items-center space-x-2">
                                        <span class="text-2xl">{{ env.icon }}</span>
                                        <div>
                                            <Label :for="env.value" class="text-sm font-medium cursor-pointer">
                                                {{ env.label }}
                                            </Label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                {{ env.description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 6: Space Dimensions -->
                <div v-if="currentStep === 6" class="space-y-6">
                    <div class="grid gap-6">
                        <div class="grid gap-4">
                            <Label>What are the dimensions of your growing space?</Label>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div class="grid gap-2">
                                    <Label for="space_length">Length (feet)</Label>
                                    <Input
                                        id="space_length"
                                        v-model="form.space_length"
                                        type="number"
                                        min="1"
                                        max="1000"
                                        placeholder="e.g., 10"
                                        required
                                    />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="space_width">Width (feet)</Label>
                                    <Input
                                        id="space_width"
                                        v-model="form.space_width"
                                        type="number"
                                        min="1"
                                        max="1000"
                                        placeholder="e.g., 8"
                                        required
                                    />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="space_height">Height (feet)</Label>
                                    <Input
                                        id="space_height"
                                        v-model="form.space_height"
                                        type="number"
                                        min="1"
                                        max="50"
                                        placeholder="e.g., 8"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Optional - mainly for indoor/greenhouse spaces
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-4">
                            <Label>Environmental Conditions (Optional)</Label>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label for="climate_zone">Climate Zone</Label>
                                    <Input
                                        id="climate_zone"
                                        v-model="form.climate_zone"
                                        placeholder="e.g., 7a, 9b"
                                    />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="average_temperature">Average Temperature (°F)</Label>
                                    <Input
                                        id="average_temperature"
                                        v-model="form.average_temperature"
                                        type="number"
                                        placeholder="e.g., 75"
                                    />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="humidity_level">Humidity Level (%)</Label>
                                    <Input
                                        id="humidity_level"
                                        v-model="form.humidity_level"
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="e.g., 60"
                                    />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="sunlight_hours">Sunlight Hours per Day</Label>
                                    <Input
                                        id="sunlight_hours"
                                        v-model="form.sunlight_hours"
                                        type="number"
                                        min="0"
                                        max="24"
                                        placeholder="e.g., 8"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 7: Equipment & Features -->
                <div v-if="currentStep === 7" class="space-y-6">
                    <div class="grid gap-4">
                        <Label>What equipment or monitoring systems do you have? (Select all that apply)</Label>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div
                                v-for="equipment in equipmentOptions"
                                :key="equipment.value"
                                class="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                                @click="form[equipment.value] = !form[equipment.value]"
                            >
                                <Checkbox
                                    :id="equipment.value"
                                    :checked="form[equipment.value]"
                                    @update:checked="(checked) => form[equipment.value] = checked"
                                />
                                <div class="flex items-center space-x-2">
                                    <span class="text-2xl">{{ equipment.icon }}</span>
                                    <div>
                                        <Label :for="equipment.value" class="text-sm font-medium cursor-pointer">
                                            {{ equipment.label }}
                                        </Label>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">
                                            {{ equipment.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Don't worry if you don't have any of these yet - you can always add them later!
                        </p>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="mt-8 flex justify-between">
                    <Button
                        v-if="currentStep > 1"
                        type="button"
                        variant="outline"
                        @click="prevStep"
                    >
                        Previous
                    </Button>
                    <div v-else></div>

                    <Button
                        v-if="currentStep < totalSteps"
                        type="button"
                        @click="nextStep"
                        :disabled="!canProceed"
                    >
                        Next
                    </Button>
                    <Button
                        v-else
                        type="button"
                        @click="submit"
                        :disabled="form.processing || !canProceed"
                    >
                        Complete Setup
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
