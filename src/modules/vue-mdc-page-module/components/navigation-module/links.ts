
export type TLink = {
    url: string
    label: string
    iconString: string
}

export const links: Array<TLink> = [
    {
        iconString: 'home',
        label: 'Home',
        url: '/feature/vue-mdc/home/',
    },
    {
        iconString: 'apps',
        label: 'Components',
        url: '/feature/vue-mdc/component/',
    },
    {
        iconString: 'library_books',
        label: 'Documents',
        url: '/feature/vue-mdc/document/',
    },
]
