import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/plant-activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::index
* @see app/Http/Controllers/PlantActivityController.php:15
* @route '/plant-activities'
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
* @see \App\Http\Controllers\PlantActivityController::store
* @see app/Http/Controllers/PlantActivityController.php:49
* @route '/plant-activities'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/plant-activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlantActivityController::store
* @see app/Http/Controllers/PlantActivityController.php:49
* @route '/plant-activities'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantActivityController::store
* @see app/Http/Controllers/PlantActivityController.php:49
* @route '/plant-activities'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantActivityController::store
* @see app/Http/Controllers/PlantActivityController.php:49
* @route '/plant-activities'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantActivityController::store
* @see app/Http/Controllers/PlantActivityController.php:49
* @route '/plant-activities'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
export const show = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/plant-activities/{plantActivity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
show.url = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantActivity: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantActivity: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantActivity: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantActivity: typeof args.plantActivity === 'object'
        ? args.plantActivity.id
        : args.plantActivity,
    }

    return show.definition.url
            .replace('{plantActivity}', parsedArgs.plantActivity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
show.get = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
show.head = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
const showForm = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
showForm.get = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantActivityController::show
* @see app/Http/Controllers/PlantActivityController.php:90
* @route '/plant-activities/{plantActivity}'
*/
showForm.head = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PlantActivityController::update
* @see app/Http/Controllers/PlantActivityController.php:105
* @route '/plant-activities/{plantActivity}'
*/
export const update = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/plant-activities/{plantActivity}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PlantActivityController::update
* @see app/Http/Controllers/PlantActivityController.php:105
* @route '/plant-activities/{plantActivity}'
*/
update.url = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantActivity: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantActivity: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantActivity: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantActivity: typeof args.plantActivity === 'object'
        ? args.plantActivity.id
        : args.plantActivity,
    }

    return update.definition.url
            .replace('{plantActivity}', parsedArgs.plantActivity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantActivityController::update
* @see app/Http/Controllers/PlantActivityController.php:105
* @route '/plant-activities/{plantActivity}'
*/
update.put = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PlantActivityController::update
* @see app/Http/Controllers/PlantActivityController.php:105
* @route '/plant-activities/{plantActivity}'
*/
const updateForm = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantActivityController::update
* @see app/Http/Controllers/PlantActivityController.php:105
* @route '/plant-activities/{plantActivity}'
*/
updateForm.put = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PlantActivityController::destroy
* @see app/Http/Controllers/PlantActivityController.php:139
* @route '/plant-activities/{plantActivity}'
*/
export const destroy = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/plant-activities/{plantActivity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlantActivityController::destroy
* @see app/Http/Controllers/PlantActivityController.php:139
* @route '/plant-activities/{plantActivity}'
*/
destroy.url = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plantActivity: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plantActivity: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plantActivity: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plantActivity: typeof args.plantActivity === 'object'
        ? args.plantActivity.id
        : args.plantActivity,
    }

    return destroy.definition.url
            .replace('{plantActivity}', parsedArgs.plantActivity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantActivityController::destroy
* @see app/Http/Controllers/PlantActivityController.php:139
* @route '/plant-activities/{plantActivity}'
*/
destroy.delete = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PlantActivityController::destroy
* @see app/Http/Controllers/PlantActivityController.php:139
* @route '/plant-activities/{plantActivity}'
*/
const destroyForm = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantActivityController::destroy
* @see app/Http/Controllers/PlantActivityController.php:139
* @route '/plant-activities/{plantActivity}'
*/
destroyForm.delete = (args: { plantActivity: number | { id: number } } | [plantActivity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PlantActivityController = { index, store, show, update, destroy }

export default PlantActivityController