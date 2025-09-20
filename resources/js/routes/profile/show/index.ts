import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
export const user = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(args, options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/profile/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
user.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return user.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
user.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
user.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
const userForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
userForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\ProfileController::user
* @see app/Http/Controllers/Settings/ProfileController.php:20
* @route '/profile/{user}'
*/
userForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

const show = {
    user: Object.assign(user, user),
}

export default show