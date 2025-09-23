import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-plants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::index
* @see app/Http/Controllers/UserPlantController.php:16
* @route '/my-plants'
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
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/my-plants/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::dashboard
* @see app/Http/Controllers/UserPlantController.php:181
* @route '/my-plants/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\UserPlantController::store
* @see app/Http/Controllers/UserPlantController.php:63
* @route '/my-plants'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/my-plants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserPlantController::store
* @see app/Http/Controllers/UserPlantController.php:63
* @route '/my-plants'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::store
* @see app/Http/Controllers/UserPlantController.php:63
* @route '/my-plants'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserPlantController::store
* @see app/Http/Controllers/UserPlantController.php:63
* @route '/my-plants'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserPlantController::store
* @see app/Http/Controllers/UserPlantController.php:63
* @route '/my-plants'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
export const show = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/my-plants/{userPlant}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
show.url = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userPlant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { userPlant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            userPlant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userPlant: typeof args.userPlant === 'object'
        ? args.userPlant.id
        : args.userPlant,
    }

    return show.definition.url
            .replace('{userPlant}', parsedArgs.userPlant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
show.get = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
show.head = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
const showForm = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
showForm.get = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserPlantController::show
* @see app/Http/Controllers/UserPlantController.php:103
* @route '/my-plants/{userPlant}'
*/
showForm.head = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UserPlantController::update
* @see app/Http/Controllers/UserPlantController.php:118
* @route '/my-plants/{userPlant}'
*/
export const update = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/my-plants/{userPlant}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\UserPlantController::update
* @see app/Http/Controllers/UserPlantController.php:118
* @route '/my-plants/{userPlant}'
*/
update.url = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userPlant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { userPlant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            userPlant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userPlant: typeof args.userPlant === 'object'
        ? args.userPlant.id
        : args.userPlant,
    }

    return update.definition.url
            .replace('{userPlant}', parsedArgs.userPlant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::update
* @see app/Http/Controllers/UserPlantController.php:118
* @route '/my-plants/{userPlant}'
*/
update.put = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserPlantController::update
* @see app/Http/Controllers/UserPlantController.php:118
* @route '/my-plants/{userPlant}'
*/
const updateForm = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserPlantController::update
* @see app/Http/Controllers/UserPlantController.php:118
* @route '/my-plants/{userPlant}'
*/
updateForm.put = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UserPlantController::destroy
* @see app/Http/Controllers/UserPlantController.php:158
* @route '/my-plants/{userPlant}'
*/
export const destroy = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/my-plants/{userPlant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserPlantController::destroy
* @see app/Http/Controllers/UserPlantController.php:158
* @route '/my-plants/{userPlant}'
*/
destroy.url = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userPlant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { userPlant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            userPlant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        userPlant: typeof args.userPlant === 'object'
        ? args.userPlant.id
        : args.userPlant,
    }

    return destroy.definition.url
            .replace('{userPlant}', parsedArgs.userPlant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserPlantController::destroy
* @see app/Http/Controllers/UserPlantController.php:158
* @route '/my-plants/{userPlant}'
*/
destroy.delete = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserPlantController::destroy
* @see app/Http/Controllers/UserPlantController.php:158
* @route '/my-plants/{userPlant}'
*/
const destroyForm = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserPlantController::destroy
* @see app/Http/Controllers/UserPlantController.php:158
* @route '/my-plants/{userPlant}'
*/
destroyForm.delete = (args: { userPlant: number | { id: number } } | [userPlant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const UserPlantController = { index, dashboard, store, show, update, destroy }

export default UserPlantController