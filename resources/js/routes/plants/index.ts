import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
export const browse = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browse.url(options),
    method: 'get',
})

browse.definition = {
    methods: ["get","head"],
    url: '/plants-browse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
browse.url = (options?: RouteQueryOptions) => {
    return browse.definition.url + queryParams(options)
}

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
browse.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browse.url(options),
    method: 'get',
})

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
browse.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: browse.url(options),
    method: 'head',
})

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
const browseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: browse.url(options),
    method: 'get',
})

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
browseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: browse.url(options),
    method: 'get',
})

/**
* @see routes/web.php:23
* @route '/plants-browse'
*/
browseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: browse.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

browse.form = browseForm

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/plants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::index
* @see app/Http/Controllers/PlantController.php:14
* @route '/plants'
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
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
export const compatible = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compatible.url(options),
    method: 'get',
})

compatible.definition = {
    methods: ["get","head"],
    url: '/plants/compatible',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
compatible.url = (options?: RouteQueryOptions) => {
    return compatible.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
compatible.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compatible.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
compatible.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: compatible.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
const compatibleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compatible.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
compatibleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compatible.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::compatible
* @see app/Http/Controllers/PlantController.php:142
* @route '/plants/compatible'
*/
compatibleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compatible.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

compatible.form = compatibleForm

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
export const show = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/plants/{plant}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
show.url = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plant: typeof args.plant === 'object'
        ? args.plant.id
        : args.plant,
    }

    return show.definition.url
            .replace('{plant}', parsedArgs.plant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
show.get = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
show.head = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
const showForm = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
showForm.get = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PlantController::show
* @see app/Http/Controllers/PlantController.php:95
* @route '/plants/{plant}'
*/
showForm.head = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PlantController::store
* @see app/Http/Controllers/PlantController.php:66
* @route '/plants'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/plants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlantController::store
* @see app/Http/Controllers/PlantController.php:66
* @route '/plants'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::store
* @see app/Http/Controllers/PlantController.php:66
* @route '/plants'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantController::store
* @see app/Http/Controllers/PlantController.php:66
* @route '/plants'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantController::store
* @see app/Http/Controllers/PlantController.php:66
* @route '/plants'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PlantController::update
* @see app/Http/Controllers/PlantController.php:103
* @route '/plants/{plant}'
*/
export const update = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/plants/{plant}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PlantController::update
* @see app/Http/Controllers/PlantController.php:103
* @route '/plants/{plant}'
*/
update.url = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plant: typeof args.plant === 'object'
        ? args.plant.id
        : args.plant,
    }

    return update.definition.url
            .replace('{plant}', parsedArgs.plant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::update
* @see app/Http/Controllers/PlantController.php:103
* @route '/plants/{plant}'
*/
update.put = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PlantController::update
* @see app/Http/Controllers/PlantController.php:103
* @route '/plants/{plant}'
*/
const updateForm = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantController::update
* @see app/Http/Controllers/PlantController.php:103
* @route '/plants/{plant}'
*/
updateForm.put = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PlantController::destroy
* @see app/Http/Controllers/PlantController.php:132
* @route '/plants/{plant}'
*/
export const destroy = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/plants/{plant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlantController::destroy
* @see app/Http/Controllers/PlantController.php:132
* @route '/plants/{plant}'
*/
destroy.url = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { plant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            plant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        plant: typeof args.plant === 'object'
        ? args.plant.id
        : args.plant,
    }

    return destroy.definition.url
            .replace('{plant}', parsedArgs.plant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlantController::destroy
* @see app/Http/Controllers/PlantController.php:132
* @route '/plants/{plant}'
*/
destroy.delete = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PlantController::destroy
* @see app/Http/Controllers/PlantController.php:132
* @route '/plants/{plant}'
*/
const destroyForm = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PlantController::destroy
* @see app/Http/Controllers/PlantController.php:132
* @route '/plants/{plant}'
*/
destroyForm.delete = (args: { plant: number | { id: number } } | [plant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const plants = {
    browse: Object.assign(browse, browse),
    index: Object.assign(index, index),
    compatible: Object.assign(compatible, compatible),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default plants