import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
export const getEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvents.url(options),
    method: 'get',
})

getEvents.definition = {
    methods: ["get","head"],
    url: '/api/calendar/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
getEvents.url = (options?: RouteQueryOptions) => {
    return getEvents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
getEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvents.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
getEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEvents.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
const getEventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEvents.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
getEventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEvents.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CalendarController::getEvents
* @see app/Http/Controllers/CalendarController.php:22
* @route '/api/calendar/events'
*/
getEventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getEvents.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getEvents.form = getEventsForm

/**
* @see \App\Http\Controllers\CalendarController::createPlannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
export const createPlannedPlanting = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createPlannedPlanting.url(options),
    method: 'post',
})

createPlannedPlanting.definition = {
    methods: ["post"],
    url: '/api/calendar/planned-planting',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CalendarController::createPlannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
createPlannedPlanting.url = (options?: RouteQueryOptions) => {
    return createPlannedPlanting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CalendarController::createPlannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
createPlannedPlanting.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createPlannedPlanting.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CalendarController::createPlannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
const createPlannedPlantingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createPlannedPlanting.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CalendarController::createPlannedPlanting
* @see app/Http/Controllers/CalendarController.php:195
* @route '/api/calendar/planned-planting'
*/
createPlannedPlantingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createPlannedPlanting.url(options),
    method: 'post',
})

createPlannedPlanting.form = createPlannedPlantingForm

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

const CalendarController = { index, getEvents, createPlannedPlanting, updateReminder }

export default CalendarController