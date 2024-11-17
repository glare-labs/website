
/** @type {import("prettier").Config} */
export default {
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
                jsxSingleQuote: false,
                tabWidth: 4,
                printWidth: 320,
                endOfLine: 'lf',
                useTabs: false,
            },
        },
    ],
}
