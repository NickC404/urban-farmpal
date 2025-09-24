<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CalendarEventModal from '@/components/Calendar/CalendarEventModal.vue';
import AddPlannedPlantingModal from '@/components/Calendar/AddPlannedPlantingModal.vue';
import axios from 'axios';
import { toast } from '@/composables/useToast';
import { index as calendar } from '@/routes/calendar';
import { type BreadcrumbItem } from '@/types';

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

const events = ref<CalendarEvent[]>([]);
const selectedEvent = ref<CalendarEvent | null>(null);
const showEventModal = ref(false);
const showAddPlantingModal = ref(false);
const selectedDate = ref<string>('');
const currentView = ref<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
const isLoading = ref(false);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Growing Calendar',
        href: calendar().url,
    },
];

const calendarOptions = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: currentView.value,
    height: 'auto',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    events: events.value,
    eventClick: handleEventClick,
    select: handleDateSelect,
    datesSet: handleDatesSet,
    eventClassNames: (arg) => {
        const eventType = arg.event.extendedProps.type;
        return [`calendar-event-${eventType}`];
    },
}));

const mobileCalendarOptions = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
    },
    footerToolbar: {
        center: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    height: 'auto',
    aspectRatio: 1.2,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: 2,
    moreLinkClick: 'popover',
    weekends: true,
    events: events.value,
    eventClick: handleEventClick,
    select: handleDateSelect,
    datesSet: handleDatesSet,
    eventClassNames: (arg) => {
        const eventType = arg.event.extendedProps.type;
        return [`calendar-event-${eventType}`];
    },
    // Mobile-specific settings
    dayHeaderFormat: { weekday: 'short' },
    eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'short'
    },
    displayEventTime: false, // Hide time for mobile to save space
    eventDisplay: 'block',
    dayMaxEventRows: 2,
}));

async function loadEvents(start: Date, end: Date) {
    isLoading.value = true;
    try {
        const response = await axios.get('/api/calendar/events', {
            params: {
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0],
            }
        });
        events.value = response.data;
    } catch (error) {
        console.error('Failed to load calendar events:', error);
        toast({
            title: 'Error',
            description: 'Failed to load calendar events. Please try again.',
            variant: 'destructive',
        });
    } finally {
        isLoading.value = false;
    }
}

function handleEventClick(arg: EventClickArg) {
    const eventData = arg.event.extendedProps as CalendarEvent['data'] & { type: CalendarEvent['type'] };
    selectedEvent.value = {
        id: arg.event.id,
        type: eventData.type,
        title: arg.event.title,
        start: arg.event.start?.toISOString() || '',
        allDay: arg.event.allDay,
        backgroundColor: arg.event.backgroundColor || '',
        borderColor: arg.event.borderColor || '',
        data: eventData,
    };
    showEventModal.value = true;
}

function handleDateSelect(arg: DateSelectArg) {
    selectedDate.value = arg.start.toISOString().split('T')[0];
    showAddPlantingModal.value = true;
}

function handleDatesSet(arg: any) {
    loadEvents(arg.start, arg.end);
}

function closeEventModal() {
    showEventModal.value = false;
    selectedEvent.value = null;
}

function closeAddPlantingModal() {
    showAddPlantingModal.value = false;
    selectedDate.value = '';
}

function handlePlantingAdded() {
    closeAddPlantingModal();
    // Reload events to show the new planting
    const calendarApi = (document.querySelector('.fc') as any)?.__vue__?.getApi();
    if (calendarApi) {
        const view = calendarApi.view;
        loadEvents(view.activeStart, view.activeEnd);
    }
}

function handleEventUpdated() {
    // Reload events to show updated event
    const calendarApi = (document.querySelector('.fc') as any)?.__vue__?.getApi();
    if (calendarApi) {
        const view = calendarApi.view;
        loadEvents(view.activeStart, view.activeEnd);
    }
}

const upcomingEvents = computed(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events.value
        .filter(event => {
            const eventDate = new Date(event.start);
            return eventDate >= now && eventDate <= nextWeek;
        })
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 5);
});

const eventTypeColors = {
    planting: 'bg-green-500',
    harvest_estimated: 'bg-orange-500',
    harvest_expected: 'bg-yellow-500',
    harvest_actual: 'bg-emerald-600',
    reminder: 'bg-blue-500',
    activity: 'bg-purple-500',
};

const eventTypeLabels = {
    planting: 'Planting',
    harvest_estimated: 'Est. Harvest',
    harvest_expected: 'Expected Harvest',
    harvest_actual: 'Harvested',
    reminder: 'Reminder',
    activity: 'Activity',
};

onMounted(() => {
    // Initial load will be triggered by datesSet callback
});
</script>

<template>
    <Head title="Growing Calendar" />

    <AppLayout :breadcrumbs="breadcrumbs">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div class="flex-1 min-w-0">
                <h1 class="text-2xl md:text-3xl font-bold tracking-tight">Growing Calendar</h1>
                <p class="text-muted-foreground text-sm md:text-base">
                    Track your planting schedules, harvest dates, and maintenance tasks
                </p>
            </div>
            <Button @click="showAddPlantingModal = true" class="w-full sm:w-auto">
                <span class="sm:hidden">Plan New Planting</span>
                <span class="hidden sm:inline">Plan New Planting</span>
            </Button>
            </div>

            <!-- Mobile/Tablet Layout -->
            <div class="block xl:hidden space-y-4">
            <!-- Quick Actions Bar for Mobile/Tablet -->
            <div class="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
                <div class="flex items-center gap-2 text-xs">
                    <span class="font-medium">Legend:</span>
                </div>
                <div 
                    v-for="(color, type) in eventTypeColors" 
                    :key="type"
                    class="flex items-center gap-1"
                >
                    <div :class="[color, 'w-2 h-2 rounded-full']"></div>
                    <span class="text-xs">{{ eventTypeLabels[type as keyof typeof eventTypeLabels] }}</span>
                </div>
            </div>

            <!-- Calendar Card for Mobile/Tablet -->
            <Card>
                <CardHeader class="pb-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle class="text-lg">Calendar View</CardTitle>
                            <CardDescription class="text-sm">
                                View your plants and activities
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="calendar-container-mobile">
                        <FullCalendar 
                            :options="mobileCalendarOptions"
                            class="h-full"
                        />
                    </div>
                </CardContent>
            </Card>

            <!-- Upcoming Events for Mobile/Tablet -->
            <Card>
                <CardHeader>
                    <CardTitle class="text-base">Upcoming This Week</CardTitle>
                </CardHeader>
                <CardContent>
                    <div v-if="upcomingEvents.length === 0" class="text-sm text-muted-foreground text-center py-4">
                        No upcoming events this week
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div 
                            v-for="event in upcomingEvents" 
                            :key="event.id"
                            class="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-border/50"
                            @click="selectedEvent = event; showEventModal = true"
                        >
                            <div 
                                :class="[
                                    eventTypeColors[event.type as keyof typeof eventTypeColors], 
                                    'w-3 h-3 rounded-full mt-1 flex-shrink-0'
                                ]"
                            ></div>
                            <div class="flex-1 min-w-0">
                                <div class="text-sm font-medium truncate">
                                    {{ event.title }}
                                </div>
                                <div class="text-xs text-muted-foreground">
                                    {{ new Date(event.start).toLocaleDateString() }}
                                    <span v-if="!event.allDay">
                                        at {{ new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                                    </span>
                                </div>
                                <Badge 
                                    variant="secondary" 
                                    class="mt-1 text-xs"
                                >
                                    {{ eventTypeLabels[event.type as keyof typeof eventTypeLabels] }}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>

            <!-- Desktop Layout (XL screens and up) -->
            <div class="hidden xl:grid xl:grid-cols-4 gap-6">
            <!-- Calendar -->
            <div class="xl:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendar View</CardTitle>
                        <CardDescription>
                            View your plants and activities in calendar format
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="calendar-container">
                            <FullCalendar 
                                :options="calendarOptions"
                                class="h-full"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Sidebar -->
            <div class="space-y-4">
                <!-- Legend -->
                <Card>
                    <CardHeader>
                        <CardTitle class="text-sm">Legend</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div 
                            v-for="(color, type) in eventTypeColors" 
                            :key="type"
                            class="flex items-center gap-2"
                        >
                            <div :class="[color, 'w-3 h-3 rounded-full']"></div>
                            <span class="text-sm">{{ eventTypeLabels[type as keyof typeof eventTypeLabels] }}</span>
                        </div>
                    </CardContent>
                </Card>

                <!-- Upcoming Events -->
                <Card>
                    <CardHeader>
                        <CardTitle class="text-sm">Upcoming This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div v-if="upcomingEvents.length === 0" class="text-sm text-muted-foreground">
                            No upcoming events this week
                        </div>
                        <div v-else class="space-y-3">
                            <div 
                                v-for="event in upcomingEvents" 
                                :key="event.id"
                                class="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                                @click="selectedEvent = event; showEventModal = true"
                            >
                                <div 
                                    :class="[
                                        eventTypeColors[event.type as keyof typeof eventTypeColors], 
                                        'w-2 h-2 rounded-full mt-2 flex-shrink-0'
                                    ]"
                                ></div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium truncate">
                                        {{ event.title }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        {{ new Date(event.start).toLocaleDateString() }}
                                        <span v-if="!event.allDay">
                                            at {{ new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                                        </span>
                                    </div>
                                    <Badge 
                                        variant="secondary" 
                                        class="mt-1 text-xs"
                                    >
                                        {{ eventTypeLabels[event.type as keyof typeof eventTypeLabels] }}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </div>

        <!-- Event Detail Modal -->
        <CalendarEventModal 
        v-if="selectedEvent"
        :event="selectedEvent"
        :open="showEventModal"
        @close="closeEventModal"
        @updated="handleEventUpdated"
    />

    <!-- Add Planned Planting Modal -->
    <AddPlannedPlantingModal 
        :open="showAddPlantingModal"
        :selected-date="selectedDate"
        @close="closeAddPlantingModal"
        @planted="handlePlantingAdded"
    />
    </AppLayout>
</template>

<style scoped>
.calendar-container {
    min-height: 600px;
}

.calendar-container-mobile {
    min-height: 400px;
}

@media (min-width: 768px) {
    .calendar-container-mobile {
        min-height: 500px;
    }
}

@media (min-width: 1024px) {
    .calendar-container-mobile {
        min-height: 600px;
    }
}

:deep(.fc) {
    border: none;
}

:deep(.fc-theme-standard .fc-scrollgrid) {
    border: 1px solid hsl(var(--border));
}

:deep(.fc-theme-standard td, .fc-theme-standard th) {
    border: 1px solid hsl(var(--border));
}

/* Responsive calendar headers */
@media (max-width: 1279px) {
    :deep(.fc-toolbar) {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    :deep(.fc-toolbar-chunk) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    :deep(.fc-button-group) {
        flex-wrap: wrap;
        gap: 0.25rem;
    }
    
    :deep(.fc-button) {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    }
    
    :deep(.fc-toolbar-title) {
        font-size: 1.25rem;
        margin: 0.5rem 0;
    }
}

/* Mobile-specific styles */
@media (max-width: 768px) {
    :deep(.fc-toolbar-title) {
        font-size: 1.125rem;
    }
    
    :deep(.fc-button) {
        padding: 0.375rem 0.5rem;
        font-size: 0.75rem;
    }
    
    :deep(.fc-daygrid-day-number) {
        font-size: 0.875rem;
    }
    
    :deep(.fc-event-title) {
        font-size: 0.75rem;
    }
    
    :deep(.fc-col-header-cell) {
        padding: 0.25rem;
    }
    
    :deep(.fc-daygrid-day) {
        min-height: 60px;
    }
}

/* Button styling */
:deep(.fc-button-primary) {
    background-color: hsl(var(--primary));
    border-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
}

:deep(.fc-button-primary:hover) {
    background-color: hsl(var(--primary) / 0.9);
    border-color: hsl(var(--primary) / 0.9);
}

:deep(.fc-button-primary:disabled) {
    background-color: hsl(var(--muted));
    border-color: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
}

:deep(.fc-today-button) {
    background-color: hsl(var(--secondary));
    border-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
}

:deep(.fc-today-button:hover) {
    background-color: hsl(var(--secondary) / 0.8);
    border-color: hsl(var(--secondary) / 0.8);
}

:deep(.fc-daygrid-day.fc-day-today) {
    background-color: hsl(var(--accent) / 0.1);
}

/* Event colors */
:deep(.calendar-event-planting) {
    background-color: #22c55e !important;
    border-color: #16a34a !important;
}

:deep(.calendar-event-harvest_estimated) {
    background-color: #f59e0b !important;
    border-color: #d97706 !important;
}

:deep(.calendar-event-harvest_expected) {
    background-color: #eab308 !important;
    border-color: #ca8a04 !important;
}

:deep(.calendar-event-harvest_actual) {
    background-color: #059669 !important;
    border-color: #047857 !important;
}

:deep(.calendar-event-reminder) {
    background-color: #3b82f6 !important;
    border-color: #2563eb !important;
}

:deep(.calendar-event-activity) {
    background-color: #8b5cf6 !important;
    border-color: #7c3aed !important;
}

/* Improve event text readability on mobile */
@media (max-width: 768px) {
    :deep(.fc-event) {
        font-size: 0.75rem;
        padding: 1px 2px;
    }
    
    :deep(.fc-event-title) {
        font-weight: 500;
    }
}

/* iPad specific optimizations */
@media (min-width: 768px) and (max-width: 1279px) {
    :deep(.fc-toolbar-title) {
        font-size: 1.5rem;
    }
    
    :deep(.fc-button) {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
    }
    
    :deep(.fc-daygrid-day) {
        min-height: 80px;
    }
    
    :deep(.fc-event) {
        font-size: 0.875rem;
        padding: 2px 4px;
    }
}

/* Touch-friendly interactions */
@media (hover: none) {
    :deep(.fc-event) {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    :deep(.fc-event:active) {
        transform: scale(0.98);
        opacity: 0.8;
    }
    
    :deep(.fc-button) {
        min-height: 44px; /* iOS minimum touch target */
        min-width: 44px;
    }
}
</style>
