<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    growing_method?: string;
    growing_environment?: string;
    space_length?: number;
    space_width?: number;
    space_height?: number;
    has_artificial_lighting?: boolean;
    has_heating_system?: boolean;
    has_cooling_system?: boolean;
    has_irrigation_system?: boolean;
    has_ph_monitoring?: boolean;
    has_nutrient_monitoring?: boolean;
    has_weather_station?: boolean;
    climate_zone?: string;
    average_temperature?: number;
    humidity_level?: number;
    sunlight_hours?: number;
}

interface Props {
    user: User;
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Growing Setup',
        href: '/settings/growing-setup',
    },
];

const form = useForm({
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

const submit = () => {
    form.patch('/settings/growing-setup', {
        preserveScroll: true,
        onSuccess: () => {
            // Handle success if needed
        },
    });
};
</script>

<template>
    <Head title="Growing Setup" />

    <AppLayout :breadcrumbs="breadcrumbItems">
        <SettingsLayout>
            <div class="space-y-8">
                <HeadingSmall
                    title="Growing Setup"
                    description="Configure your growing method, environment, and equipment to get personalized features and recommendations."
                />

                <form @submit.prevent="submit" class="space-y-8">
                    <!-- Growing Method & Environment -->
                    <div class="space-y-6">
                        <div class="grid gap-4">
                            <Label class="text-base font-medium">Growing Method</Label>
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
                            <Label class="text-base font-medium">Growing Environment</Label>
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

                    <!-- Space Dimensions -->
                    <div class="space-y-6">
                        <div class="grid gap-4">
                            <Label class="text-base font-medium">Space Dimensions</Label>
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
                            <Label class="text-base font-medium">Environmental Conditions (Optional)</Label>
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

                    <!-- Equipment & Monitoring -->
                    <div class="space-y-6">
                        <div class="grid gap-4">
                            <Label class="text-base font-medium">Equipment & Monitoring Systems</Label>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                Select the equipment and monitoring systems you have available. This helps us show relevant features.
                            </p>
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
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="flex justify-end">
                        <Button 
                            type="submit" 
                            :disabled="form.processing"
                            class="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <span v-if="form.processing">Saving...</span>
                            <span v-else>Save Growing Setup</span>
                        </Button>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>

