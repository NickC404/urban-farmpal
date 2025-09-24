<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { plannedPlanting as createPlannedPlanting } from '@/routes/calendar';
import { index as getPlants } from '@/actions/App/Http/Controllers/PlantController';
import { toast } from '@/composables/useToast';
import { Check, ChevronsUpDown, Calendar, Sprout } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

interface Props {
    open: boolean;
    selectedDate: string;
}

interface Emits {
    (e: 'close'): void;
    (e: 'planted'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Form data
const form = ref({
    plant_id: null as number | null,
    planting_date: '',
    custom_name: '',
    variety: '',
    location: '',
    growing_method: 'soil',
    growing_environment: 'indoor',
    quantity_planted: 1,
    notes: '',
});

// Plant selection
const plants = ref<any[]>([]);
const selectedPlant = ref<any>(null);
const plantsLoading = ref(false);
const plantSearchOpen = ref(false);
const plantSearchQuery = ref('');

// Form state
const isSubmitting = ref(false);

const filteredPlants = computed(() => {
    if (!plantSearchQuery.value) return plants.value.slice(0, 10);
    
    return plants.value.filter((plant) =>
        plant.name.toLowerCase().includes(plantSearchQuery.value.toLowerCase()) ||
        plant.scientific_name?.toLowerCase().includes(plantSearchQuery.value.toLowerCase())
    ).slice(0, 10);
});

const formattedSelectedDate = computed(() => {
    if (!props.selectedDate) return '';
    return new Date(props.selectedDate).toLocaleDateString();
});

// Watch for dialog open/close
watch(() => props.open, (isOpen) => {
    if (isOpen) {
        form.value.planting_date = props.selectedDate;
        loadPlants();
        resetForm();
    }
});

async function loadPlants() {
    plantsLoading.value = true;
    try {
        const response = await getPlants.submit();
        plants.value = response.data || [];
    } catch (error) {
        console.error('Failed to load plants:', error);
        toast({
            title: 'Error',
            description: 'Failed to load plants. Please try again.',
            variant: 'destructive',
        });
    } finally {
        plantsLoading.value = false;
    }
}

function selectPlant(plant: any) {
    selectedPlant.value = plant;
    form.value.plant_id = plant.id;
    plantSearchOpen.value = false;
    
    // Auto-fill custom name if not already set
    if (!form.value.custom_name) {
        form.value.custom_name = plant.name;
    }
}

function resetForm() {
    form.value = {
        plant_id: null,
        planting_date: props.selectedDate,
        custom_name: '',
        variety: '',
        location: '',
        growing_method: 'soil',
        growing_environment: 'indoor',
        quantity_planted: 1,
        notes: '',
    };
    selectedPlant.value = null;
    plantSearchQuery.value = '';
}

async function handleSubmit() {
    if (!form.value.plant_id) {
        toast({
            title: 'Error',
            description: 'Please select a plant to add to your calendar.',
            variant: 'destructive',
        });
        return;
    }

    isSubmitting.value = true;
    try {
        const response = await fetch(createPlannedPlanting().url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                plant_id: form.value.plant_id,
                planting_date: form.value.planting_date,
                custom_name: form.value.custom_name || undefined,
                variety: form.value.variety || undefined,
                location: form.value.location || undefined,
                growing_method: form.value.growing_method,
                growing_environment: form.value.growing_environment,
                quantity_planted: form.value.quantity_planted,
                notes: form.value.notes || undefined,
            }),
        });

        if (!response.ok) throw new Error('Failed to create planned planting');

        toast({
            title: 'Success',
            description: 'Planned planting added to your calendar!',
        });

        emit('planted');
    } catch (error) {
        console.error('Failed to create planned planting:', error);
        toast({
            title: 'Error',
            description: 'Failed to add planned planting. Please try again.',
            variant: 'destructive',
        });
    } finally {
        isSubmitting.value = false;
    }
}

function handleClose() {
    emit('close');
}
</script>

<template>
    <Dialog :open="open" @update:open="handleClose">
        <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-w-lg md:max-w-2xl mx-4">
            <DialogHeader>
                <div class="flex items-center gap-3">
                    <Calendar class="h-6 w-6 text-green-600" />
                    <div>
                        <DialogTitle>Plan New Planting</DialogTitle>
                        <DialogDescription>
                            Add a new planting to your calendar for {{ formattedSelectedDate }}
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Plant Selection -->
                <div class="space-y-2">
                    <Label>Select Plant *</Label>
                    <Popover v-model:open="plantSearchOpen">
                        <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                role="combobox"
                                :aria-expanded="plantSearchOpen"
                                class="w-full justify-between"
                            >
                                <div class="flex items-center gap-2">
                                    <Sprout class="h-4 w-4" />
                                    {{ selectedPlant ? selectedPlant.name : "Select a plant..." }}
                                </div>
                                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-full p-0">
                            <Command>
                                <CommandInput 
                                    v-model="plantSearchQuery"
                                    placeholder="Search plants..." 
                                />
                                <CommandEmpty>No plants found.</CommandEmpty>
                                <CommandList>
                                    <CommandGroup>
                                        <CommandItem
                                            v-for="plant in filteredPlants"
                                            :key="plant.id"
                                            :value="plant.name"
                                            @select="selectPlant(plant)"
                                        >
                                            <Check
                                                :class="cn(
                                                    'mr-2 h-4 w-4',
                                                    selectedPlant?.id === plant.id ? 'opacity-100' : 'opacity-0'
                                                )"
                                            />
                                            <div class="flex-1">
                                                <div class="font-medium">{{ plant.name }}</div>
                                                <div v-if="plant.scientific_name" class="text-sm text-muted-foreground">
                                                    {{ plant.scientific_name }}
                                                </div>
                                            </div>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <!-- Planting Date -->
                <div class="space-y-2">
                    <Label for="planting-date">Planting Date *</Label>
                    <Input
                        id="planting-date"
                        v-model="form.planting_date"
                        type="date"
                        required
                    />
                </div>

                <!-- Custom Name -->
                <div class="space-y-2">
                    <Label for="custom-name">Custom Name</Label>
                    <Input
                        id="custom-name"
                        v-model="form.custom_name"
                        placeholder="e.g., 'Tomatoes - Patio Container'"
                    />
                </div>

                <!-- Variety -->
                <div class="space-y-2">
                    <Label for="variety">Variety</Label>
                    <Input
                        id="variety"
                        v-model="form.variety"
                        placeholder="e.g., 'Cherry', 'Roma', 'Beefsteak'"
                    />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <!-- Growing Method -->
                    <div class="space-y-2">
                        <Label>Growing Method</Label>
                        <Select v-model="form.growing_method">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="soil">Soil</SelectItem>
                                <SelectItem value="hydroponic">Hydroponic</SelectItem>
                                <SelectItem value="aeroponic">Aeroponic</SelectItem>
                                <SelectItem value="aquaponic">Aquaponic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Growing Environment -->
                    <div class="space-y-2">
                        <Label>Growing Environment</Label>
                        <Select v-model="form.growing_environment">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="indoor">Indoor</SelectItem>
                                <SelectItem value="outdoor">Outdoor</SelectItem>
                                <SelectItem value="greenhouse">Greenhouse</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <!-- Location -->
                    <div class="space-y-2">
                        <Label for="location">Location</Label>
                        <Input
                            id="location"
                            v-model="form.location"
                            placeholder="e.g., 'Kitchen Counter', 'Balcony'"
                        />
                    </div>

                    <!-- Quantity -->
                    <div class="space-y-2">
                        <Label for="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            v-model.number="form.quantity_planted"
                            type="number"
                            min="1"
                            placeholder="1"
                        />
                    </div>
                </div>

                <!-- Notes -->
                <div class="space-y-2">
                    <Label for="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        v-model="form.notes"
                        placeholder="Any additional notes about this planting..."
                        rows="3"
                    />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" @click="handleClose">
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="isSubmitting || !form.plant_id">
                        {{ isSubmitting ? 'Adding...' : 'Add to Calendar' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
