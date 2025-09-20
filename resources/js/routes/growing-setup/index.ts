import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/settings/growing-setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::show
* @see app/Http/Controllers/GrowingSetupController.php:16
* @route '/settings/growing-setup'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\GrowingSetupController::update
* @see app/Http/Controllers/GrowingSetupController.php:28
* @route '/settings/growing-setup'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/growing-setup',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\GrowingSetupController::update
* @see app/Http/Controllers/GrowingSetupController.php:28
* @route '/settings/growing-setup'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GrowingSetupController::update
* @see app/Http/Controllers/GrowingSetupController.php:28
* @route '/settings/growing-setup'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::update
* @see app/Http/Controllers/GrowingSetupController.php:28
* @route '/settings/growing-setup'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\GrowingSetupController::update
* @see app/Http/Controllers/GrowingSetupController.php:28
* @route '/settings/growing-setup'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const growingSetup = {
    show: Object.assign(show, show),
    update: Object.assign(update, update),
}

export default growingSetup