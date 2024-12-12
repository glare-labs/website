import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import ChannelSvg from '@material-design-icons/svg/round/apps.svg?raw'
import BookSvg from '@material-design-icons/svg/round/book.svg?raw'
import HomeSvg from '@material-design-icons/svg/round/home.svg?raw'
import SettingsSvg from '@material-design-icons/svg/round/settings.svg?raw'
import { atom } from 'nanostores'

type TRoute = {
    id: number
    label: string
    url: string
    navigable: boolean
    iconSvg?: string
    children?: Array<TRoute>
}

export const routes: (astroUrl: URL) => Array<TRoute> = (astroUrl: URL) => {
    const lang = getLangFromUrl(astroUrl)
    const t = useTranslations(lang)

    return ([
        {
            id: 0,
            navigable: true,
            label: t('navigation.home'),
            iconSvg: HomeSvg,
            url: `/`,
        },
        {
            id: 1,
            navigable: true,
            label: t('navigation.library'),
            iconSvg: BookSvg,
            url: `/library/`,
        },
        {
            id: 2,
            navigable: true,
            label: t('navigation.channel'),
            iconSvg: ChannelSvg,
            url: `/channels/`,
            children: [
                {
                    navigable: false,
                    id: 0,
                    label: 'Articles',
                    url: '/channel/articles/'
                },
            ]
        },
        {
            id: 3,
            navigable: true,
            label: t('navigation.settings'),
            iconSvg: SettingsSvg,
            url: `/settings/`,
        },
    ])
}

export const currentRouteUrl = atom(`/`)

if (typeof window !== 'undefined') {

    window.addEventListener('DOMContentLoaded', () => {
        const url = new URL(window.location.href)
        const links = routes(url)

        /**
         * @example
         * [, zh-TW, settings]
         * [, en-US, settings]
         */
        const [, lang, real] = url.pathname.split('/')
        console.log(lang, real)

        if (real) {
            for (const route of links) {
                if (
                    route.url === `/${real}/`
                ) {
                    currentRouteUrl.set(route.url)
                }
            }
        }
    })

}
