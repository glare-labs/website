export interface IRootPageHeaderTabs {
    url: string
    label: string
}

export const headerTabs: Array<IRootPageHeaderTabs> = [
    {
        url: '/feature/glare-labs',
        label: 'Glare Labs'
    },
    {
        url: '/feature/glare-labs/solutions',
        label: 'Solutions'
    },
    {
        url: '/feature/vue-mdc',
        label: 'Vue-MDC'
    },
    {
        url: '/feature/blog',
        label: 'Blog'
    },
] as const
