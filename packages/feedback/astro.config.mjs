import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    site: 'https://feedback.glare-labs.uk',
    integrations: [
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
