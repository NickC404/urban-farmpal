import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::index
* @see app/Http/Controllers/CalendarController.php:17
* @route '/calendar'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/api/calendar/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: events.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: events.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::events
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
eventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: events.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

events.form = eventsForm

/**
* @see \App\Http\Controllers\CalendarController::plannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
export const plannedPlanting = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: plannedPlanting.url(options),
    method: 'post',
})

plannedPlanting.definition = {
    methods: ["post"],
    url: '/api/calendar/planned-planting',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CalendarController::plannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
plannedPlanting.url = (options?: RouteQueryOptions) => {
    return plannedPlanting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::plannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
plannedPlanting.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: plannedPlanting.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CalendarController::plannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
const plannedPlantingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: plannedPlanting.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CalendarController::plannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
plannedPlantingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: plannedPlanting.url(options),
    method: 'post',
})

plannedPlanting.form = plannedPlantingForm

/**
* @see \App\Http\Controllers\CalendarController::updateReminder
* @see app/Http/Controllers/CalendarController.php:240
* @route '/api/calendar/reminders/{reminder}'
*/
export const updateReminder = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateReminder.url(args, options),
    method: 'patch',
})

updateReminder.definition = {
    methods: ["patch"],
    url: '/api/calendar/reminders/{reminder}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CalendarController::updateReminder
* @see app/Http/Controllers/CalendarController.php:240
* @route '/api/calendar/reminders/{reminder}'
*/
updateReminder.url = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { reminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            reminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reminder: typeof args.reminder === 'object'
        ? args.reminder.id
        : args.reminder,
    }

    return updateReminder.definition.url
            .replace('{reminder}', parsedArgs.reminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::updateReminder
* @see app/Http/Controllers/CalendarController.php:240
* @route '/api/calendar/reminders/{reminder}'
*/
updateReminder.patch = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateReminder.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CalendarController::updateReminder
* @see app/Http/Controllers/CalendarController.php:240
* @route '/api/calendar/reminders/{reminder}'
*/
const updateReminderForm = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateReminder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CalendarController::updateReminder
* @see app/Http/Controllers/CalendarController.php:240
* @route '/api/calendar/reminders/{reminder}'
*/
updateReminderForm.patch = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateReminder.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateReminder.form = updateReminderForm

const calendar = {
    index: Object.assign(index, index),
    events: Object.assign(events, events),
    plannedPlanting: Object.assign(plannedPlanting, plannedPlanting),
    updateReminder: Object.assign(updateReminder, updateReminder),
}

export default calendar