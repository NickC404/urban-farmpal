import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/plant-reminders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::index
* @see app/Http/Controllers/PlantReminderController.php:15
* @route '/plant-reminders'
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
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
export const upcoming = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: upcoming.url(options),
    method: 'get',
})

upcoming.definition = {
    methods: ["get","head"],
    url: '/plant-reminders/upcoming',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
upcoming.url = (options?: RouteQueryOptions) => {
    return upcoming.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
upcoming.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: upcoming.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
upcoming.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: upcoming.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
const upcomingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: upcoming.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
upcomingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: upcoming.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::upcoming
* @see app/Http/Controllers/PlantReminderController.php:51
* @route '/plant-reminders/upcoming'
*/
upcomingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: upcoming.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

upcoming.form = upcomingForm

/**
* @see \App\Http\Controllers\PlantReminderController::store
* @see app/Http/Controllers/PlantReminderController.php:69
* @route '/plant-reminders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/plant-reminders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlantReminderController::store
* @see app/Http/Controllers/PlantReminderController.php:69
* @route '/plant-reminders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::store
* @see app/Http/Controllers/PlantReminderController.php:69
* @route '/plant-reminders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::store
* @see app/Http/Controllers/PlantReminderController.php:69
* @route '/plant-reminders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::store
* @see app/Http/Controllers/PlantReminderController.php:69
* @route '/plant-reminders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
export const show = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/plant-reminders/{plantReminder}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
show.url = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantReminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantReminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantReminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantReminder: typeof args.plantReminder === 'object'
        ? args.plantReminder.id
        : args.plantReminder,
    }

    return show.definition.url
            .replace('{plantReminder}', parsedArgs.plantReminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
show.get = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
show.head = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
const showForm = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
showForm.get = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantReminderController::show
* @see app/Http/Controllers/PlantReminderController.php:105
* @route '/plant-reminders/{plantReminder}'
*/
showForm.head = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\PlantReminderController::update
* @see app/Http/Controllers/PlantReminderController.php:120
* @route '/plant-reminders/{plantReminder}'
*/
export const update = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/plant-reminders/{plantReminder}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PlantReminderController::update
* @see app/Http/Controllers/PlantReminderController.php:120
* @route '/plant-reminders/{plantReminder}'
*/
update.url = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantReminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantReminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantReminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantReminder: typeof args.plantReminder === 'object'
        ? args.plantReminder.id
        : args.plantReminder,
    }

    return update.definition.url
            .replace('{plantReminder}', parsedArgs.plantReminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::update
* @see app/Http/Controllers/PlantReminderController.php:120
* @route '/plant-reminders/{plantReminder}'
*/
update.put = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PlantReminderController::update
* @see app/Http/Controllers/PlantReminderController.php:120
* @route '/plant-reminders/{plantReminder}'
*/
const updateForm = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::update
* @see app/Http/Controllers/PlantReminderController.php:120
* @route '/plant-reminders/{plantReminder}'
*/
updateForm.put = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\PlantReminderController::destroy
* @see app/Http/Controllers/PlantReminderController.php:149
* @route '/plant-reminders/{plantReminder}'
*/
export const destroy = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/plant-reminders/{plantReminder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlantReminderController::destroy
* @see app/Http/Controllers/PlantReminderController.php:149
* @route '/plant-reminders/{plantReminder}'
*/
destroy.url = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantReminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantReminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantReminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantReminder: typeof args.plantReminder === 'object'
        ? args.plantReminder.id
        : args.plantReminder,
    }

    return destroy.definition.url
            .replace('{plantReminder}', parsedArgs.plantReminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::destroy
* @see app/Http/Controllers/PlantReminderController.php:149
* @route '/plant-reminders/{plantReminder}'
*/
destroy.delete = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PlantReminderController::destroy
* @see app/Http/Controllers/PlantReminderController.php:149
* @route '/plant-reminders/{plantReminder}'
*/
const destroyForm = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::destroy
* @see app/Http/Controllers/PlantReminderController.php:149
* @route '/plant-reminders/{plantReminder}'
*/
destroyForm.delete = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\PlantReminderController::complete
* @see app/Http/Controllers/PlantReminderController.php:164
* @route '/plant-reminders/{plantReminder}/complete'
*/
export const complete = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/plant-reminders/{plantReminder}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlantReminderController::complete
* @see app/Http/Controllers/PlantReminderController.php:164
* @route '/plant-reminders/{plantReminder}/complete'
*/
complete.url = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantReminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantReminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantReminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantReminder: typeof args.plantReminder === 'object'
        ? args.plantReminder.id
        : args.plantReminder,
    }

    return complete.definition.url
            .replace('{plantReminder}', parsedArgs.plantReminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::complete
* @see app/Http/Controllers/PlantReminderController.php:164
* @route '/plant-reminders/{plantReminder}/complete'
*/
complete.post = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::complete
* @see app/Http/Controllers/PlantReminderController.php:164
* @route '/plant-reminders/{plantReminder}/complete'
*/
const completeForm = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::complete
* @see app/Http/Controllers/PlantReminderController.php:164
* @route '/plant-reminders/{plantReminder}/complete'
*/
completeForm.post = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

complete.form = completeForm

/**
* @see \App\Http\Controllers\PlantReminderController::snooze
* @see app/Http/Controllers/PlantReminderController.php:184
* @route '/plant-reminders/{plantReminder}/snooze'
*/
export const snooze = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snooze.url(args, options),
    method: 'post',
})

snooze.definition = {
    methods: ["post"],
    url: '/plant-reminders/{plantReminder}/snooze',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlantReminderController::snooze
* @see app/Http/Controllers/PlantReminderController.php:184
* @route '/plant-reminders/{plantReminder}/snooze'
*/
snooze.url = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantReminder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantReminder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantReminder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantReminder: typeof args.plantReminder === 'object'
        ? args.plantReminder.id
        : args.plantReminder,
    }

    return snooze.definition.url
            .replace('{plantReminder}', parsedArgs.plantReminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantReminderController::snooze
* @see app/Http/Controllers/PlantReminderController.php:184
* @route '/plant-reminders/{plantReminder}/snooze'
*/
snooze.post = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snooze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::snooze
* @see app/Http/Controllers/PlantReminderController.php:184
* @route '/plant-reminders/{plantReminder}/snooze'
*/
const snoozeForm = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: snooze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantReminderController::snooze
* @see app/Http/Controllers/PlantReminderController.php:184
* @route '/plant-reminders/{plantReminder}/snooze'
*/
snoozeForm.post = (args: { plantReminder: number | { id: number } } | [plantReminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: snooze.url(args, options),
    method: 'post',
})

snooze.form = snoozeForm

const plantReminders = {
    index: Object.assign(index, index),
    upcoming: Object.assign(upcoming, upcoming),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    complete: Object.assign(complete, complete),
    snooze: Object.assign(snooze, snooze),
}

export default plantReminders