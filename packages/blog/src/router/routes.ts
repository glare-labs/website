import BookSvg from '@material-design-icons/svg/round/book.svg?raw'
import HomeSvg from '@material-design-icons/svg/round/home.svg?raw'
import SearchSvg from '@material-design-icons/svg/round/search.svg?raw'
import { atom } from 'nanostores'

export const routes = [
    {
        id: 0,
        label: 'Home',
        iconString: HomeSvg,
        url: `/`,
    },
    {
        id: 1,
        label: 'Library',
        iconString: BookSvg,
        url: `/library/`,
    },
    {
        id: 2,
        label: 'Search',
        iconString: SearchSvg,
        url: `/search/`,
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
