import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import lit from '@astrojs/lit';

// https://astro.build/config
export default defineConfig({
    site: 'https://glare-labs.uk',
    base: '/',
    integrations: [
        mdx(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('-')
                }
            }
        }),
        lit(),
    ],
    trailingSlash: 'ignore',
    devToolbar: {
        enabled: false,
    },
    vite: {

    }
})
