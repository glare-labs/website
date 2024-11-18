import { defineCollection, z } from 'astro:content'

const articleDefinition = defineCollection({
    type: 'content',
    schema: z.object({
        headline: z.string(),
        description: z.string(),
        creationTime: z.coerce.date(),
        imageUrl: z.string(),
        tags: z.array(z.string()),

        /**
         * We do not organize blogs into folders.
         * We recommend using collection as the classification identifier in mdx.
         * 
         * ```plaintext
         * /src
         *     /content
         *         /blogs
         *             /...
         *             /all-your-mdx-files.mdx
         *         /config.ts
         *     /...
         * ```
         *
         * ```mdx
         * ---
         * headline: "Setup angular project"
         * description: "Create a angular project in one minutes."
         * creationTime: 1/1/2000
         * imageUrl: "source.jpg"
         * tags: ['test file', 'Tag 1', 'Tag 2', 'Tag3']
         * collection: 'Angular'
         * ---
         * ```
         */
        collection: z.string(),
    }),
})

export const collections = {
    article: articleDefinition,
}
