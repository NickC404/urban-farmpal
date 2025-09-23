import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:27
* @route '/my-garden'
*/
export const garden = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: garden.url(options),
    method: 'get',
})

garden.definition = {
    methods: ["get","head"],
    url: '/my-garden',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
garden.url = (options?: RouteQueryOptions) => {
    return garden.definition.url + queryParams(options)
}

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
garden.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: garden.url(options),
    method: 'get',
})

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
garden.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: garden.url(options),
    method: 'head',
})

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
const gardenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: garden.url(options),
    method: 'get',
})

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
gardenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: garden.url(options),
    method: 'get',
})

/**
* @see routes/web.php:27
* @route '/my-garden'
*/
gardenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: garden.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

garden.form = gardenForm

const myPlants = {
    garden: Object.assign(garden, garden),
}

export default myPlants