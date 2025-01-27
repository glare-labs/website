import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.glare-labs.uk',
    integrations: [
        mdx(),
        sitemap(),
    ],
    trailingSlash: 'always',
    devToolbar: {
        enabled: false,
    },
    experimental: {
        directRenderScript: true,
    },
    prefetch: {
        prefetchAll: true,
    },
    output: 'static',
    outDir: '../../dist',
})
