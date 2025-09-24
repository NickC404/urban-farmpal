<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { updateReminder } from '@/routes/calendar';

interface CalendarEvent {
    id: string;
    type: 'planting' | 'harvest_estimated' | 'harvest_expected' | 'harvest_actual' | 'reminder' | 'activity';
    title: string;
    start: string;
    allDay: boolean;
    backgroundColor: string;
    borderColor: string;
    data: Record<string, any>;
}
import { toast } from '@/composables/useToast';
import { Calendar, Clock, MapPin, Sprout, CheckCircle, AlertCircle, Info } from 'lucide-vue-next';

interface Props {
    event: CalendarEvent;
    open: boolean;
}

interface Emits {
    (e: 'close'): void;
    (e: 'updated'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const completionNotes = ref('');
const snoozeHours = ref(24);
const isUpdating = ref(false);

const eventTypeLabels = {
    planting: 'Planting',
    harvest_estimated: 'Estimated Harvest',
    harvest_expected: 'Expected Harvest',
    harvest_actual: 'Harvested',
    reminder: 'Reminder',
    activity: 'Activity',
};

const eventTypeIcons = {
    planting: Sprout,
    harvest_estimated: Calendar,
    harvest_expected: Calendar,
    harvest_actual: CheckCircle,
    reminder: AlertCircle,
    activity: Info,
};

const priorityColors = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
};

const eventDate = computed(() => {
    const date = new Date(props.event.start);
    if (props.event.allDay) {
        return date.toLocaleDateString();
    }
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    })}`;
});

const canComplete = computed(() => {
    return props.event.type === 'reminder' && props.event.data.status === 'pending';
});

const canSnooze = computed(() => {
    return props.event.type === 'reminder' && props.event.data.status === 'pending';
});

async function completeReminder() {
    if (!canComplete.value) return;
    
    isUpdating.value = true;
    try {
        const response = await fetch(updateReminder(props.event.data.reminderId).url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                status: 'completed',
                completion_notes: completionNotes.value,
            }),
        });

        if (!response.ok) throw new Error('Failed to update reminder');
        
        toast({
            title: 'Success',
            description: 'Reminder marked as completed',
        });
        
        emit('updated');
        emit('close');
    } catch (error) {
        console.error('Failed to complete reminder:', error);
        toast({
            title: 'Error',
            description: 'Failed to complete reminder. Please try again.',
            variant: 'destructive',
        });
    } finally {
        isUpdating.value = false;
    }
}

async function snoozeReminder() {
    if (!canSnooze.value) return;
    
    isUpdating.value = true;
    try {
        const response = await fetch(updateReminder(props.event.data.reminderId).url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                status: 'snoozed',
                snooze_hours: snoozeHours.value,
            }),
        });

        if (!response.ok) throw new Error('Failed to update reminder');
        
        toast({
            title: 'Success',
            description: `Reminder snoozed for ${snoozeHours.value} hours`,
        });
        
        emit('updated');
        emit('close');
    } catch (error) {
        console.error('Failed to snooze reminder:', error);
        toast({
            title: 'Error',
            description: 'Failed to snooze reminder. Please try again.',
            variant: 'destructive',
        });
    } finally {
        isUpdating.value = false;
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
                <div class="flex items-start gap-3">
                    <component 
                        :is="eventTypeIcons[event.type]" 
                        class="h-6 w-6 mt-1 flex-shrink-0"
                        :class="{
                            'text-green-600': event.type === 'planting',
                            'text-orange-600': event.type === 'harvest_estimated',
                            'text-yellow-600': event.type === 'harvest_expected',
                            'text-emerald-600': event.type === 'harvest_actual',
                            'text-blue-600': event.type === 'reminder',
                            'text-purple-600': event.type === 'activity',
                        }"
                    />
                    <div class="flex-1">
                        <DialogTitle class="text-xl">{{ event.title }}</DialogTitle>
                        <div class="flex items-center gap-2 mt-2">
                            <Badge 
                                :variant="event.type === 'reminder' && event.data.priority ? 
                                    priorityColors[event.data.priority as keyof typeof priorityColors] : 
                                    'outline'"
                            >
                                {{ eventTypeLabels[event.type] }}
                            </Badge>
                            <Badge v-if="event.type === 'reminder' && event.data.priority" variant="outline">
                                {{ event.data.priority }} priority
                            </Badge>
                            <Badge v-if="event.type === 'reminder' && event.data.isRecurring" variant="outline">
                                Recurring
                            </Badge>
                        </div>
                    </div>
                </div>
            </DialogHeader>

            <div class="space-y-4">
                <!-- Date and Time -->
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock class="h-4 w-4" />
                    {{ eventDate }}
                </div>

                <!-- Plant Information -->
                <div v-if="event.data.plantName" class="flex items-center gap-2 text-sm">
                    <Sprout class="h-4 w-4 text-green-600" />
                    <span class="font-medium">{{ event.data.plantName }}</span>
                    <span v-if="event.data.variety" class="text-muted-foreground">({{ event.data.variety }})</span>
                </div>

                <!-- Location -->
                <div v-if="event.data.location" class="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin class="h-4 w-4" />
                    {{ event.data.location }}
                </div>

                <!-- Event-specific details -->
                <div class="space-y-3">
                    <!-- Planting Details -->
                    <template v-if="event.type === 'planting'">
                        <div v-if="event.data.growingMethod" class="text-sm">
                            <span class="font-medium">Growing Method:</span> {{ event.data.growingMethod }}
                        </div>
                        <div v-if="event.data.notes" class="text-sm">
                            <span class="font-medium">Notes:</span>
                            <p class="mt-1 text-muted-foreground">{{ event.data.notes }}</p>
                        </div>
                    </template>

                    <!-- Harvest Details -->
                    <template v-else-if="event.type.startsWith('harvest')">
                        <div class="text-sm">
                            <span class="font-medium">Harvest Type:</span> {{ event.data.harvestType }}
                        </div>
                        <div v-if="event.data.actualYield" class="text-sm">
                            <span class="font-medium">Yield:</span> {{ event.data.actualYield }}
                        </div>
                    </template>

                    <!-- Reminder Details -->
                    <template v-else-if="event.type === 'reminder'">
                        <div v-if="event.data.description" class="text-sm">
                            <span class="font-medium">Description:</span>
                            <p class="mt-1 text-muted-foreground">{{ event.data.description }}</p>
                        </div>
                        <div class="text-sm">
                            <span class="font-medium">Reminder Type:</span> {{ event.data.reminderType }}
                        </div>
                        <div v-if="event.data.isOverdue" class="flex items-center gap-2 text-sm text-red-600">
                            <AlertCircle class="h-4 w-4" />
                            This reminder is overdue
                        </div>
                        <div v-else-if="event.data.isDueToday" class="flex items-center gap-2 text-sm text-orange-600">
                            <AlertCircle class="h-4 w-4" />
                            This reminder is due today
                        </div>
                        <div v-else-if="event.data.isDueSoon" class="flex items-center gap-2 text-sm text-yellow-600">
                            <AlertCircle class="h-4 w-4" />
                            This reminder is due soon
                        </div>
                    </template>

                    <!-- Activity Details -->
                    <template v-else-if="event.type === 'activity'">
                        <div class="text-sm">
                            <span class="font-medium">Activity Type:</span> {{ event.data.activityType }}
                        </div>
                        <div v-if="event.data.description" class="text-sm">
                            <span class="font-medium">Description:</span>
                            <p class="mt-1 text-muted-foreground">{{ event.data.description }}</p>
                        </div>
                        <div v-if="event.data.notes" class="text-sm">
                            <span class="font-medium">Notes:</span>
                            <p class="mt-1 text-muted-foreground">{{ event.data.notes }}</p>
                        </div>
                        <Badge v-if="event.data.isMilestone" variant="secondary">
                            Milestone
                        </Badge>
                    </template>
                </div>

                <!-- Reminder Actions -->
                <div v-if="canComplete || canSnooze" class="border-t pt-4 space-y-4">
                    <h4 class="font-medium">Actions</h4>
                    
                    <!-- Complete Reminder -->
                    <div v-if="canComplete" class="space-y-3">
                        <Label for="completion-notes">Completion Notes (Optional)</Label>
                        <Textarea
                            id="completion-notes"
                            v-model="completionNotes"
                            placeholder="Add any notes about completing this task..."
                            rows="3"
                        />
                    </div>

                    <!-- Snooze Reminder -->
                    <div v-if="canSnooze" class="space-y-3">
                        <Label for="snooze-hours">Snooze for:</Label>
                        <Select v-model="snoozeHours">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem :value="1">1 hour</SelectItem>
                                <SelectItem :value="4">4 hours</SelectItem>
                                <SelectItem :value="8">8 hours</SelectItem>
                                <SelectItem :value="24">1 day</SelectItem>
                                <SelectItem :value="48">2 days</SelectItem>
                                <SelectItem :value="168">1 week</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <DialogFooter class="flex gap-2">
                <Button variant="outline" @click="handleClose">
                    Close
                </Button>
                <Button 
                    v-if="canSnooze"
                    variant="secondary" 
                    @click="snoozeReminder"
                    :disabled="isUpdating"
                >
                    Snooze
                </Button>
                <Button 
                    v-if="canComplete"
                    @click="completeReminder"
                    :disabled="isUpdating"
                >
                    Mark Complete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
