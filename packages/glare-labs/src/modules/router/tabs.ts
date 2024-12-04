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
        url: 'https://world.glare-labs.uk/',
        label: 'Bre97 World (Blog)'
    },
] as const
