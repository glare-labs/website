import { atom } from 'nanostores'

export const routes = [
    {
        id: 0,
        label: 'Home',
        iconString: 'home',
        url: `/feature/blog/`,
    },
    {
        id: 1,
        label: 'Library',
        iconString: 'book',
        url: `/feature/blog/library/`,
    },
    {
        id: 2,
        label: 'Search',
        iconString: 'search',
        url: `/feature/blog/search/`,
    },
]

export const currentRouteUrl = atom(routes[0].url)

if (typeof window !== 'undefined') {

    window.addEventListener('DOMContentLoaded', () => {
        const url = new URL(window.location.href)
        for (const route of routes) {
            if (
                route.url === url.pathname
            ) {
                currentRouteUrl.set(route.url)
            }
        }
    })

}
