export interface THighlight {
    title: string
    body: string
    iconString: string
}

export const highlights: Array<THighlight> = [
    {
        body: 'Completely built with SASS and deeply customizable.',
        title: 'Customizable',
        iconString: 'tune',
    },
    {
        body: 'Developed entirely in Typescript, with full type support.',
        title: 'TypeScript',
        iconString: 'tune',
    },
    {
        body: 'Material Design 3 styled component for Vue3.',
        title: 'MD 3 & Vue 3',
        iconString: 'tune',
    },
] as const
