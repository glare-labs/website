import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    site: 'https://glare-labs.uk',
    integrations: [
        mdx(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('-')
                }
            }
        }),
    ],
    trailingSlash: 'ignore',
    devToolbar: {
        enabled: false,
    },
    experimental: {
        contentLayer: true,
        directRenderScript: true,
    },
    prefetch: {
        prefetchAll: false
    },
    output: 'static',
})
