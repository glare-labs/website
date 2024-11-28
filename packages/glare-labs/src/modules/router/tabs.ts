export interface IRootPageHeaderTabs {
    url: string
    label: string
}

export const headerTabs: Array<IRootPageHeaderTabs> = [
    {
        url: '/',
        label: 'Glare Labs'
    },
    {
        url: '/solutions/',
        label: 'Solutions'
    },
    {
        url: 'https://glare-labs.uk/feature/vue-mdc',
        label: 'Vue-MDC'
    },
    {
        url: 'https://blog.glare-labs.uk/',
        label: 'Blog'
    },
] as const
