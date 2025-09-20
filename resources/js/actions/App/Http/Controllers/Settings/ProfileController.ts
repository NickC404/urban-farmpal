import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
const showaed0d18b6699640aa4d85cb0451e9ce2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showaed0d18b6699640aa4d85cb0451e9ce2.url(options),
    method: 'get',
})

showaed0d18b6699640aa4d85cb0451e9ce2.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
showaed0d18b6699640aa4d85cb0451e9ce2.url = (options?: RouteQueryOptions) => {
    return showaed0d18b6699640aa4d85cb0451e9ce2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
showaed0d18b6699640aa4d85cb0451e9ce2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showaed0d18b6699640aa4d85cb0451e9ce2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
showaed0d18b6699640aa4d85cb0451e9ce2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showaed0d18b6699640aa4d85cb0451e9ce2.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
const showaed0d18b6699640aa4d85cb0451e9ce2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showaed0d18b6699640aa4d85cb0451e9ce2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
showaed0d18b6699640aa4d85cb0451e9ce2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showaed0d18b6699640aa4d85cb0451e9ce2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile'
*/
showaed0d18b6699640aa4d85cb0451e9ce2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showaed0d18b6699640aa4d85cb0451e9ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showaed0d18b6699640aa4d85cb0451e9ce2.form = showaed0d18b6699640aa4d85cb0451e9ce2Form
/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
const showb9fa0f282375602830abdc36f1400f01 = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb9fa0f282375602830abdc36f1400f01.url(args, options),
    method: 'get',
})

showb9fa0f282375602830abdc36f1400f01.definition = {
    methods: ["get","head"],
    url: '/profile/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
showb9fa0f282375602830abdc36f1400f01.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return showb9fa0f282375602830abdc36f1400f01.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
showb9fa0f282375602830abdc36f1400f01.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb9fa0f282375602830abdc36f1400f01.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
showb9fa0f282375602830abdc36f1400f01.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showb9fa0f282375602830abdc36f1400f01.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
const showb9fa0f282375602830abdc36f1400f01Form = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb9fa0f282375602830abdc36f1400f01.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
showb9fa0f282375602830abdc36f1400f01Form.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb9fa0f282375602830abdc36f1400f01.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::show
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
showb9fa0f282375602830abdc36f1400f01Form.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showb9fa0f282375602830abdc36f1400f01.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showb9fa0f282375602830abdc36f1400f01.form = showb9fa0f282375602830abdc36f1400f01Form

export const show = {
    '/profile': showaed0d18b6699640aa4d85cb0451e9ce2,
    '/profile/{user}': showb9fa0f282375602830abdc36f1400f01,
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
* @see app/Http/Controllers/Settings/ProfileController.php:35
* @route '/settings/profile'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile'
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
* @see \App\Http\Controllers\Settings\ProfileController::update
* @see app/Http/Controllers/Settings/ProfileController.php:46
* @route '/settings/profile'
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

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:62
* @route '/settings/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:62
* @route '/settings/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:62
* @route '/settings/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:62
* @route '/settings/profile'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
* @see app/Http/Controllers/Settings/ProfileController.php:62
* @route '/settings/profile'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProfileController = { show, edit, update, destroy }

export default ProfileController