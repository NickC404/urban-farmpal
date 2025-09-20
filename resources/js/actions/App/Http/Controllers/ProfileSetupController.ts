import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/profile-setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::show
* @see app/Http/Controllers/ProfileSetupController.php:16
* @route '/profile-setup'
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
* @see \App\Http\Controllers\ProfileSetupController::update
* @see app/Http/Controllers/ProfileSetupController.php:33
* @route '/profile-setup'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/profile-setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileSetupController::update
* @see app/Http/Controllers/ProfileSetupController.php:33
* @route '/profile-setup'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileSetupController::update
* @see app/Http/Controllers/ProfileSetupController.php:33
* @route '/profile-setup'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::update
* @see app/Http/Controllers/ProfileSetupController.php:33
* @route '/profile-setup'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileSetupController::update
* @see app/Http/Controllers/ProfileSetupController.php:33
* @route '/profile-setup'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const ProfileSetupController = { show, update }

export default ProfileSetupController